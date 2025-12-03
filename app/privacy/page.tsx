import type { Metadata } from "next"
import { PrivacyClient } from "./privacy-client"

const ogImage = "/teacher-working-at-desk-with-laptop.jpg"
const canonicalUrl = "https://zazadraft.com/privacy"

export const metadata: Metadata = {
  title: "Privacy Policy | Zaza Draft",
  description:
    "How Zaza Draft collects, uses, and protects your data. GDPR-ready policy built for teachers, schools, and partners.",
  openGraph: {
    title: "Privacy Policy | Zaza Draft",
    description: "Learn how we protect teacher and student data with privacy-first safeguards.",
    url: canonicalUrl,
    type: "article",
    images: [{ url: ogImage, alt: "Teacher working at a laptop reviewing privacy details" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Zaza Draft",
    description: "GDPR-ready privacy approach designed for classrooms and school partners.",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/privacy",
    },
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
