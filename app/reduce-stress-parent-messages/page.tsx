import type { Metadata } from "next"
import ReduceStressClient from "./reduce-stress-client"

export const metadata: Metadata = {
  title: "How to Reduce Stress from Parent Messages (Without Ignoring Them) | Zaza Draft",
  description:
    "Discover proven strategies to manage parent communication stress while maintaining strong relationships. Learn how AI tools like Zaza Draft help teachers respond faster without sacrificing quality.",
  keywords:
    "teacher stress, parent communication, teacher burnout, parent emails, teacher mental health, AI for teachers, reduce teacher stress",
  openGraph: {
    title: "How to Reduce Stress from Parent Messages | Zaza Draft",
    description: "Proven strategies to manage parent communication stress while maintaining strong relationships.",
    type: "article",
    url: "https://zazadraft.com/reduce-stress-parent-messages",
    images: [
      {
        url: "https://zazadraft.com/og-reduce-stress.jpg",
        width: 1200,
        height: 630,
        alt: "Reduce Stress from Parent Messages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Reduce Stress from Parent Messages | Zaza Draft",
    description: "Proven strategies to manage parent communication stress.",
    images: ["https://zazadraft.com/og-reduce-stress.jpg"],
  },
  alternates: {
    canonical: "https://zazadraft.com/reduce-stress-parent-messages",
  },
}

export default function ReduceStressPage() {
  return <ReduceStressClient />
}
import type { Metadata } from "next"

