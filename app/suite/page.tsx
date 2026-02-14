import type { Metadata } from "next";
import SuiteClient from "./SuiteClient";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Zaza Suite | Safe, teacher-first AI apps";
  const description =
    "A family of safe, teacher-first AI apps that cut busywork and protect your voice. Powered by Zaza KnowledgeCore for explainable, classroom-ready guardrails.";
  const ogImage = "/hero-teacher-classroom.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: "https://zazadraft.com/suite",
      languages: {
        en: "https://zazadraft.com/suite",
        de: "https://zazadraft.com/de/suite",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://zazadraft.com/suite",
      siteName: "Zaza Draft",
      locale: "en_GB",
      images: [{ url: ogImage, alt: "Teacher using the Zaza Suite apps" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function SuitePage() {
  return <SuiteClient />;
}
