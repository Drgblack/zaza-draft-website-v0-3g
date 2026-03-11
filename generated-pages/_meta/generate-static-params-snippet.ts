import { promises as fs } from "node:fs";
import path from "node:path";

export async function generateStaticParams() {
  const directory = path.join(process.cwd(), "generated-pages");
  const files = await fs.readdir(directory);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export const generatedSeedSlugs = [
  "how-to-write-behaviour-email-to-parents-year-1-ks1",
  "how-to-write-missing-homework-email-to-parents-year-1-ks1",
  "how-to-write-angry-parent-reply-email-to-parents-year-1-ks1",
  "how-to-write-grade-complaint-email-to-parents-year-1-ks1",
  "how-to-write-behaviour-email-to-parents-year-2-ks1",
] as const;
