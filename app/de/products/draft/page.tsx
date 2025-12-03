import type { Metadata } from "next"
import DraftClient from "@/app/products/draft/draft-client"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/teacher-writing-parent-email-on-laptop.jpg"

export const metadata: Metadata = {
  title: "Zaza Draft | KI für Elternkommunikation, die Lehrkräften Zeit spart",
  description:
    "Schreibe ruhigere Elternmails in Minuten. Zaza Draft hält deinen Ton, setzt Sicherheitschecks und spart dir jede Woche Stunden.",
  alternates: {
    canonical: "https://zazadraft.com/de/products/draft",
    languages: {
      en: "https://zazadraft.com/products/draft",
      de: "https://zazadraft.com/de/products/draft",
    },
  },
  openGraph: {
    title: "Zaza Draft | KI für Elternkommunikation, die Lehrkräften Zeit spart",
    description: "Ruhige, klare Elternmails mit Ton-Guardrails und Sicherheitschecks. Schneller schreiben, Stimme behalten.",
    url: "https://zazadraft.com/de/products/draft",
    type: "website",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Lehrkraft verfasst eine Elternmail mit Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft | Elternkommunikation mit KI-Unterstützung",
    description: "Schreibe Elternmails schneller und sicherer – mit Guardrails, die deinen Ton schützen.",
    images: [ogImage],
  },
}

export default function DraftDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <DraftClient />
    </>
  )
}
