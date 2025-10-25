'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import rawIndex from "../../data/resources/resources.index.json";

type Lang = 'en' | 'de';
type LangFiles = { docx?: string; pdf?: string };
type FilesByLang = { en?: LangFiles; de?: LangFiles };
type Resource = {
  slug: string;
  title?: string | null;
  blurb?: string | null;
  published?: string | null;
  tags?: string[] | null;
  files?: FilesByLang | null;
};

function normalizeIndex(input: any): Resource[] {
  if (!input) return [];
  if (Array.isArray(input)) return input as Resource[];
  if (typeof input === "object") {
    if (Array.isArray((input as any).value)) {
      return ((input as any).value ?? []) as Resource[];
    }
    return [input as Resource];
  }
  return [];
}

function pickHref(files: FilesByLang | undefined | null, lang: Lang): string | undefined {
  const pref = files?.[lang];
  const other = files?.[lang === 'en' ? 'de' : 'en'];
  // Prefer DOCX; fall back to PDF, then other language
  return pref?.docx || pref?.pdf || other?.docx || other?.pdf || undefined;
}

function safeTitleForFile(title: string | null | undefined, lang: Lang, href: string | undefined): string | undefined {
  if (!title || !href) return undefined;
  const clean = title.replace(/[^\w\s-]/g, '').trim();
  const isPdf = href.toLowerCase().endsWith('.pdf');
  const suffix = lang === 'de' ? '(DE)' : '(EN)';
  return `${clean} ${suffix}.${isPdf ? 'pdf' : 'docx'}`;
}

export default function ResourcesPage() {
  const { t, language } = useLanguage();
  const resources = normalizeIndex(rawIndex).filter(Boolean);
  const activeLang: Lang = language === 'de' ? 'de' : 'en';

  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-4">{t("resources.title")}</h1>
          <p className="text-[#9CA3AF]">{t("resources.subtitle")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const href = pickHref(resource.files ?? undefined, activeLang);

            const hasEnDocx = !!resource.files?.en?.docx;
            const hasEnPdf = !!resource.files?.en?.pdf;
            const hasDeDocx = !!resource.files?.de?.docx;
            const hasDePdf = !!resource.files?.de?.pdf;

            const downloadName = safeTitleForFile(resource.title ?? null, activeLang, href);

            return (
              <Card key={resource.slug || Math.random().toString(36)} className="bg-[#0B1220] border-[#1F2937]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#F9FAFB] mb-2">
                    {resource.title || ''}
                  </h2>
                  {resource.blurb ? (
                    <p className="text-[#9CA3AF] mb-3">{resource.blurb}</p>
                  ) : null}

                  <div className="mt-2 mb-4 flex flex-wrap gap-2 text-xs">
                    {(hasEnDocx || hasEnPdf) && (
                      <span className="rounded-full bg-[#111827] text-[#9CA3AF] px-2 py-1">EN</span>
                    )}
                    {(hasDeDocx || hasDePdf) && (
                      <span className="rounded-full bg-[#111827] text-[#9CA3AF] px-2 py-1">DE</span>
                    )}
                    {(hasEnDocx || hasDeDocx) && (
                      <span className="rounded-full bg-[#111827] text-[#9CA3AF] px-2 py-1">DOCX</span>
                    )}
                    {(hasEnPdf || hasDePdf) && (
                      <span className="rounded-full bg-[#111827] text-[#9CA3AF] px-2 py-1">PDF</span>
                    )}
                  </div>

                  {resource.tags && resource.tags.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tg) => (
                        <span
                          key={tg}
                          className="text-xs bg-[#111827] text-[#9CA3AF] px-2 py-1 rounded-full"
                        >
                          {tg}
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
                      <a href={href} download={`${(resource.title ?? "Resource").replace(/[^a-zA-Z0-9 ]/g,"").trim()} ${language === "de" ? "(DE)" : "(EN)"}.${isPdf ? "pdf" : "docx"}`} ${language === "de" ? "(DE)" : "(EN)"}.${isPdf ? "pdf" : "docx"}`} className="flex items-center justify-center gap-2">
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




