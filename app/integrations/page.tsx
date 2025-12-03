import type { Metadata } from "next"
import IntegrationsClient from "./integrations-client"
import { BreadcrumbSchema } from "@/lib/seo/schema"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Integration Marketplace | Zaza Draft",
  description:
    "Connect Zaza Draft with 50+ education tools including Google Classroom, Canvas, Schoology, PowerSchool, and more. Setup guides and documentation for seamless integration.",
  openGraph: {
    title: "Integration Marketplace | Zaza Draft",
    description: "Connect Zaza Draft with 50+ education tools. Setup guides and documentation included.",
    type: "website",
  },
}

export default function IntegrationsPage() {
  return (
    <>
      <Script id="integrations-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Zaza Draft Integrations",
          description: "50+ education tool integrations for Zaza Draft",
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
  )
}
import type { Metadata } from "next"


