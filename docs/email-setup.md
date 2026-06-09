# 문의 폼 메일 발송 설정 (Resend)

홈페이지의 **빠른 문의**(Hero)와 **상세 문의**(/contact) 폼은 모두
`POST /api/inquiry` 라우트를 통해 **Resend**로 메일을 발송합니다.
([src/app/api/inquiry/route.ts](../src/app/api/inquiry/route.ts))

- 메일에 **한국시간(KST)** 으로 제출시각이 표시됩니다.
- 페이지 이동 없이 **토스트**로 접수 결과를 보여줍니다.
- 상세 문의의 **첨부파일**은 메일에 그대로 첨부됩니다. (합계 최대 4MB — Vercel 서버리스 본문 한도 고려)
- 고객이 이메일을 남기면 받은 메일에서 바로 **답장(Reply)** 가능하도록 reply-to가 설정됩니다.

## 1. Resend 가입 & API 키 발급

1. https://resend.com 가입
2. **API Keys** → **Create API Key** → 값 복사 (`re_...`)

## 2. (권장) 도메인 인증

발신자를 `noreply@koenv.co.kr` 로 보내려면 도메인 인증이 필요합니다.

1. Resend → **Domains** → **Add Domain** → `koenv.co.kr` 입력
2. 안내되는 DNS 레코드(SPF/DKIM 등)를 도메인 DNS에 추가
3. 인증 완료되면 `INQUIRY_FROM` 에 `한국환경시험원 <noreply@koenv.co.kr>` 사용

> 인증 전에는 `INQUIRY_FROM` 을 비워두세요. 기본값 `onboarding@resend.dev` 로 발송됩니다.
> (단, 테스트 발신자는 발송이 제한될 수 있으니 운영 전 도메인 인증을 권장)

## 3. 환경변수 등록

### 로컬 개발

프로젝트 루트의 `.env.local` 채우기:

```
RESEND_API_KEY=re_xxxxxxxx
INQUIRY_FROM=한국환경시험원 <noreply@koenv.co.kr>
INQUIRY_TO=ken241021@naver.com
```

### 운영 (Vercel)

Vercel 프로젝트 → **Settings → Environment Variables** 에 위 3개를 동일하게 등록 후 **재배포**.

## 4. 동작 확인

1. `npm run dev` → http://localhost:3000
2. 빠른 문의 / 상세 문의 제출 → 토스트 확인
3. `INQUIRY_TO` 메일함에서 수신 확인 (제목: `[홈페이지] 빠른 문의` / `[홈페이지] 견적/측정 문의`)
