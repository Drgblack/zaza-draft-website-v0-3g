import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import SuiteClient from "./SuiteClient"

export async function generateMetadata(): Promise<Metadata> {
  // Best-effort locale detection: cookie > URL prefix (if present) > default EN
  const langCookie = cookies().get("language")?.value
  const referer = headers().get("referer") || ""
  const hrefHint = headers().get("x-pathname") || ""
  const path = hrefHint || referer
  const locale = langCookie === "de" || path.includes("/de/") || path.endsWith("/de") ? "de" : "en"

  const titles = {
    en: "Zaza Suite: Safe, teacher-first AI apps",
    de: "Zaza Suite: Sichere, lehrerzentrierte KI-Apps",
  }
  const descriptions = {
    en: "A family of safe, teacher-first AI apps that reduce workload and strengthen teacher efficiency and well-being. Powered by Zaza KnowledgeCore for trusted, explainable AI and consistent school-ready safeguards.",
    de: "Eine Familie sicherer, lehrerzentrierter KI-Apps zur Reduktion des Arbeitsaufwands und StÃ¤rkung von Effizienz und Wohlbefinden. Betrieben von der Zaza KnowledgeCore Plattform mit vertrauenswÃ¼rdiger, erklÃ¤rbarer KI und konsistenten, schulbereiten Schutzmechanismen.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: "https://zazadraft.com/suite",
      languages: {
        en: "https://zazadraft.com/suite",
        de: "https://zazadraft.com/de/suite",
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      url: locale === "de" ? "https://zazadraft.com/de/suite" : "https://zazadraft.com/suite",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
    },
  }
}

export default function SuitePage() {
  return <SuiteClient />
}
