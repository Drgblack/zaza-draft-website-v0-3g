"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { track, trackCtaClick } from "@/lib/analytics";

const CHECKER_HREF = "/parent-email-risk-checker";
const START_HREF = "/start";
const PAGE_HREF = "https://www.zazadraft.com/7-parent-emails";
const GUIDE_PDF_HREF =
  "/guides/7-parent-emails-teachers-should-never-send-as-is.pdf";

const guidePreviewTitles = [
  "The late-night parent email",
  "The aggressive parent email",
  "The behaviour note written when you are fed up",
  "The holding reply you need when you cannot send this tonight",
  "The version that proves you are right",
  "The heated exchange that needs boundaries",
  "The follow-up after an incident when the tone still feels raw",
];

const firstExampleChanges = [
  "removed blame and frustration language",
  "focused on observable behaviour",
  "kept the parent on the same side as the teacher",
  "added a collaborative next step",
];

function trackCheckerClick(location: string) {
  trackCtaClick({
    ctaText: "Check my draft now",
    ctaLocation: location,
  });
  track("checker_link_clicked", {
    source: location,
    page_slug: "7-parent-emails",
  });
}

function trackGuideClick(location: string) {
  trackCtaClick({
    ctaText: "Get the free guide",
    ctaLocation: location,
  });
  track("seo_guide_link_clicked", {
    destination: GUIDE_PDF_HREF,
    source: location,
    page_slug: "7-parent-emails",
  });
}

function trackStartClick(location: string) {
  trackCtaClick({
    ctaText: "Try Zaza Draft free",
    ctaLocation: location,
  });
  track("start_link_clicked", {
    source: location,
    page_slug: "7-parent-emails",
  });
}

function trackShareClick(location: string) {
  trackCtaClick({
    ctaText: "Share this guide with your teacher friends",
    ctaLocation: location,
  });
  track("guide_share_clicked", {
    source: location,
    page_slug: "7-parent-emails",
  });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200/80">
      {children}
    </p>
  );
}

function CtaRow({
  primaryLocation,
  secondaryLocation,
}: {
  primaryLocation: string;
  secondaryLocation: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild className="bg-teal-200 text-slate-950 hover:bg-teal-100">
        <Link
          href={CHECKER_HREF}
          onClick={() => trackCheckerClick(primaryLocation)}
        >
          Check my draft now
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="border-white/20 bg-transparent text-white hover:bg-white/10"
      >
        <a
          href={GUIDE_PDF_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackGuideClick(secondaryLocation)}
        >
          Get the free guide
        </a>
      </Button>
    </div>
  );
}

function ExampleCard({
  title,
  body,
  tone,
  badge,
}: {
  title: string;
  body: string;
  tone: "before" | "after";
  badge?: string;
}) {
  const styles =
    tone === "before"
      ? "border-rose-200/20 bg-rose-200/10 text-rose-50"
      : "border-emerald-200/20 bg-emerald-200/10 text-emerald-50";

  return (
    <Card className={`py-0 shadow-none ${styles}`}>
      <CardContent className="space-y-4 px-6 py-6 md:px-8 md:py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em]">
            {title}
          </p>
          {badge ? (
            <div className="inline-flex rounded-full border border-emerald-200/30 bg-emerald-200/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50">
              {badge}
            </div>
          ) : null}
        </div>
        <div className="whitespace-pre-wrap text-base leading-8">{body}</div>
      </CardContent>
    </Card>
  );
}

