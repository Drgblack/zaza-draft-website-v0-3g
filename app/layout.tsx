import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import React from "react";
import { headers } from "next/headers";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import { ScrollDepthTracker } from "@/components/analytics/scroll-depth-tracker";
import { UtmCapture } from "@/components/analytics/utm-capture";
import { buildGoogleConsentBootstrap } from "@/lib/analytics-consent";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import Footer from "@/components/Footer";
import { TranslationHelperNotice } from "@/components/translation-helper-notice";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
  createPersonJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { buildCanonicalAlternates, getPathLocale } from "@/lib/seo-canonical";
import { siteConfig } from "@/lib/seo/site-config";
import {
  buildAutomaticBreadcrumbItems,
  shouldRenderAutomaticBreadcrumb,
} from "@/lib/seo/breadcrumbs";

const GA4_MEASUREMENT_ID = "G-GFCNQYCHFK";
const shouldLoadGa =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

function getRequestPathname(headersList: Awaited<ReturnType<typeof headers>>) {
  return (
    headersList.get("x-pathname") ||
    headersList.get("x-invoke-path") ||
    headersList.get("next-url") ||
    "/"
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = getRequestPathname(headersList);

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
    alternates: buildCanonicalAlternates(pathname),
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detect whether we're rendering a creator landing page (/c/[handle]).
  // These are conversion funnels — they get their own minimal chrome
  // defined in app/c/[handle]/layout.tsx, with no global header/footer.
  const headersList = await headers();
  const pathname = getRequestPathname(headersList);
  const locale = getPathLocale(pathname);
  const schemaLanguage = locale === "de" ? "de-DE" : "en-GB";
  const isCreatorFunnelPage = pathname.startsWith("/c/");
  const shouldRenderAutoBreadcrumb =
    !isCreatorFunnelPage && shouldRenderAutomaticBreadcrumb(pathname);

  return (
    <html lang={locale} suppressHydrationWarning>
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
      <body
        className={
          isCreatorFunnelPage
            ? "bg-white text-slate-900"
            : "bg-slate-950 text-slate-100"
        }
      >
        {shouldLoadGa ? <ScrollDepthTracker /> : null}
        {shouldLoadGa ? <UtmCapture /> : null}
        <JsonLdCollection
          entries={[
            {
              id: "site-organization-schema",
              data: createOrganizationJsonLd(),
            },
            {
              id: "site-website-schema",
              data: createWebsiteJsonLd({ inLanguage: schemaLanguage }),
            },
            {
              id: "site-person-schema",
              data: createPersonJsonLd({ inLanguage: schemaLanguage }),
            },
            ...(shouldRenderAutoBreadcrumb
              ? [
                  {
                    id: "auto-breadcrumb-schema",
                    data: createBreadcrumbJsonLd(
                      buildAutomaticBreadcrumbItems(pathname),
                    ),
                  },
                ]
              : []),
          ]}
        />
        <LanguageProvider>
          {!isCreatorFunnelPage && <Header />}
          {!isCreatorFunnelPage && <TranslationHelperNotice />}
          {shouldLoadGa ? <CookieConsentBanner /> : null}
          <main
            className={
              isCreatorFunnelPage ? "bg-white" : "pt-[92px] bg-slate-950"
            }
          >
            {children}
          </main>
          {!isCreatorFunnelPage && <Footer />}
        </LanguageProvider>
      </body>
    </html>
  );
}
