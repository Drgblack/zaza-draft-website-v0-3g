import type { Metadata } from "next";
import EarlyAccessClient from "./early-access-client";

const canonicalUrl = "https://zazadraft.com/early-access";

export const metadata: Metadata = {
  title: "Zaza Draft Early Access | Shape the teacher-first AI",
  description:
    "Join the Zaza Draft Early-Access Programme to guide our teacher-first writing assistant, try guided drafts, and explore insights before anyone else.",
  openGraph: {
    title: "Zaza Draft Early Access | Shape the teacher-first AI",
    description:
      "Help co-design guided drafts, tone guardrails, and insights dashboards by joining the private beta for Zaza Draft.",
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
    title: "Join Zaza Draft Early Access",
    description:
      "Help shape teacher-first guided drafts, tone guardrails, and progress insights in the private beta.",
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
