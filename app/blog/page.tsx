import { getAllPosts } from "@/lib/cms/posts"
import { BlogClient } from "./blog-client"

export const metadata = {
  title: "Blog | Zaza Draft - Teacher AI Insights & Tips",
  description:
    "Practical insights on AI, teaching, and effective communication. Learn how to save time with AI tools while maintaining your authentic teacher voice.",
}

export const revalidate = 0

export default function BlogPage() {
  const posts = getAllPosts()

  return <BlogClient posts={posts} language="en" />
}
import type { Metadata } from "next"

export const metadata_disabled_1: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/blog",
    languages: {
      en: "https://zazadraft.com/blog",
      de: "https://zazadraft.com/de/blog",
    },
  },
}
