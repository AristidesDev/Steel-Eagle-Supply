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
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/50 py-3"
            : "bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-lg md:text-xl tracking-wider text-primary group-hover:text-secondary transition-colors duration-300">
                {brand.name.toUpperCase()}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {nav.map((item, index) => {
                const label = prop(item, "label", locale);
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-sm font-semibold text-slate-600 hover:text-secondary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Area */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageToggle />
              <CTAButton href="/contact" variant="primary" className="!py-2 !px-4 text-xs font-bold">
                {quoteCtaText}
              </CTAButton>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="flex items-center space-x-2 lg:hidden">
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
