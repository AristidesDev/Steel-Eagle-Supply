"use client";

import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; label_es?: string; href?: string }[];
}

export function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Premium industrial grid overlay styling in CSS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
      
      {/* Decorative steel blue glow accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fade-in">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-base md:text-xl text-slate-300 leading-relaxed max-w-3xl animate-slide-up mb-6">
            {subtitle}
          </p>
        )}

        <div className="border-t border-slate-800/80 pt-4 mt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>
    </div>
  );
}

export default PageHero;
