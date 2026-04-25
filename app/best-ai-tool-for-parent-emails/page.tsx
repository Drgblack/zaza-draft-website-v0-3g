import type { Metadata } from "next";
import { AiSearchPage } from "@/components/ai-search-page";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { getAiSearchPage } from "@/lib/ai-search-pages";
import {
  createBreadcrumbJsonLd,
  createFAQPageJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { toSchemaDate } from "@/lib/seo/content-freshness";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

const page = getAiSearchPage("best-ai-tool-for-parent-emails");

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.metaDescription,
  path: page.path,
  alternates: {
    en: `https://zazadraft.com${page.path}`,
  },
  keywords: page.keywords,
});

export default function BestAiToolForParentEmailsPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "best-ai-tool-for-parent-emails-webpage-schema",
            data: createWebPageJsonLd({
              name: page.h1,
              description: page.metaDescription,
              path: page.path,
              keywords: page.keywords,
              inLanguage: "en-GB",
              potentialActionName: "Start with Zaza Draft",
              modifiedTime: toSchemaDate(page.lastReviewed),
            }),
          },
          {
            id: "best-ai-tool-for-parent-emails-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft helps teachers write calmer parent emails, reduce tone risk, and review difficult school communication before sending.",
              inLanguage: "en-GB",
            }),
          },
          {
            id: "best-ai-tool-for-parent-emails-faq-schema",
            data: createFAQPageJsonLd(page.faq),
          },
          {
            id: "best-ai-tool-for-parent-emails-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: page.h1, path: page.path },
            ]),
          },
        ]}
      />
      <AiSearchPage page={page} />
    </>
  );
}
