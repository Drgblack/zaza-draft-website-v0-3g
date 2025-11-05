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

