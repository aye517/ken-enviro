import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/Container";
import { ScrollReveal } from "../ui/ScrollReveal";

const PORTFOLIO_IMAGES = [
  { src: "/images/도장시설_검사5.jpg", alt: "도장시설 측정", place: "하남 차량 서비스센터", summary: "도장시설 THC 측정", href: "https://blog.naver.com/ken241021/224137918805" },
  { src: "/images/26년1월_보일러.jpg", alt: "보일러 측정", place: "종로 호텔", summary: "대기오염 3종 측정", href: "https://blog.naver.com/ken241021/224194654991" },
  { src: "/images/관공서_1.jpg", alt: "관공서 측정", place: "국립박물관", summary: "공공시설 환경관리", href: "https://blog.naver.com/ken241021/224173295812" },
  { src: "/images/아스콘_시설2.jpg", alt: "아스콘 시설 측정", place: "폐기물 처리시설", summary: "먼지 측정", href: "https://blog.naver.com/ken241021/224159939419" },
  { src: "/images/벤조피렌_1.jpg", alt: "벤조피렌 분석", place: "대학교", summary: "보일러 배출가스 검사", href: "https://blog.naver.com/ken241021/224152497567" },
  { src: "/images/관공서_3.jpg", alt: "공공기관 측정", place: "아스콘/레미콘 시설", summary: "특정대기유해물질 측정", href: "https://blog.naver.com/ken241021/224143651414" },
];

/** "더보기" — /news 페이지에서 "대기자가측정" 카테고리 칩이 미리 선택된 상태로 진입 */
const MORE_HREF = "/news?category=대기자가측정";

export function Portfolio() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
              PORTFOLIO
            </p>
            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              실제 수행 사례
            </h2>
          </div>
          <Link
            href={MORE_HREF}
            className="group flex items-center gap-2 text-sm font-medium text-[#4B5563] transition-colors hover:text-[#2F6FED]"
          >
            더보기
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_IMAGES.map((img, i) => (
            <ScrollReveal key={img.src} delay={i * 100}>
              <Link
                href={img.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-64 overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-lg font-semibold text-white">
                    {img.place}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{img.summary}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
