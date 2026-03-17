"use client";

import { useState } from "react";
import { Container } from "../layout/Container";

const FACILITY_TYPES = [
  "호텔 / 숙박시설",
  "공공기관",
  "대학교 / 학교",
  "폐기물 처리시설",
  "제조업 (도장, 아스콘)",
  "자동차 관련 시설",
];

const MEASUREMENT_TYPES = [
  "먼지",
  "SOx / NOx",
  "THC",
  "특정대기유해물질 (벤조[a]피렌 등)",
];

type FilterType = "facility" | "measurement";

export function CustomerTypes() {
  const [filterBy, setFilterBy] = useState<FilterType>("facility");

  const items =
    filterBy === "facility" ? FACILITY_TYPES : MEASUREMENT_TYPES;

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <Container>
        <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
          CLIENTS
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-[#111111] sm:text-3xl">
          고객사 유형
        </h2>
        <p className="mb-10 text-sm text-[#4B5563]">
          시설 유형별 · 측정 항목별로 확인하세요
        </p>

        {/* 필터 탭 */}
        <div className="mb-8 flex gap-3">
          {([
            { key: "facility", label: "시설 유형별" },
            { key: "measurement", label: "측정 항목별" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterBy(tab.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filterBy === tab.key
                  ? "bg-[#2F6FED] text-white shadow-md"
                  : "bg-white text-[#111111] hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 리스트 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="font-medium text-[#111111]">{item}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
