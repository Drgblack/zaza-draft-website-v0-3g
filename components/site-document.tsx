"use client";

import type { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import { ScrollDepthTracker } from "@/components/analytics/scroll-depth-tracker";
import { UtmCapture } from "@/components/analytics/utm-capture";
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
import {
  buildAutomaticBreadcrumbItems,
  shouldRenderAutomaticBreadcrumb,
} from "@/lib/seo/breadcrumbs";
import { getPathLocale } from "@/lib/seo-canonical";

/**
 * Router segments are available during prerendering and update on navigation.
 * Unlike headers(), they do not opt pages out of the Full Route Cache.
 * Server-rendered pages and head content are passed through as slots.
 */
export function SiteDocument({
  children,
  head,
  shouldLoadGa,
}: {
  children: ReactNode;
  head: ReactNode;
  shouldLoadGa: boolean;
}) {
  const segments = useSelectedLayoutSegments();
  // Route groups are implementation details, not parts of the public URL.
  // Catch-all params are already joined with '/' by the router.
  const pathname =
    "/" + segments.filter((segment) => !segment.startsWith("(")).join("/");
  const locale = getPathLocale(pathname);
  const schemaLanguage = locale === "de" ? "de-DE" : "en-GB";
  const isCreatorFunnelPage = pathname.startsWith("/c/");
  const shouldRenderAutoBreadcrumb =
    !isCreatorFunnelPage && shouldRenderAutomaticBreadcrumb(pathname);

  return (
    <html lang={locale} suppressHydrationWarning>
      {head}
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
