import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/metadata";

interface BuildPageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  alternates?: Record<string, string>;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  alternates,
}: BuildPageMetadataInput): Metadata {
  const metadata = defaultMetadata({
    title,
    description,
    path,
    image,
    type,
    keywords,
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      languages: alternates,
    },
  };
}
