import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import GetStartedClient from "./get-started-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Get Started Free | Zaza Draft",
  description:
    "Enter your email to get a secure sign-in link for Zaza Draft. No password required.",
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
