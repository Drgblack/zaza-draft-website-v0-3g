import { Metadata } from "next";
import { AiForStudentReportsClient } from "./ai-for-student-reports-client";

export const metadata: Metadata = {
  title: "AI for Student Reports | Zaza Draft",
  description: "Turn observations into professional reports in seconds.",
};

export default function AiForStudentReportsPage() {
  return <AiForStudentReportsClient />;
}

