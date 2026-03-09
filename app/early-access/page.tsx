import type { Metadata } from "next";
import EarlyAccessClient from "./early-access-client";

const canonicalUrl = "https://zazadraft.com/early-access";

export const metadata: Metadata = {
  title: "Join the Zaza Draft Waitlist | Teacher-first AI writing",
  description:
    "Join the Zaza Draft waitlist to hear when teacher access opens. Get launch updates, product news, and early access for calmer school writing support.",
  openGraph: {
    title: "Join the Zaza Draft Waitlist",
    description:
      "Be first to hear when Zaza Draft opens to teachers. Join the waitlist for launch updates and early access.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [
      {
        url: "/images/draft-interface.png",
        alt: "Zaza Draft guided drafting interface",
      },
      {
        url: "/images/insights-dashboard.png",
        alt: "Zaza Draft insights dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Zaza Draft Waitlist",
    description:
      "Join the waitlist for launch updates, early access, and product news from Zaza Draft.",
    images: ["/images/draft-interface.png"],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/early-access",
    },
  },
};

export default function EarlyAccessPage() {
  return <EarlyAccessClient />;
}
