import type { Metadata } from "next";
import { getAllPostsByLanguage } from "@/lib/cms/posts";
import { BlogClient } from "@/app/blog/blog-client";

export const metadata: Metadata = {
  title: "Blog | Zaza Draft - KI-Ideen fÃ¼r LehrkrÃ¤fte",
  description:
    "Vertiefende Artikel zu KI, Elternkommunikation und Unterrichtsplanung fÃ¼r LehrkrÃ¤fte, die Zaza Draft nutzen.",
};

export default function BlogPageDe() {
  const posts = getAllPostsByLanguage("de");
  return <BlogClient posts={posts} language="de" />;
}

