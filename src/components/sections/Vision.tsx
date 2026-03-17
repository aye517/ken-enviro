import { Container } from "../layout/Container";

const VISION_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    title: "정확한 데이터",
    description: "공인 장비와 검증된 방법론으로 신뢰할 수 있는 측정 결과를 제공합니다",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "신속한 대응",
    description: "문의부터 보고서 발행까지, 빠르고 체계적인 프로세스를 지향합니다",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
      </svg>
    ),
    title: "지속적 성장",
    description: "환경 규제 변화에 맞춰 측정 역량과 서비스 범위를 꾸준히 확장합니다",
  },
];

export function Vision() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#111111]">
      {/* 배경 장식 */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#2F6FED]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#2F6FED]/5 blur-3xl" />

      <Container>
        <div className="relative z-10">
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
            VISION
          </p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            우리가 나아가는 방향
          </h2>
          <p className="mb-16 max-w-lg text-sm leading-relaxed text-white/50">
            환경 측정의 새로운 기준을 만들어 갑니다
          </p>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
            {VISION_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group bg-[#111111] p-10 transition-colors hover:bg-[#1a1a1a]"
              >
                <div className="mb-6 inline-flex rounded-xl bg-[#2F6FED]/10 p-3 text-[#2F6FED] transition-colors group-hover:bg-[#2F6FED] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50 group-hover:text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
