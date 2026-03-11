import { absoluteUrl, siteConfig } from "@/lib/seo/site-config";
import {
  drGregBlackburnBio,
  zazaDraftEntityDefinition,
  zazaDraftEntityKeywords,
} from "@/lib/seo/entity-definitions";

type JsonLd = Record<string, unknown>;

interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface ArticleInput {
  headline: string;
  description: string;
  path: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

interface WebPageInput {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
  potentialActionName?: string;
}

interface HowToInput {
  name: string;
  description: string;
  path: string;
  steps: Array<{
    name: string;
    text: string;
  }>;
}

interface SoftwareApplicationInput {
  description?: string;
  path?: string;
  featureList?: string[];
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

export function createOrganizationJsonLd(): JsonLd {
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
    description: zazaDraftEntityDefinition,
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      honorificSuffix: siteConfig.founder.honorificSuffix,
      jobTitle: siteConfig.founder.jobTitle,
      description: drGregBlackburnBio,
    },
    email: siteConfig.supportEmail,
    knowsAbout: zazaDraftEntityKeywords,
    sameAs: siteConfig.sameAs,
  };
}

export function createWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: zazaDraftEntityDefinition,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-GB",
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    keywords: zazaDraftEntityKeywords,
  };
}

export function createSoftwareApplicationJsonLd({
  description,
  path = "/products/draft",
  featureList = [
    "Parent communication drafting for teachers",
    "Report comments and school writing support",
    "Teacher review and approval before anything is used",
    "Tone guidance for emotionally difficult messages",
    "GDPR-ready workflow for school communication drafts",
  ],
  aggregateRating,
}: SoftwareApplicationInput = {}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(path)}#software`,
    name: siteConfig.name,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      description:
        "Free trial available for teachers who want calm, professional AI writing support.",
    },
    creator: {
      "@id": `${siteConfig.url}/#organization`,
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
    },
    description: description ?? zazaDraftEntityDefinition,
    featureList,
    keywords: zazaDraftEntityKeywords,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    isAccessibleForFree: true,
    ...(aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregateRating.ratingValue,
            ratingCount: aggregateRating.ratingCount,
          },
        }
      : {}),
  };
}

export function createFAQPageJsonLd(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createArticleJsonLd({
  headline,
  description,
  path,
  image = siteConfig.defaultOgImage,
  publishedTime,
  modifiedTime,
}: ArticleInput): JsonLd {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: pageUrl,
    image: [absoluteUrl(image)],
    inLanguage: "en-GB",
    author: {
      "@type": "Person",
      name: siteConfig.founder.name,
      honorificSuffix: siteConfig.founder.honorificSuffix,
      description: drGregBlackburnBio,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    about: [
      {
        "@id": `${siteConfig.url}/#organization`,
      },
      {
        "@id": `${absoluteUrl("/products/draft")}#software`,
      },
    ],
    keywords: zazaDraftEntityKeywords,
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  };
}

export function createWebPageJsonLd({
  name,
  description,
  path,
  keywords = zazaDraftEntityKeywords,
  potentialActionName,
}: WebPageInput): JsonLd {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: pageUrl,
    inLanguage: "en-GB",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: [
      {
        "@id": `${siteConfig.url}/#organization`,
      },
      {
        "@id": `${absoluteUrl("/products/draft")}#software`,
      },
    ],
    keywords,
    ...(potentialActionName
      ? {
          potentialAction: {
            "@type": "UseAction",
            name: potentialActionName,
            target: pageUrl,
          },
        }
      : {}),
  };
}

export function createHowToJsonLd({
  name,
  description,
  path,
  steps,
}: HowToInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "en-GB",
    totalTime: "PT10M",
    about: [
      {
        "@id": `${siteConfig.url}/#organization`,
      },
      {
        "@id": `${absoluteUrl("/products/draft")}#software`,
      },
    ],
    tool: {
      "@id": `${absoluteUrl("/products/draft")}#software`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
