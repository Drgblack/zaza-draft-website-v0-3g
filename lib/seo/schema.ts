import React from "react";
import {
  pricingConfig,
  type PricingCurrency,
  type SelfServeInterval,
  type SelfServePlan,
} from "@/config/pricing";
import {
  drGregBlackburnBio,
  zazaDraftEntityDefinition,
  zazaDraftEntityKeywords,
} from "@/lib/seo/entity-definitions";
import { absoluteUrl, siteConfig } from "@/lib/seo/site-config";

export type JsonLdScalar = string | number | boolean | null;
export type JsonLdValue = JsonLdScalar | JsonLdObject | JsonLdValue[];
export type JsonLdObject = {
  [key: string]: JsonLdValue;
};

export type JsonLdEntry<T extends JsonLdValue = JsonLdObject> = {
  id: string;
  data: T;
};

export type BreadcrumbItemInput = {
  name: string;
  path: string;
};

export type FAQItemInput = {
  question: string;
  answer: string;
};

export type HowToStepInput = {
  name: string;
  text: string;
};

export type OfferSchemaInput = {
  name: string;
  price: number | string;
  priceCurrency: string;
  url: string;
  description?: string;
  availability?: string;
  category?: string;
  itemOfferedId?: string;
  sellerId?: string;
};

export type SoftwareApplicationSchemaInput = {
  name?: string;
  description?: string;
  featureList?: string[];
  offers?: JsonLdObject | JsonLdObject[];
  isAccessibleForFree?: boolean;
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
  inLanguage?: string;
};

export type WebPageSchemaInput = {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
  inLanguage?: string;
  potentialActionName?: string;
  modifiedTime?: string;
};

export type ArticleSchemaInput = {
  headline: string;
  description: string;
  path: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  inLanguage?: string;
};

export type HowToSchemaInput = {
  name: string;
  description: string;
  path: string;
  steps: HowToStepInput[];
  inLanguage?: string;
};

export type CourseSchemaInput = {
  name: string;
  description: string;
  provider: string;
  url: string;
  inLanguage?: string;
  isAccessibleForFree?: boolean;
};

export type EventSchemaInput = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  url: string;
  organizer: string;
};

export const zazaSchemaIds = {
  organization: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
  person: `${siteConfig.url}/about/founder#person`,
  software: `${absoluteUrl("/products/draft")}#software`,
} as const;

const defaultSoftwareDescription =
  "Zaza Draft is an AI writing and communication support tool for teachers. It helps teachers write safer parent emails and more meaningful report comments, with calmer wording they will not regret tomorrow.";

const defaultSoftwareFeatures = [
  "Safer parent email drafting for teachers",
  "Report comment and school writing support",
  "Tone guidance for emotionally difficult messages",
  "Teacher review and approval before anything is used",
  "Communication support designed for teachers, schools, and educators",
];

function stripSchemaContext(value: JsonLdObject | JsonLdObject[]) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const { "@context": _context, ...rest } = item;
      return rest;
    });
  }

  const { "@context": _context, ...rest } = value;
  return rest;
}

function buildScriptMarkup(data: JsonLdValue) {
  return {
    __html: serializeJsonLd(data),
  };
}

export function serializeJsonLd(data: JsonLdValue) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function buildOrganizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": zazaSchemaIds.organization,
    name: siteConfig.legalName,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
      slogan: siteConfig.slogan,
    },
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoPath),
    description: zazaDraftEntityDefinition,
    email: siteConfig.supportEmail,
    founder: {
      "@id": zazaSchemaIds.person,
    },
    audience: [
      {
        "@type": "EducationalAudience",
        educationalRole: "teacher",
      },
      {
        "@type": "Audience",
        audienceType: "schools",
      },
      {
        "@type": "Audience",
        audienceType: "educators",
      },
    ],
    knowsAbout: zazaDraftEntityKeywords,
    sameAs: [...siteConfig.sameAs],
  };
}

export function buildPersonJsonLd({
  inLanguage = "en-GB",
}: {
  inLanguage?: string;
} = {}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": zazaSchemaIds.person,
    name: siteConfig.founder.name,
    honorificSuffix: siteConfig.founder.honorificSuffix,
    jobTitle: siteConfig.founder.jobTitle,
    description: drGregBlackburnBio,
    image: absoluteUrl("/authors/Greg.jpg"),
    url: absoluteUrl("/about/founder"),
    worksFor: {
      "@id": zazaSchemaIds.organization,
    },
    sameAs: [
      absoluteUrl("/about/founder"),
      absoluteUrl("/about/founder-story"),
    ],
    inLanguage,
  };
}

