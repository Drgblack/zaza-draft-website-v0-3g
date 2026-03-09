import type { Metadata } from "next";
import Link from "next/link";
import howToKeywords from "@/data/how-to-keywords.json";
import type { HowToKeyword } from "@/lib/generateArticle";

const keywords = howToKeywords as HowToKeyword[];

export const metadata: Metadata = {
  title: "How-To Guides for Teachers | Zaza Draft",
  description:
    "Static how-to guides for teacher report comments and parent communication, generated from Zaza Draft keyword data.",
};

export default function HowToIndexPage() {
  return (
    <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
      <section className="border-b border-[#ddd2c3] bg-[linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
            Programmatic SEO
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
            How-to guides for teacher writing
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            These pages are generated from keyword data at build time and
            designed to give teachers practical, static guides for report
            comments and related writing tasks.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {keywords.map((keyword) => (
            <Link
              key={keyword.slug}
              href={`/how-to/${keyword.slug}`}
              className="rounded-[28px] border border-[#d7d0c2] bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] transition hover:bg-white"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                {keyword.yearGroup} · {keyword.subject}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {keyword.primaryKeyword}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Modifier: {keyword.modifier}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
