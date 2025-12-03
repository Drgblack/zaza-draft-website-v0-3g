import type { Metadata } from "next"
import FounderPage from "@/app/about/founder/page"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/greg-blackburn-headshot.jpg"

export const metadata: Metadata = {
  title: "Gründer | Dr. Greg Blackburn | Zaza Draft",
  description:
    "Lerne Dr. Greg Blackburn kennen – Lernwissenschaftler und Gründer von Zaza Draft. 20 Jahre L&D-Erfahrung, jetzt sichere KI-Schreibhilfe für Lehrkräfte.",
  openGraph: {
    title: "Gründer | Dr. Greg Blackburn | Zaza Draft",
    description:
      "Warum Dr. Greg Blackburn Zaza Draft gebaut hat: Elternkommunikation beruhigen, Lehrkräften Zeit und Stimme zurückgeben.",
    url: "https://zazadraft.com/de/about/founder",
    type: "profile",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Dr. Greg Blackburn, Gründer von Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Greg Blackburn | Gründer von Zaza Draft",
    description: "Lernwissenschaftler, der lehrerzentrierte KI-Schreibhilfe entwickelt.",
    images: [ogImage],
  },
  alternates: {
    canonical: "https://zazadraft.com/de/about/founder",
    languages: {
      en: "https://zazadraft.com/about/founder",
      de: "https://zazadraft.com/de/about/founder",
    },
  },
}

export default function FounderDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <FounderPage />
    </>
  )
}
