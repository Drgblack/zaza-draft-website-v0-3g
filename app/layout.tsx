import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import React from "react";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import { PlausibleAnalytics } from "@/components/analytics/plausible-analytics";
import { UtmCapture } from "@/components/analytics/utm-capture";
import { buildGoogleConsentBootstrap } from "@/lib/analytics-consent";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import Footer from "@/components/Footer";
import { TranslationHelperNotice } from "@/components/translation-helper-notice";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createOrganizationJsonLd,
  createSoftwareApplicationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { buildCanonicalAlternates } from "@/lib/seo-canonical";
import { siteConfig } from "@/lib/seo/site-config";

const GA4_MEASUREMENT_ID = "G-GFCNQYCHFK";
const shouldLoadGa =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

export function generateMetadata(): Metadata {
  return {
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
    alternates: buildCanonicalAlternates("/"),
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
}

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
            <Script
              id="google-gtag-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
              strategy="beforeInteractive"
            />
            <Script
              id="google-gtag-init"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: buildGoogleConsentBootstrap(GA4_MEASUREMENT_ID),
              }}
            />
          </>
        ) : null}
        <link rel="icon" href="/z-logo.png" sizes="any" />
      </head>
      <body className="bg-slate-950 text-slate-100">
        {shouldLoadGa ? <PlausibleAnalytics /> : null}
        {shouldLoadGa ? <UtmCapture /> : null}
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
          <TranslationHelperNotice />
          {shouldLoadGa ? <CookieConsentBanner /> : null}
          <main className="pt-[92px] bg-slate-950">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
