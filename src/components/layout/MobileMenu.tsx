"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { NavigationItem, Locale } from "@/lib/types";
import { LanguageToggle } from "./LanguageToggle";
import { CTAButton } from "../shared/CTAButton";
import { prop } from "@/lib/content";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  locale: Locale;
  ctaText: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navigation,
  locale,
  ctaText,
}: MobileMenuProps) {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <span className="font-extrabold text-primary tracking-tight">
            STEEL EAGLE SUPPLY
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-slate-500 hover:text-primary rounded-md hover:bg-slate-50"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-4 py-8 overflow-y-auto flex-grow">
          {navigation.map((item, index) => {
            const label = prop(item, "label", locale);
            return (
              <Link
                key={index}
                href={item.href}
                onClick={onClose}
                className="text-lg font-semibold text-slate-600 hover:text-secondary hover:translate-x-1 transition-all duration-200"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="pt-6 border-t border-slate-100 flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Language / Idioma</span>
            <LanguageToggle />
          </div>

          <CTAButton
            href="/contact"
            variant="primary"
            onClick={onClose}
            className="w-full"
          >
            {ctaText}
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
