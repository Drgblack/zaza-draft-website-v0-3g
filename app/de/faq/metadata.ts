import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/de/faq"

export const metadata: Metadata = {
  title: "FAQ | Zaza Draft",
  description:
    "Antworten auf häufig gestellte Fragen zu Zaza Draft, KI-Sicherheit, Datenschutz, Preisen und dem Unterrichtseinsatz.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/faq",
      de: pageUrl,
    },
  },
  openGraph: {
    title: "FAQ | Zaza Draft",
    description:
      "Antworten auf häufig gestellte Fragen zu Zaza Draft, KI-Sicherheit, Datenschutz, Preisen und dem Unterrichtseinsatz.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Zaza Draft",
    description:
      "Antworten auf häufig gestellte Fragen zu Zaza Draft, KI-Sicherheit, Datenschutz, Preisen und dem Unterrichtseinsatz.",
  },
}
