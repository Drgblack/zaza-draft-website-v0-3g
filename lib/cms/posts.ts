import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fallbackPosts from "./fallback-posts";
import { blogPosts as curatedPosts } from "./posts-data";
import type { BlogPost } from "./inbox-transform";
export type { BlogPost } from "./inbox-transform";

type Frontmatter = {
  title?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  date?: string;
  tags?: string[];
  category?: string;
  ogImage?: string;
  language?: "en" | "de";
  lang?: "en" | "de";
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_IMAGE_DIR = path.join(process.cwd(), "public", "blog");

function hasGermanSourceFile(slug: string): boolean {
  const deMdx = path.join(BLOG_CONTENT_DIR, `${slug}.de.mdx`);
  const deMd = path.join(BLOG_CONTENT_DIR, `${slug}.de.md`);
  return fs.existsSync(deMdx) || fs.existsSync(deMd);
}

const SLUG_ALIASES: Record<string, string> = {
  "five-email-openers-deescalate-tense-situations":
    "parent-email-deescalation-templates",
};

function deriveSlug(filePath: string, providedSlug?: string): string {
  if (providedSlug) return providedSlug;

  const base = path.parse(filePath).name;
  return base.replace(/\.de$/, "");
}

function resolveSlugAlias(slug: string): { target: string; isAlias: boolean } {
  const target = SLUG_ALIASES[slug] ?? slug;
  return { target, isAlias: target !== slug };
}

function deriveLanguage(fm: Frontmatter, filePath: string): "en" | "de" {
  if (fm.language === "de" || fm.lang === "de") return "de";
  if (fm.language === "en" || fm.lang === "en") return "en";
  return path.parse(filePath).name.endsWith(".de") ? "de" : "en";
}

/**
 * Date helpers
 */
function normalizeDate(dateValue: unknown): string {
  if (dateValue instanceof Date && !Number.isNaN(dateValue.getTime())) {
    return dateValue.toISOString().slice(0, 10);
  }

  if (typeof dateValue === "string") {
    const parsed = new Date(dateValue);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
  }

  return "1970-01-01";
}

function parseDate(dateValue: string): number {
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

/**
 * Content helpers
 */
function buildExcerpt(frontmatterExcerpt: unknown, body: string): string {
  if (typeof frontmatterExcerpt === "string" && frontmatterExcerpt.trim()) {
    return frontmatterExcerpt.trim();
  }

  const compact = body.replace(/\s+/g, " ").trim();
  if (!compact) return "Content coming soon.";

  return compact.length > 240
    ? `${compact.slice(0, 240).trimEnd()}...`
    : compact;
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag)).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

/**
 * Image helpers
 */
function getAvailableImages(): Set<string> {
  if (!fs.existsSync(BLOG_IMAGE_DIR)) return new Set<string>();

  return new Set(
    fs
      .readdirSync(BLOG_IMAGE_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name),
  );
}

function findImageByBaseName(
  baseName: string,
  availableImages: Set<string>,
): string | undefined {
  if (!baseName) return undefined;

  for (const fileName of availableImages) {
    if (path.parse(fileName).name === baseName) {
      return fileName;
    }
  }

  return undefined;
}

function resolveOgImage(
  raw: unknown,
  slug: string,
  availableImages: Set<string>,
): string | undefined {
  const ogImage = typeof raw === "string" ? raw.trim() : "";
  const fromSlug = findImageByBaseName(slug, availableImages);

  if (ogImage && !ogImage.startsWith("/blog/")) {
    return ogImage;
  }

  if (ogImage && ogImage.startsWith("/blog/")) {
    const candidate = ogImage.slice("/blog/".length);
    if (availableImages.has(candidate)) {
      return ogImage;
    }

    const matchedByBase = findImageByBaseName(
      path.parse(candidate).name,
      availableImages,
    );
    if (matchedByBase) {
      return `/blog/${matchedByBase}`;
    }
  }

  return fromSlug ? `/blog/${fromSlug}` : undefined;
}

/**
 * Read MDX content posts from /content/blog
 */
function readContentPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        !entry.name.startsWith("_") &&
        !entry.name.startsWith("."),
    )
    .map((entry) => path.join(BLOG_CONTENT_DIR, entry.name));

  const availableImages = getAvailableImages();

  return files.map((filePath, index) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const fm = data as Frontmatter;

    const slug = deriveSlug(filePath, fm.slug);
    const lang = deriveLanguage(fm, filePath);

    return {
      id: fm.slug ?? `content-${index + 1}`,
      title: String(fm.title ?? slug),
      slug,
      excerpt: buildExcerpt(fm.excerpt ?? fm.description, content),
      content: content.trim(),
      publishedAt: normalizeDate(fm.date),
      category: fm.category ? String(fm.category) : undefined,
      tags: normalizeTags(fm.tags),
      ogImage: resolveOgImage(fm.ogImage, slug, availableImages),
      language: lang,
    } as BlogPost;
  });
}

