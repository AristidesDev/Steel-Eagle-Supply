"use client";

import React from "react";
import { useLocale } from "../layout/LocaleContext";
import { CTAButton } from "../shared/CTAButton";

export function ContactCTA() {
  const { locale } = useLocale();

  return (
    <section id="contact-cta" className="relative overflow-hidden bg-gradient-to-r from-secondary via-blue-800 to-primary py-20 md:py-28">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Decorative glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white/80 border border-white/10 mb-6 animate-fade-in">
          {locale === "en" ? "Ready to Get Started?" : "¿Listo para Comenzar?"}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 animate-slide-up">
          {locale === "en"
            ? "Let's Build Something Great Together"
            : "Construyamos Algo Grande Juntos"}
        </h2>
        <p className="text-lg md:text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          {locale === "en"
            ? "Whether you need pipe, fittings, flanges, or full project logistics — our team is ready to deliver."
            : "Ya sea que necesite tuberías, conexiones, bridas o logística completa de proyecto — nuestro equipo está listo para entregar."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <CTAButton href="/contact" variant="primary" className="!text-base !px-8 !py-4">
            {locale === "en" ? "Request a Quote" : "Solicitar Cotización"}
          </CTAButton>
          <CTAButton href="/products" variant="white" className="!text-base !px-8 !py-4">
            {locale === "en" ? "Browse Products" : "Explorar Productos"}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
