import type { Metadata } from "next"
import { getAllPostsByLanguage } from "@/lib/cms/posts"
import { BlogClient } from "@/app/blog/blog-client"

const ogImage = "/blog/ai-lesson-planning-guide-2025.jpeg"

export const metadata: Metadata = {
  title: "Blog | Zaza Draft – KI-Hilfen und Tipps für Lehrkräfte",
  description:
    "Artikel über Elternkommunikation, Feedback und sichere KI-Nutzung im Unterricht – direkt aus dem Zaza Draft Team und der Lehrkräfte-Community.",
  openGraph: {
    title: "Blog | Zaza Draft",
    description: "Lehrerzentrierte Artikel zu KI-Schreiben, Elternmails und Unterrichts-Workflows.",
    url: "https://zazadraft.com/de/blog",
    type: "website",
    locale: "de_DE",
    images: [{ url: ogImage, alt: "Zaza Draft Blogartikel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft Blog",
    description: "Lehrerzentrierte Artikel zu KI-Schreiben, Elternkommunikation und Unterrichts-Workflows.",
    images: [ogImage],
  },
  alternates: {
    canonical: "https://zazadraft.com/de/blog",
    languages: {
      en: "https://zazadraft.com/blog",
      de: "https://zazadraft.com/de/blog",
    },
  },
}

export default function BlogPageDe() {
  const posts = getAllPostsByLanguage("de")
  return <BlogClient posts={posts} language="de" />
}
