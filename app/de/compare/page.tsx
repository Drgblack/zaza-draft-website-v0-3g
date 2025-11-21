import { Metadata } from "next";
// Import the client component from the relative path
import { CompareClient } from "../../compare/compare-client";

export const metadata: Metadata = {
  title: "Zaza Draft im Vergleich zu anderen KI-Tools | Funktionsvergleich",
  description:
    "Vergleichen Sie Zaza Draft mit anderen KI-Tools für Lehrer. Detaillierte Vergleiche helfen Ihnen, das beste Tool für Ihre Bedürfnisse zu finden.",
  alternates: {
    canonical: "https://zazadraft.com/de/compare",
    languages: {
      en: "/compare",
      de: "/de/compare",
    },
  },
};

export default function DeComparePage() {
  return <CompareClient />;
}
