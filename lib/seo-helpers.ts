import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/metadata";

export const PROGRAMMATIC_ISR_SECONDS = 604800;

export const DEFAULT_REVALIDATION_PATHS = [
  "/diagnosis",
  "/communication-diagnosis",
  "/teacher-parent-communication-hub",
  "/alternatives",
  "/report-comments",
  "/scenario-builder",
  "/scenario-combinations",
  "/uk",
  "/uk/teacher-communication-resources",
  "/expanded",
  "/products/draft",
] as const;

type ProgrammaticMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  canonicalPath?: string;
};

export function canonicalPath(path: string) {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function buildProgrammaticMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "article",
  canonicalPath: canonicalOverride,
}: ProgrammaticMetadataInput): Metadata {
  return defaultMetadata({
    title,
    description,
    path: canonicalPath(path),
    canonicalPath: canonicalOverride,
    type,
    keywords,
  });
}

export function buildProgrammaticNotFoundMetadata(
  title = "Page not found | Zaza Draft",
  description = "The requested programmatic page could not be found.",
): Metadata {
  return defaultMetadata({
    title,
    description,
  });
}

export function getDefaultRevalidationPaths() {
  return [...DEFAULT_REVALIDATION_PATHS];
}
