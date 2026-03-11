import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";
import { defaultMetadata } from "@/lib/metadata";

export type GeneratedPageFrontmatter = {
  title?: string;
  seoTitle?: string;
  description?: string;
  slug?: string;
  keywords?: string | string[];
  category?: string;
  searchIntent?: string;
  phase?: string;
  issue?: string;
  yearGroup?: string;
  subject?: string;
  trigger?: string;
  context?: string;
  studentType?: string;
  tool?: string;
  useCase?: string;
  schoolType?: string;
  wordCount?: string | number;
};

export type GeneratedPageFaq = {
  question: string;
  answer: string;
};

export type GeneratedPageSection = {
  title: string;
  body: string;
};

export type GeneratedMarkdownPage = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  keywords: string[];
  category: string;
  searchIntent: string;
  content: string;
  sections: GeneratedPageSection[];
  hero: string[];
  faq: GeneratedPageFaq[];
  relatedLinks: Array<{ label: string; href: string }>;
  wordCount: number;
  filePath: string;
  lastModified: Date;
};

const GENERATED_PAGES_DIR = path.join(process.cwd(), "generated-pages");

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
  const sections: GeneratedPageSection[] = [];
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

function parseFaq(sections: GeneratedPageSection[]) {
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

function parseRelatedLinks(sections: GeneratedPageSection[]) {
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

function parseGeneratedPage(filePath: string): GeneratedMarkdownPage | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as GeneratedPageFrontmatter;
  const slug = String(frontmatter.slug ?? path.parse(filePath).name).trim();
  const title = String(frontmatter.title ?? slug).trim();
  const description = String(frontmatter.description ?? "").trim();

  if (!slug || !title || !description) {
    return null;
  }

  const { hero, sections } = parseSections(content);
  const stats = fs.statSync(filePath);

  return {
    slug,
    title,
    seoTitle:
      typeof frontmatter.seoTitle === "string" && frontmatter.seoTitle.trim()
        ? frontmatter.seoTitle.trim()
        : undefined,
    description,
    keywords: normaliseKeywords(frontmatter.keywords),
    category: String(frontmatter.category ?? "generated").trim(),
    searchIntent: String(frontmatter.searchIntent ?? "how-to").trim(),
    content: content.trim(),
    sections,
    hero,
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
  };
}

export function getGeneratedPageSlugs() {
  if (!directoryExists(GENERATED_PAGES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(GENERATED_PAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/i, ""))
    .sort();
}

export function getGeneratedPageBySlug(slug: string) {
  const filePath = path.join(GENERATED_PAGES_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseGeneratedPage(filePath);
}

export function getGeneratedPageMetadata(slug: string) {
  const page = getGeneratedPageBySlug(slug);

  if (!page) {
    return defaultMetadata({
      title: "Page not found | Zaza Draft",
      description: "The requested generated page could not be found.",
    });
  }

  return defaultMetadata({
    title: page.seoTitle ?? page.title,
    description: page.description,
    path: `/${page.slug}`,
    type: "article",
    keywords: page.keywords,
  });
}

export function getGeneratedPageSitemapEntries(
  lastModified = new Date(),
): MetadataRoute.Sitemap {
  if (!directoryExists(GENERATED_PAGES_DIR)) {
    return [];
  }

  return getGeneratedPageSlugs()
    .map((slug) => getGeneratedPageBySlug(slug))
    .filter((page): page is GeneratedMarkdownPage => Boolean(page))
    .map((page) => ({
      url: `https://zazadraft.com/${page.slug}`,
      lastModified: page.lastModified ?? lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
}
