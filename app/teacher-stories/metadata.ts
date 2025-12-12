import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/teacher-stories"

export const metadata: Metadata = {
  title: "Teacher Stories | Zaza Draft",
  description:
    "Teacher stories sharing how Zaza Draft keeps communications calm and makes report season more manageable.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
    },
  },
  openGraph: {
    title: "Teacher Stories | Zaza Draft",
    description:
      "Teacher stories sharing how Zaza Draft keeps communications calm and makes report season more manageable.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teacher Stories | Zaza Draft",
    description:
      "Teacher stories sharing how Zaza Draft keeps communications calm and makes report season more manageable.",
  },
}
