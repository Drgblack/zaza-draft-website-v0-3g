import type { Metadata } from "next";
import SeoArticleGeneratorClient from "./generator-client";

export const metadata: Metadata = {
  title: "SEO Article Generator | Internal",
  description:
    "Internal tool for generating Zaza Draft SEO article drafts from keyword tracker exports.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SeoArticleGeneratorPage() {
  return <SeoArticleGeneratorClient />;
}
