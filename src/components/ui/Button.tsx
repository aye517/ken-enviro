import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  className?: string;
  href?: string;
}

export function Button({
  children,
  size = "md",
  variant = "primary",
  className = "",
  href,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors rounded-lg";
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-12 px-8 text-lg",
  };
  const variants = {
    primary: "bg-[#2F6FED] text-white hover:bg-[#1D5BC7]",
    outline: "border border-[#E5E7EB] text-[#111111] hover:bg-[#F5F5F5]",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
