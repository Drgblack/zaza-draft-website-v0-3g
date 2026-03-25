"use client";

import { useState } from "react";
import { SignupModal } from "@/components/signup-modal";
import { trackCtaClick } from "@/lib/analytics";
import {
  buildStripeCheckoutPath,
  getLocalizedPlanAmount,
} from "@/config/pricing";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
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
  const proMonthlyPrice = formatLocalizedPrice(
    getLocalizedPlanAmount("draft", "monthly", currency),
    currency,
  );
  const proCheckoutHref = buildStripeCheckoutPath({
    plan: "draft",
    interval: "monthly",
    currency,
    returnPath: checkoutReturnPath,
  });

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
          onPrimaryAction={() =>
            openFreeSignup(
              "funnel_hero",
              "Try Free - See How Fast It Writes for You",
            )
          }
        />
        <PainSection />
        <SolutionSection />
        <HowItWorksSection />
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          proMonthlyPrice={proMonthlyPrice}
          proCheckoutHref={proCheckoutHref}
          onFreeAction={() =>
            openFreeSignup(
              "funnel_pricing_free",
              "Start Free - 5 Drafts a Month",
            )
          }
          onProAction={() =>
            trackPaidPricingClick(
              "funnel_pricing_pro",
              `Upgrade to Pro - ${proMonthlyPrice}/month`,
            )
          }
        />
        <FAQSection />
        <FinalCTASection
          onPrimaryAction={() =>
            openFreeSignup(
              "funnel_final_cta",
              "Try Free - See How Fast It Writes for You",
            )
          }
        />
      </main>
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </div>
  );
}
