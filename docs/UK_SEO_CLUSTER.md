# UK SEO Cluster for Zaza Draft

Purpose: give Zaza Draft a UK-focused search cluster for teachers looking for help with parent communication, report comments, behaviour wording, parents' evening follow-up, and emotionally difficult school writing.

Positioning fit: calm, teacher-first, low-risk, premium, emotionally intelligent. Zaza Draft stays a co-writer, not a replacement. Teachers stay in control and approve every word.

Primary conversion routes: free trial, waitlist, product exploration, and demo traffic to `https://zazadraft.com`.

## A. Recommended App Router Folder Structure

The cleanest setup is:

- one root hub page at `/teacher-parent-communication-hub`
- one regional overview at `/uk`
- one narrower regional overview at `/england`
- shared regional slug routes powered by content maps, matching the existing slug-driven SEO system

### Recommended file structure

```text
app/
  teacher-parent-communication-hub/
    page.tsx
  uk/
    page.tsx
    [slug]/
      page.tsx
  england/
    page.tsx
    [slug]/
      page.tsx

components/
  seo/
    regional-seo-landing-page.tsx
    seo-hub-page.tsx

lib/
  seo/
    regional-pages.ts
    regional-schema.ts
    seo-hub-content.ts
```

### Recommended content source shape

```ts
export type RegionalSeoPage = {
  slug: string;
  region: "uk" | "england";
  title: string;
  description: string;
  h1: string;
  intent: "tool" | "alternative" | "how-to" | "template";
  hero: {
    eyebrow?: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  featuredSnippet?: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs: string[];
  trustBlock?: {
    title: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
};
```

### Recommended metadata export pattern

```ts
import type { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildRegionalMetadata({
  title,
  description,
  path,
}: MetadataInput): Metadata {
  const url = `https://zazadraft.com${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: "en_GB",
      siteName: "Zaza Draft",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
```

### Example route file for `/uk/[slug]`

```ts
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RegionalSeoLandingPage } from "@/components/seo/regional-seo-landing-page";
import {
  getRegionalPageBySlug,
  getRegionalPageSlugs,
} from "@/lib/seo/regional-pages";
import { buildRegionalMetadata } from "@/lib/seo/regional-schema";

export function generateStaticParams() {
  return getRegionalPageSlugs("uk").map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getRegionalPageBySlug("uk", slug);

  if (!page) {
    return {};
  }

  return buildRegionalMetadata({
    title: page.title,
    description: page.description,
    path: `/uk/${page.slug}`,
  });
}

