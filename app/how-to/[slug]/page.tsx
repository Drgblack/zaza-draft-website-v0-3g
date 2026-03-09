import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import howToKeywords from "@/data/how-to-keywords.json";
import {
  type GeneratedHowToArticle,
  generateArticle,
  type HowToKeyword,
} from "@/lib/generateArticle";

const keywords = howToKeywords as HowToKeyword[];

function findKeyword(slug: string) {
  return keywords.find((item) => item.slug === slug) ?? null;
}

function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function buildMetaDescription(keyword: HowToKeyword) {
  const base = `${keyword.primaryKeyword} with practical examples, professional phrasing, and teacher-friendly guidance for ${keyword.yearGroup} ${keyword.subject}.`;
  return base.length <= 160 ? base : `${base.slice(0, 157).trimEnd()}...`;
}

export const dynamicParams = false;
export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return keywords.map((keyword) => ({ slug: keyword.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const keyword = findKeyword(params.slug);

  if (!keyword) {
    return {
      title: "Page not found | Zaza Draft",
    };
  }

  const metaDescription = buildMetaDescription(keyword);

  return {
    title: `${keyword.primaryKeyword} | Zaza Draft`,
    description: metaDescription,
    alternates: {
      canonical: `https://zazadraft.com/how-to/${keyword.slug}`,
    },
    openGraph: {
      title: `${keyword.primaryKeyword} | Zaza Draft`,
      description: metaDescription,
      url: `https://zazadraft.com/how-to/${keyword.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${keyword.primaryKeyword} | Zaza Draft`,
      description: metaDescription,
    },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[#d7d0c2] bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
        {children}
      </div>
    </section>
  );
}

function renderArticle(keyword: HowToKeyword, article: GeneratedHowToArticle) {
  return (
    <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
      <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,68,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_32%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <nav className="mb-8 flex flex-wrap gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/how-to" className="hover:text-slate-900">
              How To
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-900">{article.title}</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
              Build-time generated guide
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              {article.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              Built around {keyword.yearGroup} {keyword.subject} for{" "}
              {keyword.modifier.toLowerCase()} pupils. This static guide is
              generated at build time from your keyword set and rendered as a
              fully indexable article.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm text-slate-700">
                Primary keyword: {keyword.primaryKeyword}
              </span>
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm text-slate-700">
                Secondary keywords: {keyword.secondaryKeywords}
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-10 px-6 py-14 lg:px-8 lg:py-20">
        <Section title={article.title}>
          {splitParagraphs(article.intro).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section title="Why Teachers Find This Challenging">
          {splitParagraphs(article.whyChallenging).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section title="10 Example Phrases to Use">
          <ol className="space-y-3 pl-5">
            {article.examplePhrases.map((phrase, index) => (
              <li key={`${phrase}-${index}`} className="list-decimal">
                {phrase}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Tips for Writing Professional Comments">
          <ul className="space-y-2">
            {article.tips.map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
        </Section>

        <Section title="Common Mistakes to Avoid">
          <ul className="space-y-2">
            {article.mistakes.map((mistake) => (
              <li key={mistake}>- {mistake}</li>
            ))}
          </ul>
        </Section>

        <Section title="How Zaza Draft Can Help">
          {splitParagraphs(article.zazaDraftSection).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <section className="rounded-[28px] border border-[#164e3f]/20 bg-[#164e3f] p-6 text-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ready to Save Time on Your Reports?
          </h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-white/90">
            {splitParagraphs(article.conclusion).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/report-comments"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#164e3f] transition hover:bg-[#f6f1e8]"
            >
              Explore report comments
            </Link>
            <Link
              href="/scenario-builder"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open scenario builder
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default async function HowToKeywordPage({
  params,
}: {
  params: { slug: string };
}) {
  const keyword = findKeyword(params.slug);

  if (!keyword) {
    notFound();
  }

  const article = await generateArticle(keyword);
  return renderArticle(keyword, article);
}
