import { Metadata } from "next";
import IntegrationsClient from "../../integrations/integrations-client";
import { BreadcrumbSchema } from "@/lib/seo/schema";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Integrations-Marktplatz | Zaza Draft",
  description:
    "Verbinden Sie Zaza Draft mit über 50 Bildungstools, darunter Google Classroom, Canvas, Schoology, PowerSchool und mehr. Inklusive Einrichtungsanleitungen und Dokumentation.",
  openGraph: {
    title: "Integrations-Marktplatz | Zaza Draft",
    description:
      "Verbinden Sie Zaza Draft mit über 50 Bildungstools. Inklusive Einrichtungsanleitungen und Dokumentation.",
    type: "website",
  },
  alternates: {
    canonical: "https://zazadraft.com/de/integrations",
    languages: {
      en: "/integrations",
      de: "/de/integrations",
    },
  },
};

export default function DeIntegrationsPage() {
  return (
    <>
      <Script id="integrations-schema-de" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Zaza Draft Integrationen",
          description: "50+ Bildungstool-Integrationen für Zaza Draft",
          url: "https://zazadraft.com/de/integrations",
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
          { name: "Startseite", url: "https://zazadraft.com/de" },
          {
            name: "Integrationen",
            url: "https://zazadraft.com/de/integrations",
          },
        ]}
      />
      <IntegrationsClient />
    </>
  );
}