export function buildWebsiteJsonLd({
  inLanguage = "en-GB",
}: {
  inLanguage?: string;
} = {}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": zazaSchemaIds.website,
    name: siteConfig.name,
    url: siteConfig.url,
    description: zazaDraftEntityDefinition,
    publisher: {
      "@id": zazaSchemaIds.organization,
    },
    about: {
      "@id": zazaSchemaIds.organization,
    },
    author: {
      "@id": zazaSchemaIds.person,
    },
    inLanguage,
    keywords: zazaDraftEntityKeywords,
  };
}

export function buildOfferJsonLd({
  name,
  price,
  priceCurrency,
  url,
  description,
  availability = "https://schema.org/InStock",
  category,
  itemOfferedId = zazaSchemaIds.software,
  sellerId = zazaSchemaIds.organization,
}: OfferSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    price,
    priceCurrency,
    availability,
    url: absoluteUrl(url),
    seller: {
      "@id": sellerId,
    },
    itemOffered: {
      "@id": itemOfferedId,
    },
    ...(description ? { description } : {}),
    ...(category ? { category } : {}),
  };
}

export function buildSoftwareApplicationJsonLd({
  name = siteConfig.name,
  description = defaultSoftwareDescription,
  featureList = defaultSoftwareFeatures,
  offers,
  isAccessibleForFree = true,
  aggregateRating,
  inLanguage = "en-GB",
}: SoftwareApplicationSchemaInput = {}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": zazaSchemaIds.software,
    name,
    applicationCategory: "EducationalApplication",
    applicationSubCategory:
      "AI writing and communication support tool for teachers",
    operatingSystem: "Web",
    url: "https://app.zazadraft.com",
    downloadUrl: "https://app.zazadraft.com",
    description,
    creator: {
      "@id": zazaSchemaIds.organization,
    },
    author: {
      "@id": zazaSchemaIds.person,
    },
    publisher: {
      "@id": zazaSchemaIds.organization,
    },
    audience: [
      {
        "@type": "EducationalAudience",
        educationalRole: "teacher",
      },
      {
        "@type": "Audience",
        audienceType: "schools",
      },
      {
        "@type": "Audience",
        audienceType: "educators",
      },
    ],
    inLanguage,
    keywords: zazaDraftEntityKeywords,
    featureList,
    isAccessibleForFree,
    ...(offers ? { offers: stripSchemaContext(offers) } : {}),
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

export function buildFAQPageJsonLd(
  items: FAQItemInput[],
  {
    aboutId = zazaSchemaIds.organization,
  }: {
    aboutId?: string;
  } = {},
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    about: {
      "@id": aboutId,
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

export function buildBreadcrumbListJsonLd(
  items: BreadcrumbItemInput[],
): JsonLdObject {
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

export function buildWebPageJsonLd({
  name,
  description,
  path,
  keywords = zazaDraftEntityKeywords,
  inLanguage = "en-GB",
  potentialActionName,
  modifiedTime,
}: WebPageSchemaInput): JsonLdObject {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: pageUrl,
    inLanguage,
    isPartOf: {
      "@id": zazaSchemaIds.website,
    },
    about: [
      {
        "@id": zazaSchemaIds.organization,
      },
      {
        "@id": zazaSchemaIds.software,
      },
    ],
    keywords,
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
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

export function buildArticleJsonLd({
  headline,
  description,
  path,
  image = siteConfig.defaultOgImage,
  publishedTime,
  modifiedTime,
  inLanguage = "en-GB",
}: ArticleSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: absoluteUrl(path),
    image: [absoluteUrl(image)],
    inLanguage,
    author: {
      "@id": zazaSchemaIds.person,
    },
    publisher: {
      "@id": zazaSchemaIds.organization,
    },
    about: [
      {
        "@id": zazaSchemaIds.organization,
      },
      {
        "@id": zazaSchemaIds.software,
      },
    ],
    keywords: zazaDraftEntityKeywords,
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  };
}

export function buildHowToJsonLd({
  name,
  description,
  path,
  steps,
  inLanguage = "en-GB",
}: HowToSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage,
    totalTime: "PT10M",
    about: [
      {
        "@id": zazaSchemaIds.organization,
      },
      {
        "@id": zazaSchemaIds.software,
      },
    ],
    tool: {
      "@id": zazaSchemaIds.software,
    },
    publisher: {
      "@id": zazaSchemaIds.organization,
    },
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildCourseJsonLd({
  name,
  description,
  provider,
  url,
  inLanguage = "en",
  isAccessibleForFree = true,
}: CourseSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    url,
    educationalLevel: "Professional Development",
    inLanguage,
    isAccessibleForFree,
  };
}

export function buildEventJsonLd({
  name,
  description,
  startDate,
  endDate,
  url,
  organizer,
}: EventSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url,
    },
    organizer: {
      "@type": "Organization",
      name: organizer,
    },
  };
}

export function buildVisibleSelfServeOfferJsonLd(
  plan: SelfServePlan,
  interval: SelfServeInterval,
  currency: PricingCurrency,
  {
    name,
    url = "/pricing",
    description,
  }: {
    name: string;
    url?: string;
    description?: string;
  },
): JsonLdObject | null {
  const priceId = pricingConfig[plan].stripePriceIds[interval][currency];

  if (!priceId) {
    return null;
  }

  const price = pricingConfig[plan].displayAmounts[interval][currency];

  return buildOfferJsonLd({
    name,
    price,
    priceCurrency: currency,
    url,
    description,
    category: `${plan}-${interval}`,
  });
}

type JsonLdScriptProps = {
  id: string;
  data: JsonLdValue;
};

function BaseJsonLdScript({ id, data }: JsonLdScriptProps): React.JSX.Element {
  return React.createElement("script", {
    id,
    type: "application/ld+json",
    dangerouslySetInnerHTML: buildScriptMarkup(data),
  });
}

export function OrganizationSchema({
  id = "organization-schema",
}: {
  id?: string;
}) {
  return BaseJsonLdScript({ id, data: buildOrganizationJsonLd() });
}

export function WebsiteSchema({
  id = "website-schema",
  inLanguage,
}: {
  id?: string;
  inLanguage?: string;
}) {
  return BaseJsonLdScript({
    id,
    data: buildWebsiteJsonLd({ inLanguage }),
  });
}

export function CourseSchema({
  id = "course-schema",
  ...input
}: CourseSchemaInput & { id?: string }) {
  return BaseJsonLdScript({ id, data: buildCourseJsonLd(input) });
}

export function EventSchema({
  id = "event-schema",
  ...input
}: EventSchemaInput & { id?: string }) {
  return BaseJsonLdScript({ id, data: buildEventJsonLd(input) });
}

export function FAQSchema({
  id = "faq-schema",
  questions,
}: {
  id?: string;
  questions: FAQItemInput[];
}) {
  return BaseJsonLdScript({ id, data: buildFAQPageJsonLd(questions) });
}

export function BreadcrumbSchema({
  id = "breadcrumb-schema",
  items,
}: {
  id?: string;
  items: Array<{
    name: string;
    url: string;
  }>;
}) {
  return BaseJsonLdScript({
    id,
    data: buildBreadcrumbListJsonLd(
      items.map((item) => ({
        name: item.name,
        path: item.url,
      })),
    ),
  });
}

export function SoftwareApplicationSchema({
  id = "software-schema",
  name,
  description,
  applicationCategory,
  operatingSystem,
  offers,
  aggregateRating,
}: {
  id?: string;
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}) {
  const offerData =
    offers &&
    buildOfferJsonLd({
      name: `${name} plan`,
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      url: "/pricing",
      description,
    });

  return BaseJsonLdScript({
    id,
    data: {
      ...buildSoftwareApplicationJsonLd({
        name,
        description,
        offers: offerData,
        aggregateRating: aggregateRating
          ? {
              ratingValue: aggregateRating.ratingValue,
              ratingCount: aggregateRating.reviewCount,
            }
          : undefined,
      }),
      ...(applicationCategory ? { applicationCategory } : {}),
      ...(operatingSystem ? { operatingSystem } : {}),
    },
  });
}
