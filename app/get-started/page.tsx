import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import GetStartedClient from "./get-started-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Get Started Free | Zaza Draft",
  description:
    "Create your free Zaza Draft account to start writing calmer, more professional school communication with teacher-first support.",
  path: "/get-started",
  image: "/images/draft-interface.png",
  alternates: {
    en: "https://zazadraft.com/get-started",
    de: "https://zazadraft.com/de/get-started",
  },
  keywords: [
    "free teacher writing tool",
    "teacher lead capture",
    "get started zaza draft",
  ],
});

export default function GetStartedPage() {
  return <GetStartedClient />;
}
