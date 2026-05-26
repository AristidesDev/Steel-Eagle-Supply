import { generatePageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { IndustriesPreview } from "@/components/home/IndustriesPreview";
import { QualityBlock } from "@/components/home/QualityBlock";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata = generatePageMetadata("home", "en", "/");

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSnippet />
      <ProductsPreview />
      <ServicesPreview />
      <IndustriesPreview />
      <QualityBlock />
      <ContactCTA />
    </>
  );
}
