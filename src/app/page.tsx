import { Suspense } from "react";
import {
  Hero,
  ServicesOverview,
  WhatWeDo,
  Portfolio,
  Vision,
  Certifications,
  NewsSection,
  CTA,
} from "@/components/sections";
import { RevalidateToast } from "./RevalidateToast";

export default function Home() {
  return (
    <>
      {/* /revalidate 에서 ?refreshed=ok|err 로 돌아왔을 때만 토스트 표시 */}
      <Suspense fallback={null}>
        <RevalidateToast />
      </Suspense>
      <Hero />
      <NewsSection />
      {/* <ServicesOverview /> */}
      <Portfolio />
      <WhatWeDo />
      <Vision />
      <Certifications />
      <CTA />
    </>
  );
}
