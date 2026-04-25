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

const page = getAiSearchPage("ai-parent-email-tool-for-teachers");

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.metaDescription,
  path: page.path,
  alternates: {
    en: `https://zazadraft.com${page.path}`,
  },
  keywords: page.keywords,
});

export default function AiParentEmailToolForTeachersPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "ai-parent-email-tool-for-teachers-webpage-schema",
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
            id: "ai-parent-email-tool-for-teachers-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft is a teacher communication support tool built for parent emails, difficult replies, safer tone, and calmer de-escalation support.",
              inLanguage: "en-GB",
            }),
          },
          {
            id: "ai-parent-email-tool-for-teachers-faq-schema",
            data: createFAQPageJsonLd(page.faq),
          },
          {
            id: "ai-parent-email-tool-for-teachers-breadcrumb-schema",
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
