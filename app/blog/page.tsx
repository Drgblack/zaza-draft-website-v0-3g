import type { Metadata } from "next"
import { getAllPostsByLanguage } from "@/lib/cms/posts"
import { BlogClient } from "./blog-client"

const ogImage = "/blog/ai-lesson-planning-guide-2025.jpeg"

export const metadata: Metadata = {
  title: "Blog | Zaza Draft – teacher-first AI tips and updates",
  description:
    "Guides on calmer parent emails, faster feedback, and safer AI for teachers. Stories from the Zaza Draft team and classroom community.",
  openGraph: {
    title: "Blog | Zaza Draft",
    description: "Teacher-first guides on AI writing, parent messages, and lesson workflows.",
    url: "https://zazadraft.com/blog",
    type: "website",
    images: [{ url: ogImage, alt: "Zaza Draft blog hero article" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft Blog",
    description: "Teacher-first articles on AI writing support, parent communication, and lesson workflows.",
    images: [ogImage],
  },
  alternates: {
    canonical: "https://zazadraft.com/blog",
    languages: {
      en: "https://zazadraft.com/blog",
      de: "https://zazadraft.com/de/blog",
    },
  },
}

export default function BlogPage() {
  const posts = getAllPostsByLanguage("en")

  return <BlogClient posts={posts} language="en" />
}
