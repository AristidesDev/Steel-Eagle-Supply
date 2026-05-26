"use client";

import React from "react";
import { useLocale } from "@/components/layout/LocaleContext";
import { siteContent, t } from "@/lib/content";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";

const qualityIcons = [
  <svg key="q0" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  <svg key="q1" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  <svg key="q2" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="q3" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  <svg key="q4" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
];

const extDesc: { en: string; es: string }[] = [
  { en: "Every item we ship is fully traceable. Heat numbers, lot numbers, and mill certifications (MTRs) are maintained from source to delivery, enabling complete accountability for critical and code-regulated applications.", es: "Cada artículo que enviamos es totalmente rastreable. Números de colada, números de lote y certificaciones de fábrica (MTRs) se mantienen desde el origen hasta la entrega, permitiendo rendición de cuentas completa para aplicaciones críticas." },
  { en: "We provide comprehensive paperwork including mill test reports (MTRs), certificates of conformance, material data sheets, and inspection reports. Documentation packages are assembled per project or client specifications.", es: "Proporcionamos documentación integral incluyendo reportes de prueba de fábrica (MTRs), certificados de conformidad, fichas técnicas e informes de inspección. Los paquetes de documentación se arman según especificaciones del proyecto o cliente." },
  { en: "Before any shipment leaves our facility, orders undergo thorough verification: dimensional checks, grade confirmation, quantity reconciliation, and packaging inspection to ensure zero-defect delivery.", es: "Antes de que cualquier envío salga de nuestras instalaciones, los pedidos se someten a verificación exhaustiva: verificación dimensional, confirmación de grado, reconciliación de cantidades e inspección de embalaje para garantizar entrega sin defectos." },
  { en: "Materials are organized, labeled, and packaged by project, heat, or lot — minimizing field sorting time and ensuring that what arrives on-site is ready for immediate installation.", es: "Los materiales se organizan, etiquetan y embalan por proyecto, colada o lote — minimizando el tiempo de clasificación en campo y asegurando que lo que llega al sitio esté listo para instalación inmediata." },
  { en: "Real-time tracking, proactive shipment notifications, and dedicated logistics coordination ensure you always know where your materials are and when they will arrive.", es: "Rastreo en tiempo real, notificaciones proactivas de envío y coordinación logística dedicada aseguran que siempre sepa dónde están sus materiales y cuándo llegarán." },
];

const standards = ["ASTM", "ASME", "API", "ANSI", "MSS", "DIN/EN", "ISO 9001"];

export default function QualityPage() {
  const { locale } = useLocale();
  const points = siteContent.quality.points;
  const clean = (s: string) => s.replace(/\.$/, "");

  return (
    <>
      <PageHero
        title={locale === "en" ? "Quality & Compliance" : "Calidad y Cumplimiento"}
        subtitle={locale === "en" ? "Our commitment to quality ensures every order meets the highest international standards." : "Nuestro compromiso con la calidad asegura que cada pedido cumpla los más altos estándares internacionales."}
        breadcrumbs={[{ label: "Quality & Compliance", label_es: "Calidad y Cumplimiento" }]}
      />

      <SectionWrapper id="quality-points" bg="white">
        <SectionHeading
          preTitle={locale === "en" ? "Our Quality Pillars" : "Nuestros Pilares de Calidad"}
          title={locale === "en" ? "Built-In Quality at Every Step" : "Calidad Integrada en Cada Paso"}
        />
        <div className="space-y-6">
          {points.map((pt, i) => (
            <div key={i} className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 p-6 md:p-8 rounded-xl border border-slate-200/80 bg-white hover:shadow-lg hover:border-accent/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-16 h-16 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                {qualityIcons[i]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{clean(t(pt, locale))}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{locale === "en" ? extDesc[i].en : extDesc[i].es}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Standards badges */}
      <SectionWrapper id="quality-standards" bg="muted">
        <SectionHeading
          preTitle={locale === "en" ? "Compliance" : "Cumplimiento"}
          title={locale === "en" ? "International Standards" : "Estándares Internacionales"}
          subtitle={locale === "en" ? "All materials comply with recognized international codes and specifications." : "Todos los materiales cumplen con códigos y especificaciones internacionales reconocidos."}
        />
        <div className="flex flex-wrap justify-center gap-4">
          {standards.map((std, i) => (
            <div key={i} className="px-6 py-4 rounded-xl bg-white border border-slate-200/80 text-primary font-bold text-lg tracking-wide hover:shadow-lg hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              {std}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="quality-cta" bg="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {locale === "en" ? "Quality You Can Verify" : "Calidad que Puede Verificar"}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {locale === "en" ? "Request documentation samples or discuss your project's quality requirements with our team." : "Solicite muestras de documentación o discuta los requisitos de calidad de su proyecto con nuestro equipo."}
          </p>
          <CTAButton href="/contact" variant="primary" className="!text-base !px-8 !py-4">
            {locale === "en" ? "Talk to Our Quality Team" : "Hable con Nuestro Equipo de Calidad"}
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
