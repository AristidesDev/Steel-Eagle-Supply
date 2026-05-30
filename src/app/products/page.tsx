"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "@/components/layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { CTAButton } from "@/components/shared/CTAButton";

const productIcons: React.ReactNode[] = [
  <svg key="p0" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /><circle cx="4" cy="6" r="1.5" fill="currentColor" /><circle cx="4" cy="12" r="1.5" fill="currentColor" /><circle cx="4" cy="18" r="1.5" fill="currentColor" /></svg>,
  <svg key="p1" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  <svg key="p2" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.986.63l-2.066 1.033a6 6 0 01-3.986.63l-2.387-.477M14 4l-2 8 6-4-4-4z" /></svg>,
  <svg key="p3" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg key="p4" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={1.5} /><circle cx="12" cy="12" r="4" strokeWidth={1.5} /><circle cx="12" cy="4" r="1" fill="currentColor" /><circle cx="12" cy="20" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="20" cy="12" r="1" fill="currentColor" /></svg>,
  <svg key="p5" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15V9m-3 3h6m-9 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 16v-2" /></svg>,
];

/* Extended descriptions for each product category on its dedicated page */
const extDesc: { en: string; es: string }[] = [
  { en: "Available in seamless and welded forms across a broad range of sizes, wall thicknesses, and grades (A106, A53, API 5L). Suitable for structural, pressure, and process piping in energy, refining, and general industry.", es: "Disponible en formas sin costura y soldada en una amplia gama de tamaños, espesores de pared y grados (A106, A53, API 5L). Apto para tuberías estructurales, de presión y de proceso en energía, refinación e industria general." },
  { en: "Chrome-moly alloy pipe (P5, P9, P11, P22, P91) engineered for high-temperature service in boiler systems, heat exchangers, and refinery process units. Full material test reports available.", es: "Tubería de aleación cromo-molibdeno (P5, P9, P11, P22, P91) diseñada para servicio de alta temperatura en sistemas de calderas, intercambiadores de calor y unidades de proceso de refinería." },
  { en: "304/304L, 316/316L, duplex, and super duplex stainless steel pipe for corrosive environments, offshore, chemical, and food-grade applications.", es: "Tubería de acero inoxidable 304/304L, 316/316L, dúplex y super dúplex para entornos corrosivos, offshore, químicos y grado alimenticio." },
  { en: "Butt-weld, socket-weld, and threaded fittings in carbon, alloy, and stainless steel. Elbows, tees, reducers, caps, and specialty configurations per ASME B16.9 and B16.11.", es: "Conexiones a tope, socket-weld y roscadas en acero al carbono, aleación e inoxidable. Codos, tees, reductores, tapas y configuraciones especiales según ASME B16.9 y B16.11." },
  { en: "Weld-neck, slip-on, blind, socket-weld, lap-joint, and threaded flanges in pressure classes 150–2500. Available in carbon, alloy, and stainless steel per ASME B16.5 and B16.47.", es: "Bridas weld-neck, slip-on, ciegas, socket-weld, lap-joint y roscadas en clases de presión 150–2500. Disponibles en acero al carbono, aleación e inoxidable según ASME B16.5 y B16.47." },
  { en: "Gate, globe, check, ball, and butterfly valves for isolation and flow regulation. Sourced from leading manufacturers with full pressure and temperature certification.", es: "Válvulas de compuerta, globo, retención, bola y mariposa para aislamiento y regulación de flujo. De fabricantes líderes con certificación completa de presión y temperatura." },
];

/* Product category images mapped by index */
const productImages = [
  "/images/products/carbon-steel.webp",
  "/images/products/alloy-pipe.webp",
  "/images/products/stainless-steel.webp",
  "/images/products/fittings.webp",
  "/images/products/flanges.webp",
  "/images/products/valve.webp",
];

const productImageAlts = [
  { en: "Carbon steel pipes stacked", es: "Tuberías de acero al carbono apiladas" },
  { en: "Alloy steel pipes in factory", es: "Tuberías de aleación en fábrica" },
  { en: "Stainless steel pipes with markings", es: "Tuberías de acero inoxidable con marcajes" },
  { en: "Steel pipe fittings - elbow, tee, reducer", es: "Conexiones de tubería - codo, tee, reductor" },
  { en: "Precision machined steel flanges", es: "Bridas de acero mecanizadas con precisión" },
  { en: "Industrial gate valve", es: "Válvula de compuerta industrial" },
];

export default function ProductsPage() {
  const { locale } = useLocale();
  const categories = siteContent.products.categories;

  return (
    <>
      <PageHero
        title={locale === "en" ? "Products" : "Productos"}
        subtitle={locale === "en" ? "Explore pipe, fittings, flanges, valves, and industrial materials from Steel Eagle Supply." : "Explore tuberías, conexiones, bridas, válvulas y materiales industriales de Steel Eagle Supply."}
        breadcrumbs={[{ label: "Products", label_es: "Productos" }]}
        backgroundImage="/images/hero/products-hero.webp"
        backgroundAlt="Industrial warehouse with workers and steel pipe inventory"
      />

      <SectionWrapper id="products-catalog" bg="white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="group relative bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-xl hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              {/* Top visual band with product photo */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <Image
                  src={productImages[i]}
                  alt={locale === "en" ? productImageAlts[i].en : productImageAlts[i].es}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark gradient overlay for polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2">
                  {prop(cat, "name", locale)}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                  {prop(cat, "copy", locale)}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {locale === "en" ? extDesc[i].en : extDesc[i].es}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper id="products-cta" bg="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {locale === "en" ? "Need a Custom Quote?" : "¿Necesita una Cotización Personalizada?"}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {locale === "en" ? "Tell us your specs — we'll deliver exactly what your project needs." : "Indíquenos sus especificaciones — entregaremos exactamente lo que su proyecto necesita."}
          </p>
          <CTAButton href="/contact" variant="primary" className="!text-base !px-8 !py-4">
            {locale === "en" ? "Request a Quote" : "Solicitar Cotización"}
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
