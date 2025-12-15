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
  ResourceLocale,
} from "../../data/resources/additional-resources";
import { Download } from "lucide-react";

type FileEntry = { pdf?: string };
type CatalogResource = ExtendedResource & {
  category: string;
  featured: boolean;
  popularity: number;
  files?: Partial<Record<ResourceLocale, FileEntry>>;
};
type NormalizedResource = CatalogResource & {
  fileUrl: string;
  fileType: "PDF";
};
type DisplayResource = NormalizedResource & {
  localizedTitle: string;
  localizedDescription: string;
  downloadLabel: string;
  releasedLabel?: string;
  languageBadge: string;
  englishOnlyNote?: string;
};

const slugCategoryOverrides: Record<string, string> = {
  "ai-prompt-library-premium": "Planning",
  "assessment-rubrics-pack": "Assessment",
  "behavior-redirection-scripts": "Classroom",
  "classroom-routines-guide": "Classroom",
  "communication-tone-checklist": "Communication",
  "differentiated-question-stems": "Assessment",
  "differentiation-menu-by-need": "Classroom",
  "formative-assessment-checklist": "Assessment",
  "lesson-plan-template-primary": "Planning",
  "parent-email-checklist": "Communication",
  "parent-email-playbook": "Communication",
  "phone-call-scripts-parents": "Communication",
  "report-comment-bank": "Reporting",
  "report-writing-framework": "Reporting",
  "report-writing-starters-closers": "Reporting",
  "seating-plan-templates-routines": "Classroom",
  "secondary-lesson-plan-template": "Planning",
  "teacher-ai-toolkit-v1.1": "Classroom",
  "teacher-wellness-guide": "Classroom",
  "tech-troubleshooting-guide": "Classroom",
  "translation-helpers-pack": "Communication",
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

function normalizeIndex(input: any): ExtendedResource[] {
  if (!input) return [];
  if (Array.isArray(input)) return input as ExtendedResource[];
  if (Array.isArray(input?.resources)) {
    return input.resources as ExtendedResource[];
  }
  return [input] as ExtendedResource[];
}

function resolveUrl(
  resource: ExtendedResource,
  locale: ResourceLocale,
): string | null {
  const preferred = resource.files?.[locale];
  if (preferred?.pdf) return preferred.pdf;
  const fallback = resource.files?.en ?? resource.files?.de;
  return fallback?.pdf ?? null;
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
        <div className="flex items-start justify-between mb-3 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {resource.localizedTitle}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white bg-white/10 border border-white/10 rounded-full">
            {resource.languageBadge}
          </span>
        </div>
        <p className="text-gray-300 mb-3 line-clamp-5">
          {resource.localizedDescription}
        </p>
        {resource.englishOnlyNote ? (
          <p className="text-xs text-gray-400 italic mb-4">
            {resource.englishOnlyNote}
          </p>
        ) : null}
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
              aria-label={`Download ${resource.localizedTitle}`}
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

  const catalogResources = useMemo(() => {
    const entries = [
      ...normalizeIndex(rawIndex),
      ...additionalResources,
    ] as ExtendedResource[];
    const map = new Map<string, ExtendedResource>();
    entries.forEach((entry) => {
      if (!entry.slug) return;
      if (map.has(entry.slug)) return;
      map.set(entry.slug, {
        ...entry,
        category:
          entry.category ?? slugCategoryOverrides[entry.slug] ?? "Planning",
        featured: entry.featured ?? false,
        popularity: entry.popularity ?? 50,
      });
    });
    return Array.from(map.values());
  }, []);

  const combinedResources = useMemo(() => {
    return catalogResources.map((resource) => ({
      ...resource,
      fileUrl: resolveUrl(resource, language === "de" ? "de" : "en") ?? "",
      fileType: "PDF" as const,
    })) as NormalizedResource[];
  }, [language, catalogResources]);

  const resources = useMemo(() => {
    return combinedResources.map((resource) => {
      const localizedTitle =
        language === "de"
          ? (resource.title?.de ?? resource.title?.en ?? resource.slug)
          : (resource.title?.en ?? resource.title?.de ?? resource.slug);
      const localizedDescription =
        language === "de"
          ? (resource.description?.de ?? resource.description?.en ?? "")
          : (resource.description?.en ?? resource.description?.de ?? "");

      const locale = language === "de" ? "de-DE" : "en-US";
      const releaseDate = resource.releasedAt
        ? new Date(resource.releasedAt).toLocaleDateString(locale)
        : null;
      const releasedLabel = releaseDate
        ? `${t("resources.released")} ${releaseDate}`
        : undefined;

      const availableLanguages = Object.keys(
        resource.files ?? {},
      ) as ResourceLocale[];
      const hasGerman = availableLanguages.includes("de");
      const hasEnglish = availableLanguages.includes("en");
      const badgeKey =
        hasEnglish && hasGerman
          ? "resources.badge.multilingual"
          : hasGerman
            ? "resources.badge.de"
            : "resources.badge.en";
      const languageBadge = t(badgeKey);

      const englishOnlyNote =
        language === "de" && !hasGerman
          ? t("resources.englishOnlyNote")
          : undefined;

      return {
        ...resource,
        localizedTitle,
        localizedDescription,
        downloadLabel: t("resources.downloadLabel.pdf"),
        releasedLabel,
        languageBadge,
        englishOnlyNote,
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
          resource.localizedTitle,
          resource.localizedDescription,
          ...(resource.tags ?? []),
        ]
          .filter(Boolean)
          .map((value) => (value ?? "").toLowerCase())
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
          return a.localizedTitle.localeCompare(b.localizedTitle);
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
      if (!url) {
        console.warn(`[Resources] No PDF url defined for ${resource.slug}`);
        return;
      }

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
