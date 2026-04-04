"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { track, trackCtaClick } from "@/lib/analytics";
import type {
  ParentEmailRiskIssue,
  ParentEmailRiskResult,
} from "@/lib/parent-email-risk/analyze";

const MIN_WORDS = 10;
const TEXTAREA_PLACEHOLDER = "Paste your parent email draft here…";
const CHECKER_EMPTY_STATE = "Paste a message to check before sending";
const SHORT_INPUT_GUARD =
  "Add a bit more detail so we can assess the tone properly";
const LOADING_COPY = "Checking your message…";

const DEMO_DRAFT = `Hi Mrs Khan,

I need to be direct. This is the third time this week that your daughter has ignored instructions and it is becoming difficult for the class.

You need to speak to her tonight because if this carries on we will have to take this further.

Regards,
Ms Reed`;

type DisplayRiskLevel = "low" | "medium" | "high";

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function buildStartHref(result: ParentEmailRiskResult | null) {
  const params = new URLSearchParams({
    src: "risk-checker",
  });

  if (result) {
    params.set("level", result.riskLevel);
    params.set("score", String(result.riskScore));
  }

  return `/start?${params.toString()}`;
}

function getRiskBadgeClasses(level: DisplayRiskLevel | null) {
  if (level === "high") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (level === "medium") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (level === "low") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function formatRiskSummary(result: ParentEmailRiskResult) {
  const formattedLevel =
    result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1);

  return `${result.riskScore} / 100 - ${formattedLevel} risk`;
}

function getReinforcementCopy(level: DisplayRiskLevel) {
  if (level === "high") {
    return "This one’s risky. Worth softening before sending.";
  }

  if (level === "medium") {
    return "This could be misread depending on the parent. A small adjustment helps.";
  }

  return "This looks clear and professional. Minor tweaks only.";
}

function getRiskHelperText(level: DisplayRiskLevel) {
  if (level === "high") {
    return "This message may trigger defensiveness or escalate the situation.";
  }

  if (level === "medium") {
    return "This message could be misread and may create avoidable tension.";
  }

  return "This message reads as clear and professional overall.";
}

function mapIssueToWarning(issue: ParentEmailRiskIssue) {
  if (
    issue.category === "accusation" ||
    issue.category === "negative_generalisation"
  ) {
    return "May sound accusatory";
  }

  if (issue.category === "frustration") {
    return "Could be read as defensive";
  }

  if (
    issue.category === "escalation" ||
    issue.category === "professional_risk"
  ) {
    return "Tone may escalate tension";
  }

  if (
    issue.category === "emotional_coldness" ||
    issue.category === "prescriptive_demand"
  ) {
    return "Lacks softening or collaborative language";
  }

  return issue.label;
}

function buildIssueWarnings(issues: ParentEmailRiskIssue[]) {
  const warnings = issues.map(mapIssueToWarning);
  const uniqueWarnings = [...new Set(warnings)];

  return uniqueWarnings.slice(0, 4);
}

