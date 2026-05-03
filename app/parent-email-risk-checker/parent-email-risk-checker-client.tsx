"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Link2, LoaderCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { GuideLinksBlock } from "@/components/seo/GuideLinksBlock";
import { LastUpdated } from "@/components/seo/LastUpdated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  track,
  trackCtaClick,
  trackFreeToolPageView,
  trackRiskCheckerSubmitted,
  trackShareClicked,
  trackToolCompleted,
  trackToolStarted,
} from "@/lib/analytics";
import { appendDistributionParams } from "@/lib/distribution-analytics";
import type {
  ParentEmailRiskIssue,
  ParentEmailRiskResult,
} from "@/lib/parent-email-risk/analyze";
import {
  CHECKER_COPY,
  type CheckerCopy,
  type CheckerLocale,
  type DisplayRiskLevel,
} from "@/app/parent-email-risk-checker/copy";
import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";
import { getContextualGuideLinks } from "@/lib/guides";

const MIN_WORDS = 10;
const CHECKER_DISTRIBUTION_META = {
  product: "zaza_draft" as const,
  pageType: "free_tool" as const,
  slug: "parent-email-risk-checker",
};

type RiskToneConfig = {
  label: string;
  badgeClasses: string;
  surfaceClasses: string;
  scoreClasses: string;
  progressClasses: string;
  indicatorLabel: string;
};

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function buildStartHref(
  result: ParentEmailRiskResult | null,
  locale: CheckerLocale,
) {
  const params = new URLSearchParams({
    src: "risk-checker",
  });

  if (result) {
    params.set("level", result.riskLevel);
    params.set("score", String(result.riskScore));
  }

  return `${locale === "de" ? "/de/start" : "/start"}?${params.toString()}`;
}

function getRiskToneConfig(
  level: DisplayRiskLevel | null,
  copy: CheckerCopy,
): RiskToneConfig {
  if (level === "high") {
    return {
      label: copy.riskLabels.high,
      badgeClasses: "border-rose-200 bg-rose-50 text-rose-700",
      surfaceClasses:
        "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-rose-50/70",
      scoreClasses: "text-rose-800",
      progressClasses: "from-rose-500 to-rose-400",
      indicatorLabel: copy.indicatorLabels.high,
    };
  }

  if (level === "medium") {
    return {
      label: copy.riskLabels.medium,
      badgeClasses: "border-amber-200 bg-amber-50 text-amber-700",
      surfaceClasses:
        "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/70",
      scoreClasses: "text-amber-800",
      progressClasses: "from-amber-500 to-amber-400",
      indicatorLabel: copy.indicatorLabels.medium,
    };
  }

  if (level === "low") {
    return {
      label: copy.riskLabels.low,
      badgeClasses: "border-emerald-200 bg-emerald-50 text-emerald-700",
      surfaceClasses:
        "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/70",
      scoreClasses: "text-emerald-800",
      progressClasses: "from-emerald-500 to-emerald-400",
      indicatorLabel: copy.indicatorLabels.low,
    };
  }

  return {
    label: copy.riskLevelLabel,
    badgeClasses: "border-slate-200 bg-slate-50 text-slate-700",
    surfaceClasses:
      "border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100/70",
    scoreClasses: "text-slate-800",
    progressClasses: "from-slate-400 to-slate-300",
    indicatorLabel: copy.riskLevelLabel,
  };
}

function getRiskHelperText(copy: CheckerCopy) {
  return copy.riskHelperText;
}

function mapIssueToWarning(issue: ParentEmailRiskIssue, copy: CheckerCopy) {
  return copy.issueWarnings[issue.category] ?? issue.label;
}

function buildIssueWarnings(issues: ParentEmailRiskIssue[], copy: CheckerCopy) {
  const warnings = issues.map((issue) => mapIssueToWarning(issue, copy));
  const uniqueWarnings = [...new Set(warnings)];

  return uniqueWarnings.slice(0, 4);
}

