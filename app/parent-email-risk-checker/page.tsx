import type { Metadata } from "next";
import { SetLanguage } from "@/components/set-language";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import ParentEmailRiskCheckerClient from "./parent-email-risk-checker-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Parent Email Risk Checker for Teachers | Zaza Draft",
  description:
    "Paste a draft parent email and check the tone risk before you send it. Get a risk score, flagged issues, and a calmer rewritten version built for teachers.",
  path: "/parent-email-risk-checker",
  type: "website",
  keywords: [
    "parent email risk checker",
    "teacher tone checker",
    "check parent email before sending",
  ],
  alternates: {
    en: "https://zazadraft.com/parent-email-risk-checker",
    de: "https://zazadraft.com/de/parent-email-risk-checker",
  },
});

export default function ParentEmailRiskCheckerPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailRiskCheckerClient />
    </>
  );
}
