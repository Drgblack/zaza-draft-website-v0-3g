import type { Metadata } from "next"
import { PrivacyClient } from "@/app/privacy/privacy-client"
import { SetLanguage } from "@/components/set-language"

export const metadata: Metadata = {
  title: "Datenschutz | Zaza Draft",
  description: "Wie Zaza Draft personenbezogene Daten verarbeitet und schützt. DSGVO-konforme Richtlinie für Lehrkräfte und Schulen.",
}

export default function PrivacyPage() {
  return (
    <>
      <SetLanguage lang="de" />
      <PrivacyClient />
    </>
  )
}
