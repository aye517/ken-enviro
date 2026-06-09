import { Container } from "../layout/Container";
import { ScrollReveal } from "../ui/ScrollReveal";

const SERVICE_CARDS = [
  {
    title: "대기환경 측정",
    description: "정확하고 신뢰할 수 있는 대기 오염도 측정",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15z" />
      </svg>
    ),
  },
  {
    title: "유해물질 분석",
    description: "엄격한 기준에 따른 유해물질 분석 및 검증",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.703 4.258A1.125 1.125 0 0 0 4.34 20.25h15.32a1.125 1.125 0 0 0 1.044-1.492L19 14.5m-14 0h14" />
      </svg>
    ),
  },
  {
    title: "배출가스 평가",
    description: "정밀한 배출가스 성분 측정 및 종합 평가",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5z" />
      </svg>
    ),
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 bg-white">
      <Container>
        {/* 서비스 카드 */}
        <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
          SERVICES
        </p>
        <h2 className="mb-12 text-3xl font-bold text-[#111111] sm:text-4xl">
          핵심 측정 서비스
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {SERVICE_CARDS.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 120}>
              <div className="group rounded-2xl border border-[#E5E7EB] bg-white p-8 transition-all hover:-translate-y-1 hover:border-[#2F6FED]/30 hover:shadow-lg">
                <div className="mb-6 inline-flex rounded-xl bg-[#EAF1FF] p-4 text-[#2F6FED] transition-colors group-hover:bg-[#2F6FED] group-hover:text-white">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#111111]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
