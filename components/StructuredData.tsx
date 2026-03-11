import React from "react";
import { absoluteUrl, siteConfig } from "@/lib/seo/site-config";

type FAQItem = {
  question: string;
  answer: string;
};

type HowToStep = {
  name: string;
  text: string;
};

type AggregateRating = {
  ratingValue: number;
  ratingCount: number;
};

type BreadcrumbOverrides = Record<string, string>;

type StructuredDataType =
  | "Organization"
  | "SoftwareApplication"
  | "FAQPage"
  | "Article"
  | "HowTo"
  | "BreadcrumbList";

type StructuredDataProps = {
  type: StructuredDataType;
  data?: {
    id?: string;
    path?: string;
    title?: string;
    description?: string;
    image?: string;
    publishedTime?: string;
    modifiedTime?: string;
    faqs?: FAQItem[];
    steps?: HowToStep[];
    breadcrumbs?: BreadcrumbOverrides;
    aggregateRating?: AggregateRating;
  };
};

function serialiseJsonLd(value: Record<string, unknown>) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildBreadcrumbItems(path = "/", overrides: BreadcrumbOverrides = {}) {
  const cleanPath = path.split("?")[0].split("#")[0];
  const segments = cleanPath.split("/").filter(Boolean);
  const items: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
  ];

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: overrides[currentPath] ?? formatSegmentLabel(segment),
      item: absoluteUrl(currentPath),
    });
  });

  return items;
}

function buildSchema(
  type: StructuredDataType,
  data: StructuredDataProps["data"] = {},
): Record<string, unknown> {
  const path = data.path ?? "/";
  const title = data.title ?? siteConfig.name;
  const description =
    data.description ??
    "Zaza Draft is a UK-based, teacher-built, GDPR compliant AI co-writer for parent communication, report comments, and school writing. Teachers stay in control of every draft, and the workflow is designed to avoid invented student facts.";
  const image = absoluteUrl(data.image ?? siteConfig.defaultOgImage);

  switch (type) {
    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        brand: {
          "@type": "Brand",
          name: siteConfig.name,
          slogan: siteConfig.slogan,
        },
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logoPath),
        description,
        founder: {
          "@type": "Person",
          name: siteConfig.founder.name,
          honorificSuffix: siteConfig.founder.honorificSuffix,
          jobTitle: siteConfig.founder.jobTitle,
          description:
            "Dr Greg Blackburn, PhD, founded Zaza Technologies and built Zaza Draft as a calm, teacher-first writing co-writer for teachers and school staff.",
        },
        email: siteConfig.supportEmail,
        areaServed: {
          "@type": "Country",
          name: "United Kingdom",
        },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "teacher",
        },
        knowsAbout: [
          "Teacher-first AI writing help",
          "Parent communication",
          "Report comments",
          "Professional school communication",
          "GDPR compliant AI for teachers",
          "No invented student facts",
        ],
        sameAs: siteConfig.sameAs,
      };

    case "SoftwareApplication":
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl(path)}#software`,
        name: siteConfig.name,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        url: absoluteUrl(path),
        description,
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "teacher",
        },
        areaServed: {
          "@type": "Country",
          name: "United Kingdom",
        },
        creator: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          description:
            "Free trial available for teachers who want calm, professional writing support.",
        },
        featureList: [
          "Parent communication drafting",
          "Report comment drafting support",
          "Teacher review and approval of every draft",
          "Professional, lower-risk wording",
          "No invented student facts",
        ],
        ...(data.aggregateRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: data.aggregateRating.ratingValue,
                ratingCount: data.aggregateRating.ratingCount,
              },
            }
          : {}),
      };

    case "FAQPage":
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (data.faqs ?? []).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        mainEntityOfPage: absoluteUrl(path),
        inLanguage: "en-GB",
        image: [image],
        author: {
          "@type": "Person",
          name: siteConfig.founder.name,
          honorificSuffix: siteConfig.founder.honorificSuffix,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        ...(data.publishedTime ? { datePublished: data.publishedTime } : {}),
        ...(data.modifiedTime ? { dateModified: data.modifiedTime } : {}),
      };

    case "HowTo":
      return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: title,
        description,
        url: absoluteUrl(path),
        inLanguage: "en-GB",
        totalTime: "PT10M",
        tool: {
          "@id": `${siteConfig.url}/products/draft#software`,
        },
        step: (data.steps ?? []).map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      };

    case "BreadcrumbList":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: buildBreadcrumbItems(path, data.breadcrumbs),
      };

    default:
      return {};
  }
}

export function StructuredData({
  type,
  data,
}: StructuredDataProps): React.JSX.Element | null {
  const schema = buildSchema(type, data);

  if (!schema["@type"]) {
    return null;
  }

  return (
    <script
      id={data?.id ?? `${type.toLowerCase()}-jsonld`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialiseJsonLd(schema) }}
    />
  );
}
