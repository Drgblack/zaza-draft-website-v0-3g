import type { Metadata } from "next"
import { AboutSidebar } from "@/components/about-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AssetCard } from "@/components/asset-card"
import { ExpandableBio } from "@/components/expandable-bio"
import { Button } from "@/components/ui/button"
import { Mail, ExternalLink, Download, Sparkles, Quote, Award } from "lucide-react"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/press-kit/screenshot-hero-preview.jpg"

export const metadata: Metadata = {
  title: "Presse-Kit | Zaza Draft Medienpaket",
  description:
    "Alles für deine Berichterstattung über Zaza Draft: Logos, Screenshots, Brand-Guidelines, Factsheet und Gründer-Bio mit Pressekontakt.",
  openGraph: {
    title: "Presse-Kit | Zaza Draft",
    description:
      "Logos, Screenshots, Brand-Guidelines und Gründer-Bio – sofort nutzbare Medienressourcen für Journalist:innen und Partner.",
    url: "https://zazadraft.com/de/about/press",
    type: "website",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Zaza Draft Presse-Kit Vorschau" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Presse-Kit | Zaza Draft",
    description: "Logos, Screenshots, Richtlinien und Gründer-Bio für deine Berichterstattung.",
    images: [ogImage],
  },
  alternates: {
    canonical: "https://zazadraft.com/de/about/press",
    languages: {
      en: "https://zazadraft.com/about/press",
      de: "https://zazadraft.com/de/about/press",
    },
  },
}
