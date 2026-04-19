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
    "Teacher-First Support for Parent Emails, Tone, and Meaningful Reports | Zaza Draft",
  description:
    "Zaza Draft helps teachers draft calm parent emails, more meaningful report comments, and clear school messages before tone, wording, or timing turn a situation into something bigger.",
  path: "/",
  alternates: {
    en: "https://zazadraft.com",
    de: "https://zazadraft.com/de",
  },
  keywords: [
    "AI parent email help for teachers",
    "teacher email tone",
    "high-stakes school communication",
    "teacher communication safety",
    "parent communication AI",
    "teacher co-writer",
    "meaningful report comments",
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
                "Zaza Draft is a teacher-first communication safety layer for parent emails, complaint replies, behaviour updates, documentation, and report comments. It helps teachers shape messages where tone, trust, value, and interpretation matter before anything is sent.",
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
