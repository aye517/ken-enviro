"use client";

import Link from "next/link";
import { useState } from "react";
import { Toast, type ToastState } from "../ui/Toast";

export function QuickInquiryForm() {
  const [toast, setToast] = useState<ToastState>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    data.set("type", "quick");

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", { method: "POST", body: data });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "전송에 실패했습니다.");
      }
      formEl.reset();
      setToast({
        type: "success",
        message: "문의가 접수되었습니다. 빠르게 연락드릴게요!",
      });
    } catch (err) {
      setToast({
        type: "error",
        message:
          err instanceof Error ? err.message : "전송 중 오류가 발생했습니다.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="hero-name"
              className="mb-1.5 block text-sm font-semibold text-white"
            >
              담당자 / 업체명 <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              id="hero-name"
              name="name"
              required
              placeholder="홍길동 / (주)회사명"
              className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-base text-[#111111] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/40"
            />
          </div>
          <div>
            <label
              htmlFor="hero-phone"
              className="mb-1.5 block text-sm font-semibold text-white"
            >
              연락처 <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="tel"
              id="hero-phone"
              name="phone"
              required
              placeholder="010-0000-0000"
              className="w-full rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-base text-[#111111] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/40"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="hero-message"
            className="mb-1.5 block text-sm font-semibold text-white"
          >
            문의 내용
          </label>
          <textarea
            id="hero-message"
            name="message"
            rows={2}
            placeholder="예) 배출가스 측정 견적 문의드려요"
            className="w-full resize-none rounded-lg border border-white/30 bg-white/95 px-4 py-2.5 text-base text-[#111111] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/40"
          />
        </div>
        <div className="mt-1 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#2F6FED] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#1D5BC7] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {submitting ? "전송 중..." : "보내기"}
          </button>
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/40 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:px-8"
          >
            자세히 문의
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
