import type { Metadata } from "next"

const baseUrl = "https://zazadraft.com/de"
const pageTitle = "Zaza Draft | Lehrerzentrierte KI-Schreibhilfe"
const pageDescription =
  "Zaza Draft entlastet Lehrkräfte bei Elternkommunikation, Feedback und Berichten mit sicheren KI-Entwürfen und Tonalitätstransparenz."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: baseUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [{ url: "/hero/teacher.jpg", alt: "Lehrkraft schreibt mit Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/hero/teacher.jpg"],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      en: "https://zazadraft.com",
      de: baseUrl,
    },
  },
}
