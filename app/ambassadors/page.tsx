import type { Metadata } from "next"
import AmbassadorClient from "./ambassador-client"

export const metadata: Metadata = {
  title: "Teacher Ambassador Program | Zaza Draft",
  description:
    "Join the Zaza Draft Teacher Ambassador Program. Get exclusive perks, early access to features, and help shape the future of AI in education.",
  openGraph: {
    title: "Teacher Ambassador Program | Zaza Draft",
    description:
      "Join the Zaza Draft Teacher Ambassador Program. Get exclusive perks, early access to features, and help shape the future of AI in education.",
    type: "website",
  },
}

export default function AmbassadorPage() {
  return <AmbassadorClient />
}
