"use client";

import React from "react";
import { useLocale } from "./LocaleContext";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={`inline-flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200/60 p-1 rounded-md text-xs font-bold ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 rounded transition-all duration-300 ${
          locale === "en"
            ? "bg-white text-secondary shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={`px-3 py-1.5 rounded transition-all duration-300 ${
          locale === "es"
            ? "bg-white text-secondary shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        ES
      </button>
    </div>
  );
}

export default LanguageToggle;
