import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { LocaleProvider } from "@/components/layout/LocaleContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/shared/JsonLd";
import { getOrganizationSchema } from "@/lib/schemas";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steel Eagle Supply | Pipe, Fittings, Flanges & Industrial Materials",
  description:
    "Steel Eagle Supply provides pipe, fittings, flanges, and industrial materials for oil & gas, petrochemical, power, and infrastructure projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <LocaleProvider>
          <JsonLd schema={orgSchema} />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
