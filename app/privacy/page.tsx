import type { Metadata } from "next"
import { PrivacyClient } from "./privacy-client"

export const metadata: Metadata = {
  title: "Privacy Policy | Zaza Draft (Zaza Technologies)",
  description:
    "How Zaza Draft collects, uses, and protects your data. GDPR-ready policy for teachers, schools, and partners.",
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
import type { Metadata } from "next"


