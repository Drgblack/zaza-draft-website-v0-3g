import type { Metadata } from "next"
import ShieldClient from "./shield-client"

export const metadata: Metadata = {
  title: "Zaza Shield - AI Safety & Compliance for Schools | Zaza",
  description:
    "Privacy-first AI guardrails for teachers and schools. Policy enforcement, PII redaction, explainability, and audit trails built for education.",
  keywords: [
    "AI safety",
    "school compliance",
    "FERPA",
    "GDPR",
    "AI guardrails",
    "education technology",
    "teacher AI tools",
    "student privacy",
  ],
  openGraph: {
    title: "Zaza Shield - AI Safety & Compliance for Schools",
    description: "Give teachers AI superpowers with the safety and compliance schools demand.",
    type: "website",
    url: "https://zazadraft.com/products/shield",
    images: [
      {
        url: "https://zazadraft.com/og-images/shield-og.png",
        width: 1200,
        height: 630,
        alt: "Zaza Shield",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Shield - AI Safety & Compliance for Schools",
    description: "Privacy-first AI guardrails built for education.",
    images: ["https://zazadraft.com/og-images/shield-twitter.png"],
  },
  alternates: {
    canonical: "https://zazadraft.com/products/shield",
    languages: {
      en: "https://zazadraft.com/products/shield",
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

