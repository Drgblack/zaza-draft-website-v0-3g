import type { Metadata } from "next"
import { TermsClient } from "@/app/terms/terms-client"
import { SetLanguage } from "@/components/set-language"

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | Zaza Technologies",
  description:
    "Nutzungsbedingungen für Zaza Draft, Zaza Teach und GradeFlow. Informationen zu Konten, Abonnements, geistigem Eigentum und Pflichten.",
}

export default function TermsPage() {
  return (
    <>
      <SetLanguage lang="de" />
      <TermsClient />
    </>
  )
}
