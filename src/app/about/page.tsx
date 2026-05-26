"use client";

import React from "react";
import { useLocale } from "@/components/layout/LocaleContext";
import { siteContent, t } from "@/lib/content";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";

const values = [
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title_en: "Quality Commitment", title_es: "Compromiso con la Calidad",
    desc_en: "Every product we supply is backed by full material traceability, mill test reports, and rigorous quality controls meeting ASTM, ASME, and API standards.",
    desc_es: "Cada producto que suministramos está respaldado por trazabilidad completa, reportes de prueba de fábrica y controles de calidad rigurosos según normas ASTM, ASME y API.",
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title_en: "Global Reach", title_es: "Alcance Global",
    desc_en: "From Houston to Latin America and beyond, our logistics infrastructure supports international delivery with sea-worthy packaging and full export documentation.",
    desc_es: "Desde Houston hasta Latinoamérica y más allá, nuestra infraestructura logística soporta entregas internacionales con embalaje marítimo y documentación de exportación completa.",
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title_en: "Customer-Centric", title_es: "Centrado en el Cliente",
    desc_en: "We work alongside procurement teams and project managers to provide fast quotes, accurate specs, and flexible scheduling that matches real-world timelines.",
    desc_es: "Trabajamos junto a equipos de compras y gerentes de proyecto para proporcionar cotizaciones rápidas, especificaciones precisas y programación flexible.",
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    title_en: "Industry Experience", title_es: "Experiencia Industrial",
    desc_en: "Our team brings deep knowledge of oil & gas, petrochemical, power generation, water infrastructure, and industrial fabrication sectors.",
    desc_es: "Nuestro equipo aporta un profundo conocimiento de los sectores de petróleo y gas, petroquímica, generación de energía, infraestructura hídrica y fabricación industrial.",
  },
];

export default function AboutPage() {
  const { locale } = useLocale();
  const snippet = siteContent.home.aboutSnippet;

  return (
    <>
      <PageHero
        title={locale === "en" ? "About Steel Eagle Supply" : "Acerca de Steel Eagle Supply"}
        subtitle={t(snippet, locale)}
        breadcrumbs={[{ label: "About Us", label_es: "Nosotros" }]}
      />

      {/* Mission */}
      <SectionWrapper id="about-mission" bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              preTitle={locale === "en" ? "Our Mission" : "Nuestra Misión"}
              title={locale === "en" ? "Powering Critical Infrastructure" : "Impulsando Infraestructura Crítica"}
              align="left"
            />
            <div className="space-y-4 text-slate-600 leading-relaxed -mt-8">
              <p>
                {locale === "en"
                  ? "Steel Eagle Supply was founded to bridge the gap between manufacturers and the contractors, engineers, and operators who depend on reliable industrial materials. We understand that in high-stakes projects, every fitting, flange, and length of pipe matters."
                  : "Steel Eagle Supply fue fundada para cerrar la brecha entre fabricantes y los contratistas, ingenieros y operadores que dependen de materiales industriales confiables. Entendemos que en proyectos de alta exigencia, cada conexión, brida y metro de tubería importa."}
              </p>
              <p>
                {locale === "en"
                  ? "Our supply chain is designed around responsiveness. We maintain strategic inventory positions, cultivate direct mill relationships, and invest in logistics capabilities that let us serve projects from the Gulf Coast to Latin America and beyond."
                  : "Nuestra cadena de suministro está diseñada para la capacidad de respuesta. Mantenemos posiciones estratégicas de inventario, cultivamos relaciones directas con los fabricantes e invertimos en capacidades logísticas que nos permiten servir proyectos desde la Costa del Golfo hasta Latinoamérica y más allá."}
              </p>
            </div>
          </div>
          {/* Right — decorative industrial visual */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-slate-950 p-10 min-h-[320px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
            <div className="absolute top-1/4 left-10 w-60 h-60 bg-secondary/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/15 rounded-full blur-[60px]" />
            <div className="relative z-10 text-center">
              <span className="text-6xl font-extrabold text-white/10 tracking-tight">SES</span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                {locale === "en" ? "Industrial Supply Excellence" : "Excelencia en Suministro Industrial"}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper id="about-values" bg="muted">
        <SectionHeading
          preTitle={locale === "en" ? "Why Choose Us" : "Por Qué Elegirnos"}
          title={locale === "en" ? "Core Values & Strengths" : "Valores y Fortalezas Fundamentales"}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={i} className="group bg-white rounded-xl border border-slate-200/80 p-8 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-14 h-14 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-5 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{locale === "en" ? v.title_en : v.title_es}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{locale === "en" ? v.desc_en : v.desc_es}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper id="about-cta" bg="gradient">
        <div className="text-center">
          <SectionHeading
            title={locale === "en" ? "Ready to Work With Us?" : "¿Listo para Trabajar con Nosotros?"}
            subtitle={locale === "en" ? "Let us show you how our supply chain expertise can support your next project." : "Permítanos mostrarle cómo nuestra experiencia en cadena de suministro puede apoyar su próximo proyecto."}
            light
          />
          <CTAButton href="/contact" variant="primary" className="!text-base !px-8 !py-4">
            {locale === "en" ? "Contact Our Team" : "Contacte a Nuestro Equipo"}
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
