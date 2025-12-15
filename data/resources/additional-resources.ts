export type ResourceLocale = "en" | "de";

export type FileEntry = { pdf?: string };

export type ExtendedResource = {
  slug: string;
  category?: string;
  tags?: string[];
  title?: Partial<Record<ResourceLocale, string>>;
  description?: Partial<Record<ResourceLocale, string>>;
  files?: Partial<Record<ResourceLocale, FileEntry>>;
  featured?: boolean;
  releasedAt?: string;
  popularity?: number;
};

export const additionalResources: ExtendedResource[] = [];
