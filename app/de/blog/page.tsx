import type { Metadata } from "next";
import { getAllPostsByLanguage } from "@/lib/cms/posts";
import { BlogClient } from "@/app/blog/blog-client";

export const metadata: Metadata = {
  title: "Blog | Zaza Draft - KI-Ideen für Lehrkräfte",
  description:
    "Vertiefende Artikel zu KI, Elternkommunikation und Unterrichtsplanung für Lehrkräfte, die Zaza Draft nutzen.",
};

export default function BlogPageDe() {
  const posts = getAllPostsByLanguage("de");
  return <BlogClient posts={posts} language="de" />;
}