export default async function UkRegionalPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getRegionalPageBySlug("uk", slug);

  if (!page) {
    notFound();
  }

  return <RegionalSeoLandingPage page={page} />;
}
```

### URL strategy

Use `/uk/` for broad UK-intent phrases:

- `/uk/how-to-reply-to-angry-parent-email`
- `/uk/parents-evening-email-templates`
- `/uk/ofsted-friendly-report-comments`
- `/uk/behaviour-letter-home-primary-school`

Use `/england/` only where the query clearly implies English school context:

- `/england/how-to-document-parent-contact-for-ofsted`
- `/england/report-comments-for-ks2-pupils`
- `/england/parents-evening-follow-up-email-template`

Recommendation: launch `/uk/` pages first. Add `/england/` only where keyword phrasing is narrow enough to justify a separate page.

## B. 30 New UK Long-Tail Keywords

These are written for UK teacher language, practical search intent, and school-specific phrasing.

1. `parents evening email template uk teachers`
2. `how to reply to angry parent email uk teacher`
3. `behaviour letter home primary school`
4. `behaviour email to parents uk`
5. `ofsted friendly report comments`
6. `report comments uk primary teachers`
7. `report writing help for uk teachers`
8. `parent complaint email response teacher uk`
9. `how to tell parents child is falling behind uk`
10. `sensitive parent email template teacher uk`
11. `school report comments for struggling students uk`
12. `parents evening follow up email template`
13. `teacher email home about behaviour primary uk`
14. `how to document parent contact school uk`
15. `report card comments anxious pupil uk`
16. `low attainment report comments primary school uk`
17. `professional parent communication examples for teachers uk`
18. `email home about missing homework uk teacher`
19. `report comments not meeting expectations uk`
20. `ai parent email generator for teachers uk`
21. `ai report writing for teachers uk`
22. `parent communication tool for schools uk`
23. `safeguarding sensitive email to parents template uk`
24. `teacher behaviour letter home example uk`
25. `how to respond to parent complaint about grades uk`
26. `pastoral email to parents template uk school`
27. `year 6 report comments examples uk`
28. `secondary school report comments uk`
29. `primary school parent communication templates uk`
30. `teacher email wording for difficult parents uk`

### Best first 10 to build

1. `parents evening email template uk teachers`
2. `how to reply to angry parent email uk teacher`
3. `behaviour letter home primary school`
4. `ofsted friendly report comments`
5. `parent complaint email response teacher uk`
6. `how to document parent contact school uk`
7. `teacher email home about behaviour primary uk`
8. `email home about missing homework uk teacher`
9. `school report comments for struggling students uk`
10. `pastoral email to parents template uk school`

## C. Four UK-Specific Landing Page Outlines

These outlines reuse the existing pain-first structure:

- calm hero with late-night teacher pain
- featured-snippet paragraph near the top
- 4 to 6 short sections
- FAQ block
- trust block
- soft CTA to trial or waitlist

### 1. `/uk/how-to-reply-to-angry-parent-email`

Intent: `How-to/problem`

Title tag:
`How to Reply to an Angry Parent Email in the UK | Zaza Draft`

Meta description:
`How to reply to an angry parent email in the UK with calm, professional wording. Keep the relationship workable, protect your energy, and keep a clear school record.`

H1:
`How to Reply to an Angry Parent Email in the UK`

Hero opener:
`You open the email expecting a quick reply and instead get a novella of accusations before first period. This page gives UK teachers a calmer way to respond without sounding cold, defensive, or vague.`

Suggested H2s:

- `How to reply to an angry parent email in the UK without escalating`
- `Why calm wording matters for school records`
- `When to involve a head of year or pastoral lead`
- `How Zaza Draft helps without replacing your judgement`

Featured-snippet paragraph:
`To reply to an angry parent email in the UK, pause before answering, acknowledge the concern briefly, stick to clear facts, avoid defensive language, and end with a proportionate next step such as a call, meeting, or follow-up through school channels.`

Internal links:

- `/teacher-parent-communication-hub`
- `/how-to-reply-to-an-angry-parent-email`
- `/how-to-respond-to-an-angry-parent-email`
- `/how-to-document-parent-contact-without-losing-your-mind`

CTA:
`Draft your next difficult reply more calmly with Zaza Draft`

### 2. `/uk/parents-evening-email-templates`

Intent: `Template`

Title tag:
`Parents' Evening Email Template for UK Teachers | Zaza Draft`

Meta description:
`Parents' evening email template for UK teachers with calm wording for invitations, reminders, and follow-up after difficult conversations.`

H1:
`Parents' Evening Email Template for UK Teachers`

Hero opener:
`Parents' evening prep at 10pm is bad enough without trying to write three versions of the same email. This page gives UK teachers reusable wording that still feels measured, personal, and school-appropriate.`

Suggested H2s:

- `Parents' evening email template for UK teachers`
- `Invitation, reminder, and follow-up examples`
- `What to say after a difficult conversation`
- `How to keep the tone professional and human`

Featured-snippet paragraph:
`A strong parents' evening email for UK teachers should confirm the purpose of the meeting, keep the tone welcoming, stay brief on practical details, and use calm follow-up wording if concerns need to be addressed after the appointment.`

Internal links:

- `/teacher-parent-communication-hub`
- `/parent-email-template-for-teachers`
- `/difficult-conversation-with-parents-script-email`
- `/teacher-guide-to-sensitive-parent-emails`

CTA:
`Turn your next parents' evening email into a calmer first draft with Zaza Draft`

