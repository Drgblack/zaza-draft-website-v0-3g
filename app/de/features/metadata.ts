import type { Metadata } from "next";

const pageUrl = "https://zazadraft.com/de/features";

export const metadata: Metadata = {
  title:
    "Funktionen fuer professionelle Elternkommunikation und Berichte | Zaza Draft",
  description:
    "Entdecken Sie Funktionen fuer professionelle Elternmails, ruhigere Formulierungen, aussagekraeftigere Zeugnisbemerkungen und durchdachte Schulkommunikation.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/features",
      de: pageUrl,
    },
  },
  openGraph: {
    title:
      "Funktionen fuer professionelle Elternkommunikation und Berichte | Zaza Draft",
    description:
      "Entdecken Sie Funktionen fuer professionelle Elternmails, ruhigere Formulierungen, aussagekraeftigere Zeugnisbemerkungen und durchdachte Schulkommunikation.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Funktionen fuer professionelle Elternkommunikation und Berichte | Zaza Draft",
    description:
      "Funktionen fuer professionelle Elternmails, Ton-Sicherheit und aussagekraeftigere Berichte.",
  },
};