function normalizeCuratedPosts(curated: BlogPost[]): BlogPost[] {
  return curated.flatMap((post) => {
    const base: BlogPost = {
      ...post,
      publishedAt: normalizeDate((post as any).publishedAt),
      language: (post as any).language ?? "en",
    };

    const entries: BlogPost[] = [{ ...base, language: "en" }];

    if (post.contentDe) {
      entries.push({
        ...base,
        content: post.contentDe,
        language: "de",
      });
    }

    return entries;
  });
}

/**
 * Merge curated posts (from posts-data) with MDX content posts
 */
function mergePosts(curated: BlogPost[], imported: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();

  const combined = [...imported, ...curated].reduce<BlogPost[]>((acc, post) => {
    const lang = (post as any).language ?? "en";
    const key = `${post.slug}__${lang}`;

    if (seen.has(key)) return acc;
    seen.add(key);

    acc.push({
      ...post,
      language: lang,
      publishedAt: normalizeDate((post as any).publishedAt),
    } as BlogPost);

    return acc;
  }, []);

  return combined.sort(
    (a, b) =>
      parseDate((b as any).publishedAt) - parseDate((a as any).publishedAt),
  );
}

/**
 * Canonical posts array for the blog
 */
const merged = mergePosts(
  normalizeCuratedPosts(curatedPosts as BlogPost[]),
  readContentPosts(),
);
export const posts: BlogPost[] = merged.length
  ? merged
  : (fallbackPosts as BlogPost[]);

/**
 * Public API
 */
export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getAllPostsByLanguage(language: "en" | "de"): BlogPost[] {
  const langOf = (p: any) => (p.language ?? p.lang ?? "en") as "en" | "de";

  // Exact language matches only
  const exact = posts.filter((p) => langOf(p) === language);
  const filtered =
    language === "de"
      ? exact.filter((p) => hasGermanSourceFile(p.slug))
      : exact;

  // Ensure stable sort by publishedAt (newest first)
  return filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getAllSlugs(): string[] {
  return Array.from(new Set(posts.map((p) => p.slug)));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return (
    getPostBySlugAndLanguage(slug, "en") ?? posts.find((p) => p.slug === slug)
  );
}

export function getRelatedPosts(
  slug: string,
  language: "en" | "de",
  limit = 3,
): BlogPost[] {
  const { target } = resolveSlugAlias(slug);
  const pool = posts.filter(
    (p: any) => p.slug !== target && (p.language ?? "en") === language,
  );

  if (pool.length >= limit) return pool.slice(0, limit);

  const fallbackPool = posts.filter((p) => p.slug !== target);
  return fallbackPool.slice(0, limit);
}

export function getPostImage(slug: string): string {
  const { target } = resolveSlugAlias(slug);
  // All blog images live in /public/blog and are named <slug>.jpeg
  return "/blog/" + target + ".jpeg";
}

// Look up a post by slug AND language
export function getPostBySlugAndLanguage(
  slug: string,
  language: "en" | "de",
  options?: { fallbackToEnglish?: boolean },
): BlogPost | undefined {
  const fallbackToEnglish = options?.fallbackToEnglish ?? true;
  const { target, isAlias } = resolveSlugAlias(slug);
  if (language === "de" && !hasGermanSourceFile(target)) {
    return undefined;
  }
  const match = posts.find(
    (p: any) => p.slug === target && (p.language ?? "en") === language,
  );

  if (match) {
    const resolved = isAlias ? ({ ...match, slug } as BlogPost) : match;
    if (isAlias && !resolved.ogImage) {
      resolved.ogImage = getPostImage(target);
    }
    return resolved;
  }

  if (language === "de" && fallbackToEnglish) {
    const fallbackEn = posts.find(
      (p: any) => p.slug === target && (p.language ?? "en") === "en",
    );
    if (fallbackEn) {
      const resolved = isAlias
        ? ({ ...fallbackEn, slug } as BlogPost)
        : fallbackEn;
      if (isAlias && !resolved.ogImage) {
        resolved.ogImage = getPostImage(target);
      }
      return resolved;
    }
  }

  const anyMatch = posts.find((p) => p.slug === target);
  if (anyMatch && isAlias) {
    const resolved = { ...anyMatch, slug } as BlogPost;
    if (!resolved.ogImage) {
      resolved.ogImage = getPostImage(target);
    }
    return resolved;
  }

  return anyMatch;
}