### 3. `/uk/ofsted-friendly-report-comments`

Intent: `Template`

Title tag:
`Ofsted-Friendly Report Comments for UK Teachers | Zaza Draft`

Meta description:
`Ofsted-friendly report comments for UK teachers with balanced, evidence-based wording for progress, attainment, behaviour, and next steps.`

H1:
`Ofsted-Friendly Report Comments for UK Teachers`

Hero opener:
`Report season can feel like a long evening of trying not to sound too harsh, too vague, or too repetitive. This page helps UK teachers write report comments that feel balanced, evidence-based, and school-ready.`

Suggested H2s:

- `Ofsted-friendly report comments for UK teachers`
- `How to sound evidence-based without sounding cold`
- `Examples for low attainment, effort, and confidence`
- `How Zaza helps keep your professional voice intact`

Featured-snippet paragraph:
`Ofsted-friendly report comments are usually clear, specific, and proportionate. They describe what the pupil is doing now, where support is needed, and what the next step looks like, without overclaiming or using vague praise.`

Internal links:

- `/teacher-parent-communication-hub`
- `/report-comment-generator-for-teachers`
- `/positive-but-honest-report-card-comments-for-struggling-students`
- `/how-to-write-report-comments-for-low-attainment-pupils`

CTA:
`Write clearer report comments without losing your voice with Zaza Draft`

### 4. `/uk/behaviour-letter-home-primary-school`

Intent: `How-to/problem`

Title tag:
`Behaviour Letter Home for Primary School | UK Teacher Examples | Zaza Draft`

Meta description:
`Behaviour letter home for primary school with calm UK wording. Explain concerns clearly, avoid accidental escalation, and keep the home-school relationship workable.`

H1:
`Behaviour Letter Home for Primary School`

Hero opener:
`Sometimes the hardest part is not deciding to contact home. It is finding words that are honest without sounding punitive. This page helps UK primary teachers write behaviour emails and letters that are calm, clear, and relationship-preserving.`

Suggested H2s:

- `Behaviour letter home for primary school`
- `What to include when writing to parents about behaviour`
- `How to keep the message calm and age-appropriate`
- `How to record parent contact without doubling your workload`

Featured-snippet paragraph:
`A behaviour letter home for primary school should describe the concern factually, avoid emotionally loaded wording, show the support already in place, and make the next step clear so parents understand both the issue and the way forward.`

Internal links:

- `/teacher-parent-communication-hub`
- `/how-to-write-a-behaviour-email-to-parents`
- `/parent-email-about-student-behaviour`
- `/parent-wont-respond-to-behaviour-email`

CTA:
`Write the behaviour message more calmly with Zaza Draft`

## D. Internal Linking Hub Strategy

Primary hub:

- `/teacher-parent-communication-hub`

Purpose:

- own broad parent communication intent for teachers
- feed authority to pain-first landing pages and UK regional pages
- give blog posts a central destination to link back into
- provide one clear place for users who are overwhelmed and do not yet know what page they need

### Hub page structure

Suggested title:
`Teacher Parent Communication Hub | Calm Email Help for Teachers`

Suggested H1:
`Teacher Parent Communication Hub`

