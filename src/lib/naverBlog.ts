/**
 * 네이버 블로그 RSS를 가져와 게시글 목록으로 파싱한다.
 *
 * - 직원은 평소처럼 네이버 블로그(blog.naver.com/ken241021)에 글만 쓰면 됨.
 * - 사이트는 RSS를 24시간마다 자동으로 다시 읽어 최신 글을 반영(ISR).
 *   글이 며칠에 한 번씩 올라오는 주기이므로 1시간은 과한 호출이라 하루 단위로 둠.
 * - 관리자가 즉시 반영하고 싶을 때는 `/api/revalidate?key=...` 를 호출하면
 *   `revalidatePath("/")` / `revalidatePath("/news")` 가 캐시를 무효화해서 다음 요청부터 새 글이 보인다.
 * - 본문은 네이버에 두고, 우리 사이트는 "제목·요약·썸네일·날짜" 목록 + 원문 링크만 보여준다.
 *   (네이버 본문 이미지는 외부에서 핫링크가 막혀 깨지지만, RSS 썸네일은 외부 로딩이 허용됨)
 */

export interface BlogPost {
  /** 원문(네이버 블로그) 링크 — 트래킹 파라미터 제거된 깨끗한 URL */
  link: string;
  title: string;
  /** 카테고리 (없을 수 있음) */
  category: string | null;
  /** 본문 앞부분 요약 텍스트 */
  summary: string;
  /** 대표 썸네일 이미지 URL (없으면 null) */
  thumbnail: string | null;
  /** "2026.06.08" 형식 */
  date: string;
  /** 정렬용 타임스탬프(ms) */
  timestamp: number;
}

const BLOG_ID = "ken241021";
const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;

/**
 * 메인 Portfolio(실제 수행 사례) 섹션 전용 카테고리.
 * 네이버 블로그에서 이 게시판에 올린 글은 Portfolio 에만 노출되고,
 * 메인 NewsSection · /news 의 "소식 & 자료실" 목록에서는 자동 제외된다.
 */
export const PORTFOLIO_CATEGORY = "대표사례";

const MONTHS: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

/** <tag><![CDATA[ ... ]]></tag> 에서 내용 추출 */
function pickCData(block: string, tag: string): string | null {
  const m = block.match(
    new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`),
  );
  return m ? m[1].trim() : null;
}

/** <tag> ... </tag> (CDATA 아님) 에서 내용 추출 */
function pickRaw(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].trim() : null;
}

/** RFC822 형식("Mon, 08 Jun 2026 16:29:03 +0900") → "2026.06.08" + 타임스탬프 */
function parseDate(pubDate: string | null): { date: string; timestamp: number } {
  if (pubDate) {
    const m = pubDate.match(/(\d{2})\s+([A-Za-z]{3})\s+(\d{4})/);
    if (m && MONTHS[m[2]]) {
      const [, day, mon, year] = m;
      const ts = Date.parse(pubDate);
      return {
        date: `${year}.${MONTHS[mon]}.${day}`,
        timestamp: Number.isNaN(ts) ? 0 : ts,
      };
    }
  }
  return { date: "", timestamp: 0 };
}

function parseItem(block: string): BlogPost | null {
  const title = pickCData(block, "title");
  // guid 는 트래킹 파라미터가 없는 깨끗한 원문 링크
  const guid = pickRaw(block, "guid");
  const linkRaw = pickCData(block, "link");
  const link = guid || (linkRaw ? linkRaw.split("?")[0] : null);
  if (!title || !link) return null;

  const description = pickCData(block, "description") ?? "";
  const thumbMatch = description.match(/<img[^>]*src="([^"]+)"/i);
  const thumbnail = thumbMatch ? thumbMatch[1] : null;

  const summary = description
    .replace(/<[^>]+>/g, " ") // 태그 제거
    .replace(/\.{3,}/g, "") // "......" 말줄임 제거
    .replace(/\s+/g, " ")
    .trim();

  const { date, timestamp } = parseDate(pickRaw(block, "pubDate"));

  return {
    link,
    title,
    category: pickCData(block, "category"),
    summary,
    thumbnail,
    date,
    timestamp,
  };
}

export interface GetBlogPostsOptions {
  /** 반환 개수 상한 (생략 시 전체) */
  limit?: number;
  /** 정확히 일치하면 결과에서 제외할 카테고리 (예: "대표사례") */
  excludeCategory?: string;
  /** 정확히 일치하는 카테고리만 포함 (Portfolio 처럼 특정 게시판만 가져올 때) */
  onlyCategory?: string;
}

/**
 * 네이버 블로그 글 목록을 가져온다.
 *
 * 옵션으로 카테고리 포함/제외 필터 + 개수 제한 가능.
 * 필터는 슬라이스 전에 적용되므로 `limit` 은 필터링 후 개수 기준이다.
 */
export async function getBlogPosts(
  options: GetBlogPostsOptions = {},
): Promise<BlogPost[]> {
  const { limit, excludeCategory, onlyCategory } = options;
  let xml: string;
  try {
    const res = await fetch(RSS_URL, {
      // 24시간마다 백그라운드 자동 갱신. 관리자가 /api/revalidate 누르면 즉시 무효화됨.
      next: { revalidate: 86400 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; koenv-site/1.0)" },
    });
    if (!res.ok) return [];
    xml = await res.text();
  } catch {
    // 네이버 일시 장애 시 빈 목록 — 페이지는 깨지지 않음
    return [];
  }

  let posts: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const post = parseItem(match[1]);
    if (post) posts.push(post);
  }

  if (onlyCategory) {
    posts = posts.filter((p) => p.category === onlyCategory);
  }
  if (excludeCategory) {
    posts = posts.filter((p) => p.category !== excludeCategory);
  }

  posts.sort((a, b) => b.timestamp - a.timestamp);
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}
