import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { SuccessStoriesClient } from "./success-stories-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Teacher Communication Examples | Zaza Draft",
  description:
    "Explore representative classroom and school communication examples showing the kinds of before-and-after wording Zaza Draft is built to support.",
  path: "/success-stories",
  alternates: {
    en: "https://www.zazadraft.com/success-stories",
    de: "https://www.zazadraft.com/de/success-stories",
  },
  keywords: [
    "teacher communication examples",
    "school writing examples",
    "parent communication examples",
    "before and after parent email examples",
  ],
});

export default function SuccessStoriesPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "success-stories-webpage-schema",
            data: createWebPageJsonLd({
              name: "Teacher Communication Examples",
              description:
                "Representative before-and-after examples focused on parent communication, report writing, and calmer school workflows.",
              path: "/success-stories",
              potentialActionName: "Explore communication examples",
            }),
          },
          {
            id: "success-stories-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Success Stories", path: "/success-stories" },
            ]),
          },
        ]}
      />
      <SuccessStoriesClient />
    </>
  );
}
