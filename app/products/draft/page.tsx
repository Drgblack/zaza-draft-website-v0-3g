import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import DraftClient from "./draft-client";

const ogImage = "/images/draft-interface.png";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher-First Co-Writer for Parent Emails, Tone, and Reports | Zaza Draft",
  description:
    "Explore Zaza Draft, the teacher-first co-writer for professional parent communication, more meaningful report comments, and school messages where tone, trust, and teacher control matter.",
  path: "/products/draft",
  image: ogImage,
  alternates: {
    en: "https://zazadraft.com/products/draft",
    de: "https://zazadraft.com/de/products/draft",
  },
  keywords: [
    "teacher-first AI co-writer",
    "AI parent email tool for teachers",
    "AI report writing for teachers",
    "teacher communication software",
  ],
});

export default function DraftPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "draft-product-software-schema",
            data: createSoftwareApplicationJsonLd(),
          },
          {
            id: "draft-product-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Zaza Draft", path: "/products/draft" },
            ]),
          },
        ]}
      />
      <DraftClient />
    </>
  );
}
