import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/metadata";
import { normaliseLanguageAlternates } from "@/lib/seo-canonical";

interface BuildPageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  alternates?: Record<string, string>;
  canonicalPath?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  alternates,
  canonicalPath,
}: BuildPageMetadataInput): Metadata {
  const metadata = defaultMetadata({
    title,
    description,
    path,
    image,
    type,
    keywords,
    canonicalPath,
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      languages: normaliseLanguageAlternates(alternates),
    },
  };
}
