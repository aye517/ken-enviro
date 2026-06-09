import Link from "next/link";
import { Container } from "./Container";

const FOOTER_LINKS = [
  { label: "회사소개", href: "/about" },
  { label: "측정분야", href: "/services" },
  { label: "블로그", href: "https://blog.naver.com/ken241021" },
  { label: "문의하기", href: "/contact" },
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
