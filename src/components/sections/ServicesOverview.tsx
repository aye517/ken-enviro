import Link from "next/link";
import { Container } from "../layout/Container";
import { ScrollReveal } from "../ui/ScrollReveal";

/**
 * 메인 측정분야 미리보기.
 * /services 페이지의 실제 구조 (3개 항목군 + 총 38종) 를 그대로 압축한 카드 미리보기.
 * 항목 추가/변경이 있으면 /services 와 이 파일 둘 다 업데이트해야 한다.
 */
const ITEM_GROUPS = [
  {
    title: "일반 대기오염물질",
    count: 15,
    samples: ["먼지", "SOx", "NOx", "CO", "THC"],
  },
  {
    title: "특정대기유해물질",
    count: 16,
    samples: ["벤젠", "포름알데히드", "클로로포름", "스티렌"],
  },
  {
    title: "중금속",
    count: 7,
    samples: ["카드뮴", "납", "크롬", "니켈"],
  },
];

const TOTAL = ITEM_GROUPS.reduce((n, g) => n + g.count, 0);

export function ServicesOverview() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
              SERVICES
            </p>
            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              측정분야
            </h2>
            <p className="mt-3 text-base text-[#4B5563]">
              대기배출가스 자가측정 총 {TOTAL}개 항목을 측정·분석합니다.
            </p>
          </div>
          <Link
            href="/services"
            className="group flex shrink-0 items-center gap-2 text-sm font-medium text-[#4B5563] transition-colors hover:text-[#2F6FED]"
          >
            자세히 보기
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ITEM_GROUPS.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 120}>
              <div className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 transition-all hover:-translate-y-1 hover:border-[#2F6FED]/30 hover:shadow-lg">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#111111]">
                    {group.title}
                  </h3>
                  <span className="shrink-0 text-2xl font-bold text-[#2F6FED]">
                    {group.count}
                    <span className="ml-0.5 text-sm font-medium text-[#9CA3AF]">
                      종
                    </span>
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.samples.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#4B5563]"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="px-1 py-1 text-xs font-medium text-[#9CA3AF]">
                    외
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
