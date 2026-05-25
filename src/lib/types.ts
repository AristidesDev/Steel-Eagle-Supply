// TypeScript types for Steel Eagle Supply JSON content files

export interface SiteConfig {
  stack: {
    framework: string;
    language: string;
    styling: string;
    routing: string;
  };
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      muted: string;
    };
    fontFamily: string;
  };
  seo: {
    openGraph: boolean;
    twitterCards: boolean;
    organizationSchema: boolean;
    faqSchema: boolean;
  };
}

export interface PageSeo {
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
}

export interface SeoContent {
  home: PageSeo;
  about: PageSeo;
  products: PageSeo;
  services: PageSeo;
  industries: PageSeo;
  quality: PageSeo;
  projects: PageSeo;
  resources: PageSeo;
  contact: PageSeo;
}

export interface NavigationItem {
  label_en: string;
  label_es: string;
  href: string;
}

export interface TrustBarItem {
  en: string;
  es: string;
}

export interface ProductLevelCategory {
  name_en: string;
  name_es: string;
  copy_en: string;
  copy_es: string;
}

export interface ServiceItem {
  en: string;
  es: string;
}

export interface IndustryItem {
  name_en: string;
  name_es: string;
}

export interface QualityPoint {
  en: string;
  es: string;
}

export interface ProjectItem {
  name_en: string;
  name_es: string;
  location_en: string;
  location_es: string;
  industry_en: string;
  industry_es: string;
  year: string;
  scope_en: string;
  scope_es: string;
}

export interface FAQItem {
  question_en: string;
  question_es: string;
  answer_en: string;
  answer_es: string;
}

export interface GuideItem {
  title_en: string;
  title_es: string;
  type: string;
  fileSize: string;
}

export interface SiteContent {
  brand: {
    name: string;
    logo: string;
    defaultLocale: string;
    locales: string[];
  };
  navigation: NavigationItem[];
  home: {
    hero: {
      h1_en: string;
      h1_es: string;
      subheadline_en: string;
      subheadline_es: string;
      cta_primary_en: string;
      cta_primary_es: string;
      cta_secondary_en: string;
      cta_secondary_es: string;
    };
    trustBar: TrustBarItem[];
    aboutSnippet: {
      en: string;
      es: string;
    };
  };
  products: {
    categories: ProductLevelCategory[];
  };
  services: {
    items: ServiceItem[];
  };
  industries: {
    items: IndustryItem[];
  };
  quality: {
    points: QualityPoint[];
  };
  projects: {
    title_en: string;
    title_es: string;
    description_en: string;
    description_es: string;
    items: ProjectItem[];
  };
  resources: {
    title_en: string;
    title_es: string;
    description_en: string;
    description_es: string;
    faqs: FAQItem[];
    guides: GuideItem[];
  };
  contact: {
    cta_en: string;
    cta_es: string;
    formFields: string[];
  };
}

export type Locale = "en" | "es";