export default function ParentEmailRiskCheckerClient() {
  const [draft, setDraft] = useState(DEMO_DRAFT);
  const [result, setResult] = useState<ParentEmailRiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    track("parent_email_risk_checker_viewed", {
      page: "parent_email_risk_checker",
    });
  }, []);

  useEffect(() => {
    if (!result) {
      return;
    }

    track("parent_email_risk_checker_result_shown", {
      risk_score: result.riskScore,
      risk_level: result.riskLevel,
      issues_count: result.issuesDetected.length,
    });
  }, [result]);

  const startHref = useMemo(() => buildStartHref(result), [result]);
  const issueWarnings = result ? buildIssueWarnings(result.issuesDetected) : [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    const normalizedDraft = draft.trim();
    if (!normalizedDraft) {
      setResult(null);
      setError(CHECKER_EMPTY_STATE);
      return;
    }

    if (countWords(normalizedDraft) < MIN_WORDS) {
      setResult(null);
      setError(SHORT_INPUT_GUARD);
      return;
    }

    setLoading(true);
    setError(null);

    track("parent_email_risk_checker_submitted", {
      characters: normalizedDraft.length,
      words: countWords(normalizedDraft),
    });

    try {
      const response = await fetch("/api/marketing/parent-email-risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft: normalizedDraft }),
      });

      const payload = (await response.json()) as
        | ParentEmailRiskResult
        | { error?: string };

      if (!response.ok || !("riskScore" in payload)) {
        setResult(null);
        setError(
          (payload as { error?: string }).error ||
            "The checker could not process that draft just now.",
        );
        return;
      }

      setResult(payload);
    } catch {
      setResult(null);
      setError("The checker could not process that draft just now.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartClick = (location: string) => {
    trackCtaClick({
      ctaText:
        location === "parent_email_risk_checker_bottom"
          ? "Start using Zaza Draft"
          : "Rewrite this properly in Zaza Draft",
      ctaLocation: location,
    });
    track("parent_email_risk_checker_cta_clicked", {
      destination:
        location === "parent_email_risk_checker_bottom"
          ? "/start?src=risk-checker-bottom"
          : startHref,
      risk_score: result?.riskScore,
      risk_level: result?.riskLevel,
      issues_count: result?.issuesDetected.length,
      location,
    });
  };

  const handleReset = () => {
    setDraft("");
    setResult(null);
    setError(null);
    setHasSubmitted(false);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(232,121,249,0.12),_transparent_30%),linear-gradient(180deg,_#fffaf5_0%,_#f8fafc_42%,_#eef2ff_100%)] text-slate-900">
      <section className="px-4 pb-10 pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              Check a parent email before you send it
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Paste your draft and see if it could sound too blunt, defensive,
              or likely to escalate.
              <br />
              Get a safer version in seconds - one that still sounds like you.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="rounded-[2rem] border-white/70 bg-white/92 shadow-[0_24px_90px_-50px_rgba(15,23,42,0.35)]">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl text-slate-950">
                Most parent email problems aren’t about what you say - but how
                it’s read.
              </CardTitle>
              <CardDescription className="text-base leading-7 text-slate-600">
                Check the draft that feels a bit too sharp, too exposed, or too
                easy to misunderstand.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="sr-only">Parent email draft</span>
                  <Textarea
                    ref={textareaRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder={TEXTAREA_PLACEHOLDER}
                    className="min-h-[320px] rounded-[1.5rem] border-slate-200 bg-[#fcfbf8] px-5 py-4 text-base leading-7 text-slate-900 placeholder:text-slate-400"
                    aria-label="Parent email draft"
                  />
                </label>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-primary h-auto w-full rounded-2xl px-6 py-4 text-base font-semibold sm:w-auto"
                  >
                    {loading ? LOADING_COPY : "Check this email"}
                  </Button>
                  <p className="text-sm leading-6 text-slate-500">
                    Built for real teacher-parent communication - not generic AI
                    writing.
                  </p>
                </div>

                {error ? (
                  <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </p>
                ) : null}
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-white/70 bg-white/92 shadow-[0_24px_90px_-50px_rgba(15,23,42,0.35)]">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-semibold ${getRiskBadgeClasses(
                    result?.riskLevel ?? null,
                  )}`}
                >
                  {result ? `${result.riskLevel} risk` : "Risk check"}
                </span>
              </div>
              <CardTitle className="text-2xl text-slate-950">
                {result ? "Your result" : "Your result will appear here"}
              </CardTitle>
              <CardDescription className="text-base leading-7 text-slate-600">
                {result
                  ? getReinforcementCopy(result.riskLevel)
                  : hasSubmitted && !loading && !error
                    ? CHECKER_EMPTY_STATE
                    : "Paste a message to check before sending"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {result ? (
                <>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Risk score
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
                      {formatRiskSummary(result)}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {getRiskHelperText(result.riskLevel)}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      What could go wrong
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {issueWarnings.length > 0 ? (
                        issueWarnings.map((warning) => (
                          <li
                            key={warning}
                            className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm"
                          >
                            {warning}
                          </li>
                        ))
                      ) : (
                        <li className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-6 text-emerald-800">
                          No major language risks detected.
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      A calmer, safer version
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Same message - clearer, calmer, less likely to escalate:
                    </p>
                    <div className="mt-4 rounded-[1.6rem] border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 via-white to-violet-50 px-5 py-5">
                      <p className="whitespace-pre-wrap text-base leading-7 text-slate-800">
                        {result.saferVersion}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-slate-200 bg-slate-950 px-6 py-6 text-white shadow-[0_24px_90px_-50px_rgba(15,23,42,0.45)]">
                    <h2 className="text-2xl font-semibold">
                      This is what Zaza Draft does - every time you write
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                      Turn difficult parent messages into something clear, calm,
                      and professional - without losing your voice.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      <Button
                        asChild
                        className="btn-primary h-auto rounded-2xl px-6 py-4 text-base font-semibold"
                      >
                        <Link
                          href={startHref}
                          onClick={() =>
                            handleStartClick("parent_email_risk_checker_result")
                          }
                        >
                          Rewrite this properly in Zaza Draft
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        className="h-auto justify-start rounded-2xl px-4 py-4 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        Try another email
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                  <p className="text-base leading-7 text-slate-600">
                    {loading
                      ? LOADING_COPY
                      : hasSubmitted && error
                        ? error
                        : CHECKER_EMPTY_STATE}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/80 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.28)] md:px-8 md:py-10">
          <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            If you’ve ever rewritten a parent email 3 times before sending…
          </h2>
          <p className="mt-4 text-lg font-medium text-slate-800">
            You’re not alone.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "late-night emails that need a reply by morning",
              "messages that could easily be misunderstood",
              "pressure to stay professional, even when frustrated",
            ].map((line) => (
              <div
                key={line}
                className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
              >
                {line}
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-7 text-slate-700">
            Zaza Draft helps you pause, reframe, and send something you won’t
            regret tomorrow.
          </p>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/84 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.28)] md:px-8 md:py-10">
          <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            How this works
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Paste your draft",
              "We check for tone, risk signals, and escalation triggers",
              "You get a safer version you can actually send",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-700">
                  Step {index + 1}
                </p>
                <p className="mt-3 text-base leading-7 text-slate-800">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/84 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.28)] md:px-8 md:py-10">
          <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            Not a writing tool. A safety layer.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
            <p>Zaza Draft isn’t here to replace your voice.</p>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                "avoid misunderstandings",
                "reduce escalation",
                "communicate clearly under pressure",
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
                >
                  {line}
                </div>
              ))}
            </div>
            <p>Especially in the messages that matter most.</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-[0_28px_90px_-50px_rgba(15,23,42,0.6)] md:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Write the message you won’t regret tomorrow
          </h2>
          <div className="mt-6">
            <Button
              asChild
              className="btn-primary h-auto rounded-2xl px-6 py-4 text-base font-semibold"
            >
              <Link
                href="/start?src=risk-checker-bottom"
                onClick={() =>
                  handleStartClick("parent_email_risk_checker_bottom")
                }
              >
                Start using Zaza Draft
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
