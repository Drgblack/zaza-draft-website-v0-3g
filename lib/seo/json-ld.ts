import {
  buildArticleJsonLd,
  buildBreadcrumbListJsonLd,
  buildFAQPageJsonLd,
  buildHowToJsonLd,
  buildOfferJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildWebsiteJsonLd,
  buildVisibleSelfServeOfferJsonLd,
  type ArticleSchemaInput,
  type BreadcrumbItemInput,
  type FAQItemInput,
  type HowToSchemaInput,
  type JsonLdObject,
  type OfferSchemaInput,
  type SoftwareApplicationSchemaInput,
  type WebPageSchemaInput,
} from "@/lib/seo/schema";

export type JsonLd = JsonLdObject;

export function createOrganizationJsonLd() {
  return buildOrganizationJsonLd();
}

export function createWebsiteJsonLd() {
  return buildWebsiteJsonLd();
}

export function createSoftwareApplicationJsonLd(
  input: SoftwareApplicationSchemaInput & {
    path?: string;
  } = {},
) {
  const { path: _path, ...rest } = input;
  return buildSoftwareApplicationJsonLd(rest);
}

export function createFAQPageJsonLd(items: FAQItemInput[]) {
  return buildFAQPageJsonLd(items);
}

export function createArticleJsonLd(input: ArticleSchemaInput) {
  return buildArticleJsonLd(input);
}

export function createWebPageJsonLd(input: WebPageSchemaInput) {
  return buildWebPageJsonLd(input);
}

export function createHowToJsonLd(input: HowToSchemaInput) {
  return buildHowToJsonLd(input);
}

export function createBreadcrumbJsonLd(items: BreadcrumbItemInput[]) {
  return buildBreadcrumbListJsonLd(items);
}

export function createOfferJsonLd(input: OfferSchemaInput) {
  return buildOfferJsonLd(input);
}

export { buildVisibleSelfServeOfferJsonLd };
