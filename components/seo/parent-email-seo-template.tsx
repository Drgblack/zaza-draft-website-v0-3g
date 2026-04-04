import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import {
  getParentEmailSeoRelatedPages,
  type ParentEmailSeoPage,
} from "@/lib/seo/parent-email-seo-pages";

type ParentEmailSeoTemplateProps = {
  page: ParentEmailSeoPage;
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-700">
      {children}
    </p>
  );
}

function ExampleCard({
  title,
  copy,
  tone,
}: {
  title: string;
  copy: string;
  tone: "risky" | "safer";
}) {
  const styles =
    tone === "risky"
      ? "border-rose-200 bg-rose-50/80 text-rose-950"
      : "border-emerald-200 bg-emerald-50/80 text-emerald-950";
  const labelStyles = tone === "risky" ? "text-rose-700" : "text-emerald-700";

  return (
    <Card className={`rounded-[1.8rem] py-0 shadow-none ${styles}`}>
      <CardContent className="space-y-4 px-6 py-6 md:px-8 md:py-8">
        <p
          className={`text-sm font-semibold uppercase tracking-[0.24em] ${labelStyles}`}
        >
          {title}
        </p>
        <div className="whitespace-pre-wrap text-base leading-8">{copy}</div>
      </CardContent>
    </Card>
  );
}

function CheckerCtaBlock() {
  return (
    <section className="rounded-[2rem] border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-white to-violet-50 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.24)] md:px-8">
      <SectionLabel>Parent Email Risk Checker</SectionLabel>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
        Check your own parent email before sending
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
        Paste your draft into the Parent Email Risk Checker and see if it may
        sound too blunt, defensive, or likely to escalate. You’ll get a safer
        version in seconds.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          className="btn-primary h-auto rounded-2xl px-6 py-4 text-base font-semibold"
        >
          <Link href="/parent-email-risk-checker">
            Go to Parent Email Risk Checker
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto rounded-2xl border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-900 hover:bg-slate-50"
        >
          <Link href="/start">Try Zaza Draft</Link>
        </Button>
      </div>
    </section>
  );
}

function FinalCtaBlock() {
  return (
    <section className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-[0_28px_90px_-50px_rgba(15,23,42,0.65)] md:px-8">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Write the message you won’t regret tomorrow
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
        Zaza Draft helps teachers turn difficult messages into something clear,
        calm, and professional - without losing their voice.
      </p>
      <div className="mt-6">
        <Button
          asChild
          className="btn-primary h-auto rounded-2xl px-6 py-4 text-base font-semibold"
        >
          <Link href="/start">Try Zaza Draft</Link>
        </Button>
      </div>
    </section>
  );
}

export function ParentEmailSeoTemplate({ page }: ParentEmailSeoTemplateProps) {
  const relatedPages = getParentEmailSeoRelatedPages(page);

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: `${page.slug}-webpage-schema`,
            data: createWebPageJsonLd({
              name: page.h1,
              description: page.seoDescription,
              path: `/${page.slug}`,
              keywords: [
                page.h1,
                "teacher parent communication",
                "parent email risk checker",
                "teacher email tone",
              ],
              potentialActionName: "Check a parent email before sending",
            }),
          },
          {
            id: `${page.slug}-article-schema`,
            data: createArticleJsonLd({
              headline: page.h1,
              description: page.seoDescription,
              path: `/${page.slug}`,
            }),
          },
          {
            id: `${page.slug}-breadcrumb-schema`,
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: page.h1, path: `/${page.slug}` },
            ]),
          },
          {
            id: `${page.slug}-software-schema`,
            data: createSoftwareApplicationJsonLd({
              path: "/parent-email-risk-checker",
              description:
                "Zaza Draft gives teachers a calmer, risk-aware starting point for difficult parent emails and other high-stakes school messages.",
              featureList: [
                "Parent email risk checking",
                "Tone risk analysis for teachers",
                "Safer rewrites before sending",
                "Teacher-first review and approval",
                "School-facing communication support",
              ],
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(232,121,249,0.10),_transparent_28%),linear-gradient(180deg,_#fffaf5_0%,_#f8fafc_38%,_#eef2ff_100%)] text-slate-900">
        <section className="border-b border-white/50 px-4 pb-12 pt-16 md:pt-24">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-700 shadow-sm">
                Teacher parent communication
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                {page.h1}
              </h1>
              <div className="space-y-4 text-lg leading-8 text-slate-700 md:text-xl">
                {page.opening.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="btn-primary h-auto rounded-2xl px-6 py-4 text-base font-semibold"
                >
                  <Link href="/parent-email-risk-checker">
                    Check your parent email
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-2xl border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-900 hover:bg-slate-50"
                >
                  <Link href="/start">Try Zaza Draft</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-5xl space-y-12 px-4 py-12 md:py-16">
          <section className="rounded-[2rem] border border-white/70 bg-white/88 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.25)] md:px-8">
            <SectionLabel>Why this is risky</SectionLabel>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
              {page.whyRisk.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <SectionLabel>What not to send</SectionLabel>
            <ExampleCard
              title="Risky reply example"
              copy={page.riskyReply}
              tone="risky"
            />
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white/88 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.25)] md:px-8">
            <SectionLabel>Why that backfires</SectionLabel>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {page.backfirePoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                    <p className="text-sm leading-7 text-slate-700">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <SectionLabel>A safer version</SectionLabel>
            <ExampleCard
              title="A calmer rewrite"
              copy={page.saferVersion}
              tone="safer"
            />
          </section>

          <CheckerCtaBlock />

          <section className="rounded-[2rem] border border-white/70 bg-white/88 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.25)] md:px-8">
            <SectionLabel>Key takeaway</SectionLabel>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
              {page.keyTakeaway.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {relatedPages.length > 0 ? (
            <section className="space-y-6">
              <SectionLabel>Related teacher guides</SectionLabel>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedPages.map((relatedPage) => (
                  <Card
                    key={relatedPage.slug}
                    className="rounded-[1.6rem] border-white/70 bg-white/88 py-0 shadow-[0_24px_90px_-60px_rgba(15,23,42,0.22)]"
                  >
                    <CardContent className="space-y-3 px-5 py-5">
                      <Link
                        href={`/${relatedPage.slug}`}
                        className="inline-flex items-start gap-2 text-lg font-semibold leading-7 text-slate-950 transition hover:text-fuchsia-700"
                      >
                        <span>{relatedPage.h1}</span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0" />
                      </Link>
                      <p className="text-sm leading-7 text-slate-600">
                        {relatedPage.seoDescription}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          <FinalCtaBlock />
        </main>
      </div>
    </>
  );
}
