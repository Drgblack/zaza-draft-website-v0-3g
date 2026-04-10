"use client";

import { useState } from "react";
import { SignupModal } from "@/components/signup-modal";
import { track, trackCtaClick } from "@/lib/analytics";
import {
  getAnnualSavingsAmount,
  resolveSelfServeCheckout,
  type SelfServeInterval,
} from "@/config/pricing";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import { usePricingCurrency } from "@/hooks/use-pricing-currency";
import { funnelCopy, type FunnelLocale } from "./content";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ComparisonSection from "./components/ComparisonSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";

const GUIDE_HREF = "/teacher-guide-to-sensitive-parent-emails";
const CHECKER_HREF = "/parent-email-risk-checker";

type JessicaReedFunnelProps = {
  locale?: FunnelLocale;
};

export default function JessicaReedFunnel({
  locale = "en",
}: JessicaReedFunnelProps) {
  const [signupOpen, setSignupOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] =
    useState<SelfServeInterval>("annual");
  const copy = funnelCopy[locale];
  const { currency, setCurrency } = usePricingCurrency({
    locales: locale === "de" ? ["de-DE"] : undefined,
  });
  const checkoutReturnPath = locale === "de" ? "/de/start" : "/start";
  const signupSource = locale === "de" ? "funnel_start_de" : "funnel_start_en";
  const freeCtaLabel = copy.freeCtaLabel;
  const displayLocale = locale === "de" ? "de-DE" : undefined;
  const proCheckout = resolveSelfServeCheckout({
    plan: "draft",
    interval: billingPeriod,
    currency,
    returnPath: checkoutReturnPath,
  });
  const formattedDisplayAmount = formatLocalizedPrice(
    proCheckout.displayAmount,
    currency,
    displayLocale ? { locale: displayLocale } : undefined,
  );
  const schoolYearDisplayAmount =
    currency === "USD"
      ? locale === "de"
        ? "160 $"
        : "$160"
      : formattedDisplayAmount;
  const proDisplayPriceLabel =
    billingPeriod === "annual"
      ? locale === "de"
        ? `${schoolYearDisplayAmount} pro Schuljahr`
        : `${schoolYearDisplayAmount} per school year`
      : locale === "de"
        ? `${formattedDisplayAmount}/Monat`
        : `${formattedDisplayAmount}/month`;
  const proCtaPriceLabel =
    locale === "de"
      ? `${formattedDisplayAmount}/${billingPeriod === "annual" ? "Jahr" : "Monat"}`
      : `${formattedDisplayAmount}/${billingPeriod === "annual" ? "year" : "month"}`;
  const proCtaLabel = copy.proCtaLabel(proCtaPriceLabel);
  const annualSavingsLabel = copy.pricing.annualSavings(
    formatLocalizedPrice(getAnnualSavingsAmount("draft", currency), currency, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...(displayLocale ? { locale: displayLocale } : {}),
    }),
  );
  const freePriceLabel = formatLocalizedPrice(
    0,
    currency,
    displayLocale ? { locale: displayLocale } : undefined,
  );
  const heroPrimaryHref = copy.hero.primaryCtaHref ?? CHECKER_HREF;
  const heroPrimaryLabel = copy.hero.primaryCtaLabel ?? freeCtaLabel;
  const heroSecondaryHref =
    copy.hero.secondaryLinkHref ??
    (locale === "de" ? "/de/parent-email-risk-checker" : CHECKER_HREF);
  const finalPrimaryHref = copy.finalCta.primaryCtaHref ?? CHECKER_HREF;
  const finalPrimaryLabel = copy.finalCta.primaryCtaLabel ?? freeCtaLabel;
  const finalSecondaryHref = copy.finalCta.secondaryCtaHref ?? GUIDE_HREF;

  const openFreeSignup = (ctaLocation: string, ctaText: string) => {
    trackCtaClick({ ctaText, ctaLocation });
    setSignupOpen(true);
  };

  const trackPaidPricingClick = (ctaLocation: string, ctaText: string) => {
    trackCtaClick({ ctaText, ctaLocation });
  };

  return (
    <div className="funnel-theme">
      <main className="funnel-main">
        <HeroSection
          primaryHref={heroPrimaryHref}
          onPrimaryAction={() => {
            trackCtaClick({
              ctaText: heroPrimaryLabel,
              ctaLocation: "funnel_hero_checker",
            });
            track("checker_link_clicked", {
              source: "funnel_hero",
              locale,
            });
          }}
          onSecondaryLinkClick={() => {
            trackCtaClick({
              ctaText: copy.hero.secondaryLinkLabel ?? "Get the free guide",
              ctaLocation: "funnel_hero_guide",
            });
            track("seo_guide_link_clicked", {
              destination: heroSecondaryHref,
              source: "funnel_hero",
              locale,
            });
          }}
          primaryCtaLabel={heroPrimaryLabel}
          secondaryHref={heroSecondaryHref}
          copy={copy.hero}
          locale={locale}
        />
        <PainSection copy={copy.pain} />
        <SolutionSection
          copy={copy.solution}
          onPrimaryAction={() => {
            trackCtaClick({
              ctaText:
                copy.solution.ctaBlock?.primaryLabel ?? "Make this safer",
              ctaLocation: "funnel_mid_checker",
            });
            track("checker_link_clicked", {
              source: "funnel_mid_page",
              locale,
            });
          }}
          onSecondaryAction={() => {
            trackCtaClick({
              ctaText:
                copy.solution.ctaBlock?.secondaryLabel ??
                "See 7 parent emails teachers should never send as-is",
              ctaLocation: "funnel_mid_guide",
            });
            track("seo_guide_link_clicked", {
              destination: copy.solution.ctaBlock?.secondaryHref ?? GUIDE_HREF,
              source: "funnel_mid_page",
              locale,
            });
          }}
        />
        <HowItWorksSection copy={copy.howItWorks} />
        <ComparisonSection copy={copy.comparison} />
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          billingPeriod={billingPeriod}
          onBillingPeriodChange={setBillingPeriod}
          freePriceLabel={freePriceLabel}
          proPriceLabel={proDisplayPriceLabel}
          proCtaLabel={proCtaLabel}
          annualSavingsLabel={annualSavingsLabel}
          proCheckoutHref={proCheckout.href}
          proCheckoutAvailable={proCheckout.isAvailable}
          onFreeAction={() =>
            openFreeSignup("funnel_pricing_free", freeCtaLabel)
          }
          onProAction={() =>
            trackPaidPricingClick("funnel_pricing_pro", proCtaLabel)
          }
          copy={copy.pricing}
        />
        <FAQSection copy={copy.faq} />
        <FinalCTASection
          primaryHref={finalPrimaryHref}
          secondaryHref={finalSecondaryHref}
          onPrimaryAction={() => {
            trackCtaClick({
              ctaText: finalPrimaryLabel,
              ctaLocation: "funnel_final_checker",
            });
            track("checker_link_clicked", {
              source: "funnel_final_cta",
              locale,
            });
          }}
          onSecondaryAction={() => {
            trackCtaClick({
              ctaText: copy.finalCta.secondaryCtaLabel ?? "Read the free guide",
              ctaLocation: "funnel_final_guide",
            });
            track("seo_guide_link_clicked", {
              destination: finalSecondaryHref,
              source: "funnel_final_cta",
              locale,
            });
          }}
          primaryCtaLabel={finalPrimaryLabel}
          copy={copy.finalCta}
        />
      </main>
      <SignupModal
        open={signupOpen}
        onOpenChange={setSignupOpen}
        source={signupSource}
      />
    </div>
  );
}
