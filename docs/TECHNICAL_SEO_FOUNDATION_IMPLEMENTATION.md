# Technical SEO Foundation

## Using `StructuredData`

Import the component from `components/StructuredData.tsx` in any page, route layout, or blog template:

```tsx
import { StructuredData } from "@/components/StructuredData";
```

For product and landing pages, use the organisation, software, and breadcrumb schemas together:

```tsx
<>
  <StructuredData type="Organization" />
  <StructuredData
    type="SoftwareApplication"
    data={{
      path: "/products/draft",
      description:
        "Zaza Draft is a UK-based, teacher-built, GDPR compliant AI co-writer for parent communication, report comments, and school writing. Teachers stay in control of every draft, and the workflow is designed to avoid invented student facts.",
    }}
  />
  <StructuredData
    type="BreadcrumbList"
    data={{
      path: "/products/draft",
    }}
  />
  <ProductPage />
</>
```

For FAQ sections on pain-first pages, add an `FAQPage` block:

```tsx
<StructuredData
  type="FAQPage"
  data={{
    faqs: [
      {
        question: "Can Zaza Draft help with difficult parent emails?",
        answer:
          "Yes. Zaza Draft helps teachers draft calmer wording faster, but teachers still review and approve every final line.",
      },
      {
        question: "Does Zaza Draft invent student facts?",
        answer:
          "No. The workflow is designed to stay close to teacher-provided notes and preserve teacher review before anything is sent.",
      },
    ],
  }}
/>
```

For blog posts, use `Article` and `BreadcrumbList`. For practical landing pages with a step structure, add `HowTo`.

## Robots and sitemap in production

This project now uses:

- `app/robots.txt` for the public crawl rules
- `app/sitemap.ts` for the dynamic sitemap metadata route

Next.js serves these automatically in production:

- `https://zazadraft.com/robots.txt`
- `https://zazadraft.com/sitemap.xml`

Before shipping, open both URLs on the production deployment and confirm they resolve without redirects or preview-domain canonicals.

## Google Search Console submission

1. Open Google Search Console and add the domain property for `zazadraft.com`.
2. Verify the domain with DNS. This is the cleanest setup for a production site.
3. After verification, open the `Sitemaps` section and submit `https://zazadraft.com/sitemap.xml`.
4. Use `URL Inspection` to request indexing for the most valuable landing pages first:
   - `/teacher-parent-communication-hub`
   - `/how-to-reply-to-an-angry-parent-email`
   - `/positive-but-honest-report-card-comments-for-struggling-students`
   - `/how-to-write-a-behaviour-email-to-parents`
   - `/uk/teacher-communication-resources`
   - `/roi-calculator`
5. Re-submit or re-inspect priority pages after major metadata, schema, or copy changes.

## Crawl-delay and rate limiting for 2026

Do not rely on `crawl-delay` for Google. Google does not support it in `robots.txt`.

Use these controls instead:

- Keep `robots.txt` simple and explicit.
- Apply `X-Robots-Tag: noindex, nofollow, noarchive` to staging and preview routes.
- Use CDN, WAF, or server-side rate limiting for abusive crawlers rather than trying to control Googlebot with unsupported directives.
- If a Vercel preview deployment must never index, combine `noindex` headers with access protection where possible.

## Suggested Vercel deployment checks

Before promoting to production:

1. Confirm the production domain is `zazadraft.com`.
2. Confirm preview and staging routes return `noindex` headers.
3. Confirm canonical URLs point to the production domain only.
4. Open `/robots.txt` and `/sitemap.xml` on the live deployment.
5. View source on one homepage, one pain-first page, one blog post, and `/roi-calculator` to confirm JSON-LD appears once and stays valid.
6. Run a final check for 200 responses on the teacher-parent hub, UK hub, and the top pain pages.
