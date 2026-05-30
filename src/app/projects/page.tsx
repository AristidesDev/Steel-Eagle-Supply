"use client";

import React from "react";
import { useLocale } from "@/components/layout/LocaleContext";
import { siteContent, prop } from "@/lib/content";
import { PageHero } from "@/components/shared/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/shared/Badge";
import { CTAButton } from "@/components/shared/CTAButton";

export default function ProjectsPage() {
  const { locale } = useLocale();
  const projects = siteContent.projects;
  const items = projects.items;

  return (
    <>
      <PageHero
        title={prop(projects, "title", locale)}
        subtitle={prop(projects, "description", locale)}
        breadcrumbs={[{ label: "Projects", label_es: "Proyectos" }]}
        backgroundImage="/images/hero/home-hero.webp"
        backgroundAlt="Industrial pipe supply operations"
      />

      <SectionWrapper id="projects-list" bg="white">
        <div className="space-y-10">
          {items.map((item, i) => (
            <div key={i} className="group grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              {/* Left panel */}
              <div className="bg-gradient-to-br from-primary via-slate-900 to-slate-950 p-8 flex flex-col justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
                <div className="relative z-10">
                  <span className="text-5xl font-extrabold text-white/10 mb-2 block">{item.year}</span>
                  <h3 className="text-xl font-bold mb-3">{prop(item, "name", locale)}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="accent">{prop(item, "industry", locale)}</Badge>
                    <Badge variant="primary">
                      <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {prop(item, "location", locale)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="p-8 flex items-center bg-white">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                    {locale === "en" ? "Project Scope" : "Alcance del Proyecto"}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-[15px]">{prop(item, "scope", locale)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="projects-cta" bg="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {locale === "en" ? "Have a Project in Mind?" : "¿Tiene un Proyecto en Mente?"}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {locale === "en" ? "Let us put our experience to work for your next installation." : "Permítanos poner nuestra experiencia al servicio de su próxima instalación."}
          </p>
          <CTAButton href="/contact" variant="primary" className="!text-base !px-8 !py-4">
            {locale === "en" ? "Start Your Project" : "Inicie Su Proyecto"}
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
