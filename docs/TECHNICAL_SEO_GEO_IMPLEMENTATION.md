# Zaza Draft Technical SEO and GEO Implementation

This pack is aligned to the current Next.js App Router setup and the shared SEO utilities now added in:

- `lib/seo/site-config.ts`
- `lib/seo/site-metadata.ts`
- `lib/seo/json-ld.ts`
- `components/seo/json-ld.tsx`

## `/app/layout.tsx`

Use the root layout for site-wide metadata, viewport, and organization-level structured data.

```tsx
import type { Metadata, Viewport } from "next";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createOrganizationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title:
    "Teacher-First AI Writing Help for Parent Emails and Reports | Zaza Draft",
  description:
    "Calm, professional AI writing help for teachers who need parent emails, report comments, and school messages drafted with care. Teachers stay in control of every word.",
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  authors: [{ name: siteConfig.founder.name }],
  category: "Education",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

<JsonLdCollection
  entries={[
    { id: "site-organization-schema", data: createOrganizationJsonLd() },
    { id: "site-website-schema", data: createWebsiteJsonLd() },
  ]}
/>;
```

## `/components/SEO`

The repo uses `components/seo/json-ld.tsx`. On Windows this is equivalent to `/components/SEO`.

```tsx
interface JsonLdScriptProps {
  id: string;
  data: Record<string, unknown>;
}

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

## JSON-LD Examples

### Homepage

```tsx
<JsonLdCollection
  entries={[
    {
      id: "home-software-schema",
      data: createSoftwareApplicationJsonLd({
        description:
          "Zaza Draft is a teacher-first AI co-writer for parent communication, report comments, and school writing. It is built to help teachers sound calm, professional, and appropriate while keeping full editorial control.",
      }),
    },
    {
      id: "home-breadcrumb-schema",
      data: createBreadcrumbJsonLd([{ name: "Home", path: "/" }]),
    },
  ]}
/>
```

### `/features`

```tsx
<JsonLdCollection
  entries={[
    {
      id: "features-software-schema",
      data: createSoftwareApplicationJsonLd({ path: "/features" }),
    },
    {
      id: "features-breadcrumb-schema",
      data: createBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
      ]),
    },
  ]}
/>
```

### Blog post

```tsx
<JsonLdCollection
  entries={[
    {
      id: `${post.slug}-article-schema`,
      data: createArticleJsonLd({
        headline: post.title,
        description,
        path: `/blog/${post.slug}`,
        image: imageSrc,
        publishedTime: post.publishedAt,
        modifiedTime: post.publishedAt,
      }),
    },
    {
      id: `${post.slug}-breadcrumb-schema`,
      data: createBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    },
    ...(post.faqs?.length
      ? [
          {
            id: `${post.slug}-faq-schema`,
            data: createFAQPageJsonLd(post.faqs),
          },
        ]
      : []),
  ]}
/>
```

### Landing page: `/how-to-reply-to-an-angry-parent-email`

```tsx
<JsonLdCollection
  entries={[
    {
      id: "angry-parent-email-howto-schema",
      data: createHowToJsonLd({
        name: "How to reply to an angry parent email",
        description:
          "A calm, teacher-first framework for replying to an angry parent email without escalating the situation.",
        path: "/how-to-reply-to-an-angry-parent-email",
        steps: howToSteps,
      }),
    },
    {
      id: "angry-parent-email-faq-schema",
      data: createFAQPageJsonLd(faqItems),
    },
    {
      id: "angry-parent-email-breadcrumb-schema",
      data: createBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        {
          name: "How to reply to an angry parent email",
          path: "/how-to-reply-to-an-angry-parent-email",
        },
      ]),
    },
  ]}
