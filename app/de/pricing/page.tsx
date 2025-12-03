import type { Metadata } from "next"
import PricingClient from "@/app/pricing/PricingClient"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/professional-female-teacher-in-modern-classroom.jpg"

export const metadata: Metadata = {
  title: "Preise | Zaza Draft Tarife für Lehrkräfte",
  description:
    "Transparente Preise für Zaza Draft und die Zaza Suite. Starte kostenlos und wechsle, wenn du bereit bist.",
  alternates: {
    canonical: "https://zazadraft.com/de/pricing",
    languages: {
      en: "https://zazadraft.com/pricing",
      de: "https://zazadraft.com/de/pricing",
    },
  },
  openGraph: {
    title: "Preise | Zaza Draft Tarife für Lehrkräfte",
    description: "Starte kostenlos. Schalte schnellere Elternbriefe, ruhigere Antworten und sichere Guardrails frei.",
    url: "https://zazadraft.com/de/pricing",
    type: "website",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Lehrkraft prüft die Preise von Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preise | Zaza Draft Tarife für Lehrkräfte",
    description: "Transparente Tarife für lehrerzentrierte KI-Schreibhilfe. Starte kostenlos, upgrade jederzeit.",
    images: [ogImage],
  },
}

export default function PricingDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <PricingClient />
    </>
  )
}
