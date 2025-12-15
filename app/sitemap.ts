import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";

const baseUrl = "https://zazadraft.com";
const currentDate = new Date();

const marketingPages = [
  { path: "", priority: 1.0 },
  { path: "/features", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/products/draft", priority: 0.85 },
  { path: "/products/teach", priority: 0.85 },
  { path: "/products/shield", priority: 0.85 },
  { path: "/products/gradeflow", priority: 0.75 },
  { path: "/suite", priority: 0.7 },
  { path: "/ai-literacy", priority: 0.8 },
  { path: "/ai-for-student-reports", priority: 0.7 },
  { path: "/glossary", priority: 0.7 },
  { path: "/resources", priority: 0.7 },
  { path: "/integrations", priority: 0.7 },
  { path: "/community", priority: 0.7 },
  { path: "/blog", priority: 0.8 },
  { path: "/ambassadors", priority: 0.7 },
  { path: "/reduce-stress-parent-messages", priority: 0.7 },
  { path: "/state-of-ai-education", priority: 0.7 },
  { path: "/success-stories", priority: 0.65 },
  { path: "/teacher-stories", priority: 0.6 },
  { path: "/about/company", priority: 0.6 },
  { path: "/about/founder", priority: 0.6 },
  { path: "/about/press", priority: 0.55 },
  { path: "/contact", priority: 0.6 },
  { path: "/support", priority: 0.6 },
  { path: "/webinars", priority: 0.6 },
  { path: "/videos", priority: 0.6 },
  { path: "/roi-calculator", priority: 0.55 },
  { path: "/faq", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

const localePrefixes = ["", "/de"];

function buildLocalizedPages() {
  return marketingPages.flatMap((entry) =>
    localePrefixes.map((prefix) => ({
      url: `${baseUrl}${prefix}${entry.path}`,
      lastModified: currentDate,
      priority: entry.priority,
    })),
  );
}

function getBlogSlugs() {
  const blogDir = join(process.cwd(), "content", "blog");
  const files = readdirSync(blogDir, { withFileTypes: true });
  const englishSlugs = new Set<string>();
  const germanSlugs = new Set<string>();

  files.forEach((entry) => {
    if (!entry.isFile()) {
      return;
    }
    if (entry.name.startsWith("_")) {
      return;
    }
    const slug = entry.name.replace(/\.(mdx|md)$/i, "");
    if (slug.endsWith(".de")) {
      germanSlugs.add(slug.replace(/\.de$/, ""));
      return;
    }
    englishSlugs.add(slug);
  });

  const englishEntries = Array.from(englishSlugs).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    priority: 0.6,
  }));

  const germanEntries = Array.from(germanSlugs).map((slug) => ({
    url: `${baseUrl}/de/blog/${slug}`,
    lastModified: currentDate,
    priority: 0.6,
  }));

  return [...englishEntries, ...germanEntries];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...buildLocalizedPages(), ...getBlogSlugs()];
}
