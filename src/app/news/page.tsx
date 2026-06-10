import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getBlogPosts, PORTFOLIO_CATEGORY } from "@/lib/naverBlog";
import { listDocuments } from "@/lib/documents";
import { NewsListClient } from "./NewsListClient";

export const metadata: Metadata = {
  title: "소식 · 자료실 | 한국환경시험원",
  description:
    "한국환경시험원의 측정 현장 사례, 대기환경 법규 안내, 공지사항을 확인하세요.",
  alternates: { canonical: "https://www.koenv.co.kr/news" },
};

const NAVER_BLOG_URL = "https://blog.naver.com/ken241021";

/**
 * Portfolio 등 외부 섹션에서 `/news?category=대기자가측정` 또는 `/news?q=THC` 형태로
 * 들어오면 카테고리 칩을 미리 선택하거나 검색창에 미리 채워서 필터된 결과를 보여준다.
 */
export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; view?: string }>;
}) {
  const { q, category, view } = await searchParams;
  // 블로그 RSS 와 자료실 파일 목록을 병렬로 가져온다.
  const [posts, documents] = await Promise.all([
    getBlogPosts({ excludeCategory: PORTFOLIO_CATEGORY }),
    listDocuments(),
  ]);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
              NEWS
            </p>
            <h1 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              소식 &amp; 자료실
            </h1>
            <p className="mt-3 max-w-2xl text-[#4B5563]">
              측정 현장 사례부터 대기환경 법규 안내까지, 한국환경시험원의 소식과
              자료를 전해드립니다.
            </p>
          </div>
          <Button href={NAVER_BLOG_URL} variant="outline" size="sm">
            네이버 블로그 바로가기 →
          </Button>
        </div>

        {posts.length === 0 && documents.length === 0 ? (
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
          <NewsListClient
            posts={posts}
            documents={documents}
            initialQuery={q ?? ""}
            initialCategory={category ?? null}
            initialView={view === "documents" ? "documents" : "news"}
          />
        )}
      </Container>
    </section>
  );
}
