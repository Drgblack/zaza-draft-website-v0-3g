import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import DraftClient from "./draft-client";

const ogImage = "/images/draft-interface.png";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Teacher Communication Safety Tool for High-Stakes School Messages | Zaza Draft",
  description:
    "Explore Zaza Draft, the teacher communication safety tool built to catch risky language, support safer rewrites, forecast parent reaction, and help create defensible school messages.",
  path: "/products/draft",
  image: ogImage,
  alternates: {
    en: "https://zazadraft.com/products/draft",
    de: "https://zazadraft.com/de/products/draft",
  },
  keywords: [
    "teacher communication safety tool",
    "professional risk reduction for teachers",
    "AI parent email tool for teachers",
    "school communication software",
    "teacher communication software",
  ],
});

export default function DraftPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "draft-product-software-schema",
            data: createSoftwareApplicationJsonLd(),
          },
          {
            id: "draft-product-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Zaza Draft", path: "/products/draft" },
            ]),
          },
        ]}
      />
      <DraftClient />
    </>
  );
}
