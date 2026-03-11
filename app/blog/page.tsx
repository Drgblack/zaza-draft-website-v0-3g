import type { Metadata } from "next";
import { getAllPostsByLanguage } from "@/lib/cms/posts";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { BlogClient } from "./blog-client";

const ogImage = "/blog/ai-lesson-planning-guide-2025.jpeg";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher Writing Guides for Parent Emails, Reports, and AI Safety | Zaza Draft",
  description:
    "Explore teacher-first guides on parent communication, report comments, behaviour emails, safeguarding-sensitive wording, and calmer AI writing support for schools.",
  path: "/blog",
  image: ogImage,
  alternates: {
    en: "https://zazadraft.com/blog",
    de: "https://zazadraft.com/de/blog",
  },
  keywords: [
    "teacher writing blog",
    "parent email templates for teachers",
    "report writing help for teachers",
    "AI safety for teachers",
  ],
});

export default function BlogPage() {
  const posts = getAllPostsByLanguage("en");

  return <BlogClient posts={posts} language="en" />;
}
