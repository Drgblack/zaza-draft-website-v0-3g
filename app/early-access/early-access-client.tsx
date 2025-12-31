"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { track } from "@/lib/analytics";

export default function EarlyAccessClient() {
  const { t } = useLanguage();

  const benefits = [
    {
      title: t("earlyAccess.benefits.shaping.title"),
      body: t("earlyAccess.benefits.shaping.body"),
    },
    {
      title: t("earlyAccess.benefits.saving.title"),
      body: t("earlyAccess.benefits.saving.body"),
    },
    {
      title: t("earlyAccess.benefits.perks.title"),
      body: t("earlyAccess.benefits.perks.body"),
    },
  ];

  const steps = [
    {
      title: t("earlyAccess.steps.step1.title"),
      body: t("earlyAccess.steps.step1.body"),
    },
    {
      title: t("earlyAccess.steps.step2.title"),
      body: t("earlyAccess.steps.step2.body"),
    },
    {
      title: t("earlyAccess.steps.step3.title"),
      body: t("earlyAccess.steps.step3.body"),
    },
    {
      title: t("earlyAccess.steps.step4.title"),
      body: t("earlyAccess.steps.step4.body"),
    },
  ];

  const faqs = [
    {
      question: t("earlyAccess.faq.eligibility.question"),
      answer: t("earlyAccess.faq.eligibility.answer"),
    },
    {
      question: t("earlyAccess.faq.privacy.question"),
      answer: t("earlyAccess.faq.privacy.answer"),
    },
    {
      question: t("earlyAccess.faq.afterBeta.question"),
      answer: t("earlyAccess.faq.afterBeta.answer"),
    },
  ];

  const openSignup = () => {
    track("cta_click_early_access_join");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openSignupModal"));
    }
  };

  return (
    <main className="min-h-screen bg-[#050A16] text-white">
      <section className="bg-gradient-to-br from-[#0F172A] via-[#050A16] to-[#030712] py-20">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.6em] text-[#A78BFA]">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {t("earlyAccess.hero.title")}
          </h1>
          <p className="text-lg text-[#D1D5DB] md:text-xl md:max-w-3xl mx-auto">
            {t("earlyAccess.hero.subtitle")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={openSignup}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-purple-500/50"
            >
              {t("earlyAccess.hero.cta")}
            </Button>
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
            {t("earlyAccess.note.limited")}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">
              {t("earlyAccess.overview.heading")}
            </h2>
            <p className="mt-4 text-lg text-[#D1D5DB]">
              {t("earlyAccess.overview.body")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B1220]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#A78BFA]">
              {t("earlyAccess.benefits.title")}
            </p>
            <h2 className="text-3xl font-semibold text-white">
              {t("earlyAccess.benefits.heading")}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111827]/70 p-6 shadow-lg shadow-black/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-xl font-semibold text-white">
                  ✦
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#D1D5DB]">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#A78BFA]">
              {t("earlyAccess.steps.title")}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              {t("earlyAccess.steps.title")}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-3xl border border-white/10 bg-[#0D1320] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-lg font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#D1D5DB]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 text-center text-sm text-gray-300">
            <p>{t("earlyAccess.note.limited")}</p>
            <Button
              onClick={openSignup}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-purple-500/50"
            >
              {t("earlyAccess.hero.cta")}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#050A16]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">
              {t("earlyAccess.faq.title")}
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-[#111827]/70 p-5"
              >
                <summary className="cursor-pointer text-lg font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-[#D1D5DB]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            {t("earlyAccess.hero.title")}
          </h2>
          <p className="text-base text-white/80">
            {t("earlyAccess.hero.subtitle")}
          </p>
          <div className="flex justify-center">
            <Button
              onClick={openSignup}
              className="bg-white px-8 py-3 text-base font-semibold text-[#050A16] shadow-lg shadow-white/40"
            >
              {t("earlyAccess.hero.cta")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
