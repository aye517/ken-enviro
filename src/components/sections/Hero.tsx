import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/Container";

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
          <div className="max-w-3xl">
            <h1 className="break-keep text-4xl font-extrabold leading-tight tracking-tight text-[#2F6FED] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              (주) 한국환경시험원
              <span className="align-baseline text-3xl text-white sm:text-4xl lg:text-5xl">
                은
              </span>
            </h1>
            <p className="mt-2 break-keep text-3xl font-bold leading-snug text-white/95 sm:text-4xl lg:text-5xl">
              환경을 측정하고
              <br />
              데이터로 증명합니다
            </p>
            <p className="mt-5 text-base text-white/70 sm:text-lg">
              대기자가측정 | 특정대기유해물질
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2F6FED] px-6 text-base font-medium text-white transition-colors hover:bg-[#1D5BC7]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                문의 남기기
              </Link>
              <a
                href="tel:0262380100"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                02-6238-0100
              </a>
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
