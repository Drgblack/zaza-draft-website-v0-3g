import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/about/company"

export const metadata: Metadata = {
  title: "Company | Zaza Draft",
  description:
    "Learn how Zaza Technologies builds teacher-first AI with a boutique, evidence-driven approach to product and service design.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/about/company",
    },
  },
  openGraph: {
    title: "Company | Zaza Draft",
    description:
      "Learn how Zaza Technologies builds teacher-first AI with a boutique, evidence-driven approach to product and service design.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company | Zaza Draft",
    description:
      "Learn how Zaza Technologies builds teacher-first AI with a boutique, evidence-driven approach to product and service design.",
  },
}
