import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import FeaturesClient from "./FeaturesClient";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher Writing Features for Parent Emails, Tone, and Report Comments | Zaza Draft",
  description:
    "Explore teacher-first features for professional parent emails, meaningful report comments, safeguarding-sensitive messages, and school writing where tone and judgement matter.",
  path: "/features",
  alternates: {
    en: "https://zazadraft.com/features",
    de: "https://zazadraft.com/de/features",
  },
  keywords: [
    "teacher writing features",
    "AI parent email generator for teachers",
    "AI report comments for teachers",
    "teacher communication software",
  ],
});

export default function FeaturesPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "features-software-schema",
            data: createSoftwareApplicationJsonLd({
              path: "/features",
            }),
          },
          {
            id: "features-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Features", path: "/features" },
            ]),
          },
        ]}
      />
      <FeaturesClient />
    </>
  );
}
