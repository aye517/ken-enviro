import Image from "next/image";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] bg-[#111111]">
      <Image
        src="/images/hero.webp"
        alt="배경 이미지"
        fill
        className="object-cover opacity-40"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#111111]/60" />

      <div className="relative z-10 flex min-h-[70vh] items-center">
        <Container>
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold tracking-widest text-[#2F6FED]">
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
                서비스 보기
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
