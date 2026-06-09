import Link from "next/link";
import { Container } from "../layout/Container";
import { getBlogPosts } from "@/lib/naverBlog";

export async function NewsSection() {
  const posts = await getBlogPosts(3);

  // 네이버 일시 장애 등으로 글을 못 가져오면 섹션 자체를 숨긴다.
  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <Container>
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
              NEWS
            </p>
            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              최신 뉴스 &amp; 자료
            </h2>
          </div>
          <Link
            href="/news"
            className="shrink-0 text-sm font-medium text-[#2F6FED] hover:underline"
          >
            전체보기 →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
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
              <div className="p-6">
                <p className="text-xs text-[#4B5563]">{post.date}</p>
                <h3 className="mt-2 line-clamp-2 font-semibold text-[#111111]">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
