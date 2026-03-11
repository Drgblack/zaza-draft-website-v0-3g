import Link from "next/link";
import type { ReactNode } from "react";
import { StructuredData } from "@/components/StructuredData";
import type {
  ExpandedBlogPage,
  ExpandedPageSection,
} from "@/lib/expanded-pages";

type ExpandedBlogLandingPageProps = {
  page: ExpandedBlogPage;
};

function renderInlineLinks(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(
      <Link
        key={`${match[1]}-${match[2]}-${match.index}`}
        href={match[2]}
        className="font-medium text-[#164e3f] underline underline-offset-4 hover:text-[#123f34]"
      >
        {match[1]}
      </Link>,
    );

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function normaliseParagraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function renderSection(section: ExpandedPageSection) {
  const paragraphs = normaliseParagraphs(section.body);

  return (
    <section
      key={section.title}
      className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8"
    >
      <h2 className="text-3xl font-semibold text-slate-950">{section.title}</h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
        {paragraphs.map((paragraph) => {
          if (paragraph.startsWith("- ")) {
            const items = paragraph
              .split(/\r?\n/)
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => line.replace(/^- /, ""));

            return (
              <ul key={paragraph} className="space-y-2 text-sm leading-7">
                {items.map((item) => (
                  <li key={item}>- {renderInlineLinks(item)}</li>
                ))}
              </ul>
            );
          }

          if (/^\d+\.\s/m.test(paragraph)) {
            const items = paragraph
              .split(/\r?\n/)
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => line.replace(/^\d+\.\s+/, ""));

            return (
              <ol key={paragraph} className="space-y-3 pl-5 text-sm leading-7">
                {items.map((item, index) => (
                  <li key={`${item}-${index}`} className="list-decimal">
                    {renderInlineLinks(item)}
                  </li>
                ))}
              </ol>
            );
          }

          return <p key={paragraph}>{renderInlineLinks(paragraph)}</p>;
        })}
      </div>
    </section>
  );
}

export function ExpandedBlogLandingPage({
  page,
}: ExpandedBlogLandingPageProps) {
  return (
    <>
      <StructuredData
        type="Article"
        data={{
          id: `${page.path}-article-jsonld`,
          path: page.path,
          title: page.title,
          description: page.description,
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          id: `${page.path}-faq-jsonld`,
          path: page.path,
          title: page.title,
          description: page.description,
          faqs: page.faq,
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: `${page.path}-breadcrumb-jsonld`,
          path: page.path,
          title: page.title,
          description: page.description,
          breadcrumbs: {
            "/expanded": "Expanded Guides",
            [`/expanded/${page.seedSlug}`]: page.sourceBlogTitle,
            [page.path]: page.title,
          },
        }}
      />

      <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
        <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(20,78,63,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.12),_transparent_30%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="max-w-4xl space-y-6">
                <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Expanded from the blog
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {page.title}
                </h1>
                {page.hero.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-lg leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/early-access"
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Start free trial
                  </Link>
                  <Link
                    href={page.sourceBlogPath}
                    className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    Read the source blog
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Why this page exists
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  This landing page turns one useful blog theme into a narrower,
                  teacher-search-friendly guide with calmer examples, clearer
                  next steps, and a direct route into Zaza Draft.
                </p>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Source seed
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      <Link
                        href={page.sourceBlogPath}
                        className="font-medium text-[#164e3f] underline underline-offset-4 hover:text-[#123f34]"
                      >
                        {page.sourceBlogTitle}
                      </Link>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Trust reminder
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Teacher-first, calm, and conservative. Zaza Draft helps
                      you draft more quickly, but you still review and approve
                      every final word.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-10 px-6 py-14 lg:px-8 lg:py-20">
          <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              {page.sections
                .filter(
                  (section) =>
                    section.title !== "FAQ" &&
                    section.title !== "Related Pages",
                )
                .map(renderSection)}
            </div>
            <div className="space-y-6">
              {page.faq.length > 0 ? (
                <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
                  <h2 className="text-3xl font-semibold text-slate-950">FAQ</h2>
                  <div className="mt-5 space-y-3">
                    {page.faq.map((item) => (
                      <details
                        key={item.question}
                        className="rounded-3xl border border-[#ddd2c3] bg-[#fcfaf6] px-5 py-4"
                      >
                        <summary className="cursor-pointer list-none font-medium text-slate-950">
                          {item.question}
                        </summary>
                        <p className="mt-3 text-sm leading-7 text-slate-700">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="rounded-[32px] border border-[#ddd2c3] bg-[#fcfaf6] p-6 md:p-8">
                <h2 className="text-3xl font-semibold text-slate-950">
                  Related pages
                </h2>
                <div className="mt-5 space-y-3">
                  {page.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-3xl border border-[#ddd2c3] bg-white/90 px-5 py-4 transition hover:bg-white"
                    >
                      <span className="text-sm font-medium text-[#164e3f]">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] border border-[#d8cdbf] bg-[linear-gradient(135deg,_#123f34_0%,_#1f5b4a_100%)] p-8 text-white md:p-10">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Ready to draft this more calmly?
                </h2>
                <p className="mt-4 text-base leading-8 text-emerald-50/90">
                  Zaza Draft helps with parent communication, report comments,
                  behaviour notes, and other tone-sensitive school writing where
                  professional judgement still matters.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/early-access"
                    className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
                  >
                    Start free trial
                  </Link>
                  <Link
                    href={page.hubPath}
                    className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Open the hub
                  </Link>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
