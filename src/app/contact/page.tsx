import { Container } from "@/components/layout/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "(주) 한국환경시험원 | 문의하기",
  description:
    "환경 측정 문의, 견적 요청 등 (주) 한국환경시험원에 문의해 주세요.",
};

const CONTACT_INFO = [
  { label: "주소", value: "서울 중랑구 신내역로 111, 제6층 제611호 (신내동, 신내에스케이브이1센터)" },
  { label: "이메일", value: "ken241021@naver.com" },
  { label: "블로그", value: "blog.naver.com/ken241021" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <Container>
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
            CONTACT
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            문의하기
          </h1>
          <p className="mt-4 text-white/60">
            환경 측정이 필요하시면 편하게 연락해 주세요
          </p>
        </Container>
      </section>

      {/* 폼 + 연락처 */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-16 lg:grid-cols-5">
            {/* 폼 */}
            <div className="lg:col-span-3">
              <h2 className="mb-8 text-xl font-bold text-[#111111]">
                문의 양식
              </h2>
              <form
                action="https://formspree.io/f/xpqyozgg"
                method="POST"
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#111111]">
                      이름 / 담당자명
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="홍길동"
                      className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-[#111111]">
                      회사 / 시설명
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="(주) 회사명"
                      className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#111111]">
                      이메일
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@email.com"
                      className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#111111]">
                      연락처
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="010-0000-0000"
                      className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-[#111111]">
                    관심 서비스
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
                  >
                    <option value="">선택해 주세요</option>
                    <option value="대기환경 측정">대기환경 측정 (먼지·SOx·NOx)</option>
                    <option value="유해물질 분석">유해물질 분석 (벤조[a]피렌 등)</option>
                    <option value="배출가스 평가">배출가스 평가 (THC 등)</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#111111]">
                    문의 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="측정이 필요한 시설 정보, 측정 항목, 일정 등을 알려주세요."
                    className="w-full resize-none rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 self-start rounded-lg bg-[#2F6FED] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1D5BC7]"
                >
                  문의 보내기
                </button>
              </form>
            </div>

            {/* 연락처 */}
            <div className="lg:col-span-2">
              <h2 className="mb-8 text-xl font-bold text-[#111111]">연락처</h2>
              <div className="flex flex-col">
                {CONTACT_INFO.map((info) => (
                  <div
                    key={info.label}
                    className="flex border-b border-[#E5E7EB] py-4 last:border-0"
                  >
                    <span className="w-16 shrink-0 text-sm font-semibold text-[#111111]">
                      {info.label}
                    </span>
                    <span className="text-sm text-[#4B5563]">{info.value}</span>
                  </div>
                ))}
              </div>

              {/* 지도 */}
              <div className="mt-8 overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.1!2d127.0945!3d37.6125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z7ISc7Jq4IOykkeuekeq1rCDsi6DrgrTsl63roZwgMTEx!5e0!3m2!1sko!2skr!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="(주) 한국환경시험원 위치"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
