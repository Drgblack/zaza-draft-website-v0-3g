import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fallbackPosts from "./fallback-posts";
import { blogPosts as curatedPosts } from "./posts-data";
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
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_IMAGE_DIR = path.join(process.cwd(), "public", "blog");

// Canonical posts array for the blog
const merged = mergePosts(curatedPosts, readContentPosts());
export const posts: BlogPost[] = merged.length ? merged : fallbackPosts;

// Minimal API expected by blog pages
export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const pool = posts.filter((p) => p.slug !== slug);
  return pool.slice(0, limit);
}

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

    const slug = String(fm.slug ?? path.parse(filePath).name);

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
    };
  });
}

function mergePosts(curated: BlogPost[], imported: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const combined = [...curated, ...imported].reduce<BlogPost[]>((acc, post) => {
    if (seen.has(post.slug)) return acc;
    seen.add(post.slug);
    acc.push({
      ...post,
      publishedAt: normalizeDate(post.publishedAt),
    });
    return acc;
  }, []);

  return combined.sort(
    (a, b) => parseDate(b.publishedAt) - parseDate(a.publishedAt),
  );
}

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

export function getPostImage(slug: string): string {
  // All blog images live in /public/blog and are named <slug>.jpeg
  return "/blog/" + slug + ".jpeg";
}
