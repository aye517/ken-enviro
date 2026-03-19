import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-pretendard",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://ken-enviro.vercel.app";
const SITE_NAME = "주식회사 한국환경시험원";
const SITE_DESCRIPTION =
  "환경을 측정하고 데이터로 증명합니다. 대기·유해물질·배출가스 측정 전문기관";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 대기자가측정 대행 전문기관`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "대기자가측정",
    "대기오염물질 측정",
    "환경 측정 대행",
    "먼지 측정",
    "SOx 측정",
    "NOx 측정",
    "THC 측정",
    "벤조피렌 측정",
    "배출가스 측정",
    "한국환경시험원",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | 대기자가측정 대행 전문기관`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/logo/ken-logo.png",
        width: 800,
        height: 600,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 대기자가측정 대행 전문기관`,
    description: SITE_DESCRIPTION,
    images: ["/logo/ken-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              url: SITE_URL,
              logo: `${SITE_URL}/logo/ken-logo.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "신내역로 111, 제6층 제611호",
                addressLocality: "중랑구",
                addressRegion: "서울특별시",
                addressCountry: "KR",
              },
              email: "ken241021@naver.com",
              industry: "환경 측정 및 분석",
              sameAs: ["https://blog.naver.com/ken241021"],
            }),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
