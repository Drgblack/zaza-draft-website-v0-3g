import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

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

function deriveXDefaultAlternate(
  path: string,
  alternates?: Record<string, string>,
) {
  if (!alternates) {
    return undefined;
  }

  if (alternates.en) {
    return alternates.en;
  }

  if (alternates["en-GB"]) {
    return alternates["en-GB"];
  }

  const fallbackPath = path.replace(/^\/de(?=\/|$)/, "") || "/";
  return absoluteUrl(fallbackPath);
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

  const xDefault = deriveXDefaultAlternate(path, alternates);

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      ...(alternates
        ? {
            languages: {
              ...alternates,
              ...(xDefault ? { "x-default": xDefault } : {}),
            },
          }
        : {}),
    },
  };
}
