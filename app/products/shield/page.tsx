import type { Metadata } from "next"
import ShieldClient from "./shield-client"

const ogImage = "/school-safety-shield-icon.jpg"
const canonicalUrl = "https://zazadraft.com/products/shield"

export const metadata: Metadata = {
  title: "Zaza Shield | AI safety and compliance guardrails for schools",
  description:
    "Privacy-first guardrails that keep AI helpful and safe for teachers. Policy enforcement, PII redaction, explainability, and audit trails built for education.",
  openGraph: {
    title: "Zaza Shield | AI safety and compliance guardrails for schools",
    description:
      "Give teachers AI support with the safety, auditability, and policy controls schools need.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: ogImage, alt: "Zaza Shield safety and compliance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Shield | AI safety for education",
    description: "Privacy-first AI guardrails that keep teachers supported and student data protected.",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/products/shield",
    },
  },
}

export default function ShieldPage() {
  return (
    <>
      <ShieldClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Zaza Shield",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              url: "https://zazadraft.com/contact?topic=shield",
              description: "Contact for pricing information",
            },
            description:
              "AI safety and compliance platform for schools providing policy enforcement, PII redaction, and audit trails.",
            brand: {
              "@type": "Brand",
              name: "Zaza",
            },
            audience: {
              "@type": "EducationalAudience",
              educationalRole: "administrator, teacher",
            },
          }),
        }}
      />
    </>
  )
}
