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

const page = getAiSearchPage("zaza-draft-vs-chatgpt");

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.metaDescription,
  path: page.path,
  alternates: {
    en: `https://zazadraft.com${page.path}`,
  },
  keywords: page.keywords,
});

export default function ZazaDraftVsChatgptPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "zaza-draft-vs-chatgpt-webpage-schema",
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
            id: "zaza-draft-vs-chatgpt-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft is an AI writing and communication support tool for teachers who need calmer parent emails, safer tone, de-escalation support, and more meaningful report comments.",
              inLanguage: "en-GB",
            }),
          },
          {
            id: "zaza-draft-vs-chatgpt-faq-schema",
            data: createFAQPageJsonLd(page.faq),
          },
          {
            id: "zaza-draft-vs-chatgpt-breadcrumb-schema",
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
