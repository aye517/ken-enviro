import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "대기오염물질 측정 및 분석 전문기관, (주) 한국환경시험원을 소개합니다.",
  alternates: { canonical: "/about" },
};

const COMPANY_INFO = [
  { label: "회사명", value: "(주) 한국환경시험원" },
  { label: "대표자", value: "이동빈" },
  { label: "설립일", value: "2024년 10월 17일" },
  { label: "산업분류", value: "물질성분 검사 및 분석업 (M72911)" },
  { label: "주소", value: "서울 중랑구 신내역로 111, 제6층 제611호 (신내동, 신내에스케이브이1센터)" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <Container>
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
            ABOUT US
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            회사소개
          </h1>
          <p className="mt-4 text-white/60">
            환경을 측정하고 데이터로 증명합니다
          </p>
        </Container>
      </section>

      {/* 소개 */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-2xl">
            <h2 className="mb-6 text-xl font-bold text-[#111111]">
              (주) 한국환경시험원
            </h2>
            <p className="leading-relaxed text-[#4B5563]">
              (주) 한국환경시험원은 대기오염물질 측정 및 분석을 전문으로 하는
              환경 측정 대행 기관입니다. 먼지, 황산화물(SOx), 질소산화물(NOx),
              총탄화수소(THC), 벤조[a]피렌 등 다양한 대기오염물질을
              정밀 측정하며, 호텔·공공기관·제조업·교육기관 등
              다양한 시설의 환경 관리를 지원하고 있습니다.
            </p>
            <p className="mt-4 leading-relaxed text-[#4B5563]">
              공인된 장비와 검증된 방법론을 기반으로 정확한 데이터를 제공하고,
              법적 기준에 부합하는 측정 보고서를 발행합니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 구분선 */}
      <div className="mx-auto max-w-5xl border-t border-[#E5E7EB]" />

      {/* 기업 정보 */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="mb-8 text-xl font-bold text-[#111111]">기업 정보</h2>
          <div className="max-w-2xl">
            {COMPANY_INFO.map((item) => (
              <div
                key={item.label}
                className="flex border-b border-[#E5E7EB] py-4 last:border-0"
              >
                <span className="w-28 shrink-0 text-sm font-semibold text-[#111111]">
                  {item.label}
                </span>
                <span className="text-sm text-[#4B5563]">{item.value}</span>
              </div>
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
                환경 측정이 필요하신가요?
              </h2>
              <p className="mt-2 text-sm text-[#4B5563]">
                편하게 문의해 주세요. 신속하게 답변 드리겠습니다.
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
