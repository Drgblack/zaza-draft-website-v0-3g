import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/about"

export const metadata: Metadata = {
  title: "About Zaza Draft | Teacher-first AI for education",
  description:
    "Meet the Zaza Draft team and see how we build teacher-first AI with safety guardrails, transparency, and professional integrity.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/about",
    },
  },
  openGraph: {
    title: "About Zaza Draft | Teacher-first AI for education",
    description:
      "Meet the Zaza Draft team and see how we build teacher-first AI with safety guardrails, transparency, and professional integrity.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [{ url: "/hero/teacher.jpg", alt: "Zaza Draft team portrait" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Zaza Draft | Teacher-first AI for education",
    description:
      "Meet the Zaza Draft team and see how we build teacher-first AI with safety guardrails, transparency, and professional integrity.",
    images: ["/hero/teacher.jpg"],
  },
}
