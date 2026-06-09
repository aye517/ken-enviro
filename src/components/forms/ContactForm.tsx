"use client";

import { useState } from "react";
import { Toast, type ToastState } from "../ui/Toast";

/** 첨부파일 합계 상한 — API(route.ts)의 MAX_ATTACHMENT_BYTES와 동일하게 유지 */
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

export function ContactForm() {
  const [toast, setToast] = useState<ToastState>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    data.set("type", "detailed");

    // 전송 전 첨부 용량 사전 검증 (서버 왕복 전에 빠르게 안내)
    let totalBytes = 0;
    for (const value of data.values()) {
      if (value instanceof File) totalBytes += value.size;
    }
    if (totalBytes > MAX_ATTACHMENT_BYTES) {
      setToast({
        type: "error",
        message: "첨부파일 합계가 4MB를 초과합니다. 파일을 줄여 다시 시도해 주세요.",
      });
      return;
    }

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
        message: "문의가 정상 접수되었습니다. 검토 후 빠르게 연락드리겠습니다.",
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-[#111111]">
              업체명 <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="업체명"
              required
              minLength={1}
              placeholder="(주) 회사명"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#111111]">
              담당자명 <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="담당자명"
              required
              minLength={1}
              placeholder="홍길동"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#111111]">
              연락처 <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="연락처"
              required
              minLength={1}
              placeholder="010-0000-0000"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#111111]">
              견적서 받으실 메일 주소
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="facilities" className="mb-2 block text-sm font-medium text-[#111111]">
            배출시설 개수
          </label>
          <textarea
            id="facilities"
            name="배출시설 개수"
            rows={3}
            placeholder="예) 보일러 0대, 냉온수기 0대 등"
            className="w-full resize-none rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
          />
        </div>

        <div>
          <label htmlFor="items" className="mb-2 block text-sm font-medium text-[#111111]">
            측정항목
          </label>
          <textarea
            id="items"
            name="측정항목"
            rows={3}
            placeholder="예) 먼지, 황산화물, 질소산화물 등"
            className="w-full resize-none rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#111111]">
            기타 문의내용
          </label>
          <textarea
            id="message"
            name="기타 문의내용"
            rows={5}
            placeholder="측정 일정, 추가 요청사항 등을 자유롭게 적어주세요."
            className="w-full resize-none rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#2F6FED]"
          />
        </div>

        <div>
          <label htmlFor="attachment" className="mb-2 block text-sm font-medium text-[#111111]">
            대기배출시설 신고필증 또는 허가서 첨부{" "}
            <span className="font-normal text-[#9CA3AF]">(선택, 합계 최대 4MB)</span>
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            multiple
            accept="image/*,.pdf,.hwp,.doc,.docx,.xls,.xlsx,.zip"
            className="block w-full cursor-pointer rounded-lg border border-[#E5E7EB] text-sm text-[#4B5563] outline-none transition-colors file:mr-4 file:cursor-pointer file:border-0 file:bg-[#F5F5F5] file:px-4 file:py-3 file:text-sm file:font-medium file:text-[#111111] hover:file:bg-[#EAF1FF] focus:border-[#2F6FED]"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 self-start rounded-lg bg-[#2F6FED] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1D5BC7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "전송 중..." : "문의 보내기"}
        </button>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
