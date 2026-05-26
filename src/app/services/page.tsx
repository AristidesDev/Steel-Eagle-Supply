"use client";

import React from "react";
import { useLocale } from "@/components/layout/LocaleContext";
import { siteContent, t } from "@/lib/content";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";

const serviceIcons = [
  <svg key="s0" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>,
  <svg key="s1" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  <svg key="s2" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg key="s3" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  <svg key="s4" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="s5" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
];

const extDesc: { en: string; es: string }[] = [
  { en: "Precision pipe cutting to length with clean, square ends for field-ready installation. We handle small-quantity custom cuts and high-volume production runs.", es: "Corte de precisión de tubería a medida con extremos limpios y cuadrados para instalación directa. Manejamos cortes personalizados de pequeñas cantidades y producciones de alto volumen." },
  { en: "Permanent stenciling and color-coding for heat numbers, grade identification, and project-specific marking per client or international standards.", es: "Estarcido permanente y código de colores para números de colada, identificación de grado y marcado específico del proyecto según normas del cliente o internacionales." },
  { en: "Protective coatings including FBE, 3LPE, internal lining, and rust-prevention treatments to ensure durability during transit and in service.", es: "Recubrimientos protectores incluyendo FBE, 3LPE, revestimiento interno y tratamientos anticorrosivos para asegurar durabilidad en tránsito y en servicio." },
  { en: "Sea-worthy export crating, pipe end protection, bundle strapping, and custom palletizing. Packaging designed to survive ocean freight and rough handling.", es: "Embalaje de exportación apto para transporte marítimo, protección de extremos, flejado de paquetes y paletizado personalizado. Diseñado para soportar flete marítimo." },
  { en: "Complete shipping coordination including freight forwarding, customs documentation, Bill of Lading management, and door-to-site delivery arrangements.", es: "Coordinación completa de envíos incluyendo agente de carga, documentación aduanera, gestión de conocimientos de embarque y entregas puerta a sitio." },
  { en: "Third-party inspection coordination, dimensional verification, hydrostatic testing support, and material certification review before shipment.", es: "Coordinación de inspección de terceros, verificación dimensional, soporte de pruebas hidrostáticas y revisión de certificación de materiales antes del envío." },
];

export default function ServicesPage() {
  const { locale } = useLocale();
  const items = siteContent.services.items;
  const clean = (s: string) => s.replace(/\.$/, "");

  return (
    <>
      <PageHero
        title={locale === "en" ? "Value-Added Services" : "Servicios de Valor Agregado"}
        subtitle={locale === "en" ? "We go beyond material supply with project-ready services that reduce your total cost and accelerate schedules." : "Vamos más allá del suministro de materiales con servicios listos para proyectos que reducen costos y aceleran cronogramas."}
        breadcrumbs={[{ label: "Services", label_es: "Servicios" }]}
      />

      <SectionWrapper id="services-list" bg="white">
        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start p-6 md:p-8 rounded-xl border border-slate-200/80 bg-white hover:shadow-lg hover:border-secondary/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-16 h-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-300 flex-shrink-0">
                {serviceIcons[i]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{clean(t(item, locale))}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{locale === "en" ? extDesc[i].en : extDesc[i].es}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="services-cta" bg="muted">
        <div className="text-center">
          <SectionHeading
            title={locale === "en" ? "Need a Custom Service Package?" : "¿Necesita un Paquete de Servicios Personalizado?"}
            subtitle={locale === "en" ? "We tailor our services to match your project requirements." : "Adaptamos nuestros servicios a los requerimientos de su proyecto."}
          />
          <CTAButton href="/contact" variant="primary">
            {locale === "en" ? "Get in Touch" : "Contáctenos"}
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
