"use client";

import React from "react";
import { useLocale } from "../layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { SectionWrapper } from "../shared/SectionWrapper";
import { SectionHeading } from "../shared/SectionHeading";
import { CTAButton } from "../shared/CTAButton";

/* Product category icon set — industrial SVGs */
const productIcons: React.ReactNode[] = [
  // Carbon Steel Pipe
  <svg key="p0" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /><circle cx="4" cy="6" r="1.5" fill="currentColor" /><circle cx="4" cy="12" r="1.5" fill="currentColor" /><circle cx="4" cy="18" r="1.5" fill="currentColor" /></svg>,
  // Alloy Pipe
  <svg key="p1" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  // Stainless Steel Pipe
  <svg key="p2" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.986.63l-2.066 1.033a6 6 0 01-3.986.63l-2.387-.477M14 4l-2 8 6-4-4-4z" /></svg>,
  // Fittings
  <svg key="p3" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  // Flanges
  <svg key="p4" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={1.5} /><circle cx="12" cy="12" r="4" strokeWidth={1.5} /><circle cx="12" cy="4" r="1" fill="currentColor" /><circle cx="12" cy="20" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="20" cy="12" r="1" fill="currentColor" /></svg>,
  // Valves
  <svg key="p5" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15V9m-3 3h6m-9 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 16v-2" /></svg>,
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
            className="group relative bg-white border border-slate-200/80 rounded-xl p-6 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 animate-slide-up overflow-hidden"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-slate-100 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 mb-5">
                {productIcons[i]}
              </div>

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
