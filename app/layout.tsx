import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import React from "react";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import Footer from "@/components/Footer";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createOrganizationJsonLd,
  createSoftwareApplicationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { siteConfig } from "@/lib/seo/site-config";

const GA4_MEASUREMENT_ID = "G-GFCNQYCHFK";
const shouldLoadGa =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

export const metadata: Metadata = {
  title:
    "Teacher-First AI Writing Help for Parent Emails and Reports | Zaza Draft",
  description:
    "Calm, professional AI writing help for teachers who need parent emails, report comments, and school messages drafted with care. Teachers stay in control of every word.",
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  authors: [{ name: siteConfig.founder.name }],
  category: "Education",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/z-logo.png",
    shortcut: "/z-logo.png",
    apple: "/z-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {shouldLoadGa ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GFCNQYCHFK', {
  anonymize_ip: true
});`,
              }}
            />
          </>
        ) : null}
        <link rel="icon" href="/z-logo.png" sizes="any" />
      </head>
      <body className="bg-slate-950 text-slate-100">
        <Script
          src="https://plausible.io/js/script.js"
          data-domain="zazadraft.com"
          strategy="afterInteractive"
        />
        <JsonLdCollection
          entries={[
            {
              id: "site-organization-schema",
              data: createOrganizationJsonLd(),
            },
            {
              id: "site-website-schema",
              data: createWebsiteJsonLd(),
            },
            {
              id: "site-software-schema",
              data: createSoftwareApplicationJsonLd(),
            },
          ]}
        />
        <LanguageProvider>
          <Header />
          <main className="pt-[92px] bg-slate-950">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
