import { Container } from "../layout/Container";
import { ScrollReveal } from "../ui/ScrollReveal";
import { getBlogPosts, PORTFOLIO_CATEGORY } from "@/lib/naverBlog";

export async function Portfolio() {
  // 네이버 블로그 "대표사례" 게시판 글을 최신 12개까지 가져옴.
  // 관리자가 블로그에서 글 추가/삭제만 하면 자동 반영 (24시간 캐시, /revalidate 로 즉시 갱신).
  const posts = await getBlogPosts({
    onlyCategory: PORTFOLIO_CATEGORY,
    limit: 12,
  });

  // "대표사례" 게시판이 비어 있으면 섹션 자체를 숨김
  if (posts.length === 0) return null;

  // 개수에 맞춰 빈칸 없이 꽉 차는 모자이크(벤토) 그리드를 만든다.
  // 데스크톱 4열 그리드를 기준으로, 일부 카드를 가로(2칸)·세로(2칸)로 변형해 셀을 정확히 채운다.
  // dense 자동배치는 순서를 흐트러뜨리므로, 개수별로 "빈칸 0" 이 검증된 배치 패턴을 직접 지정한다.
  //   o = 1칸,  W = 가로 2칸(col-span-2),  T = 세로 2칸(row-span-2)   ※ 변형은 lg 이상에서만
  const N = posts.length;
  const C = N >= 4 ? 4 : N; // 데스크톱 열 수 (1~3개면 그 수만큼, 4개 이상은 4열 고정)

  const o = "";
  const W = "lg:col-span-2";
  const T = "lg:row-span-2";
  // 4·8·12 개(및 1~3개)는 4열로 딱 떨어져 변형 없이 균일. 그 외에는 세로/가로 변형으로 채움.
  const TEMPLATES: Record<number, string[]> = {
    5: [T, W, o, W, o],
    6: [T, W, o, o, o, o],
    7: [T, o, o, o, o, o, o],
    9: [T, W, o, T, o, o, o, o, o],
    10: [T, o, o, T, o, o, o, o, o, o],
    11: [T, o, o, o, o, o, o, o, o, o, o],
  };
  const spans = TEMPLATES[N] ?? Array<string>(N).fill(o);

  // Tailwind 는 완성된 클래스 문자열만 인식하므로 열 수 클래스를 미리 매핑한다.
  const colsClass =
    C === 1
      ? "sm:grid-cols-1 lg:grid-cols-1"
      : C === 2
        ? "sm:grid-cols-2 lg:grid-cols-2"
        : C === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
            PORTFOLIO
          </p>
          <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
            대표 사례
          </h2>
        </div>

        <div className={`grid auto-rows-[14rem] grid-cols-2 gap-6 ${colsClass}`}>
          {posts.map((post, i) => (
            <ScrollReveal
              key={post.link}
              delay={i * 100}
              className={`h-full ${spans[i]}`}
            >
              <div className="group relative block h-full overflow-hidden rounded-2xl">
                {post.thumbnail ? (
                  // 네이버 썸네일 CDN은 외부 도메인 Referer를 403으로 차단한다.
                  // referrerPolicy="no-referrer" 로 Referer 미전송 → 정상 로딩.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#E5E7EB] text-3xl font-bold text-[#9CA3AF]">
                    KEN
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="line-clamp-2 text-lg font-semibold text-white">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-1 line-clamp-2 text-sm text-white/80">
                      {post.summary}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
