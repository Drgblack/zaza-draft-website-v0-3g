import type { Metadata } from "next";
import Script from "next/script";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { BreadcrumbSchema } from "@/lib/seo/schema";
import IntegrationsClient from "./integrations-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Integration Marketplace | Zaza Draft",
  description:
    "Explore Zaza Draft integration guides for education tools including Google Classroom, Canvas, Schoology, and PowerSchool.",
  path: "/integrations",
  alternates: {
    en: "https://zazadraft.com/integrations",
    de: "https://zazadraft.com/de/integrations",
  },
  keywords: [
    "teacher AI integrations",
    "education tool integrations",
    "Google Classroom AI integration",
    "school software integrations",
  ],
});

export default function IntegrationsPage() {
  return (
    <>
      <Script id="integrations-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Zaza Draft Integrations",
          description:
            "Education tool integrations and setup guides for Zaza Draft",
          url: "https://zazadraft.com/integrations",
          numberOfItems: 52,
          itemListElement: [
            {
              "@type": "SoftwareApplication",
              name: "Google Classroom Integration",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
            },
            {
              "@type": "SoftwareApplication",
              name: "Canvas LMS Integration",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
            },
            {
              "@type": "SoftwareApplication",
              name: "PowerSchool Integration",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
            },
          ],
        })}
      </Script>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com" },
          { name: "Integrations", url: "https://zazadraft.com/integrations" },
        ]}
      />
      <IntegrationsClient />
    </>
  );
}
