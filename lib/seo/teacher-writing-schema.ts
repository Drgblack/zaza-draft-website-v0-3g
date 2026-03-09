import type { Metadata } from "next";
import type {
  FAQItem,
  StructuredDataType,
  TeacherWritingPage,
} from "@/lib/seo/teacher-writing-pages";
import {
  drGregBlackburnBio,
  zazaDraftEntityDefinition,
  zazaDraftEntityKeywords,
} from "@/lib/seo/entity-definitions";

const baseUrl = "https://zazadraft.com";
const brandName = "Zaza Draft";
const organizationId = `${baseUrl}/#organization`;
const softwareId = `${baseUrl}/products/draft#software`;

function buildAboutEntities(page: TeacherWritingPage) {
  return [
    { "@id": organizationId },
    { "@id": softwareId },
    { "@type": "Thing", name: page.keyword },
  ];
}

function buildFaqSchema(faq: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

function buildBreadcrumbSchema(page: TeacherWritingPage) {
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
        name: page.shortTitle,
        item: `${baseUrl}/${page.slug}`,
      },
    ],
  };
}

function buildWebPageSchema(page: TeacherWritingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.metaDescription,
    url: `${baseUrl}/${page.slug}`,
    inLanguage: "en-GB",
    about: buildAboutEntities(page),
    keywords: [page.keyword, ...zazaDraftEntityKeywords],
    isPartOf: {
      "@type": "WebSite",
      name: brandName,
      url: baseUrl,
    },
  };
}

function buildSoftwareApplicationSchema(page: TeacherWritingPage) {
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
    description: `${zazaDraftEntityDefinition} This page targets the query "${page.keyword}".`,
    creator: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
    keywords: [page.keyword, ...zazaDraftEntityKeywords],
    isAccessibleForFree: true,
  };
}

function buildArticleSchema(page: TeacherWritingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    mainEntityOfPage: `${baseUrl}/${page.slug}`,
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
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    inLanguage: "en-GB",
    about: buildAboutEntities(page),
    keywords: [page.keyword, ...zazaDraftEntityKeywords],
  };
}

const builders: Record<
  StructuredDataType,
  (page: TeacherWritingPage) => Record<string, unknown>
> = {
  WebPage: buildWebPageSchema,
  BreadcrumbList: buildBreadcrumbSchema,
  FAQPage: (page) => buildFaqSchema(page.faq),
  SoftwareApplication: buildSoftwareApplicationSchema,
  Article: buildArticleSchema,
};

export function buildTeacherWritingMetadata(
  page: TeacherWritingPage,
): Metadata {
  const canonicalUrl = `${baseUrl}/${page.slug}`;

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

export function buildTeacherWritingJsonLd(page: TeacherWritingPage) {
  return page.structuredDataTypes.map((type) => builders[type](page));
}
