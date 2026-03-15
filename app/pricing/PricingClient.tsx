"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Star, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/analytics";
import {
  DRAFT_TEACH_BUNDLE_ENABLED,
  getDraftTeachBundlePricingAction,
  getDraftTeachBundleWaitlistCtaLabel,
} from "@/lib/bundle-sales";
import {
  DRAFT_SALES_ENABLED,
  getDraftPrelaunchCtaLabel,
  getDraftPrelaunchHelperLine,
} from "@/lib/draft-sales";
import {
  buildStripeCheckoutPath,
  departmentDisplayAmounts,
  pricingConfig,
  type PricingCurrency,
  type SelfServeInterval,
  SUPPORTED_CURRENCIES,
} from "@/config/pricing";

const currencySymbols = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export default function PricingClient() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<SelfServeInterval>("monthly");
  const [currency, setCurrency] = useState<PricingCurrency>("EUR");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isGermanPricingPage = pathname === "/de/pricing";
  const prelaunchCtaLabel = getDraftPrelaunchCtaLabel(language);
  const prelaunchHelperLine = getDraftPrelaunchHelperLine(language);
  const waitlistBasePath = isGermanPricingPage
    ? "/de/early-access"
    : "/early-access";
  const buildWaitlistHref = (plan: "starter" | "teacher" | "bundle") =>
    `${waitlistBasePath}?source=pricing_page&plan=${plan}`;
  const starterWaitlistHref = buildWaitlistHref("starter");
  const teacherWaitlistHref = buildWaitlistHref("teacher");
  const bundleWaitlistHref = buildWaitlistHref("bundle");
  const salesContactBasePath = isGermanPricingPage ? "/de/contact" : "/contact";
  const buildSalesContactHref = (
    plan: "department" | "enterprise" | "general",
  ) =>
    `${salesContactBasePath}?intent=sales&topic=pricing&plan=${plan}&source=pricing_page`;
  const symbol = currencySymbols[currency];
  const draftCheckoutHref = buildStripeCheckoutPath({
    plan: "draft",
    interval: billingInterval,
    currency,
    returnPath: isGermanPricingPage ? pathname : "/pricing",
  });
  const bundleCheckoutHref = buildStripeCheckoutPath({
    plan: "bundle",
    interval: billingInterval,
    currency,
    returnPath: isGermanPricingPage ? pathname : "/pricing",
  });
  const bundlePricingAction = getDraftTeachBundlePricingAction({
    language,
    checkoutHref: bundleCheckoutHref,
    waitlistHref: bundleWaitlistHref,
    checkoutEnabled: DRAFT_TEACH_BUNDLE_ENABLED,
  });
  const departmentSalesHref = buildSalesContactHref("department");
  const enterpriseSalesHref = buildSalesContactHref("enterprise");
  const generalSalesHref = buildSalesContactHref("general");
  const comparisonRows = [
    {
      feature: t("pricing.compare.rows.purpose.feature"),
      generic: t("pricing.compare.rows.purpose.generic"),
      zaza: t("pricing.compare.rows.purpose.zaza"),
    },
    {
      feature: t("pricing.compare.rows.tone.feature"),
      generic: t("pricing.compare.rows.tone.generic"),
      zaza: t("pricing.compare.rows.tone.zaza"),
    },
    {
      feature: t("pricing.compare.rows.privacy.feature"),
      generic: t("pricing.compare.rows.privacy.generic"),
      zaza: t("pricing.compare.rows.privacy.zaza"),
    },
    {
      feature: t("pricing.compare.rows.templates.feature"),
      generic: t("pricing.compare.rows.templates.generic"),
      zaza: t("pricing.compare.rows.templates.zaza"),
    },
    {
      feature: t("pricing.compare.rows.workload.feature"),
      generic: t("pricing.compare.rows.workload.generic"),
      zaza: t("pricing.compare.rows.workload.zaza"),
    },
    {
      feature: t("pricing.compare.rows.cost.feature"),
      generic: t("pricing.compare.rows.cost.generic"),
      zaza: t("pricing.compare.rows.cost.zaza"),
    },
    ...(language === "de"
      ? [
          {
            feature: "Professional-Risk-Check",
            generic:
              "Keine eingebaute Warnung, wenn eine Formulierung unnötig hart, unklar oder angreifbar wirkt.",
            zaza: "Hebt riskante Formulierungen hervor und unterstützt sicherere Alternativen, bevor du sendest.",
          },
          {
            feature: "Elternreaktion antizipieren",
            generic:
              "Hilft beim Schreiben, aber nicht dabei, wie eine Nachricht wahrscheinlich aufgenommen wird.",
            zaza: "Hilft Lehrkräften zu prüfen, wie Botschaften bei Familien landen könnten, bevor Missverständnisse entstehen.",
          },
          {
            feature: "Dokumentationsmodus",
            generic:
              "Glatte Formulierungen, aber keine klare Unterstützung für sachliche, nachvollziehbare Vorfallsnotizen.",
            zaza: "Kann in einen nüchterneren, dokumentationsfreundlichen Stil wechseln, wenn ein sauberer Schriftverlauf zählt.",
          },
        ]
      : [
          {
            feature: "Professional-risk check",
            generic:
              "No built-in warning when phrasing feels unnecessarily sharp, vague, or professionally exposed.",
            zaza: "Flags risky wording and supports safer alternatives before the message leaves your draft.",
          },
          {
            feature: "Parent reaction forecast",
            generic:
              "Helps generate text, but not how that text is likely to land with families.",
            zaza: "Helps teachers sense how wording may be received so they can reduce friction earlier.",
          },
          {
            feature: "Documentation mode",
            generic:
              "Fluent writing, but weak support for factual, defensible incident notes and paper-trail communication.",
            zaza: "Can shift into a more factual documentation style when clarity and record-keeping matter most.",
          },
        ]),
  ];
  const pricingProtectionHeading =
    language === "de"
      ? "Gebaut, um Lehrkraefte zu schuetzen"
      : "Built to protect teachers";
  const pricingProtectionSubheading =
    language === "de"
      ? "Draft ist fuer sensible Kommunikation gedacht, die weitergeleitet, gescreenshotet oder spaeter geprueft werden kann. Es hilft nicht nur beim Schreiben, sondern beim Senken professioneller Risiken."
      : "Draft is built for sensitive communication that may be forwarded, screenshot, or reviewed later. It is not just about fluent copy - it is about lowering professional risk.";
  const pricingProtectionCards =
    language === "de"
      ? [
          "Erkennt riskante Formulierungen frueher.",
          "Schlaegt ruhigere, belastbarere Ueberarbeitungen vor.",
          "Hilft einzuschaetzen, wie Nachrichten bei Eltern ankommen koennten.",
          "Unterstuetzt einen sachlicheren Dokumentationsmodus, wenn ein sauberer Schriftverlauf wichtig ist.",
        ]
      : [
          "Spots risky wording earlier.",
          "Suggests calmer, more defensible rewrites.",
          "Helps you gauge how a message may land with parents.",
          "Supports a more factual documentation mode when the paper trail matters.",
        ];
  const trackPricingCTA = (id: string) =>
    track("cta_click", { location: "pricing", id });

  const logPricingAction = (
    action: string,
    details: Record<string, string | boolean>,
  ) => {
    console.info("[pricing-cta]", { action, ...details });
  };

  const openFreeSignupFlow = () => {
    trackPricingCTA("plan_free");
    track("cta_click_pricing_free_signup", {
      destination: starterWaitlistHref,
      language,
      sourcePage: pathname,
    });
    logPricingAction("free_signup", {
      destination: starterWaitlistHref,
      flow: "waitlist_page",
      sourcePage: pathname,
    });
    router.push(starterWaitlistHref);
  };

  const openEarlyAccessFlow = (
    ctaId: "waitlist_teacher" | "waitlist_bundle",
    destination: string,
    plan: "teacher" | "bundle",
  ) => {
    trackPricingCTA(ctaId);
    track(`cta_click_pricing_${ctaId}`, {
      destination,
      language,
      plan,
      sourcePage: pathname,
    });
    logPricingAction(ctaId, {
      destination,
      flow: "waitlist_page",
      plan,
      sourcePage: pathname,
    });
    router.push(destination);
  };

  const openSalesFlow = (
    ctaId: string,
    destination: string,
    plan: "department" | "enterprise" | "general",
  ) => {
    trackPricingCTA(ctaId);
    track(`cta_click_pricing_${ctaId}`, {
      destination,
      currency,
      language,
      plan,
    });
    logPricingAction(ctaId, {
      destination,
      plan,
      sourcePage: pathname,
    });
    router.push(destination);
  };

  const launchStripeCheckout = (
    ctaId: "checkout_teacher" | "checkout_bundle",
    destination: string,
    plan: "draft" | "bundle",
  ) => {
    const stripePriceId = pricingConfig[plan].stripePriceIds[billingInterval];

    trackPricingCTA(ctaId);
    track(`cta_click_pricing_${ctaId}`, {
      billingCycle: billingInterval,
      currency,
      language,
      stripePriceId,
      destination,
    });
    logPricingAction(ctaId, {
      destination,
      stripePriceId,
      billingInterval,
      currency,
    });

    window.location.assign(destination);
  };

  return (
    <>
      <div className="bg-[#0F172A] min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#8B5CF6] uppercase tracking-wider text-sm font-semibold mb-4"
            >
              {t("pricing.hero.preheadline")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {t("pricing.hero.headline")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#94A3B8] mb-8 max-w-3xl mx-auto"
            >
              {t("pricing.hero.subheadline")}
            </motion.p>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-[#94A3B8] mb-8"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8B5CF6]" />
                <span>{t("pricing.trust.teachers")}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>{t("pricing.trust.ferpa")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8B5CF6]" />
                <span>{t("pricing.trust.cancel")}</span>
              </div>
            </motion.div>

            {/* Identity Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1E293B] rounded-xl p-6 mb-12 max-w-2xl mx-auto"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {t("pricing.identity.title")}
              </h3>
              <div className="space-y-2 text-left text-[#94A3B8]">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                  <span>{t("pricing.identity.point1")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                  <span>{t("pricing.identity.point2")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                  <span>{t("pricing.identity.point3")}</span>
                </div>
              </div>
            </motion.div>

            {/* Currency & Billing Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {/* Currency Selector */}
              <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg p-1">
                <Globe className="w-4 h-4 text-[#94A3B8] ml-2" />
                {SUPPORTED_CURRENCIES.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                      currency === curr
                        ? "bg-[#8B5CF6] text-white"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              {/* Billing Period Toggle */}
              <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg p-1">
                <button
                  onClick={() => setBillingInterval("monthly")}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                    billingInterval === "monthly"
                      ? "bg-[#8B5CF6] text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {t("pricing.toggle.monthly")}
                </button>
                <button
                  onClick={() => setBillingInterval("yearly")}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all relative ${
                    billingInterval === "yearly"
                      ? "bg-[#8B5CF6] text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {t("pricing.toggle.annual")}
                  {billingInterval === "yearly" && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-green-500 text-white px-2 py-0.5 rounded whitespace-nowrap">
                      {t("pricing.toggle.save")}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Outcome Proof */}
        <section className="pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#8B5CF6]/30">
              <p className="text-lg text-[#E2E8F0]">
                {t("pricing.outcome.text")}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-12 px-6">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,41,59,0.92),rgba(15,23,42,0.98))] p-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.95)] ring-1 ring-white/5 md:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                <ShieldCheck className="h-4 w-4" />
                <span>{pricingProtectionHeading}</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {pricingProtectionHeading}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#CBD5E1]">
                {pricingProtectionSubheading}
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {pricingProtectionCards.map((card) => (
                <article
                  key={card}
                  className="rounded-2xl border border-white/8 bg-[#0B1220]/80 px-5 py-5"
                >
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#A78BFA]" />
                    <p className="text-sm leading-6 text-[#E2E8F0]">{card}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            {!DRAFT_SALES_ENABLED ? (
              <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
                {prelaunchHelperLine}
              </div>
            ) : null}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#1E293B] rounded-2xl p-8 border-2 border-transparent hover:border-[#8B5CF6] transition-all"
              >
                <div className="inline-block bg-[#8B5CF6]/20 text-[#A78BFA] px-3 py-1.5 rounded-lg text-sm font-semibold mb-4">
                  {t("pricing.free.badge")}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("pricing.free.title")}
                </h3>
                <p className="text-[#94A3B8] mb-6 text-sm">
                  {t("pricing.free.description")}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    {symbol}0
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={openFreeSignupFlow}
                  className="w-full bg-transparent border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 py-5 text-base font-semibold rounded-lg mb-6"
                >
                  {t("pricing.free.cta")}
                </Button>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8] text-sm">
                      {t("pricing.free.feature1")}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8] text-sm">
                      {t("pricing.free.feature2")}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8] text-sm">
                      {t("pricing.free.feature3")}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8] text-sm">
                      {t("pricing.free.feature4")}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Teacher (Premium) Plan - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#1E293B] rounded-2xl p-8 border-2 border-[#8B5CF6] relative lg:scale-105 shadow-2xl shadow-[#8B5CF6]/30"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  {t("pricing.teacher.badge")}
                </div>

                <h3 className="text-3xl font-bold text-white mb-2 mt-4">
                  {t("pricing.teacher.title")}
                </h3>
                <p className="text-[#E2E8F0] mb-6">
                  {t("pricing.teacher.description")}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${billingInterval}-${currency}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-2"
                  >
                    <span className="text-5xl font-bold text-white">
                      {symbol}
                      {
                        pricingConfig.draft.displayAmounts[billingInterval][
                          currency
                        ]
                      }
                    </span>
                    <span className="text-[#94A3B8]">
                      /{billingInterval === "monthly" ? "mo" : "yr"}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {billingInterval === "yearly" && (
                  <p className="text-sm text-green-500 font-semibold mb-4">
                    {t("pricing.teacher.savingsAnnual")}
                  </p>
                )}

                <Button
                  type="button"
                  onClick={() => {
                    if (DRAFT_SALES_ENABLED) {
                      launchStripeCheckout(
                        "checkout_teacher",
                        draftCheckoutHref,
                        "draft",
                      );
                      return;
                    }

                    openEarlyAccessFlow(
                      "waitlist_teacher",
                      teacherWaitlistHref,
                      "teacher",
                    );
                  }}
                  className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:scale-105 py-6 text-lg font-semibold rounded-lg mb-3 shadow-lg shadow-[#8B5CF6]/40 transition-transform"
                >
                  {DRAFT_SALES_ENABLED
                    ? t("pricing.checkout.buyNow")
                    : prelaunchCtaLabel}
                </Button>
                <p className="text-center text-sm text-[#94A3B8] mb-4">
                  {t("pricing.teacher.trial")}
                </p>

                <div className="flex items-center justify-center gap-2 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] rounded-lg px-4 py-2 mb-6">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm text-[#10B981] font-semibold">
                    {t("pricing.teacher.guarantee")}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                      <span className="text-white text-sm font-medium">
                        {t(`pricing.teacher.feature${i}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#8B5CF6]/15 rounded-xl">
                  <p className="text-[#E2E8F0] text-sm">
                    {t("pricing.teacher.timeSaved")}
                  </p>
                </div>
              </motion.div>

              {/* Department Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#1E293B] rounded-2xl p-8 border-2 border-transparent hover:border-[#FB923C] transition-all"
              >
                <div className="inline-block bg-[#FB923C]/20 text-[#FB923C] px-3 py-1.5 rounded-lg text-sm font-semibold mb-4">
                  {t("pricing.department.badge")}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("pricing.department.title")}
                </h3>
                <p className="text-[#94A3B8] mb-6 text-sm">
                  {t("pricing.department.description")}
                </p>

                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">
                    {symbol}
                    {departmentDisplayAmounts.monthly[currency]}
                  </span>
                  <span className="text-[#94A3B8]">
                    {t("pricing.department.perTeacher")}
                  </span>
                </div>
                <p className="text-sm text-[#94A3B8] mb-6">
                  {t("pricing.department.billing")}
                </p>

                <Button
                  type="button"
                  onClick={() =>
                    openSalesFlow(
                      "checkout_department",
                      departmentSalesHref,
                      "department",
                    )
                  }
                  className="w-full bg-transparent border-2 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 py-5 text-base font-semibold rounded-lg mb-6"
                >
                  {t("pricing.department.cta")}
                </Button>

                <div className="space-y-3 mb-4">
                  <p className="text-sm font-semibold text-white">
                    {t("pricing.department.includes")}
                  </p>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#FB923C] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94A3B8] text-sm">
                        {t(`pricing.department.feature${i}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Schools & Districts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#1E293B] rounded-2xl p-8 border-2 border-transparent hover:border-[#FB923C] transition-all"
              >
                <div className="inline-block bg-[#FB923C]/20 text-[#FB923C] px-3 py-1.5 rounded-lg text-sm font-semibold mb-4">
                  {t("pricing.enterprise.badge")}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("pricing.enterprise.title")}
                </h3>
                <p className="text-[#94A3B8] mb-6 text-sm">
                  {t("pricing.enterprise.description")}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {t("pricing.enterprise.price")}
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={() =>
                    openSalesFlow(
                      "checkout_enterprise",
                      enterpriseSalesHref,
                      "enterprise",
                    )
                  }
                  className="w-full bg-transparent border-2 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 py-5 text-base font-semibold rounded-lg mb-6"
                >
                  {t("pricing.enterprise.cta")}
                </Button>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-white">
                    {t("pricing.enterprise.includes")}
                  </p>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#FB923C] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94A3B8] text-sm">
                        {t(`pricing.enterprise.feature${i}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bundle Highlight */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-2xl p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
              <div className="relative z-10">
                <div className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-lg text-sm font-semibold mb-4">
                  {t("pricing.bundle.badge")}
                </div>
                <h3 className="text-4xl font-bold text-white mb-3">
                  {t("pricing.bundle.title")}
                </h3>
                <p className="text-white/90 mb-6 text-lg">
                  {t("pricing.bundle.description")}
                </p>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-6xl font-bold text-white">
                    {symbol}
                    {
                      pricingConfig.bundle.displayAmounts[billingInterval][
                        currency
                      ]
                    }
                  </span>
                  <span className="text-white/80 text-xl">
                    {billingInterval === "monthly"
                      ? t("pricing.bundle.perMonth")
                      : t("pricing.bundle.perYear")}
                  </span>
                </div>
                {billingInterval === "yearly" && (
                  <p className="text-white/90 mb-6">
                    {t("pricing.bundle.savings")}
                  </p>
                )}
                <Button
                  type="button"
                  onClick={() => {
                    if (bundlePricingAction.kind === "checkout") {
                      launchStripeCheckout(
                        "checkout_bundle",
                        bundlePricingAction.href,
                        "bundle",
                      );
                      return;
                    }

                    openEarlyAccessFlow(
                      "waitlist_bundle",
                      bundlePricingAction.href,
                      "bundle",
                    );
                  }}
                  className="bg-white text-[#8B5CF6] hover:bg-white/90 py-6 px-8 text-lg font-semibold rounded-lg shadow-lg"
                >
                  {bundlePricingAction.kind === "checkout"
                    ? t("pricing.checkout.buyNow")
                    : getDraftTeachBundleWaitlistCtaLabel(language)}
                </Button>
                {bundlePricingAction.helperText ? (
                  <p className="mt-3 text-sm text-white/90">
                    {bundlePricingAction.helperText}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Compare Table */}
        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">
                {t("pricing.compare.title")}
              </h2>
              <p className="text-[#94A3B8]">{t("pricing.compare.caption")}</p>
            </div>

            <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/5 text-sm text-[#E2E8F0] uppercase tracking-wide">
                    <th className="text-left px-6 py-4">
                      {t("pricing.compare.column.generic")}
                    </th>
                    <th className="text-left px-6 py-4 bg-[#8B5CF6]/10 text-[#C4B5FD]">
                      {t("pricing.compare.column.zaza")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={`border-t border-white/5 ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                    >
                      <td className="px-6 py-5 align-top">
                        <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                          {row.feature}
                        </div>
                        <div className="mt-2 text-sm text-[#E2E8F0]">
                          {row.generic}
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top bg-[#0F172A]">
                        <div className="text-xs font-semibold text-[#C4B5FD] uppercase tracking-wide">
                          {row.feature}
                        </div>
                        <div className="mt-2 text-sm text-white">
                          {row.zaza}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {comparisonRows.map((row) => (
                <div
                  key={row.feature}
                  className="rounded-xl border border-white/10 bg-[#0B1220] p-5 space-y-3"
                >
                  <div className="text-sm font-semibold text-[#E2E8F0]">
                    {row.feature}
                  </div>
                  <div className="rounded-lg border border-white/5 bg-[#111827] p-3 text-sm text-[#CBD5E1]">
                    <span className="block text-xs font-semibold text-[#9CA3AF] mb-1">
                      {t("pricing.compare.column.generic")}
                    </span>
                    {row.generic}
                  </div>
                  <div className="rounded-lg border border-[#8B5CF6]/30 bg-[#0F172A] p-3 text-sm text-white shadow-[0_10px_30px_rgba(139,92,246,0.15)]">
                    <span className="block text-xs font-semibold text-[#C4B5FD] mb-1">
                      {t("pricing.compare.column.zaza")}
                    </span>
                    {row.zaza}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-[#94A3B8]">
              {t("pricing.compare.footer")}
            </p>
          </div>
        </section>

        {/* Transformation Testimonials */}
        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {t("pricing.testimonials.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#1E293B] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold">
                      {t(`pricing.testimonials.${i}.name`)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {t(`pricing.testimonials.${i}.name`)}
                      </p>
                      <p className="text-sm text-[#94A3B8]">
                        {t(`pricing.testimonials.${i}.role`)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#E2E8F0]">
                    {t(`pricing.testimonials.${i}.quote`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Wellbeing Metric */}
            <div className="mt-12 text-center">
              <div className="inline-block bg-[#1E293B] rounded-xl p-6 border border-[#8B5CF6]/30">
                <p className="text-[#E2E8F0] text-lg">
                  {t("pricing.metric.text")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {t("pricing.faq.title")}
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#1E293B] rounded-xl">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-white">
                      {t(`pricing.faq.q${i}`)}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#94A3B8] transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-[#94A3B8]">{t(`pricing.faq.a${i}`)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("pricing.cta.title")}
              </h2>
              <p className="text-white/90 text-xl mb-8">
                {t("pricing.cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="button"
                  onClick={() => {
                    trackPricingCTA("cta_primary");
                    track("cta_click_pricing_cta_primary", {
                      destination: starterWaitlistHref,
                      language,
                    });
                    logPricingAction("cta_primary", {
                      destination: starterWaitlistHref,
                      flow: "waitlist_page",
                    });
                    router.push(starterWaitlistHref);
                  }}
                  className="bg-white text-[#8B5CF6] hover:bg-white/90 py-6 px-8 text-lg font-semibold rounded-lg shadow-lg"
                >
                  {t("pricing.cta.primary")}
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    openSalesFlow(
                      "cta_secondary_sales",
                      generalSalesHref,
                      "general",
                    )
                  }
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-6 px-8 text-lg font-semibold rounded-lg"
                >
                  {t("pricing.cta.secondary")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
