import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/cms/posts"
import type { Metadata } from "next"
import { BlogPostClient } from "./blog-post-client"
import { useMDXComponents } from "@/app/mdx-components";
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Zaza Draft Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug)

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "Zaza Draft",
      logo: {
        "@type": "ImageObject",
        url: "https://zazadraft.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zazadraft.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  )
}


