import type { Metadata } from "next";

import { getAllPosts } from "@/lib/cms/posts";
import { BlogClient } from "./blog-client";

export const metadata: Metadata = {
  title: "Blog | Zaza Draft - Teacher AI Insights & Tips",
  description:
    "Deep-dive articles on AI, parent communication, and lesson planning for teachers using Zaza Draft.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} language="en" />;
}
