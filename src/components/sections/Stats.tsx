import Link from "next/link";
import { Container } from "../layout/Container";

const STATS = [
  { value: "500+", label: "측정 수량" },
  { value: "200+", label: "협력 기업" },
  { value: "10년+", label: "경험" },
];

export function Stats() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
          ACHIEVEMENTS
        </p>
        <h2 className="mb-12 text-2xl font-semibold text-[#111111] sm:text-3xl">
          신뢰할 수 있는 숫자
        </h2>
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div className="grid w-full grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl bg-[#F5F5F5] p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-4xl font-bold text-[#111111] transition-colors group-hover:text-[#2F6FED] sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[#4B5563]">{stat.label}</p>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="shrink-0 text-sm font-medium text-[#2F6FED] transition-colors hover:text-[#1D5BC7]"
          >
            자세히 보러가기 →
          </Link>
        </div>
      </Container>
    </section>
  );
}
