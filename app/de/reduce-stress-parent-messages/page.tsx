import type { Metadata } from "next"
import ReduceStressClient from "@/app/reduce-stress-parent-messages/reduce-stress-client"

export const metadata: Metadata = {
  title: "Weniger Stress mit Elternnachrichten | Zaza Draft",
  description:
    "Entdecken Sie, wie Zaza Draft Lehrkräften hilft, Elternnachrichten schneller, klarer und stressärmer zu schreiben - auf Englisch oder Deutsch.",
}

export default function ReduceStressPage() {
  return <ReduceStressClient />
}
