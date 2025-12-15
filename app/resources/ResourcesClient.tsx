"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/i18n/language-context";
import rawIndex from "../../data/resources/resources.index.json";
import { LeadMagnet } from "@/components/conversion/lead-magnet";
import {
  additionalResources,
  ExtendedResource,
} from "../../data/resources/additional-resources";
import { Download } from "lucide-react";

type FileEntry = { docx?: string; pdf?: string; md?: string };
type Resource = {
  slug: string;
  title?: string | null;
  blurb_en?: string | null;
  blurb_de?: string | null;
  description?: string | null;
  published?: string | null;
  tags?: string[] | null;
  category?: string | null;
  language?: string | null;
  fileUrl?: string | null;
  fileType?: string | null;
  featured?: boolean | null;
  releasedAt?: string | null;
  popularity?: number | null;
  files?: { en?: FileEntry; de?: FileEntry } | null;
};

type DisplayResource = Resource &
  ExtendedResource & {
    localizedDescription: string;
    downloadLabel: string;
    releasedLabel?: string;
  };

const baseResources = normalizeIndex(rawIndex);

const slugCategoryOverrides: Record<string, string> = {
  "ai-prompt-library-premium": "Planning",
  "ai-rubric-prompts": "Assessment",
  "ai-safety-ethics-guide": "Classroom",
  "assessment-rubrics": "Assessment",
  "classroom-management": "Classroom",
  "differentiation-toolkit": "Classroom",
  "end-of-term-comments": "Reporting",
  "grading-workflow-optimizer": "Planning",
  "homework-success-toolkit": "Classroom",
  "lesson-planning-templates": "Planning",
  "parent-message-templates": "Communication",
  "student-feedback-framework": "Communication",
  "teacher-time-playbook": "Planning",
  "teacher-wellness-guide": "Classroom",
  "tech-troubleshooting-guide": "Classroom",
  "tone-checklist": "Communication",
  "weekly-newsletter-bundle": "Communication",
};

const categoryFilters = [
  { key: "all", value: null, labelKey: "resources.categories.all" },
  {
    key: "communication",
    value: "Communication",
    labelKey: "resources.categories.communication",
  },
  {
    key: "reporting",
    value: "Reporting",
    labelKey: "resources.categories.reporting",
  },
  {
    key: "classroom",
    value: "Classroom",
    labelKey: "resources.categories.classroom",
  },
  {
    key: "planning",
    value: "Planning",
    labelKey: "resources.categories.planning",
  },
  {
    key: "assessment",
    value: "Assessment",
    labelKey: "resources.categories.assessment",
  },
];

const sortOptions = [
  { value: "popular", labelKey: "resources.sort.popular" },
  { value: "newest", labelKey: "resources.sort.newest" },
  { value: "alpha", labelKey: "resources.sort.alpha" },
];

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

function resolveUrl(resource: Resource, locale: "en" | "de"): string | null {
  if (resource.fileUrl) return resource.fileUrl;
  const targetLocale: "en" | "de" = locale === "de" ? "de" : "en";
  const localeFiles = resource.files?.[targetLocale];
  if (localeFiles?.pdf) return localeFiles.pdf;
  if (localeFiles?.docx) return localeFiles.docx;

  const fallbackLocale: "en" | "de" = targetLocale === "en" ? "de" : "en";
  const fallbackFiles = resource.files?.[fallbackLocale];
  if (fallbackFiles?.pdf) return fallbackFiles.pdf;
  if (fallbackFiles?.docx) return fallbackFiles.docx;
  return null;
}

