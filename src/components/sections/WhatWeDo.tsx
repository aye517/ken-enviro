"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Container } from "../layout/Container";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "문의 · 상담",
    description: "배출시설 현황과 대상 측정항목 파악 및 견적 발송",
  },
  {
    step: "02",
    title: "측정일정 확정",
    description: "고객사와의 협의를 통한 측정일정 확정",
  },
  {
    step: "03",
    title: "시료채취 및 분석",
    description: "사업장 방문 시료채취 후 시료분석",
  },
  {
    step: "04",
    title: "성적서 발행",
    description: "대기자가측정 성적서 발행 및 측정분석수수료 입금",
  },
];

function ProcessCard({
  step,
  title,
  description,
  isLast,
}: (typeof PROCESS_STEPS)[number] & { isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const MQL = "(max-width: 1023px)";
  const subscribe = useCallback((cb: () => void) => {
    const mql = window.matchMedia(MQL);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  }, []);
  const getSnapshot = useCallback(() => window.matchMedia(MQL).matches, []);
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: "-35% 0px -25% 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const highlight = isMobile && inView;

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        className="text-5xl font-bold text-[#E5E7EB] transition-colors duration-500 group-hover:text-[#2F6FED]"
        style={highlight ? { color: "#2F6FED" } : undefined}
      >
        {step}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-[#111111]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
        {description}
      </p>

      {!isLast && (
        <span
          aria-hidden
          className="absolute -right-[1.75rem] top-1/2 z-10 hidden -translate-y-1/2 text-[#93B4F5] transition-colors group-hover:text-[#2F6FED] lg:block"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </div>
  );
}

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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item, i) => (
            <ProcessCard
              key={item.step}
              {...item}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
