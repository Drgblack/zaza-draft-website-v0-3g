import { Metadata } from "next";
import { CompareClient } from "./compare-client";

export const metadata: Metadata = {
  title: "Compare Zaza Draft with Other AI Tools | Feature Comparison",
  description:
    "Compare Zaza Draft with other AI tools for teachers. See detailed feature-by-feature comparisons to find the best tool for your needs.",
  alternates: {
    canonical: "https://zazadraft.com/compare",
    languages: {
      en: "/compare",
      de: "/de/compare",
    },
  },
};

export default function ComparePage() {
  return <CompareClient />;
}
