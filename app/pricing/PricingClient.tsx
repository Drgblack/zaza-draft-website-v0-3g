"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { GuideLinksBlock } from "@/components/seo/GuideLinksBlock";
import { JsonLdCollection } from "@/components/seo/json-ld";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { motion } from "framer-motion";
import { track, trackCtaClick } from "@/lib/analytics";
import {
  getAnnualSavingsAmount,
  getLocalizedPlanAmount,
  getLocalizedDepartmentAmount,
  resolveSelfServeCheckout,
  type SelfServeInterval,
} from "@/config/pricing";
import { getDraftSchoolSalesHref } from "@/lib/draft-cta";
import { CurrencyToggle } from "@/components/pricing/currency-toggle";
import { usePricingCurrency } from "@/hooks/use-pricing-currency";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import {
  buildVisibleSelfServeOfferJsonLd,
  createFAQPageJsonLd,
  createSoftwareApplicationJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { getPopularGuideLinks } from "@/lib/guides";
import type { JsonLdObject } from "@/lib/seo/schema";

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

type PricingPlanFact = {
  label: string;
  value: ReactNode;
  highlight?: ReactNode;
  emphasized?: boolean;
};

type PricingPlanCardData = {
  key: string;
  badge?: string;
  badgeTone: "violet" | "amber" | "white";
  title: string;
  description: string;
  facts: PricingPlanFact[];
  features: string[];
  terms: string[];
  cta: ReactNode;
  ctaNote?: ReactNode;
  featured?: boolean;
};

function PricingPlanCard({
  plan,
  includesLabel,
  termsLabel,
}: {
  plan: PricingPlanCardData;
  includesLabel: string;
  termsLabel: string;
}) {
  const badgeStyles =
    plan.badgeTone === "amber"
      ? "bg-[#FB923C]/20 text-[#FDBA74]"
      : plan.badgeTone === "white"
        ? "bg-white/15 text-white"
        : "bg-[#8B5CF6]/20 text-[#C4B5FD]";
  const articleStyles = plan.featured
    ? "border-[#8B5CF6] shadow-[0_24px_70px_rgba(139,92,246,0.22)] lg:-translate-y-1"
    : plan.badgeTone === "amber"
      ? "border-white/10 hover:border-[#FB923C]/45"
      : "border-white/10 hover:border-[#8B5CF6]/40";
  const emphasizedRowStyles =
    plan.badgeTone === "amber"
      ? "border-[#FB923C]/25 bg-[#FB923C]/10"
      : "border-[#8B5CF6]/25 bg-[#8B5CF6]/10";

  return (
    <article
      aria-labelledby={`pricing-plan-${plan.key}`}
      className={`rounded-3xl border bg-[#111827] p-8 transition-all ${articleStyles}`}
    >
      <header>
        {plan.badge ? (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${badgeStyles}`}
          >
            {plan.badge}
          </span>
        ) : null}
        <h3
          id={`pricing-plan-${plan.key}`}
          className="mt-4 text-3xl font-bold text-white"
        >
          {plan.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#CBD5E1]">
          {plan.description}
        </p>
      </header>

      <dl className="mt-8 space-y-4">
        {plan.facts.map((fact) => (
          <div
            key={`${plan.key}-${fact.label}`}
            className={`rounded-2xl border p-4 ${
              fact.emphasized
                ? emphasizedRowStyles
                : "border-white/10 bg-[#0B1220]"
            }`}
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
              {fact.label}
            </dt>
            <dd className="mt-2 text-sm leading-7 text-[#F8FAFC]">
              <div className="text-base font-semibold text-white">
                {fact.value}
              </div>
              {fact.highlight ? (
                <p className="mt-1 text-xs font-medium text-[#C4B5FD]">
                  {fact.highlight}
                </p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-8">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E2E8F0]">
          {includesLabel}
        </h4>
        <ul className="mt-4 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8B5CF6]" />
              <span className="text-sm leading-7 text-[#CBD5E1]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E2E8F0]">
          {termsLabel}
        </h4>
        <ul className="mt-4 space-y-2">
          {plan.terms.map((term) => (
            <li key={term} className="text-sm leading-7 text-[#94A3B8]">
              {term}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">{plan.cta}</div>
      {plan.ctaNote ? (
        <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{plan.ctaNote}</p>
      ) : null}
    </article>
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
  const isGerman = language === "de";

  const pricingPath = pathname === "/de/pricing" ? "/de/pricing" : "/pricing";
  const teacherCheckout = resolveSelfServeCheckout({
    plan: "draft",
    interval: billingPeriod,
    currency,
    returnPath: pricingPath,
  });
  const bundleCheckout = resolveSelfServeCheckout({
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
  const perMonthLabel = t("pricing.details.perMonth");
  const perYearLabel = t("pricing.details.perYear");
  const pricingSectionTitle = t("pricing.plans.title");
  const pricingSectionSubtitle = t("pricing.plans.subtitle");
  const pricingToggleHelper = t("pricing.toggle.helper");
  const pricingIncludesLabel = t("pricing.details.includes");
  const pricingTermsLabel = t("pricing.details.terms");
  const teacherMonthlyAmount = getLocalizedPlanAmount(
    "draft",
    "monthly",
    currency,
  );
  const teacherAnnualAmount = getLocalizedPlanAmount(
    "draft",
    "annual",
    currency,
  );
  const teacherMonthlyPrice = `${formatLocalizedPrice(teacherMonthlyAmount, currency)}${perMonthLabel}`;
  const teacherAnnualPrice = `${formatLocalizedPrice(teacherAnnualAmount, currency)}${perYearLabel}`;
  const teacherAnnualSavings = formatLocalizedPrice(
    getAnnualSavingsAmount("draft", currency),
    currency,
  );
  const bundleMonthlyAmount = getLocalizedPlanAmount(
    "bundle",
    "monthly",
    currency,
  );
  const bundleAnnualAmount = getLocalizedPlanAmount(
    "bundle",
    "annual",
    currency,
  );
  const bundleMonthlyPrice = `${formatLocalizedPrice(bundleMonthlyAmount, currency)}${perMonthLabel}`;
  const bundleAnnualPrice = `${formatLocalizedPrice(bundleAnnualAmount, currency)}${perYearLabel}`;
  const bundleAnnualSavings = formatLocalizedPrice(
    getAnnualSavingsAmount("bundle", currency),
    currency,
  );
  const departmentMonthlyPrice = `${formatLocalizedPrice(
    getLocalizedDepartmentAmount(currency),
    currency,
  )}${t("pricing.department.perTeacher")}`;
  const formatPlanSummary = (amount: number) =>
    isGerman
      ? `${formatLocalizedPrice(amount, currency)} pro ${
          billingPeriod === "monthly" ? "Monat" : "Jahr"
        }`
      : `${formatLocalizedPrice(amount, currency)}/${
          billingPeriod === "monthly" ? "month" : "year"
        }`;
  const teacherPriceSummary = formatPlanSummary(teacherCheckout.displayAmount);
  const bundlePriceSummary = formatPlanSummary(bundleCheckout.displayAmount);
  const pricingSupportNote = isGerman
    ? `Preise werden aktuell in ${currency} angezeigt. Steuern werden gegebenenfalls im Checkout berechnet. Kostenlos starten ohne Kreditkarte.`
    : `Prices are currently shown in ${currency}. Taxes may be calculated at checkout. Start free with no credit card.`;
  const teacherCheckoutNote = teacherCheckout.isAvailable
    ? isGerman
      ? `Sicherer Stripe-Checkout. ${teacherPriceSummary}. Jederzeit kündbar. Steuern werden gegebenenfalls im Checkout berechnet.`
      : `Secure Stripe checkout. ${teacherPriceSummary}. Cancel anytime. Taxes may be calculated at checkout.`
    : isGerman
      ? "USD-Preise werden angezeigt, waehrend der USD-Checkout finalisiert wird. Fuer ein Abo bitte auf EUR umschalten."
      : "USD prices are shown while USD checkout is being finalized. Switch to EUR to subscribe today.";
  const bundleCheckoutNote = bundleCheckout.isAvailable
    ? isGerman
      ? `Sicherer Stripe-Checkout. ${bundlePriceSummary}. Steuern werden gegebenenfalls im Checkout berechnet.`
      : `Secure Stripe checkout. ${bundlePriceSummary}. Taxes may be calculated at checkout.`
    : isGerman
      ? "USD-Preise werden angezeigt, waehrend der USD-Checkout finalisiert wird. Fuer ein Abo bitte auf EUR umschalten."
      : "USD prices are shown while USD checkout is being finalized. Switch to EUR to subscribe today.";
  const heroPreheadline = isGerman
    ? t("pricing.hero.preheadline")
    : "CALM, PROFESSIONAL WRITING SUPPORT";
  const heroHeadline = isGerman
    ? t("pricing.hero.headline")
    : "Pricing for better judgement, not just faster drafting";
  const heroSubheadline = isGerman
    ? t("pricing.hero.subheadline")
    : "Teachers are not paying for extra words. They are paying for calmer parent emails, clearer report comments, and less second-guessing before something is sent or submitted.";
  const identityTitle = isGerman
    ? t("pricing.identity.title")
    : "This is for teachers who want more confidence in what leaves their desk";
  const identityPoints = isGerman
    ? [
        t("pricing.identity.point1"),
        t("pricing.identity.point2"),
        t("pricing.identity.point3"),
      ]
    : [
        "want professional parent emails that do not sound cold",
        "need support spotting tone risk before a thread gets harder",
        "care about report comments that tell parents something useful",
      ];
  const outcomeText = isGerman
    ? t("pricing.outcome.text")
    : "Draft helps teachers spend less time rewriting and more time approving wording they can stand behind, whether that is a parent email, a behaviour update, or a report comment.";
  const teacherDescription = isGerman
    ? t("pricing.teacher.description")
    : "Unlimited support for calmer parent emails, clearer documentation, and report comments with more value.";
  const bundleDescription = isGerman
    ? t("pricing.bundle.description")
    : "One place to plan, write, and communicate, with teacher-first judgement support across parent communication and school writing.";
  const valueSectionEyebrow = isGerman
    ? "Wofuer Lehrkraefte wirklich zahlen"
    : "What teachers are really paying for";
  const valueSectionHeading = isGerman
    ? "Nicht nur Geschwindigkeit. Mehr Sicherheit im fertigen Text."
    : "Not just speed. More confidence in the finished wording.";
  const valueSectionIntro = isGerman
    ? "Der eigentliche Wert liegt nicht darin, mehr Text zu erzeugen. Er liegt darin, ruhigere, klarere und wertvollere Kommunikation schneller freigeben zu koennen."
    : "The real value is not generating more text. It is approving calmer, clearer, more useful communication with less mental drag.";
  const valueCards = isGerman
    ? [
        {
          title: "Weniger Tonrisiko",
          body: "Hilft zu erkennen, wenn eine Mail zu direkt, defensiv oder missverstaendlich klingt, bevor sie gesendet wird.",
        },
        {
          title: "Mehr Aussagekraft in Berichten",
          body: "Hilft, Beobachtungen in Kommentare zu verwandeln, die Eltern wirklich etwas ueber Staerken, Gewohnheiten oder naechste Schritte sagen.",
        },
        {
          title: "Weniger Zweifeln",
          body: "Weniger Zeit fuer das dritte Umschreiben. Mehr Sicherheit darin, dass professionell nicht kalt bedeuten muss.",
        },
      ]
    : [
        {
          title: "Lower tone risk",
          body: "Spot phrasing that may sound too blunt, defensive, or easy to misread before it lands with a parent.",
        },
        {
          title: "More meaningful report comments",
          body: "Move beyond comments parents already know and say something genuinely useful about strengths, habits, or next steps.",
        },
        {
          title: "Less second-guessing",
          body: "Spend less time on the third rewrite and more time approving wording that feels professional without feeling cold.",
        },
      ];
  const resourceSectionHeading = isGerman
    ? "Praktische Leitfaeden, bevor Sie kaufen"
    : "Useful guides before you buy";
  const resourceSectionBody = isGerman
    ? "Wenn Sie erst sehen moechten, wie Zaza ueber Ton und Aussagekraft denkt, starten Sie mit diesen kurzen Leitfaeden."
    : "If you want to see how Zaza thinks about tone and value before you subscribe, start with these short guides.";
  const resourceLinks = getPopularGuideLinks().slice(0, 4);
  const pricingFaqItems = [1, 2, 3, 4, 5, 6].map((index) => ({
    question: t(`pricing.faq.q${index}`),
    answer: t(`pricing.faq.a${index}`),
  }));
  const summaryTitle = isGerman
    ? "Preise und Einordnung auf einen Blick"
    : "Pricing and fit at a glance";
  const summaryIntro = isGerman
    ? "Wenn Sie nur die kurze Version brauchen, beantwortet dieser Abschnitt die wichtigsten Fragen zu Zaza Draft und den Preisen."
    : "If you only want the short version, this section answers the main questions about Zaza Draft and what the plans cost.";
  const monthlySchemaLabel = isGerman ? "monatlich" : "monthly";
  const annualSchemaLabel = isGerman ? "jaehrlich" : "annual";
  const pricingPlans: PricingPlanCardData[] = [
    {
      key: "free",
      badge: t("pricing.free.badge"),
      badgeTone: "violet",
      title: t("pricing.free.title"),
      description: t("pricing.free.description"),
      facts: [
        {
          label: t("pricing.details.bestFor"),
          value: t("pricing.free.bestFor"),
        },
        {
          label: t("pricing.details.monthlyPrice"),
          value: `${formatLocalizedPrice(0, currency)}${perMonthLabel}`,
        },
      ],
      features: [1, 2, 3, 4].map((index) => t(`pricing.free.feature${index}`)),
      terms: [t("pricing.free.term1"), t("pricing.free.term2")],
      cta: (
        <Button
          onClick={() => handlePlanClick("free")}
          className="w-full bg-transparent border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 py-5 text-base font-semibold rounded-lg"
        >
          {t("pricing.free.cta")}
        </Button>
      ),
    },
    {
      key: "teacher",
      badge: t("pricing.teacher.badge"),
      badgeTone: "violet",
      title: t("pricing.teacher.title"),
      description: teacherDescription,
      featured: true,
      facts: [
        {
          label: t("pricing.details.bestFor"),
          value: t("pricing.teacher.bestFor"),
        },
        {
          label: t("pricing.details.monthlyPrice"),
          value: teacherMonthlyPrice,
        },
        {
          label: t("pricing.details.yearlyPrice"),
          value: teacherAnnualPrice,
          highlight: `${t("pricing.details.bestValue")} · ${t("pricing.teacher.savingsAnnual")} · ${teacherAnnualSavings}`,
          emphasized: true,
        },
      ],
      features: [1, 2, 3, 4, 5, 6].map((index) =>
        t(`pricing.teacher.feature${index}`),
      ),
      terms: [
        t("pricing.teacher.period"),
        t("pricing.teacher.guarantee"),
        t("pricing.teacher.trial"),
      ],
      cta: (
        <Button
          type="button"
          disabled={!teacherCheckout.isAvailable}
          onClick={() =>
            launchCheckout("checkout_teacher", teacherCheckout, "draft")
          }
          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:scale-[1.01] py-6 text-lg font-semibold rounded-lg shadow-lg shadow-[#8B5CF6]/30 transition-transform"
        >
          {t("pricing.checkout.buyNow")}
        </Button>
      ),
      ctaNote: teacherCheckoutNote,
    },
    {
      key: "department",
      badge: t("pricing.department.badge"),
      badgeTone: "amber",
      title: t("pricing.department.title"),
      description: t("pricing.department.description"),
      facts: [
        {
          label: t("pricing.details.bestFor"),
          value: t("pricing.department.bestFor"),
        },
        {
          label: t("pricing.details.monthlyPrice"),
          value: departmentMonthlyPrice,
        },
        {
          label: t("pricing.details.billing"),
          value: t("pricing.department.billing"),
        },
      ],
      features: [1, 2, 3, 4].map((index) =>
        t(`pricing.department.feature${index}`),
      ),
      terms: [t("pricing.department.term1"), t("pricing.department.term2")],
      cta: (
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
          className="w-full bg-transparent border-2 border-[#FB923C] text-[#FDBA74] hover:bg-[#FB923C]/10 py-5 text-base font-semibold rounded-lg"
        >
          <a href={departmentSalesHref}>{t("pricing.department.cta")}</a>
        </Button>
      ),
    },
    {
      key: "enterprise",
      badge: t("pricing.enterprise.badge"),
      badgeTone: "amber",
      title: t("pricing.enterprise.title"),
      description: t("pricing.enterprise.description"),
      facts: [
        {
          label: t("pricing.details.bestFor"),
          value: t("pricing.enterprise.bestFor"),
        },
        {
          label: t("pricing.details.pricing"),
          value: t("pricing.enterprise.price"),
        },
      ],
      features: [1, 2, 3].map((index) =>
        t(`pricing.enterprise.feature${index}`),
      ),
      terms: [t("pricing.enterprise.term1"), t("pricing.enterprise.term2")],
      cta: (
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
          className="w-full bg-transparent border-2 border-[#FB923C] text-[#FDBA74] hover:bg-[#FB923C]/10 py-5 text-base font-semibold rounded-lg"
        >
          <a href={enterpriseSalesHref}>{t("pricing.enterprise.cta")}</a>
        </Button>
      ),
    },
    {
      key: "bundle",
      badge: t("pricing.bundle.badge"),
      badgeTone: "white",
      title: t("pricing.bundle.title"),
      description: bundleDescription,
      facts: [
        {
          label: t("pricing.details.bestFor"),
          value: t("pricing.bundle.bestFor"),
        },
        {
          label: t("pricing.details.monthlyPrice"),
          value: bundleMonthlyPrice,
        },
        {
          label: t("pricing.details.yearlyPrice"),
          value: bundleAnnualPrice,
          highlight: `${t("pricing.details.bestValue")} · ${t("pricing.bundle.savings")} · ${bundleAnnualSavings}`,
          emphasized: true,
        },
      ],
      features: [
        t("pricing.bundle.feature1"),
        t("pricing.bundle.feature2"),
        t("pricing.bundle.feature3"),
      ],
      terms: [t("pricing.bundle.term1"), t("pricing.bundle.term2")],
      cta: (
        <Button
          type="button"
          disabled={!bundleCheckout.isAvailable}
          onClick={() =>
            launchCheckout("checkout_bundle", bundleCheckout, "bundle")
          }
          className="w-full bg-white text-[#7C3AED] hover:bg-white/90 py-5 text-base font-semibold rounded-lg shadow-lg"
        >
          {t("pricing.checkout.buyNow")}
        </Button>
      ),
      ctaNote: bundleCheckoutNote,
    },
  ];
  const pricingOfferEntries = [
    buildVisibleSelfServeOfferJsonLd("draft", "monthly", "EUR", {
      name: `${t("pricing.teacher.title")} ${monthlySchemaLabel}`,
      url: pricingPath,
      description: isGerman
        ? "Monatlicher Zaza-Draft-Lehrkraft-Plan fuer ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen."
        : "Monthly Zaza Draft Teacher plan for calmer parent emails and more meaningful report comments.",
    }),
    buildVisibleSelfServeOfferJsonLd("draft", "annual", "EUR", {
      name: `${t("pricing.teacher.title")} ${annualSchemaLabel}`,
      url: pricingPath,
      description: isGerman
        ? "Jaehrlicher Zaza-Draft-Lehrkraft-Plan fuer ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen."
        : "Annual Zaza Draft Teacher plan for calmer parent emails and more meaningful report comments.",
    }),
    buildVisibleSelfServeOfferJsonLd("draft", "monthly", "USD", {
      name: `${t("pricing.teacher.title")} ${monthlySchemaLabel} USD`,
      url: pricingPath,
      description: isGerman
        ? "Monatlicher Zaza-Draft-Lehrkraft-Plan fuer ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen."
        : "Monthly Zaza Draft Teacher plan for calmer parent emails and more meaningful report comments.",
    }),
    buildVisibleSelfServeOfferJsonLd("draft", "annual", "USD", {
      name: `${t("pricing.teacher.title")} ${annualSchemaLabel} USD`,
      url: pricingPath,
      description: isGerman
        ? "Jaehrlicher Zaza-Draft-Lehrkraft-Plan fuer ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen."
        : "Annual Zaza Draft Teacher plan for calmer parent emails and more meaningful report comments.",
    }),
    buildVisibleSelfServeOfferJsonLd("bundle", "monthly", "EUR", {
      name: `${t("pricing.bundle.title")} ${monthlySchemaLabel}`,
      url: pricingPath,
      description: isGerman
        ? "Monatlicher Zaza-Draft-Bundle-Plan fuer Planung, Schreiben und Kommunikationsunterstuetzung."
        : "Monthly Zaza Draft bundle plan for planning, writing, and communication support.",
    }),
    buildVisibleSelfServeOfferJsonLd("bundle", "annual", "EUR", {
      name: `${t("pricing.bundle.title")} ${annualSchemaLabel}`,
      url: pricingPath,
      description: isGerman
        ? "Jaehrlicher Zaza-Draft-Bundle-Plan fuer Planung, Schreiben und Kommunikationsunterstuetzung."
        : "Annual Zaza Draft bundle plan for planning, writing, and communication support.",
    }),
  ].filter((entry): entry is JsonLdObject => Boolean(entry));

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
    checkout: { href: string; priceId: string | null },
    plan: "draft" | "bundle",
  ) => {
    const stripePriceId = checkout.priceId;

    if (!stripePriceId) {
      return;
    }

    trackPricingCTA(
      t("pricing.checkout.buyNow"),
      plan === "draft" ? "pricing_teacher_card" : "pricing_bundle_section",
    );
    track(`cta_click_pricing_${ctaId}`, {
      billingCycle: billingPeriod,
      currency,
      language,
      stripePriceId,
      destination: checkout.href,
    });

    window.location.assign(checkout.href);
  };

  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: `pricing-webpage-${isGerman ? "de" : "en"}`,
            data: createWebPageJsonLd({
              name: isGerman ? "Zaza Draft Preise" : "Zaza Draft Pricing",
              description: heroSubheadline,
              path: pricingPath,
              inLanguage: isGerman ? "de-DE" : "en-GB",
              keywords: [
                isGerman ? "Zaza Draft Preise" : "Zaza Draft pricing",
                "teacher pricing",
                "parent email support for teachers",
                "report comments",
              ],
            }),
          },
          {
            id: `pricing-faq-${isGerman ? "de" : "en"}`,
            data: createFAQPageJsonLd(pricingFaqItems),
          },
          {
            id: `pricing-software-${isGerman ? "de" : "en"}`,
            data: createSoftwareApplicationJsonLd({
              description: isGerman
                ? "Zaza Draft hilft Lehrkraeften, ruhigere Elternmails und aussagekraeftigere Zeugnisbemerkungen mit Formulierungen zu schreiben, die sie morgen nicht bereuen."
                : "Zaza Draft helps teachers write calmer parent emails and more meaningful report comments with wording they will not regret tomorrow.",
              offers: pricingOfferEntries,
              inLanguage: isGerman ? "de-DE" : "en-GB",
            }),
          },
          ...pricingOfferEntries.map((entry, index) => ({
            id: `pricing-offer-${isGerman ? "de" : "en"}-${index + 1}`,
            data: entry,
          })),
        ]}
      />
      <div className="bg-[#0F172A] min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#8B5CF6] uppercase tracking-wider text-sm font-semibold mb-4"
            >
              {heroPreheadline}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {heroHeadline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#94A3B8] mb-8 max-w-3xl mx-auto"
            >
              {heroSubheadline}
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
                {identityTitle}
              </h3>
              <div className="space-y-2 text-left text-[#94A3B8]">
                {identityPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Currency & Billing Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {/* Currency Selector */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
                  {isGerman ? "Waehrung" : "Currency"}
                </span>
                <CurrencyToggle currency={currency} onChange={setCurrency} />
              </div>

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
            <p className="mx-auto max-w-2xl text-sm text-[#94A3B8]">
              {pricingSupportNote}
            </p>
          </div>
        </section>

        {/* Outcome Proof */}
        <section className="pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#8B5CF6]/30">
              <p className="text-lg text-[#E2E8F0]">{outcomeText}</p>
            </div>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {pricingSectionTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-[#CBD5E1] md:text-lg">
                {pricingSectionSubtitle}
              </p>
              <p className="mt-4 text-sm font-medium text-[#C4B5FD]">
                {pricingToggleHelper}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {pricingPlans.map((plan) => (
                <PricingPlanCard
                  key={plan.key}
                  plan={plan}
                  includesLabel={pricingIncludesLabel}
                  termsLabel={pricingTermsLabel}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]">
                {valueSectionEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                {valueSectionHeading}
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#CBD5E1]">
                {valueSectionIntro}
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {valueCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/10 bg-[#0B1220] p-6"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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

        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <GuideLinksBlock
              theme="dark"
              eyebrow={
                isGerman
                  ? "Kommunikationsleitfaeden"
                  : "Teacher communication guides"
              }
              title={resourceSectionHeading}
              intro={resourceSectionBody}
              links={resourceLinks}
              hubHref="/guides"
              hubLabel={
                isGerman ? "Alle Leitfaeden ansehen" : "Browse all guides"
              }
            />
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

        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AgentReadableSummary
              locale={isGerman ? "de" : "en"}
              theme="dark"
              title={summaryTitle}
              intro={summaryIntro}
              answers={{
                whatIsIt: isGerman ? (
                  <>
                    Zaza Draft ist eine risikobewusste Schreibhilfe fuer
                    Lehrkraefte. Sie unterstuetzt bei Elternmails,
                    Zeugnisbemerkungen und anderen Schultexten, die ruhig, klar
                    und professionell bleiben muessen.
                  </>
                ) : (
                  <>
                    Zaza Draft is a risk-aware writing support tool for
                    teachers. It helps with parent emails, report comments, and
                    other school writing that needs to stay calm, clear, and
                    professional.
                  </>
                ),
                whoIsItFor: isGerman ? (
                  <>
                    Fuer Lehrkraefte, Abteilungen und Schulen, die sensible
                    Kommunikation nicht nur schneller, sondern auch sicherer und
                    aussagekraeftiger schreiben wollen.
                  </>
                ) : (
                  <>
                    It is for teachers, departments, and schools that want
                    sensitive communication to be not only faster, but safer and
                    more useful.
                  </>
                ),
                problemItSolves: isGerman ? (
                  <>
                    Es hilft, wenn Schreiben nicht am Inhalt scheitert, sondern
                    an Tonrisiko, endlosen Ueberarbeitungen oder Kommentaren,
                    die am Ende zu allgemein bleiben.
                  </>
                ) : (
                  <>
                    It helps when the problem is not having something to say,
                    but managing tone risk, repeated rewrites, and comments that
                    still end up too generic.
                  </>
                ),
                howItWorks: isGerman ? (
                  <>
                    Lehrkraefte bringen den Entwurf oder die Notizen ein, Zaza
                    unterstuetzt bei Ton und Klarheit, und die endgueltige
                    Fassung wird immer von der Lehrkraft selbst geprueft.
                  </>
                ) : (
                  <>
                    Teachers bring the draft or notes, Zaza helps with tone and
                    clarity, and the final version is still reviewed and
                    approved by the teacher.
                  </>
                ),
                whatItCosts: isGerman ? (
                  <>
                    Der Einstieg ist kostenlos. Aktuell liegen die sichtbaren
                    Self-Serve-Preise bei{" "}
                    <span className="font-semibold">{teacherPriceSummary}</span>{" "}
                    fuer Draft und{" "}
                    <span className="font-semibold">{bundlePriceSummary}</span>{" "}
                    fuer das Bundle. Abteilungs- und Schulpreise sind separat
                    verfuegbar.
                  </>
                ) : (
                  <>
                    You can start free. The visible self-serve plans are
                    currently{" "}
                    <span className="font-semibold">{teacherPriceSummary}</span>{" "}
                    for Draft and{" "}
                    <span className="font-semibold">{bundlePriceSummary}</span>{" "}
                    for the bundle. Department and school pricing are available
                    separately.
                  </>
                ),
                nextStep: isGerman ? (
                  <>
                    Waehlen Sie den passenden Plan auf dieser Seite oder starten
                    Sie direkt mit dem kostenlosen Einstieg, wenn Sie einen
                    echten Text pruefen moechten.
                  </>
                ) : (
                  <>
                    Pick the plan that fits on this page, or start with the free
                    option if you want to test Zaza on a real piece of writing
                    first.
                  </>
                ),
              }}
            />
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

      <SignupModal
        open={signupOpen}
        onOpenChange={setSignupOpen}
        source="pricing_free"
      />
    </>
  );
}
