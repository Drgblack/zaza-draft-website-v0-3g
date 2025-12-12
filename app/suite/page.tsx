import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import SuiteClient from "./SuiteClient"

export async function generateMetadata(): Promise<Metadata> {
  // Best-effort locale detection: cookie > URL prefix (if present) > default EN
  const cookieStore = await cookies()
  const headerStore = await headers()

  const langCookie = cookieStore.get("language")?.value
  const referer = headerStore.get("referer") || ""
  const hrefHint = headerStore.get("x-pathname") || ""
  const path = hrefHint || referer
  const locale = langCookie === "de" || path.includes("/de/") || path.endsWith("/de") ? "de" : "en"

  const titles = {
    en: "Zaza Suite | Safe, teacher-first AI apps",
    de: "Zaza Suite | Sichere, lehrerzentrierte KI-Apps",
  }
  const descriptions = {
    en: "A family of safe, teacher-first AI apps that cut busywork and protect your voice. Powered by Zaza KnowledgeCore for explainable, classroom-ready guardrails.",
    de: "Eine Familie sicherer, lehrerzentrierter KI-Apps, die Routinearbeit reduziert und deine Stimme schützt. Betrieben von Zaza KnowledgeCore für erklärbare, klassenraumtaugliche Schutzmechanismen.",
  }
  const ogImage = "/hero-teacher-classroom.jpg"

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
      siteName: "Zaza Draft",
      locale: locale === "de" ? "de_DE" : "en_GB",
      images: [{ url: ogImage, alt: "Teacher using the Zaza Suite apps" }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: [ogImage],
    },
  }
}

export default function SuitePage() {
  return <SuiteClient />
}
