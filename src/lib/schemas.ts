import { BASE_URL, SITE_NAME } from "./constants";
import { FAQItem, Locale } from "./types";

/**
 * Generates Organization Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": BASE_URL,
    "logo": `${BASE_URL}/images/logo.svg`,
    "sameAs": [],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "",
        "contactType": "sales",
        "email": "sales@steeleaglesupply.com",
        "availableLanguage": ["English", "Spanish"]
      }
    ]
  };
}

/**
 * Generates BreadcrumbList Schema
 */
export interface BreadcrumbListItem {
  name: string;
  path: string;
}

export function getBreadcrumbSchema(items: BreadcrumbListItem[]) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${BASE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

/**
 * Generates FAQPage Schema
 */
export function getFAQPageSchema(faqs: FAQItem[], locale: Locale = "en") {
  const mainEntity = faqs.map((faq) => ({
    "@type": "Question",
    "name": locale === "en" ? faq.question_en : faq.question_es,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": locale === "en" ? faq.answer_en : faq.answer_es
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };
}

/**
 * Generates Product Schema for categories
 */
export interface ProductSchemaItem {
  name: string;
  description: string;
  url: string;
  image: string;
}

export function getProductSchema(categories: ProductSchemaItem[]) {
  const offerCatalog = categories.map((cat) => ({
    "@type": "Product",
    "name": cat.name,
    "description": cat.description,
    "image": cat.image,
    "url": cat.url,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "itemCondition": "https://schema.org/NewCondition"
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": categories.length,
    "itemListElement": offerCatalog.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": item
    }))
  };
}
