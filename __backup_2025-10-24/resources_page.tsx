import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Resources | Zaza Draft",
  alternates: {
    canonical: "https://zazadraft.com/resources",
    languages: {
      en: "https://zazadraft.com/resources",
      de: "https://zazadraft.com/de/resources"
    }
  },
  openGraph: {
    title: "Resources | Zaza Draft",
    type: "website",
    url: "https://zazadraft.com/resources"
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Zaza Draft"
  }
};

export default function Page() {
  return <ResourcesClient />;
}