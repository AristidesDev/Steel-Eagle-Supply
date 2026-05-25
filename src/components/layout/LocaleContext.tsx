"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale } from "@/lib/types";
import { DEFAULT_LOCALE } from "@/lib/constants";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // Attempt to load locale from localStorage
    try {
      const saved = localStorage.getItem("locale") as Locale;
      if (saved === "en" || saved === "es") {
        setLocaleState(saved);
      } else {
        // Fallback to browser language if supported
        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "es") {
          setLocaleState("es");
        }
      }
    } catch (e) {
      console.warn("Could not access localStorage:", e);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("locale", newLocale);
      // Persist in cookie for optional server usage
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {
      console.warn("Could not save locale:", e);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
