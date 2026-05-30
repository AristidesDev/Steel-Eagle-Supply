"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "../layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { CTAButton } from "../shared/CTAButton";

export function HeroSection() {
  const { locale } = useLocale();
  const hero = siteContent.home.hero;

  const h1 = prop(hero, "h1", locale);
  const subheadline = prop(hero, "subheadline", locale);
  const ctaPrimary = prop(hero, "cta_primary", locale);
  const ctaSecondary = prop(hero, "cta_secondary", locale);

  return (
    <div className="relative bg-gradient-to-br from-primary via-slate-900 to-slate-950 text-white min-h-[85vh] flex items-center overflow-hidden border-b border-slate-800">
      {/* Background photo */}
      <Image
        src="/images/hero/home-hero.webp"
        alt="Industrial pipe supply yard with steel pipes and refinery"
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />

      {/* Gradient overlay on top of photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-slate-900/70 to-slate-950/80 z-[1]" />

      {/* Premium CSS-based industrial grid & glow placeholder overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15 z-[2]" />
      
      {/* Decorative glowing gradient accents */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none z-[2] animate-fade-in" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-[2] animate-fade-in" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="max-w-3xl flex flex-col items-start text-left">
          {/* Tagline pre-title */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-orange-500/10 text-accent border border-orange-500/20 mb-6 animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            {locale === "en" ? "Industrial Piping Leader" : "Líder de Tubería Industrial"}
          </span>

          {/* Heading H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none mb-6 animate-slide-up">
            {h1}
          </h1>

          {/* Subheadline description */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed mb-10 max-w-2xl animate-slide-up">
            {subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slide-up">
            <CTAButton href="/contact" variant="primary" className="w-full sm:w-auto">
              {ctaPrimary}
            </CTAButton>
            <CTAButton href="/products" variant="outline" className="w-full sm:w-auto !border-slate-500 hover:!border-white text-white hover:bg-white/5">
              {ctaSecondary}
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