Suggested metadata:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Teacher Parent Communication Hub | Calm Email Help for Teachers | Zaza Draft",
  description:
    "Practical help for teachers writing parent emails, behaviour letters, complaint replies, parents' evening follow-up, and school-ready communication.",
  alternates: {
    canonical: "https://zazadraft.com/teacher-parent-communication-hub",
  },
  openGraph: {
    title:
      "Teacher Parent Communication Hub | Calm Email Help for Teachers | Zaza Draft",
    description:
      "Practical help for teachers writing parent emails, behaviour letters, complaint replies, parents' evening follow-up, and school-ready communication.",
    url: "https://zazadraft.com/teacher-parent-communication-hub",
    type: "website",
    locale: "en_GB",
    siteName: "Zaza Draft",
  },
};
```

Suggested hub sections:

1. Hero with quick path options
2. Angry and difficult parent emails
3. Behaviour communication and contact logs
4. Parents' evening and sensitive conversations
5. Report comments and report writing
6. UK teachers section linking to `/uk`
7. FAQ
8. Soft CTA

### Silo map

#### Silo 1: Angry parent and complaint replies

Core pages:

- `/teacher-parent-communication-hub`
- `/how-to-reply-to-an-angry-parent-email`
- `/how-to-respond-to-an-angry-parent-email`
- `/how-to-respond-to-parent-complaint-about-grades`
- `/how-to-write-a-parent-complaint-email`
- `/uk/how-to-reply-to-angry-parent-email`

Linking rules:

- every page links up to the hub
- every global page links sideways to one adjacent page
- the UK page links to both the hub and the most relevant global version

Recommended anchor text:

- `reply to an angry parent email`
- `respond to a parent complaint`
- `calm wording for difficult parent emails`

#### Silo 2: Behaviour communication and follow-up

Core pages:

- `/how-to-write-a-behaviour-email-to-parents`
- `/parent-email-about-student-behaviour`
- `/parent-wont-respond-to-behaviour-email`
- `/behaviour-report-email-to-parents-template`
- `/how-to-document-parent-contact-without-losing-your-mind`
- `/uk/behaviour-letter-home-primary-school`

Linking rules:

- behaviour pages should always link to one follow-up or admin-log page
- admin-log pages should link back to at least two behaviour pages
- template pages should link to one how-to page and one tool-intent page

Recommended anchor text:

- `behaviour email to parents`
- `document parent contact`
- `behaviour letter home`

#### Silo 3: Sensitive conversations and parents' evening

Core pages:

- `/difficult-conversation-with-parents-script-email`
- `/teacher-guide-to-sensitive-parent-emails`
- `/how-to-communicate-concerns-to-parents-professionally`
- `/how-to-tell-parents-their-child-is-falling-behind`
- `/uk/parents-evening-email-templates`

Linking rules:

- parents' evening page links to script and sensitive-email pages
- sensitive-email pages link to both the hub and the parents' evening page
- pages with emotional-intent queries should link to one problem page and one template page

Recommended anchor text:

- `parents' evening email template`
- `sensitive parent emails`
- `communicate concerns professionally`

#### Silo 4: Reports and formal writing

Core pages:

- `/report-comment-generator-for-teachers`
- `/report-card-comment-generator`
- `/positive-but-honest-report-card-comments-for-struggling-students`
- `/report-comments-for-struggling-students`
- `/how-to-write-report-comments-for-low-attainment-pupils`
- `/report-comments-when-a-student-isnt-meeting-expectations`
- `/uk/ofsted-friendly-report-comments`

Linking rules:

- every report page links to one tool-intent page and one example-based page
- the UK report page links to both general report guides and low-attainment examples
- blog posts about report season should always point into this silo

Recommended anchor text:

- `report comments for struggling students`
- `balanced report wording`
- `ofsted-friendly report comments`

### Hub-to-silo linking template

Use this same block on the root hub:

```md
## Explore by task

- [Reply to angry or difficult parent emails](/how-to-reply-to-an-angry-parent-email)
- [Write behaviour emails and document contact clearly](/how-to-write-a-behaviour-email-to-parents)
- [Handle parents' evening and sensitive follow-up calmly](/uk/parents-evening-email-templates)
- [Write balanced report comments for struggling pupils](/positive-but-honest-report-card-comments-for-struggling-students)
- [See UK-specific teacher wording guides](/uk)
```

## E. JSON-LD Examples Updated for a UK Audience

### Article schema helper

```ts
type BuildUkArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
};

export function buildUkArticleSchema({
  title,
  description,
  path,
}: BuildUkArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "en-GB",
    audience: {
      "@type": "Audience",
      audienceType: "Teachers and school staff in the United Kingdom",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zazadraft.com${path}`,
    },
    author: {
      "@type": "Organization",
      name: "Zaza Draft",
    },
    publisher: {
      "@type": "Organization",
      name: "Zaza Draft",
      url: "https://zazadraft.com",
    },
  };
}
```

### FAQPage schema helper

```ts
type FaqItem = {
  question: string;
  answer: string;
};

