"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast, type ToastState } from "@/components/ui/Toast";

/**
 * `/revalidate` 페이지에서 동기화 완료 후 `/?refreshed=ok|err` 로 돌아왔을 때
 * 토스트 한 번 띄우고 URL 의 ?refreshed= 파라미터를 즉시 제거한다.
 *
 * 홈에 mount 돼있으며, ?refreshed 가 없으면 아무 것도 렌더링하지 않는다.
 */
export function RevalidateToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshed = searchParams.get("refreshed");

  // 최초 렌더 시점의 ?refreshed= 값으로 토스트를 한 번만 셋팅한다.
  // useEffect 안에서 setState 하는 패턴은 React 19 set-state-in-effect 룰에 걸리므로
  // useState 초기값으로 처리. 이후 URL 이 비어도 토스트는 상태로 유지됨.
  const [toast, setToast] = useState<ToastState>(() => {
    if (refreshed === "ok") {
      return { type: "success", message: "최신 글이 반영되었습니다." };
    }
    if (refreshed === "err") {
      return {
        type: "error",
        message: "동기화에 실패했습니다. 링크를 다시 확인해 주세요.",
      };
    }
    return null;
  });

  useEffect(() => {
    // ?refreshed=... 흔적 제거 — 새로고침해도 토스트가 다시 뜨지 않도록
    if (refreshed) router.replace("/", { scroll: false });
  }, [refreshed, router]);

  return <Toast toast={toast} onClose={() => setToast(null)} />;
}
