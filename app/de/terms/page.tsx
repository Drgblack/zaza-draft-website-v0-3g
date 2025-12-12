import type { Metadata } from "next"
import { TermsClient } from "@/app/terms/terms-client"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/professional-headshot.png"

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | Zaza Draft",
  description:
    "Nutzungsbedingungen für Zaza Draft, Zaza Teach, GradeFlow und Shield. Details zu Konten, Abonnements, geistigem Eigentum und Pflichten.",
  openGraph: {
    title: "Nutzungsbedingungen | Zaza Draft",
    description: "Bedingungen zu Konten, Abonnements, zulässiger Nutzung und geistigem Eigentum.",
    url: "https://zazadraft.com/de/terms",
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [{ url: "/professional-headshot.png", alt: "Zaza Draft Markenmotiv" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutzungsbedingungen | Zaza Draft",
    description: "Bedingungen für Zaza Draft und die Zaza Suite Apps.",
    images: ["/professional-headshot.png"],
  },
  alternates: {
    canonical: "https://zazadraft.com/de/terms",
    languages: {
      en: "https://zazadraft.com/terms",
      de: "https://zazadraft.com/de/terms",
    },
  },
}

export default function TermsPage() {
  return (
    <>
      <SetLanguage lang="de" />
      <TermsClient />
    </>
  )
}
