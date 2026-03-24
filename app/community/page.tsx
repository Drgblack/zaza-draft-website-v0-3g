import type { Metadata } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import CommunityClient from "./community-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Teacher Community Forum | Zaza Draft",
  description:
    "Join the teacher community for practical AI discussion, classroom workflows, and safe school communication ideas.",
  path: "/community",
  alternates: {
    en: "https://zazadraft.com/community",
    de: "https://zazadraft.com/de/community",
  },
  keywords: [
    "teacher community",
    "AI community for teachers",
    "teacher discussion forum",
    "school communication community",
  ],
});

export default function CommunityPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "community-webpage-schema",
            data: createWebPageJsonLd({
              name: "Teacher Community Forum",
              description:
                "A teacher community for practical AI discussion, classroom workflows, and safe school communication ideas.",
              path: "/community",
              potentialActionName: "Join the teacher community",
            }),
          },
          {
            id: "community-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Community", path: "/community" },
            ]),
          },
        ]}
      />
      <CommunityClient />
    </>
  );
}
