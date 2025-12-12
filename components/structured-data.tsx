import { getOrganisationSchema, getWebsiteSchema } from "@/lib/seo/structured-data";

const structuredData = [getOrganisationSchema(), getWebsiteSchema()];

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
