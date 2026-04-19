import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import JessicaReedFunnel from "../funnel/JessicaReedFunnel";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Start Writing Calm Parent Emails and Better Report Comments | Zaza Draft",
  description:
    "Start with the draft that still does not sound right. Zaza Draft helps teachers improve tone, professionalism, and report-comment quality before sending or submitting.",
  path: "/start",
  alternates: {
    en: "https://zazadraft.com/start",
    de: "https://zazadraft.com/de/start",
  },
  keywords: [
    "teacher email tone support",
    "professional parent emails for teachers",
    "better report comments for teachers",
  ],
});

export default function StartPage() {
  return <JessicaReedFunnel locale="en" />;
}
