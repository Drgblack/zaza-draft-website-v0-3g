import type { ReactNode } from "react";

type AgentReadableSummaryLocale = "en" | "de";
type AgentReadableSummaryTheme = "light" | "dark";

type AgentReadableSummaryAnswers = {
  whatIsIt: ReactNode;
  whoIsItFor: ReactNode;
  problemItSolves: ReactNode;
  howItWorks: ReactNode;
  whatItCosts: ReactNode;
  nextStep: ReactNode;
};

type AgentReadableSummaryProps = {
  title: string;
  intro: string;
  answers: AgentReadableSummaryAnswers;
  locale?: AgentReadableSummaryLocale;
  theme?: AgentReadableSummaryTheme;
  id?: string;
  className?: string;
  labels?: Partial<{
    eyebrow: string;
    whatIsIt: string;
    whoIsItFor: string;
    problemItSolves: string;
    howItWorks: string;
    whatItCosts: string;
    nextStep: string;
  }>;
};

const LABELS: Record<
  AgentReadableSummaryLocale,
  {
    eyebrow: string;
    whatIsIt: string;
    whoIsItFor: string;
    problemItSolves: string;
    howItWorks: string;
    whatItCosts: string;
    nextStep: string;
  }
> = {
  en: {
    eyebrow: "Zaza Draft at a glance",
    whatIsIt: "What is Zaza Draft?",
    whoIsItFor: "Who is it for?",
    problemItSolves: "What problem does it solve?",
    howItWorks: "How does it work?",
    whatItCosts: "What does it cost?",
    nextStep: "What should you do next?",
  },
  de: {
    eyebrow: "Zaza Draft auf einen Blick",
    whatIsIt: "Was ist Zaza Draft?",
    whoIsItFor: "Für wen ist es gedacht?",
    problemItSolves: "Welches Problem löst es?",
    howItWorks: "Wie funktioniert es?",
    whatItCosts: "Was kostet es?",
    nextStep: "Was solltest du als Nächstes tun?",
  },
};

export function AgentReadableSummary({
  title,
  intro,
  answers,
  locale = "en",
  theme = "light",
  id,
  className,
  labels: customLabels,
}: AgentReadableSummaryProps) {
  const labels = {
    ...LABELS[locale],
    ...customLabels,
  };
  const headingId = id ?? `agent-readable-summary-${locale}`;
  const items = [
    { label: labels.whatIsIt, value: answers.whatIsIt },
    { label: labels.whoIsItFor, value: answers.whoIsItFor },
    { label: labels.problemItSolves, value: answers.problemItSolves },
    { label: labels.howItWorks, value: answers.howItWorks },
    { label: labels.whatItCosts, value: answers.whatItCosts },
    { label: labels.nextStep, value: answers.nextStep },
  ];

  const sectionClasses =
    theme === "dark"
      ? "rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.92)_0%,rgba(30,41,59,0.96)_100%)] text-white shadow-[0_28px_80px_-50px_rgba(15,23,42,0.7)]"
      : "rounded-[2rem] border border-[#ddd2c3] bg-white/92 text-slate-900 shadow-[0_28px_80px_-50px_rgba(15,23,42,0.25)]";
  const eyebrowClasses = theme === "dark" ? "text-[#C4B5FD]" : "text-[#164e3f]";
  const introClasses = theme === "dark" ? "text-slate-200" : "text-slate-700";
  const cardClasses =
    theme === "dark"
      ? "rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5"
      : "rounded-[1.5rem] border border-[#e6ddd1] bg-[#fcfaf6] px-5 py-5";
  const labelClasses = theme === "dark" ? "text-slate-300" : "text-slate-500";
  const valueClasses = theme === "dark" ? "text-slate-100" : "text-slate-800";

  return (
    <section
      aria-labelledby={headingId}
      className={`${sectionClasses}${className ? ` ${className}` : ""}`}
    >
      <div className="px-6 py-8 md:px-8 md:py-10">
        <header className="max-w-3xl">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.24em] ${eyebrowClasses}`}
          >
            {labels.eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {title}
          </h2>
          <p className={`mt-4 text-base leading-8 md:text-lg ${introClasses}`}>
            {intro}
          </p>
        </header>

        <dl className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className={cardClasses}>
              <dt
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${labelClasses}`}
              >
                {item.label}
              </dt>
              <dd
                className={`mt-3 text-sm leading-7 md:text-base ${valueClasses}`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
