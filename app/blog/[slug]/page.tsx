import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  getAllPostsByLanguage,
  getPostBySlugAndLanguage,
  getRelatedPosts,
  getPostImage,
} from "@/lib/cms/posts";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createFAQPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
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
  const metadataTitle = post.seoTitle ?? `${post.title} | Zaza Draft`;
  const metadataDescription = post.seoDescription ?? post.excerpt ?? "";

  return buildPageMetadata({
    title: metadataTitle,
    description: metadataDescription,
    path: urlPath,
    image,
    type: "article",
  });
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
  const description = post.seoDescription ?? post.excerpt ?? "";

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: `${post.slug}-article-schema`,
            data: createArticleJsonLd({
              headline: post.title,
              description,
              path: urlPath,
              image: imageSrc,
              publishedTime: post.publishedAt,
              modifiedTime: post.publishedAt,
            }),
          },
          {
            id: `${post.slug}-breadcrumb-schema`,
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: urlPath },
            ]),
          },
          ...(post.faqs && post.faqs.length > 0
            ? [
                {
                  id: `${post.slug}-faq-schema`,
                  data: createFAQPageJsonLd(post.faqs),
                },
              ]
            : []),
        ]}
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
              sizes="(min-width: 1024px) 768px, 100vw"
            />
          </div>
        )}

        <BlogPostClient post={post} relatedPosts={relatedPosts} />
      </article>
    </>
  );
}
