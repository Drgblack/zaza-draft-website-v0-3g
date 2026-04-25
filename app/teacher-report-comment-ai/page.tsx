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

const page = getAiSearchPage("teacher-report-comment-ai");

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.metaDescription,
  path: page.path,
  alternates: {
    en: `https://zazadraft.com${page.path}`,
  },
  keywords: page.keywords,
});

export default function TeacherReportCommentAiPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "teacher-report-comment-ai-webpage-schema",
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
            id: "teacher-report-comment-ai-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft helps teachers write more meaningful report comments and calmer school communication with wording that feels easier to review and approve.",
              inLanguage: "en-GB",
            }),
          },
          {
            id: "teacher-report-comment-ai-faq-schema",
            data: createFAQPageJsonLd(page.faq),
          },
          {
            id: "teacher-report-comment-ai-breadcrumb-schema",
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
