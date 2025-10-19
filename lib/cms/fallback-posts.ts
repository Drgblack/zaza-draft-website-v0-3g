import type { BlogPost } from "@/lib/cms/posts"

const fallback: BlogPost[] = [
  {
    id: "placeholder",
    title: "Blog loading",
    slug: "blog-loading",
    excerpt: "Content will appear here shortly.",
    content: "Temporary placeholder to keep the site stable.",
    publishedAt: "1970-01-01",
    tags: ["system"]
  }
]

export default fallback

