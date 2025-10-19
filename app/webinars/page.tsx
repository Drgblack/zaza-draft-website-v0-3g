import type { Metadata } from "next"
import WebinarsClient from "./webinars-client"
import { BreadcrumbSchema } from "@/lib/seo/schema"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Professional Development Webinars | Zaza Draft",
  description:
    "Join live webinars and access on-demand professional development sessions on AI in education. Expert-led training for teachers.",
  openGraph: {
    title: "Professional Development Webinars | Zaza Draft",
    description:
      "Join live webinars and access on-demand professional development sessions on AI in education. Expert-led training for teachers.",
    type: "website",
  },
}

export default function WebinarsPage() {
  return (
    <>
      <Script id="webinar-series-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Zaza Draft Webinar Series",
          description: "Professional development webinars for teachers on AI in education",
          url: "https://zazadraft.com/webinars",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        })}
      </Script>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com" },
          { name: "Webinars", url: "https://zazadraft.com/webinars" },
        ]}
      />
      <WebinarsClient />
    </>
  )
}
