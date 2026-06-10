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

export default function Home() {
  return (
    <>
      <Hero />
      <NewsSection />
      <ServicesOverview />
      <WhatWeDo />
      <Portfolio />
      <Vision />
      <Certifications />
      <CTA />
    </>
  );
}
