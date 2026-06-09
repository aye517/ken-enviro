/**
 * 네이버 블로그 RSS를 가져와 게시글 목록으로 파싱한다.
 *
 * - 직원은 평소처럼 네이버 블로그(blog.naver.com/ken241021)에 글만 쓰면 됨.
 * - 사이트는 RSS를 1시간마다 자동으로 다시 읽어 최신 글을 반영(ISR). DB·관리자 화면 불필요.
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

/**
 * 네이버 블로그 글 목록을 가져온다.
 * @param limit 가져올 최대 개수 (생략 시 전체)
 */
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  let xml: string;
  try {
    const res = await fetch(RSS_URL, {
      // 1시간마다 백그라운드에서 자동 갱신 (ISR)
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; koenv-site/1.0)" },
    });
    if (!res.ok) return [];
    xml = await res.text();
  } catch {
    // 네이버 일시 장애 시 빈 목록 — 페이지는 깨지지 않음
    return [];
  }

  const posts: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const post = parseItem(match[1]);
    if (post) posts.push(post);
  }

  posts.sort((a, b) => b.timestamp - a.timestamp);
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}
