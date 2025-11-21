import { Metadata } from "next";
// Corrected to explicit relative path (../../) and using NAMED import to fix module not found error on Vercel build
import { AiForStudentReportsClient } from "../../ai-for-student-reports/ai-for-student-reports-client";

export const metadata: Metadata = {
  title: "KI für Schülerberichte - Zaza Draft",
  description:
    "Verwandeln Sie Beobachtungen in Sekundenschnelle in professionelle Berichte. Sparen Sie Zeit und verbessern Sie die Qualität Ihrer Zeugnisse.",
  alternates: {
    canonical: "https://zazadraft.com/de/ai-for-student-reports",
    languages: {
      en: "/ai-for-student-reports",
      de: "/de/ai-for-student-reports",
    },
  },
};

export default function DeAIReportsPage() {
  return <AiForStudentReportsClient />;
}