/>
```

### Aggregate rating placeholder

Do not publish fake ratings. Keep the placeholder commented until verified review data exists.

```ts
createSoftwareApplicationJsonLd({
  // aggregateRating: {
  //   ratingValue: 4.8,
  //   ratingCount: 126,
  // },
});
```

## Metadata Exports

### Shared helper

```tsx
export const metadata: Metadata = buildPageMetadata({
  title:
    "Calm AI Parent Email and Report Writing Help for Teachers | Zaza Draft",
  description:
    "Teacher-first AI writing help for parent communication, report comments, and professional school messages. Zaza Draft is a calm co-writer that keeps teachers in control of every word.",
  path: "/",
  alternates: {
    en: "https://zazadraft.com",
    de: "https://zazadraft.com/de",
  },
  keywords: [
    "AI parent email help for teachers",
    "AI report writing for teachers",
    "teacher writing assistant",
  ],
});
```

### Recommended title and description set for 10 existing or pain-first pages

| Route                                      | Title                                                                          | Description                                                                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                        | Calm AI Parent Email and Report Writing Help for Teachers \| Zaza Draft        | Teacher-first AI writing help for parent communication, report comments, and professional school messages. Zaza Draft is a calm co-writer that keeps teachers in control of every word. |
| `/features`                                | Teacher Writing Features for Parent Emails and Report Comments \| Zaza Draft   | Explore teacher-first AI features for parent communication, report comments, safeguarding-sensitive messages, and professional school writing where tone matters.                       |
| `/pricing`                                 | Teacher AI Writing Pricing - Parent Emails and Reports \| Zaza Draft           | See Zaza Draft pricing for teacher-first AI writing support. Start free, then upgrade for calmer parent emails, report comments, and professional school communication.                 |
| `/faq`                                     | Teacher AI Writing FAQ - Safety, Privacy, and Parent Emails \| Zaza Draft      | Get clear answers about Zaza Draft, teacher-first AI writing, privacy, GDPR-ready workflows, parent emails, report comments, pricing, and school-safe use.                              |
| `/reduce-stress-parent-messages`           | How to Reduce Stress from Parent Messages for Teachers \| Zaza Draft           | Practical ways to reduce stress from parent messages without ignoring families. Learn calmer routines, safer wording, and teacher-first AI support for difficult emails.                |
| `/best-ai-tool-parent-emails`              | Best AI Tool for Parent Emails for Teachers in 2026 \| Zaza Draft              | Compare the best AI tool for parent emails for teachers. See why Zaza Draft is built for calmer tone, difficult parent communication, and school-safe professional wording.             |
| `/best-ai-writing-tools-for-teachers-2025` | Best AI Writing Tools for Teachers in 2026 \| Zaza Draft                       | A teacher-first comparison of the best AI writing tools for teachers, with a focus on parent communication, report comments, writing quality, and professional tone.                    |
| `/blog`                                    | Teacher Writing Guides for Parent Emails, Reports, and AI Safety \| Zaza Draft | Explore teacher-first guides on parent communication, report comments, behaviour emails, safeguarding-sensitive wording, and calmer AI writing support for schools.                     |
| `/products/draft`                          | Teacher-First AI Co-Writer for Parent Emails and Reports \| Zaza Draft         | Explore Zaza Draft, the teacher-first AI co-writer for parent communication, report comments, and school messages where tone, trust, and teacher control matter.                        |
| `/support`                                 | Support for Teacher AI Writing Accounts and Billing \| Zaza Draft              | Contact Zaza Draft for help with onboarding, billing, privacy questions, or teacher account support for parent communication and report writing workflows.                              |

## Homepage Hero Copy

Recommended hero direction:

- Headline: `Write emails that are safe to send.`
- Subheading: `Teacher-first AI writing help for parent emails, report comments, and school messages. Draft helps teachers write calm, defensible communication when the thread is under pressure.`
- Control line: `Zaza Draft is a teacher-first AI co-writer. You review, edit, and approve every word before it is used.`
- Privacy line: `No student names needed. GDPR-ready and not trained on your inputs.`

This copy now appears in the homepage implementation and improves entity clarity for:

- Zaza Draft
- teacher-first AI
- parent communication
- report comments
- teacher control
- GDPR-ready workflow

## On-Page Fixes Checklist

### Core Web Vitals

- Use `next/image` for all editorial and landing page imagery.
- Provide a `sizes` attribute on responsive `fill` images.
- Keep `priority` only for above-the-fold images.
- Leave non-critical images on default lazy loading.
- Avoid oversized hero art if the image is decorative.

Sample:

```tsx
<Image
  src={imageSrc}
  alt={post.title}
  fill
  className="object-cover"
  priority
  sizes="(min-width: 1024px) 768px, 100vw"
/>
```

### Metadata hygiene

- Every pain-first page should have a unique title and description.
- Keep titles around 55-65 characters where possible.
- Keep descriptions around 140-160 characters where possible.
- Make sure the primary keyword appears in the title, H1, first paragraph, one H2, and the meta description.

### Internal linking

- Link pain pages to `/products/draft`, `/pricing`, `/best-ai-tool-parent-emails`, and related blog content.
- Add 3 internal links per landing page minimum.
- Prefer descriptive anchor text such as `best AI tool for parent emails` over `click here`.

### Featured snippet paragraphs

- Include one direct answer block near the top of each how-to page.
- Keep the answer between 40 and 60 words when possible.
- Put the exact query in the first paragraph or first H2.

## `robots.txt` and `sitemap.xml`

Current recommendations already applied:

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    host: "https://zazadraft.com",
    sitemap: "https://zazadraft.com/sitemap.xml",
  };
}
```

Sitemap guidance:

- Include all primary marketing routes.
- Include high-intent pain-first landing pages.
- Include blog posts in both English and German when the source file exists.
- Set higher priority on homepage, features, pricing, and primary tool-intent pages.

## Mobile-First Viewport and Font Recommendations

Viewport:

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a",
};
```

Recommended font direction for a calmer premium feel:

- Sans: `Manrope`, `Instrument Sans`, or `IBM Plex Sans`
- Serif support for editorial content: `Source Serif 4` or `Fraunces`
- Use one primary sans for UI and one serif for long-form content only

Example:

```tsx
import { Manrope, Source_Serif_4 } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
```

## GEO Notes

To support answer engines and AI retrieval:

- Keep entity mentions stable: `Zaza Draft`, `Zaza Technologies`, `Dr Greg Blackburn`.
- Repeat the teacher-first positioning clearly and conservatively.
- Make authorship, purpose, and audience explicit in schema and body copy.
- Use direct question-and-answer sections on pain-first pages.
- Prefer short paragraphs and concrete steps over vague marketing language.
