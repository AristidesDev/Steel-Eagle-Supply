"use client";

import React from "react";
import { useLocale } from "../layout/LocaleContext";
import { siteContent, t } from "@/lib/content";
import { SectionWrapper } from "../shared/SectionWrapper";
import { SectionHeading } from "../shared/SectionHeading";
import { CTAButton } from "../shared/CTAButton";

export function AboutSnippet() {
  const { locale } = useLocale();
  const snippet = siteContent.home.aboutSnippet;
  const aboutText = t(snippet, locale);

  const stats = [
    {
      value: "6+",
      label_en: "Product Categories",
      label_es: "Categorías de Producto",
    },
    {
      value: "5",
      label_en: "Industries Served",
      label_es: "Industrias Atendidas",
    },
    {
      value: "100%",
      label_en: "Material Traceability",
      label_es: "Trazabilidad del Material",
    },
    {
      value: "24/7",
      label_en: "Logistics Support",
      label_es: "Soporte Logístico",
    },
  ];

  return (
    <SectionWrapper id="about-snippet" bg="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Text */}
        <div className="animate-slide-up">
          <SectionHeading
            preTitle={locale === "en" ? "Who We Are" : "Quiénes Somos"}
            title={locale === "en" ? "Built for Industrial Reliability" : "Construidos para la Confiabilidad Industrial"}
            align="left"
          />
          <p className="text-slate-600 text-lg leading-relaxed mb-8 -mt-6">
            {aboutText}
          </p>
          <CTAButton href="/about" variant="secondary">
            {locale === "en" ? "Learn More About Us" : "Conozca Más Sobre Nosotros"}
          </CTAButton>
        </div>

        {/* Right — Stats Grid */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 rounded-xl p-6 text-center hover:shadow-lg hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="block text-3xl md:text-4xl font-extrabold text-secondary mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {locale === "en" ? stat.label_en : stat.label_es}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default AboutSnippet;
