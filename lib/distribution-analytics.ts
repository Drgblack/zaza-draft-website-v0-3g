export type DistributionProduct = "zaza_draft" | "zeropaste";
export type DistributionPageType = "comparison" | "free_tool" | "scenario";

export type DistributionAnalyticsMeta = {
  product: DistributionProduct;
  pageType: DistributionPageType;
  slug: string;
};

type SearchParamReader = {
  get(name: string): string | null;
};

const VALID_PRODUCTS = new Set<DistributionProduct>([
  "zaza_draft",
  "zeropaste",
]);
const VALID_PAGE_TYPES = new Set<DistributionPageType>([
  "comparison",
  "free_tool",
  "scenario",
]);

export function appendDistributionParams(
  href: string,
  meta: DistributionAnalyticsMeta,
) {
  const [pathWithQuery, hash = ""] = href.split("#", 2);
  const [pathname, query = ""] = pathWithQuery.split("?", 2);
  const params = new URLSearchParams(query);

  params.set("distribution_product", meta.product);
  params.set("distribution_page_type", meta.pageType);
  params.set("distribution_slug", meta.slug);

  const nextQuery = params.toString();

  return `${pathname}${nextQuery ? `?${nextQuery}` : ""}${hash ? `#${hash}` : ""}`;
}

export function readDistributionMetaFromParams(
  params: SearchParamReader | null,
): DistributionAnalyticsMeta | null {
  if (!params) {
    return null;
  }

  const product = params.get("distribution_product");
  const pageType = params.get("distribution_page_type");
  const slug = params.get("distribution_slug")?.trim();

  if (
    !product ||
    !pageType ||
    !slug ||
    !VALID_PRODUCTS.has(product as DistributionProduct) ||
    !VALID_PAGE_TYPES.has(pageType as DistributionPageType)
  ) {
    return null;
  }

  return {
    product: product as DistributionProduct,
    pageType: pageType as DistributionPageType,
    slug,
  };
}
