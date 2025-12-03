import { Metadata } from "next";
import { ContactClient } from "../../contact/contact-client";

export const metadata: Metadata = {
  title: "Kontakt | Zaza Draft Hilfe & Support",
  description:
    "Kontaktieren Sie das Zaza Draft Team. Wir sind hier, um Lehrern bei Fragen, Support und Feedback zu helfen.",
  alternates: {
    canonical: "https://zazadraft.com/de/contact",
    languages: {
      en: "/contact",
      de: "/de/contact",
    },
  },
};

export default function DeContactPage() {
  return <ContactClient />;
}

