'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import rawIndex from "../../data/resources/resources.index.json";

type FileEntry = { docx?: string; pdf?: string; md?: string };
type Resource = {
  slug: string;
  title?: string | null;
  blurb_en?: string | null;
  blurb_de?: string | null;
  published?: string | null;
  tags?: string[] | null;
  files?: { en?: FileEntry; de?: FileEntry } | null;
};

function normalizeIndex(input: any): Resource[] {
  if (!input) return [];
  if (Array.isArray(input)) return input as Resource[];
  if (typeof input === "object") {
    if (Array.isArray((input as any).value)) {
      return ((input as any).value ?? []) as Resource[];
    }
    if (Array.isArray((input as any).resources)) {
      return ((input as any).resources ?? []) as Resource[];
    }
    return [input as Resource];
  }
  return [];
}

function pickHref(r: Resource, locale: string): string | null {
  // Get the files for the current locale
  const localeFiles = locale === 'de' ? r.files?.de : r.files?.en;

  // Use the file path directly from the JSON (prioritize DOCX, then PDF, then MD)
  if (localeFiles?.docx) {
    return localeFiles.docx;
  }
  if (localeFiles?.pdf) {
    return localeFiles.pdf;
  }
  if (localeFiles?.md) {
    return localeFiles.md;
  }

  // Fallback to the other locale if current locale doesn't have files
  const fallbackLocale = locale === 'de' ? 'en' : 'de';
  const fallbackFiles = fallbackLocale === 'de' ? r.files?.de : r.files?.en;

  if (fallbackFiles?.docx) {
    return fallbackFiles.docx;
  }
  if (fallbackFiles?.pdf) {
    return fallbackFiles.pdf;
  }
  if (fallbackFiles?.md) {
    return fallbackFiles.md;
  }

  return null;
}

export default function ResourcesPage() {
  const { t, language } = useLanguage();
  const resources = normalizeIndex(rawIndex).filter(Boolean);

  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-4">{t("resources.title")}</h1>
          <p className="text-[#9CA3AF]">{t("resources.subtitle")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const href = pickHref(resource, language);
            const fileName = resource.title
              ? `${resource.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${language}.docx`
              : `${resource.slug}-${language}.docx`;
            
            // Get the correct blurb based on language
            const blurb = language === 'de' ? resource.blurb_de : resource.blurb_en;

            return (
              <Card key={resource.slug ?? `${resource.title}-${Math.random()}`} className="bg-[#0B1220] border-[#1F2937]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#F9FAFB] mb-2">
                    {resource.title ?? resource.slug}
                  </h2>
                  {blurb ? (
                    <p className="text-[#9CA3AF] mb-4">{blurb}</p>
                  ) : null}
                  {resource.tags && resource.tags.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-[#111827] text-[#9CA3AF] px-2 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {resource.published ? (
                    <p className="text-sm text-[#6B7280] mb-4">
                      {t("resources.published")}: {new Date(resource.published).toLocaleDateString()}
                    </p>
                  ) : null}

                  {href ? (
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      <a href={href} download={fileName} className="flex items-center justify-center gap-2">
                        <Download className="h-4 w-4" />
                        {t("resources.download")}
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-[#1F2937] text-[#9CA3AF] cursor-not-allowed">
                      {t("resources.comingSoon")}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
