"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "./LocaleContext";
import { siteContent } from "@/lib/content";
import { prop } from "@/lib/content";
import { LanguageToggle } from "./LanguageToggle";
import { CTAButton } from "../shared/CTAButton";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { locale } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll height to apply active shadows
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = siteContent.navigation;
  const brand = siteContent.brand;
  const quoteCtaText = locale === "en" ? "Request a Quote" : "Solicitar Cotización";

  return (
    <>
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/50"
            : "bg-white border-b border-slate-100"
        }`}
      >
        {/* Utility Top Bar – desktop only */}
        <div className="hidden nav:block bg-slate-800 text-slate-300 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
            {/* Quick contact info */}
            <div className="flex items-center space-x-6">
              <a
                href="mailto:sales@steeleaglesupply.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                sales@steeleaglesupply.com
              </a>
              <a
                href="tel:+18327791663"
                className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (832) 779-1663
              </a>
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">
                {locale === "en" ? "Language:" : "Idioma:"}
              </span>
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Main navigation bar */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "py-3" : "py-4"}`}>
          <div className="flex items-center justify-between gap-4">
            {/* Logo area */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <span className="font-extrabold text-base nav:text-lg tracking-wider text-primary group-hover:text-secondary transition-colors duration-300">
                {brand.name.toUpperCase()}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden nav:flex items-center justify-center flex-1 min-w-0 space-x-4 xl:space-x-6">
              {nav.map((item, index) => {
                const label = prop(item, "label", locale);
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-sm font-semibold text-slate-600 hover:text-secondary transition-colors duration-200 whitespace-nowrap"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Area */}
            <div className="hidden nav:flex items-center flex-shrink-0">
              <CTAButton href="/contact" variant="primary" className="!py-2 !px-5 text-xs font-bold whitespace-nowrap">
                {quoteCtaText}
              </CTAButton>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="flex items-center space-x-2 nav:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-md transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={nav}
        locale={locale}
        ctaText={quoteCtaText}
      />
    </>
  );
}

export default Header;
