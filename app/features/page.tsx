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
    "Teacher Writing Features for Parent Emails and Report Comments | Zaza Draft",
  description:
    "Explore teacher-first AI features for parent communication, report comments, safeguarding-sensitive messages, and professional school writing where tone matters.",
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