function isParentEmailRiskResult(
  payload: unknown,
): payload is ParentEmailRiskResult {
  const candidate = payload as Partial<ParentEmailRiskResult> | null;

  if (
    typeof candidate !== "object" ||
    candidate === null ||
    typeof candidate.riskScore !== "number" ||
    typeof candidate.saferVersion !== "string" ||
    !["low", "medium", "high"].includes(candidate.riskLevel ?? "") ||
    !Array.isArray(candidate.issuesDetected)
  ) {
    return false;
  }

  return candidate.issuesDetected.every((issue) => {
    return (
      typeof issue === "object" &&
      issue !== null &&
      typeof issue.id === "string" &&
      typeof issue.label === "string" &&
      typeof issue.category === "string" &&
      (issue.matchedPhrase === undefined ||
        typeof issue.matchedPhrase === "string")
    );
  });
}

export default function ParentEmailRiskCheckerClient({
  locale = "en",
}: {
  locale?: CheckerLocale;
}) {
  const copy = CHECKER_COPY[locale];
  const [draft, setDraft] = useState(copy.demoDraft);
  const [result, setResult] = useState<ParentEmailRiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [copiedRewrite, setCopiedRewrite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shared, setShared] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    trackFreeToolPageView(CHECKER_DISTRIBUTION_META);
    track("parent_email_risk_checker_viewed", {
      page: "parent_email_risk_checker",
      locale,
    });
  }, [locale]);

  useEffect(() => {
    if (!result) {
      return;
    }

    trackToolCompleted(CHECKER_DISTRIBUTION_META, {
      locale,
      risk_score: result.riskScore,
      risk_level: result.riskLevel,
      issues_count: result.issuesDetected.length,
    });

    track("parent_email_risk_checker_result_shown", {
      risk_score: result.riskScore,
      risk_level: result.riskLevel,
      issues_count: result.issuesDetected.length,
      locale,
    });
  }, [locale, result]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const startHref = useMemo(
    () =>
      appendDistributionParams(
        buildStartHref(result, locale),
        CHECKER_DISTRIBUTION_META,
      ),
    [locale, result],
  );
  const issueWarnings = result
    ? buildIssueWarnings(result.issuesDetected, copy)
    : [];
  const riskTone = getRiskToneConfig(result?.riskLevel ?? null, copy);
  const pricingHref = locale === "de" ? "/de/pricing" : "/pricing";
  const guideLinks = getContextualGuideLinks(
    "angry parent email de-escalation parent communication report comments",
    {
      limit: 4,
    },
  );
  const summaryTitle =
    locale === "de"
      ? "Der Checker in einem Satz"
      : "What this checker is doing for you";
  const summaryIntro =
    locale === "de"
      ? "Wenn du wissen willst, wie dieses Tool in Zaza Draft einzuordnen ist, steht hier die kurze Version."
      : "If you want the fast explanation before you move on, this is how the checker fits into Zaza Draft.";
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return locale === "de"
        ? "/de/parent-email-risk-checker"
        : "/parent-email-risk-checker";
    }

    return `${window.location.origin}${
      locale === "de"
        ? "/de/parent-email-risk-checker"
        : "/parent-email-risk-checker"
    }`;
  }, [locale]);

  const flashFeedback = (
    kind: "rewrite" | "link" | "shared",
    message: string,
  ) => {
    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    setCopiedRewrite(kind === "rewrite");
    setCopiedLink(kind === "link");
    setShared(kind === "shared");
    setLiveMessage(message);

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setCopiedRewrite(false);
      setCopiedLink(false);
      setShared(false);
      setLiveMessage("");
    }, 2000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    const normalizedDraft = draft.trim();
    if (!normalizedDraft) {
      setResult(null);
      setError(copy.emptyState);
      return;
    }

    if (countWords(normalizedDraft) < MIN_WORDS) {
      setResult(null);
      setError(copy.shortInputGuard);
      return;
    }

    setLoading(true);
    setError(null);

    track("parent_email_risk_checker_submitted", {
      characters: normalizedDraft.length,
      words: countWords(normalizedDraft),
      locale,
    });
    trackToolStarted(CHECKER_DISTRIBUTION_META, {
      characters: normalizedDraft.length,
      words: countWords(normalizedDraft),
      locale,
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

      if (!response.ok || !isParentEmailRiskResult(payload)) {
        setResult(null);
        setError((payload as { error?: string }).error || copy.processingError);
        return;
      }

      trackRiskCheckerSubmitted(locale);
      setResult(payload);
    } catch {
      setResult(null);
      setError(copy.processingError);
    } finally {
      setLoading(false);
    }
  };

  const handleStartClick = (location: string) => {
    trackCtaClick({
      ctaText:
        location === "parent_email_risk_checker_bottom"
          ? copy.bottomCtaButton
          : copy.resultCtaButton,
      ctaLocation: location,
    });
    track("parent_email_risk_checker_cta_clicked", {
      destination:
        location === "parent_email_risk_checker_bottom"
          ? locale === "de"
            ? "/de/start?src=risk-checker-bottom"
            : "/start?src=risk-checker-bottom"
          : startHref,
      risk_score: result?.riskScore,
      risk_level: result?.riskLevel,
      issues_count: result?.issuesDetected.length,
      location,
      locale,
    });
  };

  const handleCopySaferVersion = async () => {
    if (!result?.saferVersion) {
      return;
    }

    track("parent_email_risk_checker_copy_safer_version_clicked", {
      risk_score: result.riskScore,
      risk_level: result.riskLevel,
      locale,
    });

    try {
      await navigator.clipboard.writeText(result.saferVersion);
      flashFeedback("rewrite", copy.copiedRewriteMessage);
    } catch {
      setLiveMessage(copy.copiedRewriteError);
    }
  };

  const handleShare = async () => {
    if (
      typeof navigator === "undefined" ||
      typeof navigator.share !== "function"
    ) {
      return;
    }

    track("parent_email_risk_checker_share_clicked", {
      method: "web_share",
      risk_score: result?.riskScore,
      risk_level: result?.riskLevel,
      locale,
    });
    trackShareClicked(CHECKER_DISTRIBUTION_META, {
      method: "web_share",
      locale,
      risk_score: result?.riskScore,
      risk_level: result?.riskLevel,
    });

    try {
      await navigator.share({
        title: copy.shareTitle,
        text: copy.shareText,
        url: shareUrl,
      });
      flashFeedback("shared", copy.sharedMessage);
    } catch {
      // User cancellation is a valid no-op here.
    }
  };

  const handleCopyLink = async () => {
    track("parent_email_risk_checker_copy_link_clicked", {
      risk_score: result?.riskScore,
      risk_level: result?.riskLevel,
      locale,
    });
    trackShareClicked(CHECKER_DISTRIBUTION_META, {
      method: "copy_link",
      locale,
      risk_score: result?.riskScore,
      risk_level: result?.riskLevel,
    });

    try {
      await navigator.clipboard.writeText(shareUrl);
      flashFeedback("link", copy.copiedLinkMessage);
    } catch {
      setLiveMessage(copy.copiedLinkError);
    }
  };

  const handleReset = () => {
    track("parent_email_risk_checker_try_another_clicked", {
      risk_score: result?.riskScore,
      risk_level: result?.riskLevel,
      locale,
    });
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
              {copy.pageTitle}
            </h1>
            <div className="mt-5">
              <LastUpdated
                isoDate={CONTENT_FRESHNESS.parentEmailRiskChecker.isoDate}
                precision={CONTENT_FRESHNESS.parentEmailRiskChecker.precision}
                locale={locale}
              />
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              {copy.introTop}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Card className="rounded-[2rem] border-white/70 bg-white/92 shadow-[0_24px_90px_-50px_rgba(15,23,42,0.35)]">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-3 block text-base font-semibold text-slate-950">
                    {copy.inputLabel}
                  </span>
                  <Textarea
                    ref={textareaRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder={copy.textareaPlaceholder}
                    className="min-h-[320px] rounded-[1.5rem] border-slate-200 bg-[#fcfbf8] px-5 py-4 text-base leading-7 text-slate-900 placeholder:text-slate-400"
                    aria-label={copy.textareaAriaLabel}
                  />
                </label>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-primary h-auto w-full rounded-2xl px-6 py-4 text-base font-semibold sm:w-auto"
                  >
                    {loading ? copy.loadingCopy : copy.submitButton}
                  </Button>
                  <p className="text-sm leading-6 text-slate-500">
                    {copy.trustLine}
                  </p>
                </div>

                {error ? (
                  <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </p>
                ) : null}
                <div className="sr-only" aria-live="polite">
                  {liveMessage}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-white/70 bg-white/92 shadow-[0_24px_90px_-50px_rgba(15,23,42,0.35)]">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl text-slate-950">
                {result ? copy.resultTitle : copy.resultPlaceholderTitle}
              </CardTitle>
              <CardDescription className="text-base leading-7 text-slate-600">
                {result ? copy.saferVersionIntro : copy.emptyState}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {result ? (
                <>
                  <div>
                    <div className="rounded-[1.6rem] border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 via-white to-violet-50 px-5 py-5">
                      <p className="whitespace-pre-wrap text-base leading-7 text-slate-800">
                        {result.saferVersion}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-6 text-slate-500">
                        {copy.rewriteTrustLine}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCopySaferVersion}
                        className="h-auto rounded-2xl border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        {copiedRewrite ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            {copy.copied}
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            {copy.copySaferVersion}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
                    <h2 className="text-lg font-semibold text-slate-950">
                      {copy.whyThisWorksTitle}
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {copy.whyThisWorksBullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.8rem] border border-slate-200 bg-slate-950 px-6 py-6 text-white shadow-[0_24px_90px_-50px_rgba(15,23,42,0.45)]">
                    <h2 className="text-2xl font-semibold">
                      {copy.resultCtaTitle}
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                      {copy.resultCtaBody}
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
                          {copy.resultCtaButton}
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        className="h-auto justify-start rounded-2xl px-0 py-2 text-base font-medium text-slate-200 hover:bg-transparent hover:text-white"
                      >
                        {copy.tryAnother}
                      </Button>
                    </div>
                  </div>

                  <details className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-slate-700">
                      {copy.detailToggleLabel}
                    </summary>
                    <div className="mt-5 space-y-6">
                      <div className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {copy.originalDraftLabel}
                        </p>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                          {draft.trim()}
                        </p>
                      </div>

                      <div
                        className={`rounded-[1.5rem] border px-5 py-5 ${riskTone.surfaceClasses}`}
                      >
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <span
                                className={`rounded-full border px-3 py-1 text-sm font-semibold ${riskTone.badgeClasses}`}
                                aria-label={riskTone.indicatorLabel}
                              >
                                {riskTone.label}
                              </span>
                              <span className="text-sm font-medium text-slate-500">
                                {copy.riskLevelLabel}
                              </span>
                            </div>
                            <p
                              className={`text-3xl font-bold md:text-4xl ${riskTone.scoreClasses}`}
                            >
                              {riskTone.label}
                            </p>
                            <p className="max-w-2xl text-sm leading-6 text-slate-700">
                              {getRiskHelperText(copy)}
                            </p>
                          </div>

                          <div className="rounded-[1.25rem] border border-white/80 bg-white/80 px-4 py-4 text-left shadow-sm md:min-w-[160px] md:text-right">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                              {copy.scoreLabel}
                            </p>
                            <p className="mt-2 text-2xl font-bold text-slate-950">
                              {result.riskScore} / 100
                            </p>
                          </div>
                        </div>

                        <div className="mt-5">
                          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                            <span>{copy.lowerRisk}</span>
                            <span>{copy.higherRisk}</span>
                          </div>
                          <div
                            className="mt-2 h-3 overflow-hidden rounded-full bg-white/80"
                            role="progressbar"
                            aria-label={`${riskTone.label} score`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={result.riskScore}
                          >
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${riskTone.progressClasses}`}
                              style={{ width: `${result.riskScore}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-slate-950">
                          {copy.issuesTitle}
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
                              {copy.noMajorRisks}
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="border-t border-slate-200 pt-5">
                        <p className="text-sm leading-6 text-slate-600">
                          {copy.shareHeading}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {typeof navigator !== "undefined" &&
                          typeof navigator.share === "function" ? (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleShare}
                              className="h-auto rounded-2xl border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                            >
                              {shared ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  {copy.sharedButton}
                                </>
                              ) : (
                                <>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  {copy.shareButton}
                                </>
                              )}
                            </Button>
                          ) : null}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCopyLink}
                            className="h-auto rounded-2xl border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                          >
                            {copiedLink ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                {copy.linkCopied}
                              </>
                            ) : (
                              <>
                                <Link2 className="mr-2 h-4 w-4" />
                                {copy.copyLink}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </details>
                </>
              ) : (
                <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                  {loading ? (
                    <div className="flex flex-col items-center gap-4">
                      <LoaderCircle
                        className="h-8 w-8 animate-spin text-fuchsia-500"
                        aria-hidden="true"
                      />
                      <div className="space-y-2">
                        <p className="text-base font-medium leading-7 text-slate-700">
                          {copy.loadingCopy}
                        </p>
                        <p className="text-sm leading-6 text-slate-500">
                          {copy.loadingBody}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-base font-medium leading-7 text-slate-700">
                        {hasSubmitted && error ? error : copy.emptyState}
                      </p>
                      <p className="text-sm leading-6 text-slate-500">
                        {copy.resultPlaceholderBody}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/80 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.28)] md:px-8 md:py-10">
          <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            {copy.relatabilityTitle}
          </h2>
          <p className="mt-4 text-lg font-medium text-slate-800">
            {copy.relatabilityIntro}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {copy.relatabilityBullets.map((line) => (
              <div
                key={line}
                className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
              >
                {line}
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-7 text-slate-700">
            {copy.relatabilityClosing}
          </p>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/84 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.28)] md:px-8 md:py-10">
          <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            {copy.howItWorksTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.howItWorksSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-700">
                  {locale === "de"
                    ? `Schritt ${index + 1}`
                    : `Step ${index + 1}`}
                </p>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-800">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/84 px-6 py-8 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.28)] md:px-8 md:py-10">
          <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            {copy.positioningTitle}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
            <p>{copy.positioningIntro}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {copy.positioningBullets.map((line) => (
                <div
                  key={line}
                  className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
                >
                  {line}
                </div>
              ))}
            </div>
            <p>{copy.positioningClosing}</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <GuideLinksBlock
            eyebrow={
              locale === "de"
                ? "Leitfaeden fuer Lehrkraefte"
                : "Teacher communication guides"
            }
            title={
              locale === "de"
                ? "Bevor du sendest - lies die passenden Beispiele"
                : "Before you send, read the right examples"
            }
            intro={
              locale === "de"
                ? "Wenn das Ergebnis zeigt, dass deine Mail leicht falsch verstanden werden koennte, helfen diese Leitfaeden mit ruhigeren Antworten, Deeskalation und professionelleren Formulierungen."
                : "If the result suggests your email may be easy to misread, these guides give you calmer reply patterns, de-escalation examples, and more professional wording."
            }
            links={guideLinks}
            hubHref="/guides"
            hubLabel={
              locale === "de" ? "Alle Leitfaeden ansehen" : "Browse all guides"
            }
          />
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <AgentReadableSummary
            locale={locale}
            title={summaryTitle}
            intro={summaryIntro}
            answers={{
              whatIsIt:
                locale === "de" ? (
                  <>
                    Dieses Tool ist ein kostenloser Teil von Zaza Draft. Es
                    prueft eine Elternmail auf Tonrisiko, Eskalationssignale und
                    Formulierungen, die leicht falsch verstanden werden koennen.
                  </>
                ) : (
                  <>
                    This tool is a free part of Zaza Draft. It checks a parent
                    email for tone risk, escalation signals, and wording that
                    may be easy to misread.
                  </>
                ),
              whoIsItFor:
                locale === "de" ? (
                  <>
                    Fuer Lehrkraefte, die vor dem Senden wissen wollen, ob eine
                    Mail zu direkt, zu defensiv oder zu hart wirken koennte.
                  </>
                ) : (
                  <>
                    It is for teachers who want to know before sending whether
                    an email may sound too blunt, too defensive, or harsher than
                    intended.
                  </>
                ),
              problemItSolves:
                locale === "de" ? (
                  <>
                    Es loest das Problem, dass man den eigenen Ton nach einem
                    langen Tag oft schlechter einschaetzt als die eigentlichen
                    Fakten der Nachricht.
                  </>
                ) : (
                  <>
                    It solves the problem of being able to judge the facts of a
                    message more easily than the way the tone may land after a
                    long day.
                  </>
                ),
              howItWorks:
                locale === "de" ? (
                  <>
                    Du fuegst den Entwurf ein, der Checker bewertet Risiko und
                    kritische Stellen, und du bekommst eine ruhigere Version,
                    mit der du weiterarbeiten kannst.
                  </>
                ) : (
                  <>
                    You paste the draft, the checker scores the risk and flags
                    likely trouble spots, then gives you a calmer version to
                    work from.
                  </>
                ),
              whatItCosts:
                locale === "de" ? (
                  <>
                    Der Checker auf dieser Seite ist kostenlos. Wenn du danach
                    den groesseren Schreibworkflow nutzen willst, kannst du mit
                    Zaza Draft starten und spaeter die{" "}
                    <Link
                      href={pricingHref}
                      className="font-semibold underline"
                    >
                      Preise
                    </Link>{" "}
                    ansehen.
                  </>
                ) : (
                  <>
                    The checker on this page is free. If you want the wider
                    drafting workflow afterward, you can continue into Zaza
                    Draft and review the{" "}
                    <Link
                      href={pricingHref}
                      className="font-semibold underline"
                    >
                      pricing
                    </Link>{" "}
                    later.
                  </>
                ),
              nextStep:
                locale === "de" ? (
                  <>
                    Teste zuerst eine echte Mail. Wenn die ruhigere Version
                    passt, gehe weiter zu{" "}
                    <Link href={startHref} className="font-semibold underline">
                      Zaza Draft
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Test a real email first. If the safer version feels right,
                    continue into{" "}
                    <Link href={startHref} className="font-semibold underline">
                      Zaza Draft
                    </Link>
                    .
                  </>
                ),
            }}
          />
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-[0_28px_90px_-50px_rgba(15,23,42,0.6)] md:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">
            {copy.bottomCtaTitle}
          </h2>
          <div className="mt-6">
            <Button
              asChild
              className="btn-primary h-auto rounded-2xl px-6 py-4 text-base font-semibold"
            >
              <Link
                href={appendDistributionParams(
                  `${
                    locale === "de" ? "/de/start" : "/start"
                  }?src=risk-checker-bottom`,
                  CHECKER_DISTRIBUTION_META,
                )}
                onClick={() =>
                  handleStartClick("parent_email_risk_checker_bottom")
                }
              >
                {copy.bottomCtaButton}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