export function buildUkFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-GB",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
```

### Combined JSON-LD example for a page

```ts
import { JsonLd } from "@/components/seo/schema";

const faqs = [
  {
    question: "Should I reply to an angry parent email straight away?",
    answer:
      "Usually not. A short pause helps you avoid reactive wording and makes a calmer, more professional reply easier to send.",
  },
  {
    question: "How do I keep the wording suitable for school records?",
    answer:
      "Stick to facts, avoid emotionally loaded language, and end with a clear next step that would still read appropriately in a school contact log.",
  },
];

const articleSchema = buildUkArticleSchema({
  title: "How to Reply to an Angry Parent Email in the UK | Zaza Draft",
  description:
    "How to reply to an angry parent email in the UK with calm, professional wording.",
  path: "/uk/how-to-reply-to-angry-parent-email",
});

const faqSchema = buildUkFaqSchema(faqs);

export function PageJsonLd() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
    </>
  );
}
```

### What changes for UK pages

- use `inLanguage: "en-GB"`
- use UK-specific query wording in `headline`, `description`, and FAQ questions
- keep canonical URLs on the exact regional path
- use `locale: "en_GB"` in Open Graph metadata

## F. Suggested Trust Block

Use this near the top of UK regional pages, directly under the hero or after a short featured-snippet section.

### Trust block copy

Title:
`UK teachers trust Zaza Draft for calm, school-ready wording`

Intro:
`Built for the messages teachers end up writing late, rewriting twice, and worrying about afterwards. Zaza Draft helps with parent emails, behaviour follow-up, report comments, and other sensitive school writing where tone matters.`

Trust items:

1. `Written for real school communication`
   `Useful for parent emails, behaviour letters home, report comments, parents' evening follow-up, and difficult messages that need to stay measured.`

2. `Teacher control stays intact`
   `Zaza Draft is a co-writer, not a replacement. Teachers edit and approve every word before anything is sent, logged, or shared.`

3. `Designed for emotionally difficult wording`
   `Helpful when you need to be honest without sounding harsh, calm without sounding vague, and professional without sounding robotic.`

4. `Suitable for UK school context`
   `Built around the language teachers already use in UK schools, including behaviour communication, parents' evening follow-up, pastoral concerns, and formal report writing.`

### Placeholder testimonials

- `"I still edit every draft, but I am no longer staring at a blank email at 9.45pm."`
  `Placeholder - Year 5 teacher, Bristol`

- `"It helps me get the tone right when I need to contact home about behaviour without sounding harsher than I mean to."`
  `Placeholder - Primary teacher, Leeds`

- `"The report comment wording feels more balanced and school-ready than what I get from broad AI tools."`
  `Placeholder - Assistant Headteacher, Kent`

- `"Useful for parents' evening follow-up when I need the message to stay calm, clear, and properly professional."`
  `Placeholder - Secondary English teacher, Manchester`

## Recommended Launch Order

1. `/teacher-parent-communication-hub`
2. `/uk/how-to-reply-to-angry-parent-email`
3. `/uk/parents-evening-email-templates`
4. `/uk/ofsted-friendly-report-comments`
5. `/uk/behaviour-letter-home-primary-school`
6. `/uk`

Optional second wave:

1. `/england/how-to-document-parent-contact-for-ofsted`
2. `/england/report-comments-for-ks2-pupils`
3. `/england/parents-evening-follow-up-email-template`

## Implementation Notes

- Reuse the existing SEO landing-page renderer and metadata patterns rather than introducing a second page architecture.
- Keep UK pages clearly regional, not duplicated versions of existing global pages with minor spelling changes.
- Add links from blog posts into both the root hub and the most relevant UK pages.
- Add regional URLs to the sitemap only once the first wave is live.
- Keep CTAs soft and teacher-first: `Try Zaza Draft`, `Join the waitlist`, or `See how it works`.
