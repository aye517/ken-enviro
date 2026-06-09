"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Container } from "./Container";
import { Button } from "../ui/Button";

const NAV_ITEMS = [
  { label: "회사소개", href: "/about", external: false },
  { label: "측정분야", href: "/services", external: false },
  { label: "블로그", href: "https://blog.naver.com/ken241021", external: true },
  { label: "문의하기", href: "/contact", external: false },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow">
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative h-14 w-48 overflow-hidden">
              <Image
                src="/logo/ken-logo.png"
                alt="(주) 한국환경시험원"
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-[13px] font-medium tracking-wide text-[#4B5563] transition-colors hover:text-[#2F6FED]"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" size="sm">
              문의하기
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <span
              className={`h-0.5 w-6 bg-[#111111] transition-transform ${
                mobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-[#111111] transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-[#111111] transition-transform ${
                mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E5E7EB] py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm font-medium text-[#111111]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
