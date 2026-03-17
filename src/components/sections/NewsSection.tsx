import Image from "next/image";
import { Container } from "../layout/Container";

const NEWS_ITEMS = [
  {
    title: "관공서 보일러 냉온수기 대기자가측정",
    date: "2026.01.06",
    image: "/images/관공서_3.jpg",
  },
  {
    title: "아스콘 시설 특정대기유해물질 측정",
    date: "2026.01.12",
    image: "/images/아스콘_시설2.jpg",
  },
  {
    title: "도장시설 대기자가측정 (THC)",
    date: "2026.01.07",
    image: "/images/도장시설_검사5.jpg",
  },
];

export function NewsSection() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <Container>
        <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
          NEWS
        </p>
        <h2 className="mb-12 text-3xl font-bold text-[#111111] sm:text-4xl">
          최신 뉴스 &amp; 자료
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-[#4B5563]">{item.date}</p>
                <h3 className="mt-2 font-semibold text-[#111111]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
