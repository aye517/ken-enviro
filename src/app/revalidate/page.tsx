import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

/**
 * 관리자 친화 동기화 페이지.
 *
 * 사용:  /revalidate?key=<REVALIDATE_SECRET>
 *
 * 흐름:
 *   1. URL 의 key 를 서버에서 REVALIDATE_SECRET 과 대조
 *   2. 일치하면 "동기화하시겠습니까?" 확인 카드 표시
 *   3. [확인] 누르면 서버 액션이 revalidatePath 호출 후 / 로 리다이렉트
 *   4. [취소] 는 그냥 / 로 이동
 *
 * 직접 JSON 보이는 /api/revalidate 보다 친절. /api/revalidate 는 스크립트·모니터링용으로 유지.
 */
export const metadata: Metadata = {
  // 검색 엔진에 노출되지 않도록 — URL 이 곧 비밀번호이므로 색인되면 위험
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** 서버 액션: 폼 제출 시 키를 다시 검증하고 캐시 무효화 + 홈으로 리다이렉트 */
async function syncAction(formData: FormData) {
  "use server";
  const secret = process.env.REVALIDATE_SECRET;
  const key = formData.get("key");
  // 직접 폼 POST 우회 시 방어 — 키가 다르면 실패 토스트와 함께 홈으로 보낸다
  if (!secret || typeof key !== "string" || key !== secret) {
    redirect("/?refreshed=err");
  }
  revalidatePath("/");
  revalidatePath("/news");
  redirect("/?refreshed=ok");
}

export default async function RevalidatePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const secret = process.env.REVALIDATE_SECRET;
  const authorized = Boolean(secret && key && key === secret);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#F5F5F5] py-16">
      <Container>
        <div className="mx-auto max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          {authorized ? (
            <>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF1FE]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-[#2F6FED]"
                  aria-hidden
                >
                  <path d="M21 12a9 9 0 11-3.95-7.46" />
                  <path d="M21 4v5h-5" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-[#111111]">
                네이버 블로그 동기화
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                새로 올린 글을 홈페이지에 즉시 반영합니다.
                <br />
                완료 후 홈으로 자동 이동합니다.
              </p>
              <form
                action={syncAction}
                className="mt-7 flex items-center justify-center gap-3"
              >
                <input type="hidden" name="key" value={key} />
                <Link
                  href="/"
                  className="rounded-full border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-medium text-[#4B5563] transition-colors hover:border-[#9CA3AF]"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="rounded-full bg-[#2F6FED] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E5BD6]"
                >
                  확인
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-[#E11D48]"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-[#111111]">
                잘못된 접근입니다
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                관리자에게 전달된 정확한 링크로 접근해 주세요.
              </p>
              <Link
                href="/"
                className="mt-7 inline-block rounded-full bg-[#2F6FED] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E5BD6]"
              >
                홈으로
              </Link>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
