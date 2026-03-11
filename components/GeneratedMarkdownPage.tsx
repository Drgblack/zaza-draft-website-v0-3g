import Link from "next/link";
import type { ReactNode } from "react";
import { StructuredData } from "@/components/StructuredData";
import type {
  GeneratedMarkdownPage as GeneratedMarkdownPageData,
  GeneratedPageSection,
} from "@/lib/generated-pages";

type GeneratedMarkdownPageProps = {
  page: GeneratedMarkdownPageData;
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

function renderSimpleSection(section: GeneratedPageSection) {
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

          if (/^\*\*.+\*\*$/.test(paragraph)) {
            return (
              <div
                key={paragraph}
                className="inline-flex rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white"
              >
                {paragraph.replace(/^\*\*|\*\*$/g, "")}
              </div>
            );
          }

          return <p key={paragraph}>{renderInlineLinks(paragraph)}</p>;
        })}
      </div>
    </section>
  );
}

function renderExamples(section: GeneratedPageSection) {
  const chunks = section.body
    .split(/\n(?=###\s+Example\s+\d+)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Editable examples
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          {section.title}
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {chunks.map((chunk) => {
          const [heading, ...rest] = chunk.split(/\r?\n/);
          return (
            <article
              key={heading}
              className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold text-slate-950">
                {heading.replace(/^###\s+/, "")}
              </h3>
              <div className="mt-4 whitespace-pre-wrap rounded-3xl border border-[#e6ddd1] bg-[#fcfaf6] p-5 text-sm leading-7 text-slate-800">
                {rest.join("\n").trim()}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function renderFaq(section: GeneratedPageSection) {
  const items = section.body
    .split(/\n(?=###\s+)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          Questions teachers usually ask here
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const [heading, ...rest] = item.split(/\r?\n/);
          return (
            <details
              key={heading}
              className="rounded-3xl border border-[#ddd2c3] bg-white/90 px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-medium text-slate-950">
                {heading.replace(/^###\s+/, "")}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {renderInlineLinks(rest.join("\n").trim())}
              </p>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function renderRelatedLinks(section: GeneratedPageSection) {
  const items = section.body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- ["))
    .map((line) => {
      const match = line.match(/^- \[([^\]]+)\]\(([^)]+)\)$/);
      return match ? { label: match[1], href: match[2] } : null;
    })
    .filter((item): item is { label: string; href: string } => Boolean(item));

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Internal links
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          Related pages worth opening next
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 transition hover:bg-white"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Related page
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">
              {item.label}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

function renderSection(section: GeneratedPageSection) {
  if (section.title === "Example Drafts You Can Edit") {
    return renderExamples(section);
  }

  if (section.title === "FAQ") {
    return renderFaq(section);
  }

  if (section.title === "Related Pages") {
    return renderRelatedLinks(section);
  }

  return renderSimpleSection(section);
}

function getHowToSteps(sections: GeneratedPageSection[]) {
  const howToSection = sections.find(
    (section) => section.title === "Step-by-Step Guidance",
  );

  if (!howToSection) {
    return [];
  }

  return howToSection.body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line, index) => ({
      name: `Step ${index + 1}`,
      text: line.replace(/^\d+\.\s+/, ""),
    }));
}

export function GeneratedMarkdownPage({ page }: GeneratedMarkdownPageProps) {
  const breadcrumbMap = {
    "/": "Home",
    [`/${page.slug}`]: page.title,
  };
  const howToSteps = getHowToSteps(page.sections);

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          id: `/${page.slug}-article-jsonld`,
          path: `/${page.slug}`,
          title: page.title,
          description: page.description,
        }}
      />
      {page.faq.length ? (
        <StructuredData
          type="FAQPage"
          data={{
            id: `/${page.slug}-faq-jsonld`,
            path: `/${page.slug}`,
            title: page.title,
            description: page.description,
            faqs: page.faq,
          }}
        />
      ) : null}
      {howToSteps.length ? (
        <StructuredData
          type="HowTo"
          data={{
            id: `/${page.slug}-howto-jsonld`,
            path: `/${page.slug}`,
            title: page.title,
            description: page.description,
            steps: howToSteps,
          }}
        />
      ) : null}
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: `/${page.slug}-breadcrumb-jsonld`,
          path: `/${page.slug}`,
          title: page.title,
          description: page.description,
          breadcrumbs: breadcrumbMap,
        }}
      />

      <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
        <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,68,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_32%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <nav className="mb-8 flex flex-wrap gap-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-900">{page.title}</span>
            </nav>

            <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="max-w-4xl space-y-6">
                <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Generated teacher guide
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  {page.title}
                </h1>
                {page.hero.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-lg leading-8 text-slate-700"
                  >
                    {renderInlineLinks(paragraph)}
                  </p>
                ))}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/products/draft"
                    className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
                  >
                    Draft your next message calmly
                  </Link>
                  <Link
                    href="/features"
                    className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  >
                    See how Zaza Draft works
                  </Link>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  At a glance
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  {page.description}
                </p>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      What this page includes
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                      <li>- Step-by-step guidance for the exact scenario</li>
                      <li>- Editable teacher examples with calmer wording</li>
                      <li>- FAQ and related pages for follow-up support</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Built for real school pressure
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      These pages are generated from a controlled template
                      system designed for teachers, then reviewed in your own
                      workflow. You stay in control and approve every word.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      Estimated page depth: {page.wordCount} words.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          {page.sections.map((section) => (
            <div key={section.title}>{renderSection(section)}</div>
          ))}
        </main>
      </div>
    </>
  );
}
