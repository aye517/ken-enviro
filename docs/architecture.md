# 전체 아키텍처 구조

## 프로젝트 개요

**한국환경시험원** 기업 웹사이트
대기자가측정 대행 전문기관 홍보 및 문의 접수 사이트

---

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (무료 플랜)
- **폼 처리**: Formspree 또는 EmailJS (서버리스)
- **Blog 연동**: 네이버 블로그 RSS 파싱 또는 수동 데이터 관리

---

## 디렉토리 구조

```
src/
├── app/
│   ├── layout.tsx              # 공통 레이아웃 (헤더, 푸터)
│   ├── page.tsx                # 메인 페이지 (랜딩)
│   ├── services/
│   │   └── page.tsx            # 서비스 상세 페이지 (사업 영역)
│   ├── contact/
│   │   └── page.tsx            # 문의 페이지
│   └── blog/
│       ├── page.tsx            # 블로그 글 목록 (측정 사례)
│       └── [id]/
│           └── page.tsx        # 블로그 글 상세
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 네비게이션 헤더
│   │   └── Footer.tsx          # 푸터 (연락처, 이메일)
│   ├── home/
│   │   ├── HeroSection.tsx     # 메인 히어로 (회사 핵심 메시지)
│   │   ├── ServiceOverview.tsx # 주요 측정 서비스 카드
│   │   ├── MeasurementItems.tsx # 측정 항목 하이라이트 (먼지, SOx, NOx 등)
│   │   ├── CasePreview.tsx     # 최근 측정 사례 미리보기
│   │   └── CTASection.tsx      # 문의 유도 섹션
│   ├── services/
│   │   ├── ServiceCategory.tsx # 측정 카테고리 컴포넌트
│   │   └── ServiceDetail.tsx   # 세부 측정 항목 설명
│   ├── contact/
│   │   └── ContactForm.tsx     # 견적/문의 폼
│   └── blog/
│       ├── BlogCard.tsx        # 측정 사례 카드
│       └── BlogContent.tsx     # 사례 상세 본문
├── lib/
│   ├── blog.ts                 # 블로그 데이터 fetching 로직
│   └── constants.ts            # 측정 항목, 서비스 데이터 상수
├── types/
│   └── index.ts                # 공통 타입 정의
└── assets/
    └── images/                 # 정적 이미지 리소스
```

---

## 페이지 구성 (4페이지)

### 1. 메인 페이지 (`/`)
- 히어로: "대기자가측정 대행 전문기관, 한국환경시험원"
- 주요 측정 서비스 카드 (대기자가측정, 특정대기유해물질, 보일러/냉온수기 등)
- 측정 항목 하이라이트: 먼지, SOx, NOx, THC, 벤조(a)피렌
- 최근 측정 사례 미리보기 (블로그 연동)
- CTA → 문의 페이지 유도

### 2. 서비스 상세 페이지 (`/services`)
- 대기자가측정 대행 상세 설명
- 측정 항목별 구체적 업무 범위
- 대상 시설 유형 (빌딩, 호텔, 공장, 폐기물처리시설 등)
- 관련 법규 및 배출허용기준 안내

### 3. 문의 페이지 (`/contact`)
- 견적/문의 폼
- 연락처: T. 02-6238-0100
- 이메일: ken241021@naver.com

### 4. 블로그/사례 페이지 (`/blog`)
- 네이버 블로그 측정 사례 목록
- 카드형 그리드 (썸네일 + 제목 + 날짜)

---

## 데이터 흐름

```
[네이버 블로그 RSS / 수동 JSON 데이터]
        │
        ▼
  Next.js Server Component (fetch / import)
        │
        ▼
  Blog 목록 & 상세 페이지 렌더링 (SSR/ISR)
```

- 블로그 데이터: RSS 파싱 또는 `lib/blog-data.json`으로 수동 관리
- 문의 폼: 서버 액션 → Formspree/EmailJS로 이메일 발송
- 서비스 정보: `lib/constants.ts`에서 상수 관리

---

## 배포

- **Vercel 무료 플랜**
- GitHub `main` 브랜치 push → 자동 배포
- 추후 커스텀 도메인 연결 가능
