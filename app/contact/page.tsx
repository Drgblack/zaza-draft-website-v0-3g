import { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Zaza Draft Support",
  description:
    "Get in touch with the Zaza Draft team. We are here to help teachers with support, questions, and feedback.",
  alternates: {
    canonical: "https://zazadraft.com/contact",
    languages: {
      en: "/contact",
      de: "/de/contact",
    },
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
