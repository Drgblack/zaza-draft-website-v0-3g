import type { Metadata } from "next"
import GlossaryClient from "@/app/glossary/glossary-client"
import { BreadcrumbSchema } from "@/lib/seo/schema"
import { SetLanguage } from "@/components/set-language"

export const metadata: Metadata = {
  title: "KI‑Glossar für Lehrkräfte | Zaza Draft",
  description:
    "Über 150 KI‑Begriffe einfach erklärt. Suche nach Kategorie oder alphabetisch, um KI‑Konzepte für die Bildung zu verstehen.",
  openGraph: {
    title: "KI‑Glossar für Lehrkräfte | Zaza Draft",
    description: "150+ KI‑Begriffe mit praxisnahen Beispielen für Lehrkräfte",
    type: "website",
  },
  alternates: {
    canonical: "https://zazadraft.com/de/glossary",
    languages: {
      en: "https://zazadraft.com/glossary",
      de: "https://zazadraft.com/de/glossary",
    },
  },
}

export default function GlossaryPageDe() {
  return (
    <>
      <SetLanguage lang="de" />
      <BreadcrumbSchema
        items={[
          { name: "Startseite", url: "https://zazadraft.com/de" },
          { name: "KI‑Glossar", url: "https://zazadraft.com/de/glossary" },
        ]}
      />
      <GlossaryClient />
    </>
  )
}

