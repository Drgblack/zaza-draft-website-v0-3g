import type { Metadata } from "next"
import { ContactClient } from "../../contact/contact-client"

const pageUrl = "https://zazadraft.com/de/contact"
const ogImage = "/hero/teacher.jpg"

export const metadata: Metadata = {
  title: "Kontakt | Zaza Draft Hilfe & Support",
  description:
    "Kontaktieren Sie das Zaza Draft Team. Wir sind hier, um Lehrkräften bei Fragen, Support und Feedback zu helfen.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/contact",
      de: pageUrl,
    },
  },
  openGraph: {
    title: "Kontakt | Zaza Draft Hilfe & Support",
    description:
      "Nehmen Sie Kontakt zum Zaza Draft Team auf, wenn Sie Fragen zu Produkten oder Supportwünsche haben.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Lehrkraft kontaktiert den Zaza Draft Support" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | Zaza Draft Hilfe & Support",
    description:
      "Nehmen Sie Kontakt zum Zaza Draft Team auf, wenn Sie Fragen zu Produkten oder Supportwünsche haben.",
    images: [ogImage],
  },
}

export default function DeContactPage() {
  return <ContactClient />
}
