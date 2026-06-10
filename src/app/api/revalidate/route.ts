import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
/** 매 요청마다 새로 실행되어야 함 — 빌드 시점에 미리 응답을 캐싱하지 않도록 */
export const dynamic = "force-dynamic";

/**
 * 관리자가 네이버 블로그에 새 글을 올린 직후 호출하면 RSS 캐시를 즉시 무효화한다.
 *
 * 사용:  GET /api/revalidate?key=<REVALIDATE_SECRET>
 *
 * 인증은 URL 쿼리 시크릿 하나로 끝낸다(로그인 시스템 없음). 시크릿은 Vercel의
 * 환경변수 `REVALIDATE_SECRET` 으로 설정하고, 관리자에게는 위 URL을 북마크 형태로 전달.
 */
export async function GET(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET 환경변수가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const key = new URL(req.url).searchParams.get("key");
  if (key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 홈/뉴스 페이지의 RSS fetch 캐시를 즉시 만료 → 다음 요청 시 새로 받아온다.
  revalidatePath("/");
  revalidatePath("/news");

  const refreshedAt = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "long",
    timeStyle: "medium",
  }).format(new Date());

  return NextResponse.json({
    ok: true,
    message: "최신 글이 반영되었습니다. 홈 또는 /news 새로고침 시 즉시 확인 가능합니다.",
    refreshedAt,
  });
}
