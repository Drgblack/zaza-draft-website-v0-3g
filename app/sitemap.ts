import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  const now = new Date().toISOString();
  const mk = (p: string) => ({ url: base ? (base + p) : p, lastModified: now });
  return [
    mk('/'),
    mk('/resources'),
    mk('/de/resources'),
    mk('/blog')
  ];
}