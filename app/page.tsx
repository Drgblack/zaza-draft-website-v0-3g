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
    "Calm AI Parent Email and Report Writing Help for Teachers | Zaza Draft",
  description:
    "Teacher-first AI writing help for parent communication, report comments, and professional school messages. Zaza Draft is a calm co-writer that keeps teachers in control of every word.",
  path: "/",
  alternates: {
    en: "https://zazadraft.com",
    de: "https://zazadraft.com/de",
  },
  keywords: [
    "AI parent email help for teachers",
    "AI report writing for teachers",
    "teacher writing assistant",
    "parent communication AI",
    "teacher co-writer",
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
                "Zaza Draft is a teacher-first AI co-writer for parent communication, report comments, and school writing. It is built to help teachers sound calm, professional, and appropriate while keeping full editorial control.",
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
