import type { Metadata } from "next";

const canonicalUrl = "https://zazadraft.com/de/manifesto";

export const metadata: Metadata = {
  title: "The Zaza Manifesto | Zaza Technologies",
  description:
    "The official Zaza Manifesto: our foundational commitments for trust, thinking, and wellbeing across every Zaza product.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-GB": "https://zazadraft.com/manifesto",
      "de-DE": canonicalUrl,
      "x-default": "https://zazadraft.com/manifesto",
    },
  },
  openGraph: {
    title: "The Zaza Manifesto | Zaza Technologies",
    description:
      "The official Zaza Manifesto: our foundational commitments for trust, thinking, and wellbeing across every Zaza product.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Zaza Manifesto | Zaza Technologies",
    description:
      "The official Zaza Manifesto: our foundational commitments for trust, thinking, and wellbeing across every Zaza product.",
  },
};
