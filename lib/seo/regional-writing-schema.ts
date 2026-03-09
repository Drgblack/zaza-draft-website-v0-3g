import type { Metadata } from "next";
import type {
  FAQItem,
  StructuredDataType,
  TeacherWritingPage,
} from "@/lib/seo/teacher-writing-pages";
import type { RegionalTeacherWritingRegion } from "@/lib/seo/regional-writing-pages";

const baseUrl = "https://zazadraft.com";
const brandName = "Zaza Draft";
const softwareDescription =
  "Teacher-first AI writing support for parent communication, reports, and school writing where tone and professional judgement matter.";

function buildRegionalUrl(region: RegionalTeacherWritingRegion, slug: string) {
  return `${baseUrl}/${region}/${slug}`;
}

function buildFaqSchema(faq: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-GB",
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
    about: page.keyword,
    audience: {
      "@type": "Audience",
      audienceType:
        region === "uk"
          ? "Teachers and school staff in the United Kingdom"
          : "Teachers and school staff in England",
    },
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
    description: `${softwareDescription} This page targets the query "${page.keyword}".`,
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
      "@type": "Organization",
      name: brandName,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/z-logo.png`,
      },
    },
    image: `${baseUrl}${page.ogImage}`,
    datePublished: "2026-03-09",
    dateModified: "2026-03-09",
    inLanguage: "en-GB",
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
  SoftwareApplication: (_region, page) => buildSoftwareApplicationSchema(page),
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