function ResourceCard({
  resource,
  comingSoonLabel,
}: {
  resource: DisplayResource;
  comingSoonLabel: string;
}) {
  return (
    <Card className="group bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 h-full">
      <CardContent className="p-6 min-h-[320px] flex flex-col">
        <div className="flex items-center justify-between mb-3 gap-2">
          <h2 className="text-2xl font-bold text-white">
            {resource.title ?? resource.slug}
          </h2>
          <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white bg-white/10 border border-white/10 rounded-full">
            {resource.language ?? "EN"}
          </span>
        </div>
        <p className="text-gray-300 mb-5 line-clamp-4">
          {resource.localizedDescription}
        </p>
        {resource.tags && resource.tags.length ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-white/10 text-purple-300 px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto">
          {resource.releasedLabel ? (
            <p className="text-xs text-gray-400 mb-3">
              {resource.releasedLabel}
            </p>
          ) : null}
          {resource.fileUrl ? (
            <a
              href={resource.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold tracking-wide px-4 py-3 transition-all hover:from-purple-700 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
              aria-label={`Download ${resource.title ?? resource.slug}`}
            >
              <Download className="h-4 w-4" />
              {resource.downloadLabel}
            </a>
          ) : (
            <p className="text-sm text-gray-500">{comingSoonLabel}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResourcesPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("popular");

  const combinedResources = useMemo(() => {
    const normalizedResources = baseResources.map((resource) => ({
      ...resource,
      category:
        resource.category ?? slugCategoryOverrides[resource.slug] ?? "Planning",
      language: resource.language ?? "EN/DE",
      fileUrl: resolveUrl(resource, language) ?? "",
      fileType:
        resource.fileType ??
        (resource.fileUrl?.toLowerCase().endsWith(".pdf")
          ? "PDF"
          : resource.fileUrl?.toLowerCase().endsWith(".docx")
            ? "DOCX"
            : "PDF"),
      featured: resource.featured ?? false,
      popularity: resource.popularity ?? 50,
    }));

    const normalizedAdditional = additionalResources.map((resource) => ({
      ...resource,
      category: resource.category ?? "Planning",
      fileUrl: resolveUrl(resource, language) ?? resource.fileUrl ?? "",
      fileType:
        resource.fileType ??
        (resource.fileUrl?.toLowerCase().endsWith(".pdf")
          ? "PDF"
          : resource.fileUrl?.toLowerCase().endsWith(".docx")
            ? "DOCX"
            : "PDF"),
      featured: resource.featured ?? false,
      popularity: resource.popularity ?? 50,
    }));

    return [
      ...normalizedResources,
      ...normalizedAdditional,
    ] as DisplayResource[];
  }, [language]);

  const resources = useMemo(() => {
    return combinedResources.map((resource) => {
      const description =
        language === "de"
          ? (resource.blurb_de ??
            resource.description ??
            resource.blurb_en ??
            "")
          : (resource.description ?? resource.blurb_en ?? "");

      const locale = language === "de" ? "de-DE" : "en-US";
      const releaseDate = resource.releasedAt
        ? new Date(resource.releasedAt).toLocaleDateString(locale)
        : null;
      const releasedLabel = releaseDate
        ? `${t("resources.released")} ${releaseDate}`
        : undefined;

      const fileType =
        resource.fileType?.toUpperCase() ??
        (resource.fileUrl?.toLowerCase().endsWith(".docx")
          ? "DOCX"
          : resource.fileUrl?.toLowerCase().endsWith(".pdf")
            ? "PDF"
            : "PDF");
      const downloadLabel =
        fileType === "DOCX"
          ? t("resources.downloadLabel.docx")
          : t("resources.downloadLabel.pdf");

      return {
        ...resource,
        localizedDescription: description,
        downloadLabel,
        releasedLabel,
      };
    });
  }, [combinedResources, language, t]);

  const featuredResources = useMemo(
    () => resources.filter((resource) => resource.featured),
    [resources],
  );

  const filteredResources = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const activeCategory = categoryFilters.find(
      (option) => option.key === selectedCategory,
    );
    const activeCategoryValue = activeCategory?.value;

    return resources
      .filter((resource) => {
        if (
          activeCategory?.key !== "all" &&
          resource.category !== activeCategoryValue
        ) {
          return false;
        }

        if (!normalizedSearch) return true;

        const haystack = [
          resource.title,
          resource.localizedDescription,
          ...(resource.tags ?? []),
        ]
          .filter(Boolean)
          .map((value) => value?.toLowerCase() ?? "")
          .join(" ");

        return haystack.includes(normalizedSearch);
      })
      .sort((a, b) => {
        if (sortOption === "newest") {
          const dateA = a.releasedAt ? new Date(a.releasedAt).getTime() : 0;
          const dateB = b.releasedAt ? new Date(b.releasedAt).getTime() : 0;
          return dateB - dateA;
        }

        if (sortOption === "alpha") {
          return (a.title ?? a.slug).localeCompare(b.title ?? b.slug);
        }

        const scoreA = (a.featured ? 100 : 0) + (a.popularity ?? 0);
        const scoreB = (b.featured ? 100 : 0) + (b.popularity ?? 0);
        return scoreB - scoreA;
      });
  }, [resources, searchTerm, selectedCategory, sortOption]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (typeof window === "undefined") return;

    const controller = new AbortController();

    resources.forEach((resource) => {
      const url = resource.fileUrl;
      if (!url) return;

      fetch(url, { method: "HEAD", signal: controller.signal })
        .then((res) => {
          if (!res.ok) {
            console.warn(
              `[Resources] Missing file for ${resource.slug} at ${url} (status ${res.status})`,
            );
            return;
          }

          const contentType =
            res.headers.get("content-type")?.toLowerCase() ?? "";
          if (contentType.includes("text/html")) {
            console.warn(
              `[Resources] Expected static file for ${url} but received HTML (${contentType})`,
            );
          }
        })
        .catch((error) => {
          if ((error as Error).name === "AbortError") return;
          console.warn(`[Resources] Unable to validate ${url}`, error);
        });
    });

    return () => controller.abort();
  }, [resources]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-6">
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            {t("resources.title")}
          </h1>
          <p className="text-gray-300 text-xl">{t("resources.subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto mb-14">
          <LeadMagnet
            title={t("resources.leadMagnet.title")}
            description={t("resources.leadMagnet.description")}
            resourceName={t("resources.leadMagnet.resourceName")}
          />
        </div>

        <p className="text-sm text-gray-400 text-center mb-6">
          {t("resources.languageNote")}
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-wrap gap-3">
            {categoryFilters.map((option) => (
              <button
                key={option.key}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedCategory === option.key
                    ? "bg-purple-600 text-white border-transparent"
                    : "bg-white/5 border-white/10 text-gray-200"
                }`}
                onClick={() => setSelectedCategory(option.key)}
                aria-pressed={selectedCategory === option.key}
              >
                {t(option.labelKey)}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("resources.search.placeholder")}
                className="bg-[#121A2F] border-white/10 text-white"
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-[#121A2F] border border-white/10 rounded-lg px-3 py-2 text-white"
              aria-label={t("resources.sort.label")}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.labelKey)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {featuredResources.length ? (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                {t("resources.featured.title")}
              </h2>
              <p className="text-sm text-gray-400">
                {t("resources.featured.subtitle")}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredResources.map((resource) => (
                <ResourceCard
                  key={`featured-${resource.slug}`}
                  resource={resource}
                  comingSoonLabel={t("resources.comingSoon")}
                />
              ))}
            </div>
          </section>
        ) : null}

        {filteredResources.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                resource={resource}
                comingSoonLabel={t("resources.comingSoon")}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg font-semibold text-white">
              {t("resources.empty.title")}
            </p>
            <p className="text-sm">{t("resources.empty.body")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
