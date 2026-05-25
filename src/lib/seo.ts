import { Metadata } from "next";
import { seoContent } from "./content";
import { Locale } from "./types";
import { BASE_URL, SITE_NAME } from "./constants";

/**
 * Generates unified Next.js Metadata for any of the 9 core routes
 */
export function generatePageMetadata(
  pageKey: keyof typeof seoContent,
  locale: Locale = "en",
  path: string = ""
): Metadata {
  const pageSeo = seoContent[pageKey];
  
  const title = locale === "en" ? pageSeo.title_en : pageSeo.title_es;
  const description = locale === "en" ? pageSeo.description_en : pageSeo.description_es;
  
  // Format clean canonical URLs
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}${cleanPath === "/" ? "" : cleanPath}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${canonicalUrl}?lang=en`,
        "es-ES": `${canonicalUrl}?lang=es`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
export default generatePageMetadata;
