const baseUrl = "https://zazadraft.com";

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "Zaza Technologies",
  url: baseUrl,
  logo: `${baseUrl}/z-logo.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@zazatechnologies.com",
      availableLanguage: ["English", "German"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/zaza-technologies",
    "https://twitter.com/zazatech",
    "https://www.youtube.com/@zazadraft",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "Zaza Draft",
  description:
    "Zaza Draft is a teacher-first AI writing assistant that drafts parent messages, feedback, and reports faster with safety guardrails.",
  url: baseUrl,
  publisher: {
    "@id": organisationSchema["@id"],
  },
};

export function getOrganisationSchema() {
  return organisationSchema;
}

export function getWebsiteSchema() {
  return websiteSchema;
}

interface WebPageSchemaOptions {
  name: string;
  description: string;
  url: string;
  language: string;
}

export function getWebPageSchema(options: WebPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: options.url,
    inLanguage: options.language,
    isPartOf: {
      "@id": websiteSchema["@id"],
    },
    publisher: {
      "@id": organisationSchema["@id"],
    },
  };
}
