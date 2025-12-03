import type { Metadata } from "next"
import ResourcesClient from "@/app/resources/ResourcesClient"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/advanced-prompts.jpg"

export const metadata: Metadata = {
  title: "Ressourcen | Zaza Draft",
  description:
    "Kostenlose Leitfäden, Vorlagen und KI-Sicherheitstipps für Lehrkräfte. Lade Ressourcen herunter, die dir Unterricht und Kommunikation erleichtern.",
  openGraph: {
    title: "Ressourcen | Zaza Draft",
    description: "Guides, Vorlagen und KI-Sicherheitstipps speziell für Lehrkräfte.",
    url: "https://zazadraft.com/de/resources",
    type: "website",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Zaza Draft Ressourcenübersicht" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ressourcen | Zaza Draft",
    description: "Kostenlose Lehrkräfte-Ressourcen zu KI, Elternkommunikation und Unterricht.",
    images: [ogImage],
  },
  alternates: {
    canonical: "https://zazadraft.com/de/resources",
    languages: {
      en: "https://zazadraft.com/resources",
      de: "https://zazadraft.com/de/resources",
    },
  },
}

export default function ResourcesPage() {
  return (
    <>
      <SetLanguage lang="de" />
      <ResourcesClient />
    </>
  )
}
