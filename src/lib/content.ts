import siteContentJson from "../../json/site-content.json";
import seoContentJson from "../../json/seo-content.json";
import siteConfigJson from "../../json/site-config.json";

import { SiteContent, SeoContent, SiteConfig, Locale } from "./types";

// Cast imported JSON to their respective types
export const siteContent = siteContentJson as unknown as SiteContent;
export const seoContent = seoContentJson as unknown as SeoContent;
export const siteConfig = siteConfigJson as unknown as SiteConfig;

/**
 * Resolves a simple translation object of the shape { en: string; es: string }
 */
export function t(
  translationObj: { en: string; es: string } | undefined,
  locale: Locale = "en"
): string {
  if (!translationObj) return "";
  return translationObj[locale] || translationObj["en"] || "";
}

/**
 * Resolves a suffixed field from an object, e.g. name_en or name_es
 */
export function prop<T extends Record<string, any>>(
  obj: T | undefined,
  field: string,
  locale: Locale = "en"
): any {
  if (!obj) return "";
  
  // Try suffixed format: e.g. label_en or title_es
  const localizedKey = `${field}_${locale}`;
  if (localizedKey in obj) {
    return obj[localizedKey];
  }
  
  // Fallback to default suffix (en)
  const defaultKey = `${field}_en`;
  if (defaultKey in obj) {
    return obj[defaultKey];
  }

  // Try direct lookup (e.g. if the field itself is localized elsewhere or neutral)
  if (field in obj) {
    const val = obj[field];
    if (val && typeof val === "object") {
      if (locale in val) {
        return val[locale];
      }
      if ("en" in val) {
        return val["en"];
      }
    }
    return val;
  }
  
  return "";
}

/**
 * Helper to get the other locale (for switcher buttons)
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
