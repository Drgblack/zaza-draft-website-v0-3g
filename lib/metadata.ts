import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo/site-config";
import {
  buildCanonicalAlternates,
  resolveCanonicalUrl,
} from "@/lib/seo-canonical";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  canonicalPath?: string;
};

export const metadataDefaults = {
  siteName: siteConfig.name,
  legalName: siteConfig.legalName,
  siteUrl: siteConfig.url,
  locale: "en_GB",
  defaultImage: siteConfig.defaultOgImage,
  defaultTitle:
    "Calm AI Parent Email and Report Writing Help for Teachers | Zaza Draft",
  defaultDescription:
    "Teacher-built, teacher-first AI writing help for parent communication, report comments, and professional school messages. Zaza Draft is a calm co-writer that keeps teachers in control of every word and does not invent student facts.",
  defaultKeywords: [
    "teacher-first AI writing help",
    "AI parent email help for teachers",
    "AI report writing for teachers",
    "report comments",
    "parents' evening email templates",
    "professional school communication",
    "GDPR compliant AI for teachers",
  ],
} as const;

export function canonicalUrl(path = "/") {
  return resolveCanonicalUrl(path);
}

export function buildOpenGraph({
  title,
  description,
  path = "/",
  image = metadataDefaults.defaultImage,
  type = "website",
}: MetadataInput): NonNullable<Metadata["openGraph"]> {
  const resolvedTitle = title ?? metadataDefaults.defaultTitle;

  return {
    title: resolvedTitle,
    description: description ?? metadataDefaults.defaultDescription,
    url: canonicalUrl(path),
    type,
    siteName: metadataDefaults.siteName,
    locale: metadataDefaults.locale,
    images: [
      {
        url: absoluteUrl(image),
        alt: resolvedTitle,
      },
    ],
  };
}

export function buildTwitterCard({
  title,
  description,
  image = metadataDefaults.defaultImage,
}: MetadataInput): NonNullable<Metadata["twitter"]> {
  const resolvedTitle = title ?? metadataDefaults.defaultTitle;

  return {
    card: "summary_large_image",
    title: resolvedTitle,
    description: description ?? metadataDefaults.defaultDescription,
    images: [absoluteUrl(image)],
  };
}

export function defaultMetadata({
  title,
  description,
  path = "/",
  image = metadataDefaults.defaultImage,
  type = "website",
  keywords = [],
  canonicalPath,
}: MetadataInput = {}): Metadata {
  const mergedKeywords = Array.from(
    new Set([...metadataDefaults.defaultKeywords, ...keywords]),
  );
  const resolvedTitle = title ?? metadataDefaults.defaultTitle;
  const resolvedDescription =
    description ?? metadataDefaults.defaultDescription;

  return {
    metadataBase: new URL(metadataDefaults.siteUrl),
    title: resolvedTitle,
    description: resolvedDescription,
    applicationName: metadataDefaults.siteName,
    creator: metadataDefaults.legalName,
    publisher: metadataDefaults.legalName,
    authors: [
      {
        name: `${siteConfig.founder.name}, ${siteConfig.founder.honorificSuffix}`,
      },
    ],
    keywords: mergedKeywords,
    alternates: buildCanonicalAlternates(canonicalPath ?? path),
    openGraph: buildOpenGraph({
      title: resolvedTitle,
      description: resolvedDescription,
      path: canonicalPath ?? path,
      image,
      type,
    }),
    twitter: buildTwitterCard({
      title: resolvedTitle,
      description: resolvedDescription,
      image,
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
