"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "./LocaleContext";
import { siteContent } from "@/lib/content";
import { prop } from "@/lib/content";

export function Footer() {
  const { locale } = useLocale();
  const currentYear = new Date().getFullYear();

  const brand = siteContent.brand;
  const nav = siteContent.navigation;
  const categories = siteContent.products.categories;

  // Bilingual text translations
  const text = {
    about:
      locale === "en"
        ? "Steel Eagle Supply is a premium B2B industrial materials distributor. We specialize in pipe, fittings, flanges, and valves for high-stakes projects globally."
        : "Steel Eagle Supply es un distribuidor premium B2B de materiales industriales. Especialistas en tuberías, conexiones, bridas y válvulas para proyectos globales.",
    quickLinks: locale === "en" ? "Quick Links" : "Enlaces Rápidos",
    products: locale === "en" ? "Core Products" : "Productos Principales",
    contact: locale === "en" ? "Contact Details" : "Contacto",
    address:
      locale === "en"
        ? "Industrial Supply Hub, Houston, TX / Latin America Operations"
        : "Hub de Suministro Industrial, Houston, TX / Operaciones Latinoamérica",
    rights:
      locale === "en"
        ? `All rights reserved.`
        : `Todos los derechos reservados.`,
  };

  return (
    <footer className="bg-primary text-white border-t border-slate-800">
      {/* Upper footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand block */}
          <div className="flex flex-col space-y-4">
            <span className="font-extrabold text-xl tracking-wider text-white">
              {brand.name.toUpperCase()}
            </span>
            <p className="text-sm text-slate-400 leading-relaxed">{text.about}</p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">
              {text.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {nav.slice(0, 6).map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:underline transition-colors duration-200"
                  >
                    {prop(item, "label", locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core products preview */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">
              {text.products}
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {categories.slice(0, 4).map((item, index) => (
                <li key={index}>
                  <Link
                    href="/products"
                    className="hover:text-white hover:underline transition-colors duration-200"
                  >
                    {prop(item, "name", locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">
              {text.contact}
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2 items-start">
                <svg
                  className="w-5 h-5 text-secondary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{text.address}</span>
              </li>
              <li className="flex gap-2 items-center">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:sales@steeleaglesupply.com"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  sales@steeleaglesupply.com
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+18327791663"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  +1 (832) 779-1663
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub footer bar */}
      <div className="bg-slate-950 text-slate-500 py-6 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <span>
            &copy; {currentYear} {brand.name}. {text.rights}
          </span>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-white transition-colors">
              {locale === "en" ? "Terms & Conditions" : "Términos y Condiciones"}
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              {locale === "en" ? "Privacy Policy" : "Política de Privacidad"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
