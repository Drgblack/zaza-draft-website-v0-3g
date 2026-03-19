import type { Metadata } from "next";
import { ContactClient } from "./contact-client";

const pageUrl = "https://zazadraft.com/contact";
const ogImage = "/hero/teacher.jpg";

export const metadata: Metadata = {
  title: "Contact Sales | Zaza Draft for Schools & Districts",
  description:
    "Tell the Zaza Draft team about your school or district and get guidance on the right rollout option.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/contact",
    },
  },
  openGraph: {
    title: "Contact Sales | Zaza Draft for Schools & Districts",
    description:
      "Connect with the Zaza Draft team about rollout options for your school or district.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [{ url: ogImage, alt: "Teacher contacting Zaza Draft support" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sales | Zaza Draft for Schools & Districts",
    description:
      "Connect with the Zaza Draft team about rollout options for your school or district.",
    images: [ogImage],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
