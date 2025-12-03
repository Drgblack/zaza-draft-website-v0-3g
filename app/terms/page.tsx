import type { Metadata } from "next"
import { TermsClient } from "./terms-client"

export const metadata: Metadata = {
  title: "Terms of Service | Zaza Technologies",
  description:
    "Terms of Service for Zaza Draft, Zaza Teach, and GradeFlow. Learn about accounts, subscriptions, intellectual property, and user responsibilities.",
  openGraph: {
    title: "Terms of Service | Zaza Technologies",
    description: "Terms of Service for Zaza Draft, Zaza Teach, and GradeFlow.",
    type: "website",
  },
}

export default function TermsPage() {
  return <TermsClient />
}
import type { Metadata } from "next"


