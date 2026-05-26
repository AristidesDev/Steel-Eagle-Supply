"use client";

import React from "react";
import { useLocale } from "@/components/layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { CTAButton } from "@/components/shared/CTAButton";

const industryIcons = [
  <svg key="i0" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>,
  <svg key="i1" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.986.63l-2.066 1.033a6 6 0 01-3.986.63l-2.387-.477" /></svg>,
  <svg key="i2" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="i3" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  <svg key="i4" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
];

const extDesc: { en: string; es: string }[] = [
  { en: "Upstream, midstream, and downstream piping materials for drilling, production, pipeline, and refinery operations. We supply API-certified line pipe, high-yield fittings, and pressure-rated flanges built for demanding wellsite and processing environments.", es: "Materiales de tubería upstream, midstream y downstream para operaciones de perforación, producción, ductos y refinería. Suministramos tubería de línea certificada API, conexiones de alto rendimiento y bridas de presión para entornos exigentes." },
  { en: "Corrosion-resistant alloy and stainless steel piping systems for chemical plants, processing units, and specialty installations. Our materials meet the stringent thermal and chemical exposure requirements of modern petrochemical facilities.", es: "Sistemas de tubería de aleación resistente a la corrosión y acero inoxidable para plantas químicas, unidades de procesamiento e instalaciones especializadas que cumplen requisitos de exposición térmica y química." },
  { en: "High-temperature chrome-moly alloy pipe and fittings for boiler systems, steam lines, and heat exchangers in thermal and combined-cycle power stations.", es: "Tubería y conexiones de aleación cromo-molibdeno de alta temperatura para sistemas de calderas, líneas de vapor e intercambiadores de calor en centrales térmicas y de ciclo combinado." },
  { en: "Stainless and coated carbon steel piping for water treatment plants, desalination facilities, and municipal distribution networks. Materials designed for long service life in aggressive water environments.", es: "Tuberías de acero inoxidable y acero al carbono recubierto para plantas de tratamiento de agua, desalinización y redes de distribución municipal, diseñadas para larga vida útil." },
  { en: "Structural and process piping for fabrication shops, skid manufacturers, and EPC contractors. We provide cut-to-length materials, specialty alloys, and project-packaged deliveries that keep production lines moving.", es: "Tuberías estructurales y de proceso para talleres de fabricación, fabricantes de skids y contratistas EPC. Entregamos materiales cortados a medida, aleaciones especiales y entregas empaquetadas por proyecto." },
];

const gradients = [
  "from-orange-600/90 to-red-700/90",
  "from-blue-700/90 to-indigo-800/90",
  "from-amber-600/90 to-yellow-700/90",
  "from-cyan-600/90 to-teal-700/90",
  "from-slate-700/90 to-zinc-800/90",
];

export default function IndustriesPage() {
  const { locale } = useLocale();
  const industries = siteContent.industries.items;

  return (
    <>
      <PageHero
        title={locale === "en" ? "Industries We Serve" : "Industrias que Atendemos"}
        subtitle={locale === "en" ? "Trusted supply for the world's most demanding industrial markets." : "Suministro confiable para los mercados industriales más exigentes del mundo."}
        breadcrumbs={[{ label: "Industries", label_es: "Industrias" }]}
      />

      <SectionWrapper id="industries-list" bg="white">
        <div className="space-y-8">
          {industries.map((ind, i) => (
            <div key={i} className="group grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              {/* Left colored panel */}
              <div className={`bg-gradient-to-br ${gradients[i]} p-8 flex flex-col items-center justify-center text-white min-h-[160px]`}>
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300">{industryIcons[i]}</div>
                <h3 className="text-xl font-bold text-center">{prop(ind, "name", locale)}</h3>
              </div>
              {/* Right description */}
              <div className="p-8 flex items-center bg-white">
                <p className="text-slate-600 leading-relaxed">{locale === "en" ? extDesc[i].en : extDesc[i].es}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="industries-cta" bg="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {locale === "en" ? "Serving Your Industry" : "Sirviendo a Su Industria"}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {locale === "en" ? "No matter your sector, we have the materials and expertise to deliver." : "Sin importar su sector, tenemos los materiales y la experiencia para entregar."}
          </p>
          <CTAButton href="/contact" variant="primary" className="!text-base !px-8 !py-4">
            {locale === "en" ? "Discuss Your Project" : "Discuta Su Proyecto"}
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
