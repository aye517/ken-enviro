import Link from "next/link";
import { Container } from "./Container";

const FOOTER_LINKS = [
  { label: "회사소개", href: "/about" },
  { label: "서비스", href: "/services" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-[#4B5563]">
            © 2024 (주) 한국환경시험원, All Rights Reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#4B5563] transition-colors hover:text-[#2F6FED]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
