import { Container } from "../layout/Container";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "문의 · 상담",
    description: "시설 현황과 측정 필요 항목을 파악합니다",
  },
  {
    step: "02",
    title: "현장 방문",
    description: "배출구 및 측정 포인트를 사전 조사합니다",
  },
  {
    step: "03",
    title: "정밀 측정",
    description: "공인 장비로 대기오염물질을 측정합니다",
  },
  {
    step: "04",
    title: "보고서 발행",
    description: "법적 기준에 맞는 측정 결과를 전달합니다",
  },
];

export function WhatWeDo() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <Container>
        <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
          PROCESS
        </p>
        <h2 className="mb-16 text-3xl font-bold text-[#111111] sm:text-4xl">
          측정은 이렇게 진행됩니다
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="group relative rounded-2xl bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-5xl font-bold text-[#E5E7EB] transition-colors group-hover:text-[#2F6FED]">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#111111]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
