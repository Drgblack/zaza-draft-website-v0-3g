"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  trackDiagnosisCtaClick,
  trackDiagnosisFormCleared,
  trackDiagnosisPageViewed,
  trackDiagnosisRecommendationClick,
  trackDiagnosisReset,
  trackDiagnosisRun,
} from "@/lib/analytics";
import {
  broadDiagnosisPageSlugs,
  diagnose,
  emptyDiagnosisInputs,
  mainIssueOptions,
  normaliseDiagnosisInputs,
  schoolPhaseOptions,
  studentContextOptions,
  toneNeedOptions,
  type DiagnosisInputs,
  type Recommendation,
  type StudentContext,
  type ToneNeed,
} from "@/lib/diagnosis-rules";
import { DiagnosisResultCard } from "@/components/DiagnosisResultCard";

type CommunicationDiagnosisProps = {
  initialValues?: Partial<DiagnosisInputs>;
};

function toggleValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function MultiSelectChips<T extends string>({
  legend,
  options,
  selectedValues,
  onToggle,
}: {
  legend: string;
  options: Array<{ value: T; label: string }>;
  selectedValues: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-900">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const checked = selectedValues.includes(option.value);

          return (
            <label
              key={option.value}
              className={`inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm transition ${
                checked
                  ? "border-[#164e3f] bg-[#164e3f] text-white"
                  : "border-[#d8d0c5] bg-white text-slate-700 hover:bg-[#faf6f0]"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => onToggle(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CommunicationDiagnosis({
  initialValues,
}: CommunicationDiagnosisProps) {
  const initialValuesRef = useRef(
    normaliseDiagnosisInputs({
      ...emptyDiagnosisInputs(),
      ...initialValues,
    }),
  );
  const hydratedInitialValues = initialValuesRef.current;
  const [formState, setFormState] = useState<DiagnosisInputs>(
    hydratedInitialValues,
  );
  const [results, setResults] = useState<Recommendation[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const autoSubmitted = useRef(false);

  useEffect(() => {
    trackDiagnosisPageViewed({
      issue: hydratedInitialValues.issue || undefined,
      phase: hydratedInitialValues.phase || undefined,
    });
  }, [hydratedInitialValues.issue, hydratedInitialValues.phase]);

  useEffect(() => {
    const shouldAutoSubmit =
      !autoSubmitted.current &&
      Boolean(
        hydratedInitialValues.issue ||
          hydratedInitialValues.phase ||
          hydratedInitialValues.studentContexts.length ||
          hydratedInitialValues.toneNeeds.length ||
          hydratedInitialValues.freeText,
      );

    if (!shouldAutoSubmit) {
      return;
    }

    autoSubmitted.current = true;
    const nextResults = diagnose(hydratedInitialValues);
    setResults(nextResults);
    setHasSubmitted(true);
    trackDiagnosisRun({
      issue: hydratedInitialValues.issue || undefined,
      phase: hydratedInitialValues.phase || undefined,
      studentContexts: hydratedInitialValues.studentContexts,
      toneNeeds: hydratedInitialValues.toneNeeds,
      recommendations: nextResults.length,
      topRecommendation: nextResults[0]?.pageSlug,
      trigger: "prefilled",
    });
  }, [hydratedInitialValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextResults = diagnose(formState);
    setResults(nextResults);
    setHasSubmitted(true);
    trackDiagnosisRun({
      issue: formState.issue || undefined,
      phase: formState.phase || undefined,
      studentContexts: formState.studentContexts,
      toneNeeds: formState.toneNeeds,
      recommendations: nextResults.length,
      topRecommendation: nextResults[0]?.pageSlug,
      trigger: "manual",
    });
  };

  const handleReset = () => {
    setHasSubmitted(false);
    setResults([]);
    trackDiagnosisReset({
      issue: formState.issue || undefined,
    });
  };

  const handleClearForm = () => {
    setFormState(emptyDiagnosisInputs());
    setHasSubmitted(false);
    setResults([]);
    trackDiagnosisFormCleared();
  };

  const handleRecommendationOpen = (recommendation: Recommendation) => {
    trackDiagnosisRecommendationClick({
      pageSlug: recommendation.pageSlug,
      issue: formState.issue || undefined,
      phase: formState.phase || undefined,
      studentContexts: formState.studentContexts,
      toneNeeds: formState.toneNeeds,
    });
  };

  const shouldSuggestMoreDetail =
    hasSubmitted &&
    (!formState.issue ||
      broadDiagnosisPageSlugs.includes(results[0]?.pageSlug ?? ""));

  return (
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)] md:p-8"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Step 1
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Describe the issue
            </h2>
            <p className="text-base leading-8 text-slate-700">
              Choose the closest options. If the situation is messy, that is
              fine. The tool is built to handle overlap.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-900">
                School phase
              </span>
              <select
                value={formState.phase}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    phase: event.target.value as DiagnosisInputs["phase"],
                  }))
                }
                className="w-full rounded-2xl border border-[#d8d0c5] bg-[#fcfaf6] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#164e3f]"
              >
                <option value="">Select phase</option>
                {schoolPhaseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-900">
                Main issue
              </span>
              <select
                value={formState.issue}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    issue: event.target.value as DiagnosisInputs["issue"],
                  }))
                }
                className="w-full rounded-2xl border border-[#d8d0c5] bg-[#fcfaf6] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#164e3f]"
              >
                <option value="">Select main issue</option>
                {mainIssueOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <MultiSelectChips<StudentContext>
              legend="Student context"
              options={studentContextOptions}
              selectedValues={formState.studentContexts}
              onToggle={(value) =>
                setFormState((current) => ({
                  ...current,
                  studentContexts: toggleValue(current.studentContexts, value),
                }))
              }
            />

            <MultiSelectChips<ToneNeed>
              legend="Urgency or tone need"
              options={toneNeedOptions}
              selectedValues={formState.toneNeeds}
              onToggle={(value) =>
                setFormState((current) => ({
                  ...current,
                  toneNeeds: toggleValue(current.toneNeeds, value),
                }))
              }
            />

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-900">
                Describe the situation in your own words
              </span>
              <textarea
                value={formState.freeText}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    freeText: event.target.value,
                  }))
                }
                rows={6}
                placeholder="Optional. For example: Parent has emailed twice this weekend and I need to reply calmly about behaviour and missing homework."
                className="w-full rounded-3xl border border-[#d8d0c5] bg-[#fcfaf6] px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition focus:border-[#164e3f]"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
            >
              Diagnose the issue
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#faf6f0]"
            >
              Clear form
            </button>
          </div>
        </form>

        <aside className="rounded-[32px] border border-[#ddd2c3] bg-[#173d35] p-6 text-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
            Step 2
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Get matched pages and calmer next steps
          </h2>
          <p className="mt-4 text-base leading-8 text-emerald-50/90">
            The diagnosis engine prioritises the most relevant Zaza Draft pages
            for the issue you describe. It aims for the closest fit first, then
            adds adjacent pages if your situation overlaps tone, report
            pressure, or parent follow-up.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-emerald-50/90">
            <li>- Teacher-first recommendations, not generic AI suggestions</li>
            <li>- Hallucination-safe tone support and GDPR-aware reminders</li>
            <li>
              - Stronger fit for parent communication, report comments, and SLT
              documentation
            </li>
            <li>
              - Every recommendation still keeps you in control of the final
              wording
            </li>
          </ul>
        </aside>
      </div>

      {hasSubmitted ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Step 3
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Recommended pages for this situation
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
                These recommendations are designed to reduce the time it takes
                to find the right Zaza Draft page when the wording feels risky
                or emotionally heavy.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#faf6f0]"
            >
              Not the right fit?
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {results.map((recommendation) => (
              <DiagnosisResultCard
                key={recommendation.pageSlug}
                recommendation={recommendation}
                onOpen={handleRecommendationOpen}
              />
            ))}
          </div>

          {shouldSuggestMoreDetail ? (
            <div className="rounded-[28px] border border-[#d8cdbf] bg-[#fcfaf6] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Need a tighter match?
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                Try describing more
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
                Add details such as the year group, whether the parent is angry
                or silent, whether behaviour or SEN is involved, and whether you
                need to de-escalate or write a detailed report. The closer the
                description, the more precise the diagnosis becomes.
              </p>
            </div>
          ) : null}

          <section className="rounded-[32px] border border-[#d8cdbf] bg-[linear-gradient(135deg,_#123f34_0%,_#1f5b4a_100%)] p-8 text-white md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
              Final step
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              Ready to draft calmly?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">
              Start with a calmer recommendation, then move into Zaza Draft when
              you want a custom version. The tool helps with the first draft,
              but you stay in full control of every final word.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/early-access"
                onClick={() =>
                  trackDiagnosisCtaClick({
                    issue: formState.issue || undefined,
                    phase: formState.phase || undefined,
                    studentContexts: formState.studentContexts,
                    toneNeeds: formState.toneNeeds,
                    topRecommendation: results[0]?.pageSlug,
                  })
                }
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123f34] transition hover:bg-[#f3efe7]"
              >
                Start free trial
              </Link>
              <Link
                href="/products/draft"
                className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See how Zaza Draft works
              </Link>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
