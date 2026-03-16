import type { Metadata } from "next";
import SignupClient from "./signup-client";

const canonicalUrl = "https://zazadraft.com/signup";

export const metadata: Metadata = {
  title: "Create Your Free Zaza Draft Account | Teacher Writing Support",
  description:
    "Create your free Zaza Draft account and get 10 drafts each month with no credit card required. Upgrade to Teacher later if you want unlimited drafts.",
  openGraph: {
    title: "Create Your Free Zaza Draft Account",
    description:
      "Start using Zaza Draft with 10 free drafts each month. No credit card required for the free plan.",
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
    title: "Create Your Free Zaza Draft Account",
    description:
      "Start with 10 free drafts each month. No credit card required for the free plan.",
    images: ["/images/draft-interface.png"],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/signup",
    },
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
