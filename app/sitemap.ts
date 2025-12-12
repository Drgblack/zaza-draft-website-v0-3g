import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";

const baseUrl = "https://zazadraft.com";
const currentDate = new Date();

const marketingPages = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "/features", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products/draft", changeFrequency: "weekly", priority: 0.85 },
  { path: "/products/teach", changeFrequency: "weekly", priority: 0.85 },
  { path: "/products/shield", changeFrequency: "weekly", priority: 0.85 },
  { path: "/products/gradeflow", changeFrequency: "weekly", priority: 0.75 },
  { path: "/suite", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai-literacy", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ai-for-student-reports", changeFrequency: "weekly", priority: 0.7 },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.7 },
  { path: "/integrations", changeFrequency: "monthly", priority: 0.7 },
  { path: "/community", changeFrequency: "daily", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ambassadors", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reduce-stress-parent-messages", changeFrequency: "monthly", priority: 0.7 },
  { path: "/state-of-ai-education", changeFrequency: "monthly", priority: 0.7 },
  { path: "/success-stories", changeFrequency: "monthly", priority: 0.65 },
  { path: "/teacher-stories", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/company", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/founder", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/press", changeFrequency: "monthly", priority: 0.55 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/support", changeFrequency: "monthly", priority: 0.6 },
  { path: "/webinars", changeFrequency: "weekly", priority: 0.6 },
  { path: "/videos", changeFrequency: "weekly", priority: 0.6 },
  { path: "/roi-calculator", changeFrequency: "monthly", priority: 0.55 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

const localePrefixes = ["", "/de"];

function buildLocalizedPages() {
  return marketingPages.flatMap((entry) =>
    localePrefixes.map((prefix) => ({
      url: `${baseUrl}${prefix}${entry.path}`,
      lastModified: currentDate,
      changeFrequency: entry.changeFrequency as MetadataRoute.Sitemap["changeFrequency"],
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
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const germanEntries = Array.from(germanSlugs).map((slug) => ({
    url: `${baseUrl}/de/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...englishEntries, ...germanEntries];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...buildLocalizedPages(), ...getBlogSlugs()];
}
