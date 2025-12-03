import type { Metadata } from "next"
import CommunityClient from "./community-client"
import { BreadcrumbSchema } from "@/lib/seo/schema"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Teacher Community Forum | Zaza Draft",
  description:
    "Join 25,000+ teachers in our AI education community. Share strategies, ask questions, and connect with educators using AI tools.",
  openGraph: {
    title: "Teacher Community Forum | Zaza Draft",
    description:
      "Join 25,000+ teachers in our AI education community. Share strategies, ask questions, and connect with educators using AI tools.",
    type: "website",
  },
}

export default function CommunityPage() {
  return (
    <>
      <Script id="community-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DiscussionForumPosting",
          headline: "Teacher Community Forum",
          description: "Connect with 25,000+ teachers using AI in education",
          url: "https://zazadraft.com/community",
          author: {
            "@type": "Organization",
            name: "Zaza Draft",
          },
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/CommentAction",
            userInteractionCount: 98000,
          },
        })}
      </Script>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com" },
          { name: "Community", url: "https://zazadraft.com/community" },
        ]}
      />
      <CommunityClient />
    </>
  )
}
import type { Metadata } from "next"


