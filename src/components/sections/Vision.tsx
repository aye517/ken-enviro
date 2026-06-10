import { Container } from "../layout/Container";

const VISION_ITEMS = [
  {
    title: "정확한 데이터",
    description:
      "공인 장비와 검증된 방법론으로 신뢰할 수 있는 측정 결과를 제공합니다",
  },
  {
    title: "신속한 대응",
    description:
      "문의부터 보고서 발행까지, 빠르고 체계적인 프로세스를 지향합니다",
  },
  {
    title: "지속적 성장",
    description:
      "환경 규제 변화에 맞춰 측정 역량과 서비스 범위를 꾸준히 확장합니다",
  },
];

export function Vision() {
  return (
    <section className="relative overflow-hidden py-20 bg-[#111111]">
      {/* 배경 장식 — 깊이감 살리는 블루 블러 */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#2F6FED]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#2F6FED]/5 blur-3xl" />

      <Container>
        <div className="relative z-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* 좌측: 슬로건 매니페스토 */}
          <div>
            <p className="mb-5 text-sm font-semibold tracking-widest text-[#2F6FED]">
              VISION
            </p>
            <h2 className="break-keep text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              정확한 측정으로
              <br />
              <span className="text-[#2F6FED]">신뢰</span>를
              <br />
              만들어 갑니다.
            </h2>
          </div>

          {/* 우측: 숫자형 가치 목록 — 카드 아닌 텍스트 리스트로 무게감만 살림 */}
          <div className="flex flex-col gap-10 lg:pt-4">
            {VISION_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="border-l-2 border-[#2F6FED]/40 pl-6"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-[#2F6FED]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
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
