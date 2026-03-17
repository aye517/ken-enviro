#!/usr/bin/env python3
"""
네이버 블로그(ken241021) 이미지 크롤러
- 전문성 있는 이미지 위주 (측정 장비, 현장, 실험실 등)
- 중복/유사 이미지 제외
- /public/images에 저장
"""

import re
import time
import hashlib
import urllib.request
from pathlib import Path

try:
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from webdriver_manager.chrome import ChromeDriverManager
except ImportError:
    import subprocess
    subprocess.check_call(["pip", "install", "selenium", "webdriver-manager"])
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from webdriver_manager.chrome import ChromeDriverManager

import requests
from bs4 import BeautifulSoup

BLOG_ID = "ken241021"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images"
MAX_POSTS = 15
MAX_IMAGES = 50

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
    "Referer": "https://blog.naver.com/",
}


def get_driver():
    """헤드리스 Chrome 드라이버 생성"""
    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--window-size=1920,1080")
    opts.add_argument("user-agent=" + HEADERS["User-Agent"])
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=opts)


def get_post_list_selenium(driver) -> list:
    """Selenium으로 블로그 메인에서 포스트 링크 추출 (모바일 URL 사용 - iframe 없음)"""
    # 모바일 버전이 구조가 단순함
    driver.get(f"https://m.blog.naver.com/{BLOG_ID}")
    time.sleep(4)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    posts = []
    seen = set()
    for a in soup.find_all("a", href=True):
        href = a.get("href", "")
        m = re.search(r"logNo=(\d+)|/(\d+)(?:\?|$)", href)
        if m:
            log_no = m.group(1) or m.group(2)
            if log_no and log_no not in seen:
                seen.add(log_no)
                title = a.get_text(strip=True)[:50] or f"post_{log_no}"
                if title and len(title) > 2:
                    posts.append({"logNo": log_no, "title": title})
                    if len(posts) >= MAX_POSTS:
                        break
    return posts


def get_post_html(log_no: str):
    """포스트 본문 HTML 가져오기 (iframe 내부)"""
    # 모바일 버전이 더 단순할 수 있음
    url = f"https://m.blog.naver.com/{BLOG_ID}/{log_no}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            return None
        return resp.text
    except Exception as e:
        print(f"  [경고] 포스트 로드 실패: {e}")
        return None


def extract_image_urls(html: str):
    """HTML에서 이미지 URL 추출 (원본/고해상도 우선)"""
    if not html:
        return []
    soup = BeautifulSoup(html, "html.parser")
    urls = set()

    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src")
        if not src:
            continue
        # 썸네일/아이콘 제외
        if any(x in src.lower() for x in ["emoji", "icon", "avatar", "profile", "spacer", "pixel"]):
            continue
        # blogfiles 등 네이버 블로그 이미지
        if "blogfiles" in src or "postfiles" in src or "pstatic.net" in src:
            # 원본 크기 파라미터 시도
            src = re.sub(r"\.\d+x\d+\.", ".", src)  # 크기 제한 제거
            urls.add(src)
    return list(urls)


def is_professional_image(url: str) -> bool:
    """전문성 있는 이미지인지 휴리스틱 (URL/경로 기반)"""
    # 블로그 본문 이미지는 대체로 전문적
    skip = ["logo", "banner", "ad", "button", "badge", "emoji"]
    lower = url.lower()
    return not any(s in lower for s in skip)


def download_image(url: str, seen_hashes: set) -> str | None:
    """이미지 다운로드, 중복 시 스킵. 저장 경로 반환."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
    except Exception as e:
        print(f"    [스킵] 다운로드 실패: {url[:60]}... - {e}")
        return None

    # 해시로 중복 체크
    h = hashlib.md5(data).hexdigest()
    if h in seen_hashes:
        return None
    seen_hashes.add(h)

    # 확장자
    ext = ".jpg"
    ct = ""
    try:
        req = urllib.request.Request(url, headers=HEADERS, method="HEAD")
        with urllib.request.urlopen(req, timeout=10) as r:
            ct = r.headers.get("Content-Type", "")
    except Exception:
        pass
    if "png" in ct:
        ext = ".png"
    elif "gif" in ct:
        ext = ".gif"
    elif "webp" in ct:
        ext = ".webp"

    # 너무 작은 이미지(아이콘 등) 제외 (3KB 미만)
    if len(data) < 3000:
        return None

    filename = f"blog_{h[:12]}{ext}"
    filepath = OUTPUT_DIR / filename
    with open(filepath, "wb") as f:
        f.write(data)
    return str(filepath)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"저장 경로: {OUTPUT_DIR}")
    print(f"블로그: {BLOG_ID}")

    print("Selenium으로 블로그 목록 수집 중...")
    driver = None
    try:
        driver = get_driver()
        posts = get_post_list_selenium(driver)
    except Exception as e:
        print(f"[경고] Selenium 실패: {e}")
        posts = []
    finally:
        if driver:
            driver.quit()

    if not posts:
        print("포스트를 찾을 수 없습니다. 네이버 접근 제한 또는 페이지 구조 변경일 수 있습니다.")
        return

    print(f"포스트 {len(posts)}개 발견")
    seen_hashes = set()
    saved = 0

    for i, post in enumerate(posts):
        log_no = post.get("logNo") or post.get("logNo", "")
        title = post.get("title", "")[:40]
        print(f"\n[{i+1}/{len(posts)}] {title}... (logNo={log_no})")
        if saved >= MAX_IMAGES:
            break

        html = get_post_html(log_no)
        urls = extract_image_urls(html)
        print(f"  이미지 {len(urls)}개 발견")

        for url in urls:
            if saved >= MAX_IMAGES:
                break
            if not is_professional_image(url):
                continue
            path = download_image(url, seen_hashes)
            if path:
                saved += 1
                print(f"  저장: {Path(path).name}")

        time.sleep(1)  # 서버 부하 방지

    print(f"\n완료: {saved}개 이미지 저장됨 → {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
