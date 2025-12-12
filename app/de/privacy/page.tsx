import type { Metadata } from "next"
import { PrivacyClient } from "@/app/privacy/privacy-client"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/teacher-working-at-desk-with-laptop.jpg"

export const metadata: Metadata = {
  title: "Datenschutz | Zaza Draft",
  description:
    "Wie Zaza Draft personenbezogene Daten verarbeitet und schützt. DSGVO-konforme Richtlinie für Lehrkräfte, Schulen und Partner.",
  openGraph: {
    title: "Datenschutz | Zaza Draft",
    description: "Erfahren Sie, wie wir Lehrkräfte- und Schülerdaten mit klaren, DSGVO-konformen Schutzmaßnahmen sichern.",
    url: "https://zazadraft.com/de/privacy",
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [{ url: "/teacher-working-at-desk-with-laptop.jpg", alt: "Lehrkraft prüft Datenschutzdetails am Laptop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Datenschutz | Zaza Draft",
    description: "DSGVO-konforme Datenschutzrichtlinie für Lehrkräfte, Schulen und Partner.",
    images: ["/teacher-working-at-desk-with-laptop.jpg"],
  },
  alternates: {
    canonical: "https://zazadraft.com/de/privacy",
    languages: {
      en: "https://zazadraft.com/privacy",
      de: "https://zazadraft.com/de/privacy",
    },
  },
}

export default function PrivacyPage() {
  return (
    <>
      <SetLanguage lang="de" />
      <PrivacyClient />
    </>
  )
}
