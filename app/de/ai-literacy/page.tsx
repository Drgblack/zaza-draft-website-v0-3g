'use client';
import type { Metadata } from "next"
import { CourseSchema, BreadcrumbSchema } from "@/lib/seo/schema"
import AILiteracyClient from "../../ai-literacy/ai-literacy-client"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "KI-Kompetenz fur Lehrkrafte | Kostenlose Kurse & Zertifizierung | Zaza Draft",
  description:
    "Kurse, Zertifizierungen und Ressourcen fur einen sicheren, souveranen KI-Einsatz im Unterricht. NEEDS NATIVE REVIEW",
  openGraph: {
    title: "KI-Kompetenz-Zentrum fur Lehrkrafte",
    description:
      "Kostenlose Kurse, Zertifizierungen und Ressourcen fur Lehrkrafte zum sicheren KI-Einsatz. NEEDS NATIVE REVIEW",
    type: "website",
    url: "https://zazadraft.com/de/ai-literacy",
  },
}

export default function Page() {
  return (
    <>
      <CourseSchema
        name="KI-Kompetenz fur Lehrkrafte"
        description="Umfassendes KI-Programm mit Kursen, Zertifikaten und Ressourcen fur Lehrkrafte. NEEDS NATIVE REVIEW"
        provider="Zaza Draft"
        url="https://zazadraft.com/de/ai-literacy"
      />
      <BreadcrumbSchema
        items={[
          { name: "Startseite", url: "https://zazadraft.com/de" },
          { name: "KI-Kompetenz", url: "https://zazadraft.com/de/ai-literacy" },
        ]}
      />
      <AILiteracyClient />
    </>
  )
}




