"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Clock3,
  Mail,
  FileText,
  PoundSterling,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackRoiCalculated, trackTrialStart } from "@/lib/analytics";

const WORKING_WEEKS_PER_YEAR = 39;
const WEEKS_PER_TERM = 13;

export function ROICalculatorClient() {
  const [reportCommentsPerWeek, setReportCommentsPerWeek] = useState(35);
  const [parentEmailsPerWeek, setParentEmailsPerWeek] = useState(8);
  const [minutesPerReportComment, setMinutesPerReportComment] = useState(4);
  const [minutesPerParentEmail, setMinutesPerParentEmail] = useState(12);
  const [hourlyValue, setHourlyValue] = useState(38);
  const [reportTimeSavedPercent, setReportTimeSavedPercent] = useState(45);
  const [emailTimeSavedPercent, setEmailTimeSavedPercent] = useState(40);
  const [hasCalculated, setHasCalculated] = useState(false);

  const weeklyReportMinutesSaved =
    reportCommentsPerWeek *
    minutesPerReportComment *
    (reportTimeSavedPercent / 100);
  const weeklyEmailMinutesSaved =
    parentEmailsPerWeek * minutesPerParentEmail * (emailTimeSavedPercent / 100);
  const weeklyMinutesSaved = weeklyReportMinutesSaved + weeklyEmailMinutesSaved;
  const weeklyHoursSaved = weeklyMinutesSaved / 60;
  const termHoursSaved = weeklyHoursSaved * WEEKS_PER_TERM;
  const yearlyHoursSaved = weeklyHoursSaved * WORKING_WEEKS_PER_YEAR;
  const yearlyValueSaved = yearlyHoursSaved * hourlyValue;
  const eveningsRecovered = yearlyHoursSaved / 2.5;

  const formatNumber = (value: number, digits = 1) =>
    new Intl.NumberFormat("en-GB", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    }).format(value);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value);

  const handleCalculate = () => {
    setHasCalculated(true);
    trackRoiCalculated({
      reportsPerWeek: reportCommentsPerWeek,
      parentEmailsPerWeek,
      yearlyHoursSaved: Math.round(yearlyHoursSaved),
      yearlyValueSaved: Math.round(yearlyValueSaved),
    });
  };

  const handleTrialClick = (placement: string, ctaVariant: string) => {
    trackTrialStart({
      placement,
      ctaVariant,
      sourcePage: "/roi-calculator",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.14),_transparent_30%),radial-gradient(circle_at_right,_rgba(251,191,36,0.08),_transparent_28%)]">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
          <div className="max-w-4xl space-y-6">
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
              <Calculator className="mr-2 h-3.5 w-3.5" />
              Tool intent
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Teacher ROI calculator for report comments and parent emails
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Use this teacher ROI calculator to estimate how much time Zaza
              Draft could save on report comments and parent emails each week.
              It is a practical planning tool for schools, heads of department,
              and teachers who want a calmer writing workflow, not inflated
              promises.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                Built around report comments and parent communication
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                Uses editable assumptions rather than hard sales claims
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                Teachers stay in control of every draft and every decision
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
        <section className="grid gap-6 lg:grid-cols-[1fr,1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">
              Interactive placeholder
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Adjust the inputs below to model a typical teacher or team. The
              calculator estimates weekly, termly, and yearly time recovered
              from drafting report comments and parent emails more efficiently.
            </p>

            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="text-sm font-medium text-slate-200">
                  Report comments drafted per week
                </span>
                <input
                  type="number"
                  min={0}
                  value={reportCommentsPerWeek}
                  onChange={(event) =>
                    setReportCommentsPerWeek(Number(event.target.value) || 0)
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-teal-200/40"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-200">
                  Parent emails drafted per week
                </span>
                <input
                  type="number"
                  min={0}
                  value={parentEmailsPerWeek}
                  onChange={(event) =>
                    setParentEmailsPerWeek(Number(event.target.value) || 0)
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-teal-200/40"
                />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-200">
                    Minutes per report comment now
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={minutesPerReportComment}
                    onChange={(event) =>
                      setMinutesPerReportComment(
                        Number(event.target.value) || 1,
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-teal-200/40"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-200">
                    Minutes per parent email now
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={minutesPerParentEmail}
                    onChange={(event) =>
                      setMinutesPerParentEmail(Number(event.target.value) || 1)
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-teal-200/40"
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-200">
                    Estimated report-comment time saved %
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={reportTimeSavedPercent}
                    onChange={(event) =>
                      setReportTimeSavedPercent(Number(event.target.value) || 0)
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-teal-200/40"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-200">
                    Estimated parent-email time saved %
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={emailTimeSavedPercent}
                    onChange={(event) =>
                      setEmailTimeSavedPercent(Number(event.target.value) || 0)
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-teal-200/40"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-200">
                  Hourly value of teacher time in GBP
                </span>
                <input
                  type="number"
                  min={1}
                  value={hourlyValue}
                  onChange={(event) =>
                    setHourlyValue(Number(event.target.value) || 1)
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-teal-200/40"
                />
              </label>

              <Button
                className="bg-teal-200 text-slate-950 hover:bg-teal-100"
                onClick={handleCalculate}
              >
                Calculate savings
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-teal-200/20 bg-teal-200/10 p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-50/80">
                Featured result
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                {formatNumber(yearlyHoursSaved)} hours recovered per year
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-teal-50">
                Based on your current inputs, Zaza Draft could help recover
                around {formatNumber(termHoursSaved)} hours each term and{" "}
                {formatCurrency(yearlyValueSaved)} of staff-time value each
                school year. This is a planning estimate using your own
                assumptions, not a promise of automatic savings.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                  <Clock3 className="h-4 w-4" />
                  Weekly
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {formatNumber(weeklyHoursSaved)} hours
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Time recovered each working week from report comments and
                  parent communication alone.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                  <PoundSterling className="h-4 w-4" />
                  Yearly value
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {formatCurrency(yearlyValueSaved)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Estimated staff-cost value based on your chosen hourly rate.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                  <FileText className="h-4 w-4" />
                  Report comments
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {formatNumber(weeklyReportMinutesSaved / 60)} hours
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Weekly time recovered from report writing and comment
                  drafting.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                  <Mail className="h-4 w-4" />
                  Parent emails
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {formatNumber(weeklyEmailMinutesSaved / 60)} hours
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Weekly time recovered from clearer parent communication
                  drafting.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold text-white">
                What this calculator is really showing
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                The result is not just about hours. It is about fewer Sunday
                evening rewrites, fewer late-night parent emails, and less time
                spent searching for wording you can safely send. At the current
                estimate, that is roughly {formatNumber(eveningsRecovered)} calm
                evenings recovered across a school year if you measure one
                evening as 2.5 working hours.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">
              How this ROI calculator works
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              It multiplies your weekly writing volume by your current drafting
              time, then applies your own time-saved assumptions. That makes it
              more useful for planning than a single hard-coded claim.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">
              What is counted
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              The placeholder focuses on report comments and parent emails
              because those are two of Zaza Draft&apos;s clearest high-intent
              use cases. You can adapt the assumptions for heads of year,
              tutors, and school leaders.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Trust block</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Zaza Draft is a teacher-first co-writer, not an auto-send system.
              It is built for calm drafting support, no invented student facts,
              and professional teacher review before anything is used.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-teal-200/20 bg-gradient-to-br from-teal-300/10 via-white/5 to-amber-200/10 p-8 md:p-10">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Try Zaza Draft after calculating the time you want back
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
            If your biggest drag is report comments or parent communication,
            Zaza Draft is designed for exactly those teacher writing tasks where
            tone matters and time disappears.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-teal-200 text-slate-950 hover:bg-teal-100"
            >
              <Link
                href="/pricing"
                onClick={() =>
                  handleTrialClick("roi-calculator-cta", "start-free-trial")
                }
              >
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <Link
                href="/products/draft"
                onClick={() =>
                  handleTrialClick(
                    "roi-calculator-secondary",
                    "see-how-it-works",
                  )
                }
              >
                See how it works
              </Link>
            </Button>
          </div>
          {!hasCalculated ? (
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Run the calculator first if you want a quick estimate to take into
              a department or school discussion.
            </p>
          ) : null}
        </section>
      </main>
    </div>
  );
}
