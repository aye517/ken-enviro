"use client";

import { useEffect } from "react";

export type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

interface ToastProps {
  toast: ToastState;
  onClose: () => void;
  /** 자동 닫힘 시간(ms). 기본 4.5초 */
  duration?: number;
}

/**
 * 화면 하단 중앙에 잠깐 떴다 사라지는 토스트.
 * 부모가 `toast` 상태를 쥐고, 메시지를 띄울 때 set, 닫을 때 null 로 둔다.
 */
export function Toast({ toast, onClose, duration = 4500 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [toast, duration, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4"
    >
      <div
        className={`flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-lg ring-1 ring-black/5 ${
          isSuccess ? "bg-[#16A34A]" : "bg-[#DC2626]"
        }`}
      >
        <span aria-hidden="true" className="text-base">
          {isSuccess ? "✓" : "!"}
        </span>
        <span>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="ml-1 text-white/70 transition-colors hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
