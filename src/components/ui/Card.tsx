import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
