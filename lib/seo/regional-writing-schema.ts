import type { Metadata } from "next";
import type {
  FAQItem,
  StructuredDataType,
  TeacherWritingPage,
} from "@/lib/seo/teacher-writing-pages";
import type { RegionalTeacherWritingRegion } from "@/lib/seo/regional-writing-pages";
import {
  drGregBlackburnBio,
  zazaDraftEntityDefinition,
  zazaDraftEntityKeywords,
} from "@/lib/seo/entity-definitions";

const baseUrl = "https://zazadraft.com";
const brandName = "Zaza Draft";
const organizationId = `${baseUrl}/#organization`;
const softwareId = `${baseUrl}/products/draft#software`;

function buildRegionalUrl(region: RegionalTeacherWritingRegion, slug: string) {
  return `${baseUrl}/${region}/${slug}`;
}

function buildRegionPlace(region: RegionalTeacherWritingRegion) {
  if (region === "uk") {
    return {
      "@type": "Country",
      name: "United Kingdom",
      sameAs: "https://www.wikidata.org/wiki/Q145",
    };
  }

  return {
    "@type": "AdministrativeArea",
    name: "England",
    containedInPlace: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };
}

function buildFaqSchema(faq: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-GB",
    about: {
      "@id": organizationId,
    },
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(
  region: RegionalTeacherWritingRegion,
  page: TeacherWritingPage,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: region.toUpperCase(),
        item: `${baseUrl}/${region}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.shortTitle,
        item: buildRegionalUrl(region, page.slug),
      },
    ],
  };
}

function buildWebPageSchema(
  region: RegionalTeacherWritingRegion,
  page: TeacherWritingPage,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.metaDescription,
    url: buildRegionalUrl(region, page.slug),
    inLanguage: "en-GB",
    about: [
      {
        "@id": organizationId,
      },
      {
        "@id": softwareId,
      },
      {
        "@type": "Thing",
        name: page.keyword,
      },
    ],
    audience: {
      "@type": "EducationalAudience",
      audienceType:
        region === "uk"
          ? "Teachers and school staff in the United Kingdom"
          : "Teachers and school staff in England",
      educationalRole: "teacher",
    },
    areaServed: buildRegionPlace(region),
    contentLocation: buildRegionPlace(region),
    isPartOf: {
      "@type": "WebSite",
      name: brandName,
      url: baseUrl,
    },
    keywords: [page.keyword, ...zazaDraftEntityKeywords],
  };
}

function buildSoftwareApplicationSchema(
  region: RegionalTeacherWritingRegion,
  page: TeacherWritingPage,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: brandName,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: `${baseUrl}/products/draft`,
    featureList: [
      "Teacher-specific writing support",
      "Parent communication drafting",
      "Report writing and comment support",
      "Professional tone guidance",
      "Review-led co-writer workflow",
    ],
    description: `${zazaDraftEntityDefinition} This page targets the query "${page.keyword}" for ${region === "uk" ? "teachers and school staff in the United Kingdom" : "teachers and school staff in England"}.`,
    creator: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
    },
    areaServed: buildRegionPlace(region),
    keywords: [page.keyword, ...zazaDraftEntityKeywords],
    isAccessibleForFree: true,
  };
}

function buildArticleSchema(
  region: RegionalTeacherWritingRegion,
  page: TeacherWritingPage,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    mainEntityOfPage: buildRegionalUrl(region, page.slug),
    author: {
      "@type": "Person",
      name: "Dr Greg Blackburn",
      honorificSuffix: "PhD",
      description: drGregBlackburnBio,
    },
    publisher: {
      "@id": organizationId,
    },
    image: `${baseUrl}${page.ogImage}`,
    datePublished: "2026-03-09",
    dateModified: "2026-03-09",
    inLanguage: "en-GB",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
    },
    contentLocation: buildRegionPlace(region),
    about: [
      {
        "@id": organizationId,
      },
      {
        "@id": softwareId,
      },
      buildRegionPlace(region),
    ],
    keywords: [page.keyword, ...zazaDraftEntityKeywords],
  };
}

const builders: Record<
  StructuredDataType,
  (
    region: RegionalTeacherWritingRegion,
    page: TeacherWritingPage,
  ) => Record<string, unknown>
> = {
  WebPage: buildWebPageSchema,
  BreadcrumbList: buildBreadcrumbSchema,
  FAQPage: (_region, page) => buildFaqSchema(page.faq),
  SoftwareApplication: buildSoftwareApplicationSchema,
  Article: buildArticleSchema,
};

export function buildRegionalTeacherWritingMetadata(
  region: RegionalTeacherWritingRegion,
  page: TeacherWritingPage,
): Metadata {
  const canonicalUrl = buildRegionalUrl(region, page.slug);

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonicalUrl,
      type: "website",
      siteName: brandName,
      locale: "en_GB",
      images: [
        {
          url: page.ogImage,
          alt: page.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: [page.ogImage],
    },
  };
}

export function buildRegionalTeacherWritingJsonLd(
  region: RegionalTeacherWritingRegion,
  page: TeacherWritingPage,
) {
  return page.structuredDataTypes.map((type) => builders[type](region, page));
}
