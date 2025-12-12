import type { Metadata } from "next"
import { ContactClient } from "./contact-client"

const pageUrl = "https://zazadraft.com/contact"
const ogImage = "/hero/teacher.jpg"

export const metadata: Metadata = {
  title: "Contact Us | Zaza Draft Support",
  description:
    "Get in touch with the Zaza Draft team. We are here to help teachers with support, questions, and feedback.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/contact",
    },
  },
  openGraph: {
    title: "Contact Us | Zaza Draft Support",
    description:
      "Connect with the Zaza Draft team to get help with onboarding, feedback, or product questions.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [{ url: ogImage, alt: "Teacher contacting Zaza Draft support" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Zaza Draft Support",
    description:
      "Connect with the Zaza Draft team to get help with onboarding, feedback, or product questions.",
    images: [ogImage],
  },
}

export default function ContactPage() {
  return <ContactClient />
}
