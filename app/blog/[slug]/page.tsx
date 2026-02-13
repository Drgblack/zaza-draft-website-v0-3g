import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getAllPostsByLanguage,
  getPostBySlugAndLanguage,
  getRelatedPosts,
  getPostImage,
} from "@/lib/cms/posts";
import { BlogPostClient } from "./blog-post-client";

export async function generateStaticParams() {
  return getAllPostsByLanguage("en").map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlugAndLanguage(slug, "en");

  if (!post) {
    return {
      title: "Post not found | Zaza Draft",
      description: "This blog post could not be found.",
    };
  }

  const image = post.ogImage ?? getPostImage(post.slug);
  const urlPath = `/blog/${post.slug}`;

  return {
    title: `${post.title} | Zaza Draft`,
    description: post.excerpt ?? "",
    openGraph: {
      title: `${post.title} | Zaza Draft`,
      description: post.excerpt ?? "",
      type: "article",
      url: `https://zazadraft.com${urlPath}`,
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
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
  const post = getPostBySlugAndLanguage(slug, "en");

  if (!post) {
    notFound();
    return null;
  }

  const relatedPosts = getRelatedPosts(slug, "en");
  const imageSrc = post.ogImage ?? getPostImage(post.slug);
  const urlPath = `/blog/${post.slug}`;

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
    datePublished: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zazadraft.com${urlPath}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6 lg:px-0">
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

        <BlogPostClient post={post} relatedPosts={relatedPosts} />
      </article>
    </>
  );
}
