import type { Metadata } from "next";
import Image from "next/image";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

import {
  getAllSlugs,
  getPostBySlugAndLanguage,
  getRelatedPosts,
  getPostImage,
} from "@/lib/cms/posts";
import { BlogPostClient } from "./blog-post-client";

async function detectLanguage(): Promise<"en" | "de"> {
  const hdrs = await headers();
  const headerLang = hdrs.get("x-lang");
  if (headerLang === "de" || headerLang === "en") return headerLang;

  const langCookie = cookies().get("lang")?.value ?? cookies().get("language")?.value;
  return langCookie === "de" ? "de" : "en";
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const language = await detectLanguage();
  const post =
    getPostBySlugAndLanguage(slug, language) ??
    getPostBySlugAndLanguage(slug, "en");

  if (!post) {
    return {
      title: "Post not found | Zaza Draft",
      description: "This blog post could not be found.",
    };
  }

  const image = post.ogImage ?? getPostImage(post.slug);
  const urlPath = language === "de" ? `/de/blog/${post.slug}` : `/blog/${post.slug}`;

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
  const language = await detectLanguage();
  const post =
    getPostBySlugAndLanguage(slug, language) ??
    getPostBySlugAndLanguage(slug, "en");

  if (!post) {
    notFound();
    return null;
  }

  const relatedPosts = getRelatedPosts(slug, language);
  const imageSrc = post.ogImage ?? getPostImage(post.slug);
  const urlPath = language === "de" ? `/de/blog/${post.slug}` : `/blog/${post.slug}`;

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
