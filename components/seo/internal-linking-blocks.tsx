import Link from "next/link";

type HelpfulLink = {
  href: string;
  label: string;
  description: string;
};

type SeoInternalLinkingBlocksProps = {
  relatedTitle: string;
  relatedLinks: HelpfulLink[];
  startHref: string;
  checkerHref: string;
  includeReportCommentLinks?: boolean;
  reportCommentLinks?: HelpfulLink[];
};

const defaultReportCommentLinks: HelpfulLink[] = [
  {
    href: "/how-to-write-a-report-comment-without-sounding-harsh",
    label: "How to write a report comment without sounding harsh",
    description:
      "Useful when the same tone problem shows up in report comments as well as parent emails.",
  },
  {
    href: "/how-to-write-better-report-comments",
    label: "How to write better report comments",
    description:
      "A practical page for making comments clearer, more useful, and easier to stand behind.",
  },
  {
    href: "/ai-for-student-reports",
    label: "AI for student reports",
    description:
      "See how Zaza Draft supports report writing without turning comments into generic filler.",
  },
];

function LinkGrid({
  title,
  eyebrow,
  links,
}: {
  title: string;
  eyebrow: string;
  links: HelpfulLink[];
}) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 transition hover:bg-white"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Helpful link
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">
              {item.label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SeoInternalLinkingBlocks({
  relatedTitle,
  relatedLinks,
  startHref,
  checkerHref,
  includeReportCommentLinks = false,
  reportCommentLinks = defaultReportCommentLinks,
}: SeoInternalLinkingBlocksProps) {
  const normaliseHref = (href: string) => href.split("?")[0].split("#")[0];
  const filteredRelatedLinks = relatedLinks.filter((item) => {
    const href = normaliseHref(item.href);

    if (
      href === normaliseHref(checkerHref) ||
      href === normaliseHref(startHref)
    ) {
      return false;
    }

    if (
      includeReportCommentLinks &&
      reportCommentLinks.some(
        (reportLink) => normaliseHref(reportLink.href) === href,
      )
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-14">
      <LinkGrid
        title={relatedTitle}
        eyebrow="Related pages"
        links={filteredRelatedLinks}
      />

      <section className="space-y-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Next step
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Keep the next draft calmer and easier to send
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href={checkerHref}
            className="rounded-[32px] border border-[#ddd1c0] bg-white/92 p-6 transition hover:bg-white"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Free email risk checker
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">
              Check the draft before you send it
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Paste a real parent email in and see whether the tone may sound
              sharper, colder, or more escalatory than you intend.
            </p>
          </Link>

          <Link
            href={startHref}
            className="rounded-[32px] border border-[#d4c6b4] bg-[linear-gradient(135deg,_#123f34_0%,_#1a5c4a_100%)] p-6 text-white transition hover:opacity-95"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-100/80">
              Start page
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Start with Zaza Draft
            </h3>
            <p className="mt-3 text-sm leading-7 text-emerald-50/90">
              Use Zaza Draft when the challenge is not just writing faster. It
              is getting the tone right in parent emails, report comments, and
              other school communication.
            </p>
          </Link>
        </div>
      </section>

      {includeReportCommentLinks ? (
        <LinkGrid
          title="Also useful for report comments"
          eyebrow="Report comments"
          links={reportCommentLinks}
        />
      ) : null}
    </div>
  );
}
