"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { motion, AnimatePresence } from "framer-motion";
import { track, trackCtaClick } from "@/lib/analytics";
import {
  buildStripeCheckoutPath,
  getLocalizedDepartmentAmount,
  getLocalizedPlanAmount,
  pricingConfig,
  type SelfServeInterval,
} from "@/config/pricing";
import { getDraftSchoolSalesHref } from "@/lib/draft-cta";
import { CurrencyToggle } from "@/components/pricing/currency-toggle";
import { usePricingCurrency } from "@/hooks/use-pricing-currency";
import { formatLocalizedPrice } from "@/lib/pricing-currency";

const pricingTestimonialHeadshots = [
  "/testimonials/pricing-teacher-1.jpg",
  "/testimonials/pricing-teacher-2.jpg",
  "/testimonials/emma-k-generated.png",
] as const;

function PricingTestimonialAvatar({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const initials =
    alt
      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(".") + ".";

  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#0F172A] shadow-[0_8px_20px_rgba(15,23,42,0.35)]">
      {hasError ? (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.28),rgba(30,41,59,0.98)_62%)] text-[11px] font-semibold tracking-[0.18em] text-[#E9D5FF]">
          <span aria-hidden="true">{initials}</span>
          <span className="sr-only">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="48px"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
export default function PricingClient() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [billingPeriod, setBillingPeriod] =
    useState<SelfServeInterval>("monthly");
  const { currency, setCurrency } = usePricingCurrency();
  const [signupOpen, setSignupOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pricingPath = pathname === "/de/pricing" ? "/de/pricing" : "/pricing";
  const teacherCheckoutHref = buildStripeCheckoutPath({
    plan: "draft",
    interval: billingPeriod,
    currency,
    returnPath: pricingPath,
  });
  const bundleCheckoutHref = buildStripeCheckoutPath({
    plan: "bundle",
    interval: billingPeriod,
    currency,
    returnPath: pricingPath,
  });
  const departmentSalesHref = getDraftSchoolSalesHref(
    language,
    "department",
    "pricing_page",
  );
  const enterpriseSalesHref = getDraftSchoolSalesHref(
    language,
    "enterprise",
    "pricing_page",
  );
  const generalSalesHref = getDraftSchoolSalesHref(
    language,
    "general",
    "pricing_page",
  );
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
  ];
  const trackPricingCTA = (ctaText: string, ctaLocation: string) =>
    trackCtaClick({ ctaText, ctaLocation });

  const handlePlanClick = (planId: string) => {
    trackPricingCTA(t("pricing.free.cta"), "pricing_free_card");
    track("cta_click_pricing_select_plan", {
      planId,
      billingCycle: billingPeriod,
      currency,
      language,
    });
    setSignupOpen(true);
  };

  const launchCheckout = (
    ctaId: "checkout_teacher" | "checkout_bundle",
    destination: string,
    plan: "draft" | "bundle",
  ) => {
    const stripePriceId =
      pricingConfig[plan].stripePriceIds[billingPeriod][currency];

    trackPricingCTA(
      t("pricing.checkout.buyNow"),
      plan === "draft" ? "pricing_teacher_card" : "pricing_bundle_section",
    );
    track(`cta_click_pricing_${ctaId}`, {
      billingCycle: billingPeriod,
      currency,
      language,
      stripePriceId,
      destination,
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
              <CurrencyToggle currency={currency} onChange={setCurrency} />

              {/* Billing Period Toggle */}
              <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg p-1">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                    billingPeriod === "monthly"
                      ? "bg-[#8B5CF6] text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {t("pricing.toggle.monthly")}
                </button>
                <button
                  onClick={() => setBillingPeriod("annual")}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all relative ${
                    billingPeriod === "annual"
                      ? "bg-[#8B5CF6] text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {t("pricing.toggle.annual")}
                  {billingPeriod === "annual" && (
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

        {/* Pricing Cards */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
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
                  {formatLocalizedPrice(0, currency)}
                </span>
              </div>

              <Button
                onClick={() => handlePlanClick("free")}
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
                  key={`${billingPeriod}-${currency}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-2"
                >
                  <span className="text-5xl font-bold text-white">
                    {formatLocalizedPrice(
                      getLocalizedPlanAmount("draft", billingPeriod, currency),
                      currency,
                    )}
                  </span>
                  <span className="text-[#94A3B8]">
                    /{billingPeriod === "monthly" ? "mo" : "yr"}
                  </span>
                </motion.div>
              </AnimatePresence>

              {billingPeriod === "annual" && (
                <p className="text-sm text-green-500 font-semibold mb-4">
                  {t("pricing.teacher.savingsAnnual")}
                </p>
              )}

              <Button
                type="button"
                onClick={() =>
                  launchCheckout(
                    "checkout_teacher",
                    teacherCheckoutHref,
                    "draft",
                  )
                }
                className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:scale-105 py-6 text-lg font-semibold rounded-lg mb-3 shadow-lg shadow-[#8B5CF6]/40 transition-transform"
              >
                {t("pricing.checkout.buyNow")}
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
                  {formatLocalizedPrice(
                    getLocalizedDepartmentAmount(currency),
                    currency,
                  )}
                </span>
                <span className="text-[#94A3B8]">
                  {t("pricing.department.perTeacher")}
                </span>
              </div>
              <p className="text-sm text-[#94A3B8] mb-6">
                {t("pricing.department.billing")}
              </p>

              <Button
                asChild
                onClick={() => {
                  trackPricingCTA(
                    t("pricing.department.cta"),
                    "pricing_department_card",
                  );
                  track("cta_click_pricing_checkout_department", {
                    currency,
                    language,
                    destination: departmentSalesHref,
                  });
                }}
                className="w-full bg-transparent border-2 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 py-5 text-base font-semibold rounded-lg mb-6"
              >
                <a href={departmentSalesHref}>{t("pricing.department.cta")}</a>
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
                asChild
                onClick={() => {
                  trackPricingCTA(
                    t("pricing.enterprise.cta"),
                    "pricing_enterprise_card",
                  );
                  track("cta_click_pricing_checkout_enterprise", {
                    currency,
                    language,
                    destination: enterpriseSalesHref,
                  });
                }}
                className="w-full bg-transparent border-2 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 py-5 text-base font-semibold rounded-lg mb-6"
              >
                <a href={enterpriseSalesHref}>{t("pricing.enterprise.cta")}</a>
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
                    {formatLocalizedPrice(
                      getLocalizedPlanAmount("bundle", billingPeriod, currency),
                      currency,
                    )}
                  </span>
                  <span className="text-white/80 text-xl">
                    {billingPeriod === "monthly"
                      ? t("pricing.bundle.perMonth")
                      : t("pricing.bundle.perYear")}
                  </span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-white/90 mb-6">
                    {t("pricing.bundle.savings")}
                  </p>
                )}
                <Button
                  type="button"
                  onClick={() =>
                    launchCheckout(
                      "checkout_bundle",
                      bundleCheckoutHref,
                      "bundle",
                    )
                  }
                  className="bg-white text-[#8B5CF6] hover:bg-white/90 py-6 px-8 text-lg font-semibold rounded-lg shadow-lg"
                >
                  {t("pricing.checkout.buyNow")}
                </Button>
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
              {[1, 2, 3].map((i, index) => (
                <div key={i} className="bg-[#1E293B] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <PricingTestimonialAvatar
                      src={pricingTestimonialHeadshots[index]}
                      alt={t(`pricing.testimonials.${i}.name`)}
                    />
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
                  onClick={() => {
                    trackPricingCTA(
                      t("pricing.cta.primary"),
                      "pricing_bottom_primary",
                    );
                    track("cta_click_pricing_cta_primary", { language });
                    setSignupOpen(true);
                  }}
                  className="bg-white text-[#8B5CF6] hover:bg-white/90 py-6 px-8 text-lg font-semibold rounded-lg shadow-lg"
                >
                  {t("pricing.cta.primary")}
                </Button>
                <Button
                  asChild
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-6 px-8 text-lg font-semibold rounded-lg"
                >
                  <a
                    href={generalSalesHref}
                    onClick={() =>
                      trackPricingCTA(
                        t("pricing.cta.secondary"),
                        "pricing_bottom_secondary",
                      )
                    }
                  >
                    {t("pricing.cta.secondary")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
}
