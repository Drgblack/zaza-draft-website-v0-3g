"use client";

import { useState } from "react";
import { SignupModal } from "@/components/signup-modal";
import { trackCtaClick } from "@/lib/analytics";
import { resolveSelfServeCheckout } from "@/config/pricing";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import { usePricingCurrency } from "@/hooks/use-pricing-currency";
import { funnelCopy, type FunnelLocale } from "./content";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";

type JessicaReedFunnelProps = {
  locale?: FunnelLocale;
};

export default function JessicaReedFunnel({
  locale = "en",
}: JessicaReedFunnelProps) {
  const [signupOpen, setSignupOpen] = useState(false);
  const copy = funnelCopy[locale];
  const { currency, setCurrency } = usePricingCurrency({
    locales: locale === "de" ? ["de-DE"] : undefined,
  });
  const checkoutReturnPath = locale === "de" ? "/de/start" : "/start";
  const freeCtaLabel = copy.freeCtaLabel;
  const proCheckout = resolveSelfServeCheckout({
    plan: "draft",
    interval: "monthly",
    currency,
    returnPath: checkoutReturnPath,
  });
  const proMonthlyPrice = `${formatLocalizedPrice(proCheckout.displayAmount, currency)}/${
    locale === "de" ? "Monat" : "month"
  }`;
  const proCtaLabel = copy.proCtaLabel(proMonthlyPrice);

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
          onPrimaryAction={() => openFreeSignup("funnel_hero", freeCtaLabel)}
          primaryCtaLabel={freeCtaLabel}
          copy={copy.hero}
        />
        <PainSection copy={copy.pain} />
        <SolutionSection copy={copy.solution} />
        <HowItWorksSection copy={copy.howItWorks} />
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          proMonthlyPrice={proMonthlyPrice}
          proCtaLabel={proCtaLabel}
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
          onPrimaryAction={() =>
            openFreeSignup("funnel_final_cta", freeCtaLabel)
          }
          primaryCtaLabel={freeCtaLabel}
          copy={copy.finalCta}
        />
      </main>
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </div>
  );
}
