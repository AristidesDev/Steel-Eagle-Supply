"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function ResourcesPage() {
  const { locale } = useLocale();
  const resources = siteContent.resources;

  return (
    <>
      <PageHero
        title={prop(resources, "title", locale)}
        subtitle={prop(resources, "description", locale)}
        breadcrumbs={[{ label: "Resources", label_es: "Recursos" }]}
      />

      {/* FAQ Accordion */}
      <SectionWrapper id="resources-faq" bg="white">
        <SectionHeading
          preTitle={locale === "en" ? "FAQ" : "Preguntas Frecuentes"}
          title={locale === "en" ? "Frequently Asked Questions" : "Preguntas Frecuentes"}
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {resources.faqs.map((faq, i) => (
            <FAQAccordionItem key={i} faq={faq} locale={locale} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Technical Guides */}
      <SectionWrapper id="resources-guides" bg="muted">
        <SectionHeading
          preTitle={locale === "en" ? "Downloads" : "Descargas"}
          title={locale === "en" ? "Technical Guides & Charts" : "Guías y Tablas Técnicas"}
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {resources.guides.map((guide, i) => (
            <div key={i} className="group flex items-center gap-5 bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-lg hover:border-secondary/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              {/* File icon */}
              <div className="w-14 h-14 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-bold text-primary mb-1">{prop(guide, "title", locale)}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-semibold uppercase tracking-wider">{guide.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{guide.fileSize}</span>
                </div>
              </div>
              {/* Download button */}
              <button className="flex-shrink-0 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-secondary hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {locale === "en" ? "Download" : "Descargar"}
              </button>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

/* FAQ Accordion Item */
function FAQAccordionItem({ faq, locale, index }: { faq: any; locale: "en" | "es"; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white hover:border-secondary/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-base font-bold text-primary pr-4">{prop(faq, "question", locale)}</span>
        <svg className={`w-5 h-5 text-secondary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {prop(faq, "answer", locale)}
        </div>
      </div>
    </div>
  );
}
