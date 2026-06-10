import Link from "next/link";
import { Container } from "../layout/Container";
import { getBlogPosts } from "@/lib/naverBlog";

/** 게시 후 7일 이내면 "N" 뱃지 표시 */
const NEW_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/** 헬퍼로 분리: 컴포넌트 본문에서 Date.now() 직접 호출 시 react-hooks/purity 룰이 막음 */
function isNewPost(timestamp: number): boolean {
  return timestamp > 0 && Date.now() - timestamp < NEW_WINDOW_MS;
}

export async function NewsSection() {
  const posts = await getBlogPosts(3);

  // 네이버 일시 장애 등으로 글을 못 가져오면 섹션 자체를 숨긴다.
  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
              NEWS
            </p>
            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              최신 뉴스 &amp; 소식
            </h2>
          </div>
          <Link
            href="/news"
            className="shrink-0 text-sm font-medium text-[#2F6FED] hover:underline"
          >
            전체보기 →
          </Link>
        </div>

        <ul className="divide-y divide-[#E5E7EB] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
          {posts.map((post) => {
            const isNew = isNewPost(post.timestamp);
            return (
              <li key={post.link}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-[#F5F5F5]"
                >
                  <span className="hidden w-24 shrink-0 text-sm text-[#6B7280] sm:inline">
                    {post.date}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate font-medium text-[#111111]">
                        {post.title}
                      </span>
                      {isNew && (
                        <span
                          aria-label="새 글"
                          className="inline-flex shrink-0 items-center justify-center rounded bg-[#E11D48] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white"
                        >
                          N
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs text-[#6B7280] sm:hidden">
                      {post.date}
                    </span>
                  </span>
                  {post.category && (
                    <span className="hidden shrink-0 rounded-full bg-[#EAF1FE] px-2.5 py-0.5 text-xs font-medium text-[#2F6FED] md:inline-flex">
                      {post.category}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
