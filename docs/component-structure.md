# 메인 페이지 컴포넌트 구조

## 레이아웃

```
layout.tsx
├── Header (sticky)
└── {children}
    └── Footer
```

## 메인 페이지 섹션 (위→아래)

| 순서 | 컴포넌트 | 설명 |
|------|----------|------|
| 1 | Hero | 슬로건, 보조 설명, CTA |
| 2 | ServicesOverview | SOx/NOx/PM/THC + 3개 서비스 카드 |
| 3 | WhatWeDo | 우리가 하는 일 (측정 항목) |
| 4 | Portfolio | 실제 수행 사례 5~6개 |
| 5 | CustomerTypes | 시설 유형·측정 항목 필터 UI |
| 6 | Stats | 500+, 200+, 10년+ |
| 7 | NewsSection | 최신 뉴스 & 자료 |
| 8 | CTA | 환경 측정이 필요하신가요? |
| 9 | Footer | 저작권, 링크 |

## 컴포넌트 디렉터리

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── WhatWeDo.tsx
│   │   ├── Portfolio.tsx
│   │   ├── CustomerTypes.tsx
│   │   ├── Stats.tsx
│   │   ├── NewsSection.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Card.tsx
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
```

## 디자인 토큰 (globals.css)

- Primary: #111111, #FFFFFF
- Point: #2F6FED, #EAF1FF, #1D5BC7
- Sub: #F5F5F5, #4B5563, #E5E7EB
- Max-width: 1280px
- Section gap: 80~120px
