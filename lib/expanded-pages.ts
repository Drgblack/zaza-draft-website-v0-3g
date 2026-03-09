import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";
import { defaultMetadata } from "@/lib/metadata";

export type ExpandedPageFrontmatter = {
  title?: string;
  description?: string;
  seedSlug?: string;
  variant?: string;
  sourceBlogTitle?: string;
  sourceBlogSlug?: string;
  hubPath?: string;
  keywords?: string | string[];
  category?: string;
  searchIntent?: string;
  wordCount?: string | number;
};

export type ExpandedPageFaq = {
  question: string;
  answer: string;
};

export type ExpandedPageSection = {
  title: string;
  body: string;
};

export type ExpandedBlogPage = {
  seedSlug: string;
  variant: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  searchIntent: string;
  sourceBlogTitle: string;
  sourceBlogSlug: string;
  sourceBlogPath: string;
  hubPath: string;
  hero: string[];
  sections: ExpandedPageSection[];
  faq: ExpandedPageFaq[];
  relatedLinks: Array<{ label: string; href: string }>;
  wordCount: number;
  filePath: string;
  lastModified: Date;
  path: string;
};

const EXPANDED_PAGES_DIR = path.join(process.cwd(), "expanded-pages");

function directoryExists(directoryPath: string) {
  return (
    fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory()
  );
}

function normaliseKeywords(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function parseSections(content: string) {
  const lines = content.split(/\r?\n/);
  const hero: string[] = [];
  const sections: ExpandedPageSection[] = [];
  let currentTitle: string | null = null;
  let currentLines: string[] = [];
  let beforeSections = true;

  const flush = () => {
    if (!currentTitle) {
      return;
    }

    sections.push({
      title: currentTitle,
      body: currentLines.join("\n").trim(),
    });
    currentTitle = null;
    currentLines = [];
  };

  for (const line of lines) {
    if (line.startsWith("# ")) {
      continue;
    }

    if (line.startsWith("## ")) {
      beforeSections = false;
      flush();
      currentTitle = line.replace(/^##\s+/, "").trim();
      continue;
    }

    if (beforeSections) {
      if (line.trim()) {
        hero.push(line.trim());
      }
      continue;
    }

    currentLines.push(line);
  }

  flush();
  return { hero, sections };
}

function parseFaq(sections: ExpandedPageSection[]) {
  const faqSection = sections.find((section) => section.title === "FAQ");

  if (!faqSection) {
    return [];
  }

  return faqSection.body
    .split(/\n(?=###\s+)/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [heading, ...rest] = item.split(/\r?\n/);

      return {
        question: heading.replace(/^###\s+/, "").trim(),
        answer: rest.join("\n").trim(),
      };
    })
    .filter((item) => item.question && item.answer);
}

function parseRelatedLinks(sections: ExpandedPageSection[]) {
  const relatedSection = sections.find(
    (section) => section.title === "Related Pages",
  );

  if (!relatedSection) {
    return [];
  }

  return relatedSection.body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- ["))
    .map((line) => {
      const match = line.match(/^- \[([^\]]+)\]\(([^)]+)\)$/);

      if (!match) {
        return null;
      }

      return {
        label: match[1],
        href: match[2],
      };
    })
    .filter((item): item is { label: string; href: string } => Boolean(item));
}

function walkExpandedFiles(directoryPath: string): string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .flatMap((entry) => {
      const resolvedPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith("_")) {
          return [];
        }

        return walkExpandedFiles(resolvedPath);
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        return [resolvedPath];
      }

      return [];
    });
}

function parseExpandedPage(filePath: string): ExpandedBlogPage | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ExpandedPageFrontmatter;
  const relativePath = path.relative(EXPANDED_PAGES_DIR, filePath);
  const parts = relativePath.split(path.sep);
  const seedSlug = String(frontmatter.seedSlug ?? parts[0] ?? "").trim();
  const variant = String(
    frontmatter.variant ?? path.parse(parts[parts.length - 1] ?? "").name,
  ).trim();
  const title = String(frontmatter.title ?? "").trim();
  const description = String(frontmatter.description ?? "").trim();

  if (!seedSlug || !variant || !title || !description) {
    return null;
  }

  const { hero, sections } = parseSections(content);
  const stats = fs.statSync(filePath);

  return {
    seedSlug,
    variant,
    title,
    description,
    keywords: normaliseKeywords(frontmatter.keywords),
    category: String(frontmatter.category ?? "expanded-blog").trim(),
    searchIntent: String(
      frontmatter.searchIntent ?? "How-to/problem intent",
    ).trim(),
    sourceBlogTitle: String(frontmatter.sourceBlogTitle ?? title).trim(),
    sourceBlogSlug: String(frontmatter.sourceBlogSlug ?? seedSlug).trim(),
    sourceBlogPath: `/blog/${String(
      frontmatter.sourceBlogSlug ?? seedSlug,
    ).trim()}`,
    hubPath: String(frontmatter.hubPath ?? "/teacher-parent-communication-hub"),
    hero,
    sections,
    faq: parseFaq(sections),
    relatedLinks: parseRelatedLinks(sections),
    wordCount:
      typeof frontmatter.wordCount === "number"
        ? frontmatter.wordCount
        : Number.parseInt(
            String(frontmatter.wordCount ?? countWords(content)),
            10,
          ),
    filePath,
    lastModified: stats.mtime,
    path: `/expanded/${seedSlug}/${variant}`,
  };
}

export function getExpandedPageFiles() {
  if (!directoryExists(EXPANDED_PAGES_DIR)) {
    return [];
  }

  return walkExpandedFiles(EXPANDED_PAGES_DIR).sort();
}

export function getExpandedPages() {
  return getExpandedPageFiles()
    .map((filePath) => parseExpandedPage(filePath))
    .filter((page): page is ExpandedBlogPage => Boolean(page));
}

export function getExpandedPageParams() {
  return getExpandedPages().map((page) => ({
    slug: page.seedSlug,
    variant: page.variant,
  }));
}

export function getExpandedPageByRoute(slug: string, variant: string) {
  const filePath = path.join(EXPANDED_PAGES_DIR, slug, `${variant}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseExpandedPage(filePath);
}

export function getExpandedPageMetadata(slug: string, variant: string) {
  const page = getExpandedPageByRoute(slug, variant);

  if (!page) {
    return defaultMetadata({
      title: "Expanded page not found | Zaza Draft",
      description: "The requested expanded landing page could not be found.",
    });
  }

  return defaultMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
    keywords: page.keywords,
  });
}

export function getExpandedPageSitemapEntries(
  lastModified = new Date(),
): MetadataRoute.Sitemap {
  return getExpandedPages().map((page) => ({
    url: `https://zazadraft.com${page.path}`,
    lastModified: page.lastModified ?? lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.78,
  }));
}
