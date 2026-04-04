import type { Metadata } from "next";
import { SetLanguage } from "@/components/set-language";
import { buildCanonicalAlternates } from "@/lib/seo-canonical";
import ParentEmailRiskCheckerClient from "./parent-email-risk-checker-client";

export const metadata: Metadata = {
  title: "Parent Email Risk Checker for Teachers | Zaza Draft",
  description:
    "Paste a draft parent email and check the tone risk before you send it. Get a risk score, flagged issues, and a calmer rewritten version built for teachers.",
  alternates: buildCanonicalAlternates("/parent-email-risk-checker"),
};

export default function ParentEmailRiskCheckerPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailRiskCheckerClient />
    </>
  );
}
