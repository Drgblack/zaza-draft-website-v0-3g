import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { HomePageClient } from "./home-client";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher-First Support for Parent Emails and High-Stakes School Communication | Zaza Draft",
  description:
    "Zaza Draft helps teachers draft clear, calm parent emails and school messages in moments that feel uncertain - before tone, wording, or timing turn a situation into something bigger.",
  path: "/",
  alternates: {
    en: "https://zazadraft.com",
    de: "https://zazadraft.com/de",
  },
  keywords: [
    "AI parent email help for teachers",
    "high-stakes school communication",
    "teacher communication safety",
    "parent communication AI",
    "teacher co-writer",
    "defensible school wording",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "home-software-schema",
            data: createSoftwareApplicationJsonLd({
              description:
                "Zaza Draft is a teacher-first communication safety layer for parent emails, complaint replies, behaviour updates, documentation, and other high-stakes school communication. It helps teachers shape messages where tone, trust, and interpretation matter before anything is sent.",
            }),
          },
          {
            id: "home-breadcrumb-schema",
            data: createBreadcrumbJsonLd([{ name: "Home", path: "/" }]),
          },
        ]}
      />
      <HomePageClient />
    </>
  );
}
