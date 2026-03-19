import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactClient } from "../../contact/contact-client";

const pageUrl = "https://zazadraft.com/de/contact";
const ogImage = "/hero/teacher.jpg";

export const metadata: Metadata = {
  title: "Kontakt | Zaza Draft für Schulen & Bezirke",
  description:
    "Erzählen Sie dem Zaza Draft Team von Ihrer Schule oder Ihrem Bezirk und wir helfen bei der passenden Rollout-Option.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: "https://zazadraft.com/contact",
      de: pageUrl,
    },
  },
  openGraph: {
    title: "Kontakt | Zaza Draft für Schulen & Bezirke",
    description:
      "Nehmen Sie Kontakt zum Zaza Draft Team auf, wenn Sie eine Rollout-Option für Schule oder Bezirk prüfen möchten.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    images: [
      { url: ogImage, alt: "Lehrkraft kontaktiert den Zaza Draft Support" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | Zaza Draft für Schulen & Bezirke",
    description:
      "Nehmen Sie Kontakt zum Zaza Draft Team auf, wenn Sie eine Rollout-Option für Schule oder Bezirk prüfen möchten.",
    images: [ogImage],
  },
};

export default function DeContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactClient />
    </Suspense>
  );
}
