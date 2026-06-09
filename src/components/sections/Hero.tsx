import Image from "next/image";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { QuickInquiryForm } from "../forms/QuickInquiryForm";

/** 측정 항목 */
const MEASUREMENT_LABELS = [
  "먼지 (Dust)",
  "황산화물 (SOx)",
  "질소산화물 (NOx)",
  "일산화탄소 (CO)",
  "총탄화수소 (THC)",
  "다환방향족탄화수소류 (벤조a피렌)",
  "휘발성유기화합물 (VOCs)",
  "무기물질류",
  "중금속류",
];

export function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#111111]">
      <Image
        src="/images/hero.webp"
        alt="배경 이미지"
        fill
        className="object-cover opacity-40"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#111111]/60" />

      <div className="relative z-10 flex min-h-[80vh] items-center pb-28 pt-20">
        <Container>
          <div className="grid items-center gap-24 lg:gap-12 lg:grid-cols-2">
            {/* 좌측 카피 */}
            <div className="max-w-2xl">
              <p className="mb-4 text-lg font-bold tracking-wide text-[#2F6FED] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:text-xl">
                (주) 한국환경시험원
              </p>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                환경을{" "}
                <span className="text-[#2F6FED]">측정하고</span>
                <br />
                데이터로 증명합니다
              </h1>
              <p className="mt-6 text-lg text-white/70">
                대기 | 유해물질 | 배출가스 측정 환경기초
              </p>
              <div className="mt-8">
                <Button href="/services" size="sm">
                  측정분야 보기
                </Button>
              </div>
            </div>

            {/* 우측 빠른 문의 (고대비 · 큰 글씨) */}
            <div className="w-full lg:max-w-md lg:justify-self-end">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold tracking-widest text-[#2F6FED]">
                    QUICK INQUIRY
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white">빠른 문의</h2>
                </div>

                {/* 전화 문의 — 누르면 바로 전화 */}
                <a
                  href="tel:0262380100"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0 text-[#5B97FF]"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="text-base font-bold text-white sm:text-lg">
                    02-6238-0100
                  </span>
                </a>
              </div>
              <p className="mt-2 text-base text-white/70">
                전화 또는 연락처를 남겨주시면 빠르게 연락드립니다
              </p>

              <QuickInquiryForm />
            </div>
          </div>
        </Container>
      </div>

      {/* 측정 항목 마키 — Hero 하단에 반투명으로 흐름 */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-white/15 bg-white/5 py-4 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }, (_, setIdx) =>
            MEASUREMENT_LABELS.map((label, i) => (
              <span
                key={`${setIdx}-${i}`}
                className="mx-6 shrink-0 cursor-default text-base font-bold text-white/70 transition-colors hover:text-white sm:mx-10 sm:text-xl"
              >
                {label}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
