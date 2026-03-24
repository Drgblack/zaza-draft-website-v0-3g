import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { SuccessStoriesClient } from "./success-stories-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Teacher Success Stories | Zaza Draft",
  description:
    "Read teacher and school case studies about calmer parent communication, clearer school writing, and time saved with Zaza Draft.",
  path: "/success-stories",
  alternates: {
    en: "https://zazadraft.com/success-stories",
    de: "https://zazadraft.com/de/success-stories",
  },
  keywords: [
    "teacher success stories",
    "school communication case studies",
    "teacher writing case studies",
    "parent communication examples",
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
              name: "Teacher Success Stories",
              description:
                "Teacher and school case studies focused on parent communication, report writing, and calmer school workflows.",
              path: "/success-stories",
              potentialActionName: "Read teacher case studies",
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