export default function SevenParentEmailsClient() {
  const shareGuide = async () => {
    trackShareClick("seven_parent_emails_share_button");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "7 Parent Emails Teachers Should Never Send As-Is",
          text: "A practical guide for teachers handling difficult parent emails.",
          url: PAGE_HREF,
        });
        return;
      } catch {
        // Fall through to clipboard copy if the share sheet is dismissed or unavailable.
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(PAGE_HREF);
        return;
      } catch {
        // Fall through to window open.
      }
    }

    if (typeof window !== "undefined") {
      window.open(
        `mailto:?subject=${encodeURIComponent(
          "7 Parent Emails Teachers Should Never Send As-Is",
        )}&body=${encodeURIComponent(
          `Thought this might be useful: ${PAGE_HREF}`,
        )}`,
        "_self",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),_transparent_32%),radial-gradient(circle_at_right,_rgba(251,191,36,0.08),_transparent_24%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
              Free guide for teachers
            </div>
            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
              7 Parent Emails Teachers Should Never Send As-Is
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Free realistic examples for teachers who are tired, frustrated, or
              emotionally flooded - plus a quick checker to turn risky drafts
              into calm, professional messages.
            </p>
            <CtaRow
              primaryLocation="seven_parent_emails_hero_checker"
              secondaryLocation="seven_parent_emails_hero_guide"
            />
            <p className="text-sm leading-7 text-teal-100">
              Have a draft in your inbox or notes right now? Paste it in - it's
              free and takes seconds.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.8)]">
            <Image
              src="/7-parent-emails-hero-primary.jpg"
              alt="Teacher reviewing a difficult parent email on a laptop in a calm classroom setting."
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6">
              <p className="max-w-md text-sm leading-7 text-slate-200">
                Built for the message that makes you pause before send and check
                whether the tone will land as intended.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10">
          <SectionLabel>The problem</SectionLabel>
          <div className="mt-5 max-w-4xl space-y-5 text-base leading-8 text-slate-300">
            <p>
              Some of the hardest messages teachers write are the ones written
              when they are already tired, frustrated, or emotionally flooded.
            </p>
            <p>
              It is 10pm.
              <br />
              A parent email lands.
              <br />
              You start writing the version that proves you are right.
              <br />
              Then you realise you cannot send this tonight.
            </p>
            <p className="text-white">That is the moment this page is for.</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-white/10 bg-white/5 py-0 shadow-none">
            <CardContent className="space-y-5 px-6 py-6 md:px-8 md:py-8">
              <SectionLabel>What's inside</SectionLabel>
              <div className="space-y-4 text-base leading-8 text-slate-300">
                <p>
                  This free guide includes realistic examples of parent-facing
                  messages teachers often write under pressure, plus safer
                  rewrites that keep the meaning but reduce the risk.
                </p>
                <p>You will see:</p>
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>the risky first draft</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>a calmer professional version</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>a short explanation of what changed</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {guidePreviewTitles.map((title) => (
              <Card
                key={title}
                className="border-white/10 bg-white/5 py-0 shadow-none"
              >
                <CardContent className="flex items-start gap-4 px-6 py-6">
                  <div className="rounded-full border border-teal-200/20 bg-teal-200/10 p-2 text-teal-100">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <SectionLabel>Example one</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              The late-night parent email
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <ExampleCard
              title="Before"
              tone="before"
              body="I'm honestly frustrated at this point. Your child has now ignored instructions repeatedly, disrupted other pupils' learning, and shown very little respect for the expectations in class. I have already addressed this several times and it feels like nothing changes. I need you to speak to them properly because this cannot keep happening."
            />
            <ExampleCard
              title="After"
              tone="after"
              badge="Safe version"
              body={
                "I wanted to follow up about today's lesson. There were several points where your child struggled to follow instructions and this affected their focus and the learning environment around them.\n\nI have spoken with them in class and will continue to support them, but I wanted to make you aware so we can work together on this.\n\nPlease do speak with them about the importance of following instructions and staying focused in lesson time. If helpful, I'm happy to discuss ways we can support them consistently."
              }
            />
          </div>
          <Card className="border-white/10 bg-white/5 py-0 shadow-none">
            <CardContent className="space-y-4 px-6 py-6 md:px-8 md:py-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
                What changed
              </p>
              <ul className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
                {firstExampleChanges.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-[32px] border border-teal-200/20 bg-gradient-to-br from-teal-300/10 via-white/5 to-amber-200/10 p-8 md:p-10">
          <div className="max-w-3xl space-y-4 text-base leading-8 text-slate-200">
            <p>
              If you are reading this and thinking, "I have one like this
              sitting in drafts right now," do not stop at examples.
            </p>
            <p>
              Paste your message into the Parent Email Risk Checker and get a
              safer, more professional version to work from first.
            </p>
          </div>
          <div className="mt-6">
            <Button
              asChild
              className="bg-teal-200 text-slate-950 hover:bg-teal-100"
            >
              <Link
                href={CHECKER_HREF}
                onClick={() =>
                  trackCheckerClick("seven_parent_emails_example_checker")
                }
              >
                Check my draft now
              </Link>
            </Button>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10">
          <SectionLabel>Start with the draft you already have</SectionLabel>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-slate-300">
            <p>
              If you already have a draft sitting in your notes, inbox, or head,
              start there.
            </p>
            <p>
              The Parent Email Risk Checker gives you a calmer, clearer, more
              professional version to work from without weakening the message.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-teal-200 text-slate-950 hover:bg-teal-100"
            >
              <Link
                href={CHECKER_HREF}
                onClick={() =>
                  trackCheckerClick("seven_parent_emails_mid_checker")
                }
              >
                Check my draft now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <a
                href={GUIDE_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGuideClick("seven_parent_emails_mid_guide")}
              >
                Get the free guide
              </a>
            </Button>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10">
          <SectionLabel>Closing</SectionLabel>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-slate-300">
            <p>
              If you recognised yourself in these examples, the problem is
              usually not that you do not know what to say.
            </p>
            <p>It is that the first version gets written under pressure.</p>
            <p>
              The Parent Email Risk Checker helps you turn that first version
              into something calmer, clearer, and easier to stand behind
              professionally.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-teal-200 text-slate-950 hover:bg-teal-100"
            >
              <Link
                href={CHECKER_HREF}
                onClick={() =>
                  trackCheckerClick("seven_parent_emails_final_checker")
                }
              >
                Check my draft now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <a
                href={GUIDE_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGuideClick("seven_parent_emails_final_guide")
                }
              >
                Get the free guide
              </a>
            </Button>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-2">
              <SectionLabel>PDF download</SectionLabel>
              <p className="text-lg leading-8 text-slate-200">
                Download the full guide if you want all seven examples in one
                printable document.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <a
                href={GUIDE_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGuideClick("seven_parent_emails_pdf_band")}
              >
                <Download className="mr-2 h-4 w-4" />
                Get the free guide
              </a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={shareGuide}
              className="bg-white text-slate-950 hover:bg-slate-100"
            >
              Share this guide with your teacher friends
            </Button>
            <Button
              asChild
              className="bg-teal-200 text-slate-950 hover:bg-teal-100"
            >
              <Link
                href={START_HREF}
                onClick={() =>
                  trackStartClick("seven_parent_emails_bottom_start")
                }
              >
                Try Zaza Draft free - stop rewriting emails at 10pm
              </Link>
            </Button>
            <p className="max-w-2xl text-sm leading-7 text-slate-400">
              Share the guide with a colleague first, then move into the full
              Draft flow if you want calmer help beyond one difficult email.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
