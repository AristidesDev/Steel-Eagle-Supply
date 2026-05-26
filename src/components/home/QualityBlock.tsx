"use client";

import React from "react";
import { useLocale } from "../layout/LocaleContext";
import { siteContent, t } from "@/lib/content";
import { SectionWrapper } from "../shared/SectionWrapper";
import { SectionHeading } from "../shared/SectionHeading";

const qualityIcons = [
  <svg key="q0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  <svg key="q1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  <svg key="q2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="q3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  <svg key="q4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
];

export function QualityBlock() {
  const { locale } = useLocale();
  const points = siteContent.quality.points;

  const clean = (s: string) => s.replace(/\.$/, "");

  return (
    <SectionWrapper id="quality-block" bg="muted">
      <SectionHeading
        preTitle={locale === "en" ? "Quality & Compliance" : "Calidad y Cumplimiento"}
        title={locale === "en" ? "Standards You Can Trust" : "Estándares en los que Puede Confiar"}
        subtitle={locale === "en" ? "Every order is backed by rigorous quality assurance and full material documentation." : "Cada pedido está respaldado por garantía de calidad rigurosa y documentación completa."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {points.map((pt, i) => (
          <div key={i} className="group flex flex-col items-center text-center bg-white rounded-xl p-6 border border-slate-200/80 hover:shadow-lg hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
              {qualityIcons[i]}
            </div>
            <span className="text-sm font-bold text-primary">{clean(t(pt, locale))}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default QualityBlock;
