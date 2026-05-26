"use client";

import React from "react";
import { useLocale } from "../layout/LocaleContext";
import { siteContent, t } from "@/lib/content";
import { SectionWrapper } from "../shared/SectionWrapper";
import { SectionHeading } from "../shared/SectionHeading";
import { CTAButton } from "../shared/CTAButton";

const serviceIcons = [
  <svg key="s0" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>,
  <svg key="s1" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  <svg key="s2" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg key="s3" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  <svg key="s4" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="s5" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
];

export function ServicesPreview() {
  const { locale } = useLocale();
  const items = siteContent.services.items;
  const clean = (s: string) => s.replace(/\.$/, "");

  return (
    <SectionWrapper id="services-preview" bg="white">
      <SectionHeading
        preTitle={locale === "en" ? "Value-Added Services" : "Servicios de Valor Agregado"}
        title={locale === "en" ? "Beyond Material Supply" : "Más Allá del Suministro"}
        subtitle={locale === "en" ? "We support our clients through every stage of the supply chain." : "Apoyamos a nuestros clientes en cada etapa de la cadena de suministro."}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {items.map((item, i) => (
          <div key={i} className="group flex flex-col items-center text-center p-5 rounded-xl bg-slate-50 border border-transparent hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
              {serviceIcons[i]}
            </div>
            <span className="text-sm font-bold text-primary group-hover:text-secondary transition-colors duration-300">{clean(t(item, locale))}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 animate-fade-in">
        <CTAButton href="/services" variant="outline">
          {locale === "en" ? "All Services" : "Todos los Servicios"}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}

export default ServicesPreview;
