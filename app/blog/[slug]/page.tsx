import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getPostImage,
} from "@/lib/cms/posts";
import { BlogPostClient } from "./blog-post-client";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Zaza Draft",
      description: "This blog post could not be found.",
    };
  }

  const image = getPostImage(post.slug);

  return {
    title: `${post.title} | Zaza Draft`,
    description: post.excerpt ?? "",
    openGraph: {
      title: `${post.title} | Zaza Draft`,
      description: post.excerpt ?? "",
      type: "article",
      url: `https://zazadraft.com/blog/${post.slug}`,
      images: image ? [image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Zaza Draft`,
      description: post.excerpt ?? "",
      images: image ? [image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);
  const imageSrc = getPostImage(post.slug);

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? "",
    image: imageSrc ? [`https://zazadraft.com${imageSrc}`] : [],
    author: {
      "@type": "Person",
      name: "Zaza Draft",
    },
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zazadraft.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6 lg:px-0">
        {/* HERO IMAGE FIRST (FIX FOR CUT-OFF TAGS) */}
        {imageSrc && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* CONTENT RENDERED BY CLIENT COMPONENT */}
        <BlogPostClient post={post} relatedPosts={relatedPosts} />
      </article>
    </>
  );
}
