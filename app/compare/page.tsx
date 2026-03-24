import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { CompareClient } from "./compare-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Compare Zaza Draft with Other AI Tools | Feature Comparison",
  description:
    "Compare Zaza Draft with other AI tools for teachers. See detailed feature-by-feature comparisons to find the best-fit tool for parent emails, report comments, and teacher writing workflows.",
  path: "/compare",
  alternates: {
    en: "https://zazadraft.com/compare",
    de: "https://zazadraft.com/de/compare",
  },
  keywords: [
    "compare AI tools for teachers",
    "teacher AI tool comparison",
    "Zaza Draft alternatives",
    "teacher writing assistant comparison",
  ],
});

export default function ComparePage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "compare-webpage-schema",
            data: createWebPageJsonLd({
              name: "Compare Zaza Draft with Other AI Tools",
              description:
                "A teacher-first comparison hub for AI tools used in parent communication, report comments, and school writing workflows.",
              path: "/compare",
              potentialActionName: "Compare teacher AI tools",
            }),
          },
          {
            id: "compare-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Compare", path: "/compare" },
            ]),
          },
        ]}
      />
      <CompareClient />
    </>
  );
}
