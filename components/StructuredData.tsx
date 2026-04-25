import React from "react";
import {
  buildArticleJsonLd,
  buildBreadcrumbListJsonLd,
  buildFAQPageJsonLd,
  buildHowToJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  serializeJsonLd,
  type FAQItemInput,
  type HowToStepInput,
  type JsonLdObject,
} from "@/lib/seo/schema";

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
  | "BreadcrumbList"
  | "WebPage";

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
    faqs?: FAQItemInput[];
    steps?: HowToStepInput[];
    breadcrumbs?: BreadcrumbOverrides;
    aggregateRating?: AggregateRating;
    keywords?: string[];
    inLanguage?: string;
    potentialActionName?: string;
    offers?: JsonLdObject | JsonLdObject[];
  };
};

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildBreadcrumbItems(path = "/", overrides: BreadcrumbOverrides = {}) {
  const cleanPath = path.split("?")[0].split("#")[0];
  const segments = cleanPath.split("/").filter(Boolean);
  const items: Array<{ name: string; path: string }> = [
    {
      name: "Home",
      path: "/",
    },
  ];

  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    items.push({
      name: overrides[currentPath] ?? formatSegmentLabel(segment),
      path: currentPath,
    });
  });

  return items;
}

function buildSchema(
  type: StructuredDataType,
  data: StructuredDataProps["data"],
) {
  const path = data?.path ?? "/";
  const title = data?.title ?? "Zaza Draft";
  const description =
    data?.description ??
    "Zaza Draft is an AI writing and communication support tool for teachers.";

  switch (type) {
    case "Organization":
      return buildOrganizationJsonLd();
    case "SoftwareApplication":
      return buildSoftwareApplicationJsonLd({
        description,
        aggregateRating: data?.aggregateRating,
        inLanguage: data?.inLanguage,
        offers: data?.offers,
      });
    case "FAQPage":
      return buildFAQPageJsonLd(data?.faqs ?? []);
    case "Article":
      return buildArticleJsonLd({
        headline: title,
        description,
        path,
        image: data?.image,
        publishedTime: data?.publishedTime,
        modifiedTime: data?.modifiedTime,
      });
    case "HowTo":
      return buildHowToJsonLd({
        name: title,
        description,
        path,
        steps: data?.steps ?? [],
        inLanguage: data?.inLanguage,
      });
    case "BreadcrumbList":
      return buildBreadcrumbListJsonLd(
        buildBreadcrumbItems(path, data?.breadcrumbs),
      );
    case "WebPage":
      return buildWebPageJsonLd({
        name: title,
        description,
        path,
        keywords: data?.keywords,
        inLanguage: data?.inLanguage,
        potentialActionName: data?.potentialActionName,
        modifiedTime: data?.modifiedTime,
      });
    default:
      return null;
  }
}

export function StructuredData({
  type,
  data,
}: StructuredDataProps): React.JSX.Element | null {
  const schema = buildSchema(type, data);

  if (!schema) {
    return null;
  }

  return (
    <script
      id={data?.id ?? `${type.toLowerCase()}-jsonld`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
