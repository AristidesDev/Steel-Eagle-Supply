export const SITE_NAME = "Steel Eagle Supply";
export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "es"] as const;

// Production URL for canonical links and SEO
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.steeleaglesupply.com";
