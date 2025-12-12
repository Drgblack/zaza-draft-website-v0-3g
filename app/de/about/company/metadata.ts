import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/de/about/company"

export const metadata: Metadata = {
  title: "Unternehmen | Zaza Draft",
  description:
    "Erfahren Sie, wie Zaza Technologies lehrerzentrierte KI mit einer Boutique-Philosophie und datenbasierten Erkenntnissen entwickelt.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/about/company",
      de: pageUrl,
    },
  },
  openGraph: {
    title: "Unternehmen | Zaza Draft",
    description:
      "Erfahren Sie, wie Zaza Technologies lehrerzentrierte KI mit einer Boutique-Philosophie und datenbasierten Erkenntnissen entwickelt.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unternehmen | Zaza Draft",
    description:
      "Erfahren Sie, wie Zaza Technologies lehrerzentrierte KI mit einer Boutique-Philosophie und datenbasierten Erkenntnissen entwickelt.",
  },
}
