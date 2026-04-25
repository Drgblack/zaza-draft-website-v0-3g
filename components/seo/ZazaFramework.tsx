type ZazaFrameworkStep = {
  title: string;
  explanation: string;
  example: string;
};

const ZAZA_FRAMEWORK_STEPS: ZazaFrameworkStep[] = [
  {
    title: "Acknowledge the concern",
    explanation:
      "Show that you have heard the concern before you explain or correct anything. This lowers the chance that the parent feels instantly dismissed.",
    example:
      "I can see why you are concerned, and I want to clarify what happened.",
  },
  {
    title: "Remove blame and emotion",
    explanation:
      "Strip out phrases that sound irritated, corrective, or accusing. The goal is not to win the exchange. The goal is to keep it manageable.",
    example:
      'Use: "I want to explain the school’s perspective" instead of "You need to understand".',
  },
  {
    title: "State facts clearly",
    explanation:
      "Say what happened in calm, plain language. Keep the message specific enough to be useful, but not overloaded with defensive detail.",
    example:
      "During the lesson, your child was reminded several times about the agreed expectation.",
  },
  {
    title: "Offer next steps",
    explanation:
      "End with what happens next so the thread moves forward. A clear next step usually does more to reduce heat than another paragraph of explanation.",
    example:
      "If it would help, I am happy to follow up tomorrow with a call or a short summary of the next step.",
  },
];

export function ZazaFramework() {
  return (
    <section className="rounded-[32px] border border-[#d4c6b4] bg-[linear-gradient(135deg,_#123f34_0%,_#1a5c4a_100%)] p-8 text-white md:p-10">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">
        Zaza framework
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        Zaza Safe Reply Framework
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-emerald-50/90">
        Use this when the wording matters as much as the facts. It gives
        teachers a calmer structure for parent communication without forcing
        stiff, corporate language.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {ZAZA_FRAMEWORK_STEPS.map((step, index) => (
          <article
            key={step.title}
            className="rounded-3xl border border-white/15 bg-white/8 p-6"
          >
            <p className="text-sm font-semibold text-emerald-100">
              Step {index + 1}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-emerald-50/90">
              {step.explanation}
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/80">
                Short example
              </p>
              <p className="mt-2 text-sm leading-7 text-white">
                {step.example}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
