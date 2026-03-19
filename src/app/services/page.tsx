import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "측정 서비스",
  description:
    "대기환경 측정, 유해물질 분석, 배출가스 평가 등 (주) 한국환경시험원의 측정 서비스를 소개합니다.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    title: "대기환경 측정",
    items: ["먼지 (PM)", "황산화물 (SOx)", "질소산화물 (NOx)"],
  },
  {
    title: "유해물질 분석",
    items: ["벤조[a]피렌 (BaP)", "특정대기유해물질", "중금속 분석"],
  },
  {
    title: "배출가스 평가",
    items: ["총탄화수소 (THC)", "배출가스 성분 분석", "종합 평가 보고서"],
  },
];

const FACILITIES = [
  "호텔 · 숙박시설",
  "공공기관 · 관공서",
  "대학교 · 교육기관",
  "폐기물 처리시설",
  "제조업 (도장 · 아스콘)",
  "자동차 관련 시설",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <Container>
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
            SERVICES
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            측정 서비스
          </h1>
          <p className="mt-4 text-white/60">
            대기 · 유해물질 · 배출가스 측정 전문
          </p>
        </Container>
      </section>

      {/* 서비스 목록 */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {SERVICES.map((service) => (
              <div key={service.title}>
                <h2 className="mb-6 text-xl font-bold text-[#111111]">
                  {service.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-[#4B5563]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F6FED]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 구분선 */}
      <div className="mx-auto max-w-5xl border-t border-[#E5E7EB]" />

      {/* 대상 시설 */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="mb-8 text-xl font-bold text-[#111111]">
            측정 대상 시설
          </h2>
          <div className="flex flex-wrap gap-3">
            {FACILITIES.map((f) => (
              <span
                key={f}
                className="rounded-full bg-[#F5F5F5] px-5 py-2 text-sm text-[#4B5563]"
              >
                {f}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-[#111111]">
                측정 서비스가 필요하신가요?
              </h2>
              <p className="mt-2 text-sm text-[#4B5563]">
                시설 유형과 측정 항목을 알려주시면 맞춤 안내드립니다.
              </p>
            </div>
            <Button href="/contact" size="sm">
              문의하기 &gt;
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
