import type { Metadata } from "next"
import SuiteClient from "@/app/suite/SuiteClient"
import { SetLanguage } from "@/components/set-language"

const pageTitle = "Zaza Suite | Sichere, lehrerzentrierte KI-Apps"
const pageDescription =
  "Eine Familie sicherer KI-Apps, die Routinearbeit reduziert und deine Stimme schützt. Gefördert durch Zaza KnowledgeCore."
const pageUrl = "https://zazadraft.com/de/suite"

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/suite",
      de: pageUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [{ url: "/hero-teacher-classroom.jpg", alt: "Lehrkraft nutzt die Zaza Suite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/hero-teacher-classroom.jpg"],
  },
}

export default function SuiteDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <SuiteClient />
    </>
  )
}
