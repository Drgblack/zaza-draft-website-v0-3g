import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { SiteDocument } from "@/components/site-document";
import { buildGoogleConsentBootstrap } from "@/lib/analytics-consent";
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
  // Next resolves this against the current route, including dynamic params.
  // Pages with canonical aliases continue to override it in their metadata.
  alternates: { canonical: "./" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDocument
      shouldLoadGa={shouldLoadGa}
      head={
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
              <Script
                id="plausible-src"
                src="https://plausible.io/js/pa-dnGqRpNXAcgJTLSSgN-cS.js"
                strategy="beforeInteractive"
              />
              <Script
                id="plausible-init"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                  __html:
                    "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
                }}
              />
            </>
          ) : null}
          <link rel="icon" href="/z-logo.png" sizes="any" />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
          <link
            rel="alternate"
            type="application/xml"
            href="/sitemap-longtail.xml"
          />
        </head>
      }
    >
      {children}
    </SiteDocument>
  );
}
