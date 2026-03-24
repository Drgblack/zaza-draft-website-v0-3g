import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources | Zaza Draft",
  description:
    "Free guides, templates, and AI safety tips for teachers. Download practical resources for parent communication, classroom writing, and school workflows.",
  path: "/resources",
  image: "/advanced-prompts.jpg",
  alternates: {
    en: "https://zazadraft.com/resources",
    de: "https://zazadraft.com/de/resources",
  },
  keywords: [
    "teacher resources",
    "AI templates for teachers",
    "parent communication templates",
    "AI safety resources for schools",
  ],
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "resources-webpage-schema",
            data: createWebPageJsonLd({
              name: "Resources",
              description:
                "Teacher-friendly guides, templates, and AI safety resources for parent communication and school writing.",
              path: "/resources",
              potentialActionName: "Browse teacher resources",
            }),
          },
          {
            id: "resources-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
            ]),
          },
        ]}
      />
      <ResourcesClient />
    </>
  );
}
