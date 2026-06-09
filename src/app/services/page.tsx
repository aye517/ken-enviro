import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "측정분야",
  description:
    "먼지·황산화물·질소산화물부터 특정대기유해물질·중금속까지, (주) 한국환경시험원의 대기배출가스 자가측정 항목을 안내합니다.",
  alternates: { canonical: "/services" },
};

// 자주 측정하는 대표 항목
const KEY_ITEMS = [
  { name: "먼지", abbr: "PM" },
  { name: "황산화물", abbr: "SOx" },
  { name: "질소산화물", abbr: "NOx" },
  { name: "일산화탄소", abbr: "CO" },
  { name: "총탄화수소", abbr: "THC" },
];

// 전체 측정 가능 항목 (대기배출가스 자가측정)
const ITEM_GROUPS = [
  {
    title: "일반 대기오염물질",
    items: [
      "먼지",
      "매연",
      "황산화물(SOx)",
      "질소산화물(NOx)",
      "일산화탄소(CO)",
      "총탄화수소(THC)",
      "염화수소",
      "암모니아",
      "황화수소",
      "이황화탄소",
      "염소",
      "시안화수소",
      "불소화합물",
      "브롬화합물",
      "페놀화합물",
    ],
  },
  {
    title: "특정대기유해물질 (유기화합물)",
    items: [
      "벤젠",
      "스티렌",
      "에틸벤젠",
      "포름알데히드",
      "아세트알데히드",
      "아크롤레인",
      "아크릴로니트릴",
      "디클로로메탄",
      "클로로포름",
      "사염화탄소",
      "트리클로로에틸렌",
      "테트라클로로에틸렌",
      "1,2-디클로로에탄",
      "1,3-부타디엔",
      "염화비닐",
      "아닐린",
      "다환방향족탄화수소류(벤조[a]피렌)",
    ],
  },
  {
    title: "중금속",
    items: ["카드뮴", "납", "구리", "니켈", "아연", "베릴륨"],
  },
];

const TOTAL_ITEMS = ITEM_GROUPS.reduce((n, g) => n + g.items.length, 0);

const FACILITIES = [
  "호텔 · 숙박시설",
  "공공기관 · 관공서",
  "대학교 · 교육기관",
  "병원 · 의료시설",
  "아파트 · 공동주택",
  "보일러 · 냉온수기",
  "폐기물 처리 · 소각시설",
  "도장 · 건조시설",
  "아스콘 · 레미콘",
  "자동차 관련 시설",
  "제조 · 생산시설",
  "물류 · 창고시설",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <Container>
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
            MEASUREMENT
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            측정분야
          </h1>
          <p className="mt-4 text-white/60">
            대기배출가스 자가측정 항목 · 총 {TOTAL_ITEMS}종
          </p>
        </Container>
      </section>

      {/* 자주 측정하는 대표 항목 */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="mb-2 text-xl font-bold text-[#111111]">
            자주 측정하는 항목
          </h2>
          <p className="mb-8 text-base text-[#4B5563]">
            대기배출시설에서 가장 많이 측정하는 핵심 항목입니다.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {KEY_ITEMS.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-[#2F6FED]/30 hover:shadow-lg"
              >
                <p className="text-3xl font-bold text-[#2F6FED]">{item.abbr}</p>
                <p className="mt-2 text-base font-medium text-[#111111]">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 구분선 */}
      <div className="mx-auto max-w-5xl border-t border-[#E5E7EB]" />

      {/* 전체 측정 가능 항목 */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="mb-2 text-xl font-bold text-[#111111]">
            전체 측정 가능 항목
          </h2>
          <p className="mb-10 text-base text-[#4B5563]">
            먼지·산화물부터 특정대기유해물질·중금속까지 {TOTAL_ITEMS}개 항목을
            측정·분석합니다.
          </p>
          <div className="flex flex-col gap-10">
            {ITEM_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#111111]">
                  <span className="h-5 w-1 rounded-full bg-[#2F6FED]" />
                  {group.title}
                  <span className="text-sm font-normal text-[#9CA3AF]">
                    {group.items.length}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-5 py-2 text-base text-[#374151]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
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
          <h2 className="mb-2 text-xl font-bold text-[#111111]">
            측정 대상 시설
          </h2>
          <p className="mb-8 text-base text-[#4B5563]">
            아래는 대표 사례이며, 보일러·냉온수기 등 대기배출시설이 있는 곳이라면
            업종에 관계없이 측정 가능합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            {FACILITIES.map((f) => (
              <span
                key={f}
                className="rounded-full bg-[#F5F5F5] px-5 py-2 text-base text-[#4B5563]"
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
                측정이 필요하신가요?
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
