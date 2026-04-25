import { getLocalizedDepartmentAmount, pricingConfig } from "@/config/pricing";
import { absoluteUrl, siteConfig } from "@/lib/seo/site-config";

const LAST_UPDATED = "2026-04-25";

export function getPublicProductInfo() {
  return {
    productName: siteConfig.name,
    parentCompany: siteConfig.legalName,
    description:
      "Zaza Draft is a risk-aware AI writing and communication support tool for teachers. It helps educators write calmer parent emails, safer difficult replies, clearer school messages, and more meaningful report comments without losing professional judgement.",
    audience: ["teachers", "schools", "educators"],
    useCases: [
      "parent emails",
      "difficult parent replies",
      "behaviour updates",
      "report comments",
      "sensitive school communication",
    ],
    pricingSummary: {
      freeAccess: {
        available: true,
        summary:
          "Starter includes 5 drafts per month with no credit card required.",
      },
      selfServe: {
        teacher: {
          monthly: pricingConfig.draft.displayAmounts.monthly,
          yearly: pricingConfig.draft.displayAmounts.annual,
        },
        bundle: {
          monthly: pricingConfig.bundle.displayAmounts.monthly,
          yearly: pricingConfig.bundle.displayAmounts.annual,
        },
      },
      teams: {
        departmentMonthlyPerTeacher: {
          EUR: getLocalizedDepartmentAmount("EUR"),
          USD: getLocalizedDepartmentAmount("USD"),
        },
        billing: "annual",
        seats: "5-50",
      },
      enterprise: {
        pricing: "custom",
      },
      preferredConversionPath: "yearly billing where available",
      sourceUrl: absoluteUrl("/pricing"),
    },
    importantUrls: {
      home: absoluteUrl("/"),
      start: absoluteUrl("/start"),
      germanStart: absoluteUrl("/de/start"),
      pricing: absoluteUrl("/pricing"),
      product: absoluteUrl("/products/draft"),
      freeRiskChecker: absoluteUrl("/parent-email-risk-checker"),
      llms: absoluteUrl("/llms.txt"),
      llmsFull: absoluteUrl("/llms-full.txt"),
    },
    lastUpdated: LAST_UPDATED,
    supportContactUrl: absoluteUrl("/contact"),
  };
}

export function getPublicSiteCapabilities() {
  return {
    availablePublicTools: [
      {
        name: "Parent Email Risk Checker",
        type: "web tool",
        url: absoluteUrl("/parent-email-risk-checker"),
        description:
          "Checks the tone risk of a draft parent email and suggests calmer wording through the public site experience.",
      },
    ],
    freeRiskCheckerUrl: absoluteUrl("/parent-email-risk-checker"),
    appUrl: "https://app.zazadraft.com",
    supportedLanguages: ["en", "de"],
    limitations: [
      "No public write or rewrite API is exposed through these endpoints.",
      "No user data is returned.",
      "No authentication or account access is exposed.",
      "No legal advice, emergency support, or safeguarding determinations are provided.",
      "Exact checkout behavior and live plan details should be verified against the public pricing page.",
    ],
    lastUpdated: LAST_UPDATED,
  };
}
