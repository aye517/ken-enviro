import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getBlogPosts } from "@/lib/naverBlog";

export const metadata: Metadata = {
  title: "뉴스 · 소식 | 한국환경시험원",
  description:
    "한국환경시험원의 측정 현장 사례, 대기환경 법규 안내, 공지사항을 확인하세요.",
  alternates: { canonical: "https://www.koenv.co.kr/news" },
};

const NAVER_BLOG_URL = "https://blog.naver.com/ken241021";

export default async function NewsPage() {
  const posts = await getBlogPosts();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
              NEWS
            </p>
            <h1 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              뉴스 &amp; 소식
            </h1>
            <p className="mt-3 max-w-2xl text-[#4B5563]">
              측정 현장 사례부터 대기환경 법규 안내까지, 한국환경시험원의 소식을
              전해드립니다.
            </p>
          </div>
          <Button href={NAVER_BLOG_URL} variant="outline" size="sm">
            네이버 블로그 바로가기 →
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#F5F5F5] p-12 text-center">
            <p className="text-[#4B5563]">
              소식을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </p>
            <div className="mt-6">
              <Button href={NAVER_BLOG_URL} size="sm">
                네이버 블로그에서 보기
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E5E7EB]">
                  {post.thumbnail ? (
                    // 네이버 썸네일 CDN은 외부 도메인 Referer를 403으로 차단한다.
                    // referrerPolicy="no-referrer" 로 Referer 미전송 → 정상 로딩.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl font-bold text-[#9CA3AF]">
                      KEN
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center gap-2">
                    {post.category && (
                      <span className="rounded-full bg-[#EAF1FE] px-2.5 py-0.5 text-xs font-medium text-[#2F6FED]">
                        {post.category}
                      </span>
                    )}
                    <span className="text-xs text-[#4B5563]">{post.date}</span>
                  </div>
                  <h2 className="line-clamp-2 font-semibold text-[#111111]">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-[#4B5563]">
                    {post.summary}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
