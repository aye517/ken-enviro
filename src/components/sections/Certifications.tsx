import { Container } from "../layout/Container";
import { ScrollReveal } from "../ui/ScrollReveal";

const CERTIFICATIONS = [
  {
    title: "측정대행업 등록",
    issuer: "환경부",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "정도관리 인증",
    issuer: "국립환경과학원",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
      </svg>
    ),
  },
  {
    title: "기술인력 보유",
    issuer: "환경측정분석사 · 대기환경기사",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.54 23.54 0 0 0-2.34 6.782c5.03-1.26 10.39-1.26 15.422 0a23.54 23.54 0 0 0-2.34-6.782M6.228 6.326A7.5 7.5 0 0 1 12 3a7.5 7.5 0 0 1 5.772 3.326m-11.544 0A7.5 7.5 0 0 0 4.5 10.5m15-4.174A7.5 7.5 0 0 1 19.5 10.5m-15-4.174A48.105 48.105 0 0 1 12 6c2.592 0 5.142.195 7.623.576" />
      </svg>
    ),
  },
];

export function Certifications() {
  return (
    <section className="py-20 bg-[#EEEEEE]">
      <Container>
        <p className="mb-2 text-center text-sm font-semibold tracking-widest text-[#2F6FED]">
          CERTIFICATIONS
        </p>
        <h2 className="mb-12 text-center text-3xl font-bold text-[#111111] sm:text-4xl">
          인증 및 자격
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 120}>
              <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-xl bg-[#EAF1FF] p-4 text-[#2F6FED]">
                  {cert.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#111111]">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm text-[#4B5563]">{cert.issuer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
