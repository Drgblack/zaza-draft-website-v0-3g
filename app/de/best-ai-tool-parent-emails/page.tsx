import { Metadata } from "next";
// Corrected to explicit relative path (../../) to resolve module not found error on Vercel build
import BestAIToolParentEmailsClient from "../../best-ai-tool-parent-emails/best-ai-tool-parent-emails-client";

export const metadata: Metadata = {
  title: "Das beste KI-Tool für Eltern-E-Mails 2025 | Zaza Draft",
  description:
    "Finden Sie den KI-Assistenten, der speziell für die Lehrer-Eltern-Kommunikation, Tonfallkontrolle und DSGVO-Konformität entwickelt wurde.",
  alternates: {
    canonical: "https://zazadraft.com/de/best-ai-tool-parent-emails",
    languages: {
      en: "/best-ai-tool-parent-emails",
      de: "/de/best-ai-tool-parent-emails",
    },
  },
};

export default function DeBestAIToolPage() {
  return <BestAIToolParentEmailsClient />;
}

