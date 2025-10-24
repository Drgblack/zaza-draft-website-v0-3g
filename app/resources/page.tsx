import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/resources",
    languages: {
      en: "https://zazadraft.com/resources",
      de: "https://zazadraft.com/de/resources",
    },
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
