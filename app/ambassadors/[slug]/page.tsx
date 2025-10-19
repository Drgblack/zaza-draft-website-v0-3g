import type { Metadata } from "next"
import AmbassadorProfileClient from "./ambassador-profile-client"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ambassadorName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${ambassadorName} - Zaza Draft Ambassador | Teacher Success Story`,
    description: `Meet ${ambassadorName}, a Zaza Draft Ambassador sharing their journey with AI in education. Learn how they're transforming their classroom and helping other teachers succeed.`,
    openGraph: {
      title: `${ambassadorName} - Zaza Draft Ambassador`,
      description: `Meet ${ambassadorName}, a Zaza Draft Ambassador sharing their journey with AI in education.`,
      type: "profile",
    },
  }
}

export default function AmbassadorProfilePage({ params }: { params: { slug: string } }) {
  return <AmbassadorProfileClient slug={params.slug} />
}
