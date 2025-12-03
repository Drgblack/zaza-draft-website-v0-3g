"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/cms/posts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogClientProps {
  posts: BlogPost[];
  language: "en" | "de";
}

const BASE_PATH: Record<"en" | "de", string> = {
  en: "/blog",
  de: "/de/blog",
};

export function BlogClient({ posts, language }: BlogClientProps) {
  // Tag filter (optional)
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const basePath = BASE_PATH[language] ?? "/blog";

  // Tags are based only on the posts we were given (already EN/DE filtered)
  const allTags = useMemo(
    () =>
      Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).slice(0, 12),
    [posts],
  );

  const filteredPosts = useMemo(
    () =>
      activeTag
        ? posts.filter((p) => (p.tags ?? []).includes(activeTag))
        : posts,
    [posts, activeTag],
  );

  if (!filteredPosts.length) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <p className="text-slate-400">
            {language === "de" ? "Keine Beiträge gefunden." : "No posts found."}
          </p>
        </div>
      </div>
    );
  }

  // --- Force a specific hero post if available ---
  const desiredHeroSlug = "ai-lesson-planning-guide-2025";
  const desiredHeroIndex = filteredPosts.findIndex(
    (p) => p.slug === desiredHeroSlug,
  );

  const heroPost =
    desiredHeroIndex >= 0 ? filteredPosts[desiredHeroIndex] : filteredPosts[0];

  const restPosts =
    desiredHeroIndex >= 0
      ? [
          ...filteredPosts.slice(0, desiredHeroIndex),
          ...filteredPosts.slice(desiredHeroIndex + 1),
        ]
      : filteredPosts.slice(1);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getImageForPost = (post: BlogPost) => {
    // Prefer explicit images if present, fall back to static /public/blog path
    // @ts-expect-error – BlogPost may not declare these, but they exist at runtime
    if (post.coverImage) return (post as any).coverImage;
    if (post.ogImage) return post.ogImage;
    return `/blog/${post.slug}.jpeg`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                {language === "de" ? "Zaza Draft Blog" : "The Zaza Blog"}
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
                {language === "de"
                  ? "Ideen, wie KI Lehrkräften wirklich hilft"
                  : "AI ideas that actually help teachers"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-400">
                {language === "de"
                  ? "Praktische Tipps, Vorlagen und Strategien, damit KI dir Zeit zurückgibt – nicht noch mehr Stress."
                  : "Practical tips, templates, and strategies so AI gives you time back – not more stress."}
              </p>
            </div>

            {allTags.length > 0 && (
              <div className="hidden md:flex flex-wrap justify-end gap-2 max-w-xs">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setActiveTag((prev) => (prev === tag ? null : tag))
                    }
                    className={`text-xs rounded-full px-3 py-1 border transition-colors ${
                      activeTag === tag
                        ? "bg-fuchsia-500 text-white border-fuchsia-500"
                        : "border-slate-700 text-slate-300 hover:border-fuchsia-400 hover:text-fuchsia-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hero post */}
          <Link
            href={`${basePath}/${heroPost.slug}`}
            className="group grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-stretch"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-black/40">
              <div className="relative aspect-[16/9]">
                <Image
                  src={getImageForPost(heroPost)}
                  alt={heroPost.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-fuchsia-500 text-white border-0">
                    {heroPost.category}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {formatDate(heroPost.publishedAt)}
                    {" · "}
                    {heroPost.readTime ||
                      (language === "de" ? "8 Min. Lesezeit" : "8 min read")}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50 mb-3 group-hover:text-fuchsia-300 transition-colors">
                  {heroPost.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 line-clamp-3">
                  {heroPost.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(heroPost.tags ?? []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700/70 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Side column: a few more posts */}
            <div className="space-y-3 lg:space-y-4">
              {restPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`${basePath}/${post.slug}`}
                  className="group block"
                >
                  <Card className="flex gap-4 overflow-hidden border-slate-800 bg-slate-900/70 hover:border-fuchsia-400/80 hover:bg-slate-900 transition-colors">
                    <div className="relative w-28 sm:w-32 flex-shrink-0">
                      <div className="relative h-full min-h-[80px]">
                        <Image
                          src={getImageForPost(post)}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="py-3 pr-4 flex flex-col justify-center">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                        {formatDate(post.publishedAt)}
                      </p>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-50 group-hover:text-fuchsia-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* Grid of remaining posts */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restPosts.slice(3).map((post) => (
              <Link
                key={post.slug}
                href={`${basePath}/${post.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden border-slate-800 bg-slate-900/70 hover:border-fuchsia-400/80 hover:bg-slate-900 transition-colors">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={getImageForPost(post)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge className="bg-slate-800 text-slate-100 border-0 text-[11px]">
                        {post.category}
                      </Badge>
                      <span className="text-[11px] text-slate-500">
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-50 mb-1 line-clamp-2 group-hover:text-fuchsia-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(post.tags ?? []).slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-900/80 border border-slate-800 px-2 py-0.5 text-[11px] text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

