import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/guides/GuidePage";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { getGuide, guideSlugs } from "@/lib/guides";
import {
  createFAQPageJsonLd,
  createHowToJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { toSchemaDate } from "@/lib/seo/content-freshness";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuide(params.slug);

  if (!guide) {
    return {};
  }

  return buildPageMetadata({
    title: guide.title,
    description: guide.metaDescription,
    path: guide.path,
    keywords: [
      "teacher communication guide",
      "parent communication for teachers",
      "teacher email tone guidance",
      guide.slug.replace(/-/g, " "),
    ],
    alternates: {
      en: `https://zazadraft.com${guide.path}`,
    },
  });
}

export default function GuideDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuide(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: `${guide.slug}-webpage-schema`,
            data: createWebPageJsonLd({
              name: guide.title,
              description: guide.metaDescription,
              path: guide.path,
              inLanguage: "en-GB",
              potentialActionName: "Read teacher communication guide",
              modifiedTime: toSchemaDate(guide.lastReviewed),
            }),
          },
          ...(guide.steps.length && guide.emitHowToSchema !== false
            ? [
                {
                  id: `${guide.slug}-howto-schema`,
                  data: createHowToJsonLd({
                    name: guide.frameworkTitle ?? guide.title,
                    description: guide.metaDescription,
                    path: guide.path,
                    steps: guide.steps.map((step) => ({
                      name: step.title,
                      text: step.body,
                    })),
                    inLanguage: "en-GB",
                  }),
                },
              ]
            : []),
          ...(guide.faq?.length
            ? [
                {
                  id: `${guide.slug}-faq-schema`,
                  data: createFAQPageJsonLd(guide.faq),
                },
              ]
            : []),
        ]}
      />
      <GuidePage guide={guide} />
    </>
  );
}
