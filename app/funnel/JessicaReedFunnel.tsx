"use client";

import { useState } from "react";
import { SignupModal } from "@/components/signup-modal";
import { trackCtaClick } from "@/lib/analytics";
import { resolveSelfServeCheckout } from "@/config/pricing";
import { formatPriceWithInterval } from "@/lib/pricing-currency";
import { usePricingCurrency } from "@/hooks/use-pricing-currency";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";

export default function JessicaReedFunnel() {
  const [signupOpen, setSignupOpen] = useState(false);
  const { currency, setCurrency } = usePricingCurrency();
  const checkoutReturnPath = "/start";
  const freeCtaLabel = "Get Started Free";
  const proCheckout = resolveSelfServeCheckout({
    plan: "draft",
    interval: "monthly",
    currency,
    returnPath: checkoutReturnPath,
  });
  const proMonthlyPrice = formatPriceWithInterval(
    proCheckout.displayAmount,
    currency,
    "monthly",
    "long",
  );
  const proCtaLabel = `Start Pro – ${proMonthlyPrice}`;

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
        />
        <PainSection />
        <SolutionSection />
        <HowItWorksSection />
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          proMonthlyPrice={proMonthlyPrice}
          proCheckoutHref={proCheckout.href}
          proCheckoutAvailable={proCheckout.isAvailable}
          onFreeAction={() =>
            openFreeSignup("funnel_pricing_free", freeCtaLabel)
          }
          onProAction={() =>
            trackPaidPricingClick("funnel_pricing_pro", proCtaLabel)
          }
        />
        <FAQSection />
        <FinalCTASection
          onPrimaryAction={() =>
            openFreeSignup("funnel_final_cta", freeCtaLabel)
          }
          primaryCtaLabel={freeCtaLabel}
        />
      </main>
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </div>
  );
}
