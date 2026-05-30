"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "../layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { SectionWrapper } from "../shared/SectionWrapper";
import { SectionHeading } from "../shared/SectionHeading";
import { CTAButton } from "../shared/CTAButton";

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

export function ProductsPreview() {
  const { locale } = useLocale();
  const categories = siteContent.products.categories;

  return (
    <SectionWrapper id="products-preview" bg="muted">
      <SectionHeading
        preTitle={locale === "en" ? "Our Products" : "Nuestros Productos"}
        title={locale === "en" ? "Industrial Materials & Supply" : "Materiales y Suministros Industriales"}
        subtitle={
          locale === "en"
            ? "From carbon steel to specialty alloys — we supply the materials that keep critical infrastructure running."
            : "Desde acero al carbono hasta aleaciones especiales — suministramos los materiales que mantienen la infraestructura crítica en funcionamiento."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="group relative bg-white border border-slate-200/80 rounded-xl hover:shadow-xl hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 animate-slide-up overflow-hidden"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Product image */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <Image
                src={productImages[i]}
                alt={locale === "en" ? productImageAlts[i].en : productImageAlts[i].es}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </div>

            <div className="p-6">
              {/* Name */}
              <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2">
                {prop(cat, "name", locale)}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed">
                {prop(cat, "copy", locale)}
              </p>

              {/* Hover arrow indicator */}
              <div className="mt-4 flex items-center gap-1 text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  {locale === "en" ? "Details" : "Detalles"}
                </span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 animate-fade-in">
        <CTAButton href="/products" variant="primary">
          {locale === "en" ? "View All Products" : "Ver Todos los Productos"}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}

export default ProductsPreview;
