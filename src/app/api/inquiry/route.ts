import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/** 발신자 — 도메인 인증 후 noreply@koenv.co.kr 권장. 미설정 시 Resend 테스트 발신자 사용 */
const FROM = process.env.INQUIRY_FROM ?? "한국환경시험원 <onboarding@resend.dev>";
/** 수신자 — 문의가 도착할 메일함 */
const TO = process.env.INQUIRY_TO ?? "ken241021@naver.com";

/**
 * 첨부파일 합계 상한. Vercel 서버리스 함수의 요청 본문 한도(~4.5MB)를 고려해 보수적으로 4MB로 둠.
 * Vercel이 아닌 호스트라면 이 값을 올려도 됨.
 */
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

/** 폼 종류별 메일 제목 */
const SUBJECTS: Record<string, string> = {
  quick: "[홈페이지] 빠른 문의",
  detailed: "[홈페이지] 견적/측정 문의",
};

/** 영문/축약 필드명을 보기 좋은 한글 라벨로 매핑 (없으면 필드명 그대로 사용) */
const LABELS: Record<string, string> = {
  name: "담당자/업체명",
  phone: "연락처",
  message: "문의 내용",
  email: "이메일",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "메일 발송 설정이 누락되었습니다. 관리자에게 문의해 주세요." },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const type = String(form.get("type") ?? "detailed");
  const subject = SUBJECTS[type] ?? SUBJECTS.detailed;

  const rows: [string, string][] = [];
  const attachments: { filename: string; content: Buffer }[] = [];
  let totalBytes = 0;

  for (const [key, value] of form.entries()) {
    // 메타 필드(type, _로 시작) 제외
    if (key === "type" || key.startsWith("_")) continue;

    if (value instanceof File) {
      if (value.size === 0) continue; // 첨부 안 함
      totalBytes += value.size;
      if (totalBytes > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: "첨부파일 용량이 너무 큽니다. 합계 4MB 이하로 첨부해 주세요." },
          { status: 413 }
        );
      }
      const buffer = Buffer.from(await value.arrayBuffer());
      attachments.push({ filename: value.name, content: buffer });
    } else {
      const text = String(value).trim();
      if (text) rows.push([LABELS[key] ?? key, text]);
    }
  }

  if (rows.length === 0 && attachments.length === 0) {
    return NextResponse.json({ error: "내용이 비어 있습니다." }, { status: 400 });
  }

  const kst = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  // 고객이 이메일을 남겼으면 회신 주소로 설정 → 받은 메일에서 바로 '답장' 가능
  const customerEmail = String(form.get("email") ?? "").trim();
  const replyTo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customerEmail)
    ? customerEmail
    : undefined;

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr>` +
        `<td style="padding:10px 14px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:600;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:10px 14px;border:1px solid #e5e7eb;white-space:pre-wrap;color:#111">${escapeHtml(v)}</td>` +
        `</tr>`
    )
    .join("");

  const html =
    `<div style="font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#111;max-width:680px;margin:0 auto">` +
    `<h2 style="margin:0 0 4px;font-size:18px">${escapeHtml(subject)}</h2>` +
    `<p style="margin:0 0 16px;color:#6b7280;font-size:13px">제출시각: ${escapeHtml(kst)} (KST)</p>` +
    `<table style="border-collapse:collapse;width:100%;font-size:14px">${tableRows}</table>` +
    (attachments.length
      ? `<p style="margin:16px 0 0;color:#6b7280;font-size:13px">📎 첨부파일 ${attachments.length}건이 함께 전송되었습니다.</p>`
      : "") +
    `<p style="margin:24px 0 0;color:#9ca3af;font-size:12px">www.koenv.co.kr 홈페이지 문의 폼을 통해 자동 발송된 메일입니다.</p>` +
    `</div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      replyTo,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("[inquiry] resend error:", error);
      return NextResponse.json(
        { error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[inquiry] send exception:", err);
    return NextResponse.json(
      { error: "메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
