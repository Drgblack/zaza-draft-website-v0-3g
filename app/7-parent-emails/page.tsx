import type { Metadata } from "next";
import { SetLanguage } from "@/components/set-language";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import SevenParentEmailsClient from "./seven-parent-emails-client";

export const metadata: Metadata = buildPageMetadata({
  title: "7 Parent Emails Teachers Should Never Send As-Is | Zaza Draft",
  description:
    "Free realistic examples for teachers who want calmer, more professional parent communication, plus a quick checker for risky drafts before sending.",
  path: "/7-parent-emails",
  image: "/teacher-writing-parent-email-on-laptop.jpg",
  keywords: [
    "7 parent emails teachers should never send as is",
    "parent email guide for teachers",
    "teacher parent communication examples",
    "parent email risk checker",
    "teacher email tone help",
  ],
});

export default function SevenParentEmailsPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <SevenParentEmailsClient />
    </>
  );
}
