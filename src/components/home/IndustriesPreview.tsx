"use client";

import React from "react";
import { useLocale } from "../layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { SectionWrapper } from "../shared/SectionWrapper";
import { SectionHeading } from "../shared/SectionHeading";

const industryIcons = [
  <svg key="i0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>,
  <svg key="i1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.986.63l-2.066 1.033a6 6 0 01-3.986.63l-2.387-.477a2 2 0 01-1.594-1.96V6.966a2 2 0 012.23-1.986l.08.016a6 6 0 003.986-.63l2.066-1.033a6 6 0 013.986-.63l2.387.477a2 2 0 011.594 1.96v8.232a2 2 0 01-2.23 1.986" /></svg>,
  <svg key="i2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="i3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  <svg key="i4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
];

const bgColors = [
  "from-orange-500/10 to-red-500/10",
  "from-blue-500/10 to-indigo-500/10",
  "from-yellow-500/10 to-amber-500/10",
  "from-cyan-500/10 to-teal-500/10",
  "from-slate-500/10 to-zinc-500/10",
];

export function IndustriesPreview() {
  const { locale } = useLocale();
  const industries = siteContent.industries.items;

  return (
    <SectionWrapper id="industries-preview" bg="gradient">
      <SectionHeading
        preTitle={locale === "en" ? "Industries We Serve" : "Industrias que Atendemos"}
        title={locale === "en" ? "Critical Sector Expertise" : "Experiencia en Sectores Críticos"}
        subtitle={locale === "en" ? "Trusted supply for the world's most demanding industrial markets." : "Suministro confiable para los mercados industriales más exigentes del mundo."}
        light
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {industries.map((ind, i) => (
          <div key={i} className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 animate-slide-up overflow-hidden" style={{ animationDelay: `${i * 80}ms` }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                {industryIcons[i]}
              </div>
              <span className="text-sm font-bold text-white/90 leading-tight">{prop(ind, "name", locale)}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default IndustriesPreview;
