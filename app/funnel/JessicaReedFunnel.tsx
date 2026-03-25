"use client";

import { useState } from "react";
import { SignupModal } from "@/components/signup-modal";
import { trackCtaClick } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/language-context";
import { buildStripeCheckoutPath } from "@/config/pricing";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";

export default function JessicaReedFunnel() {
  const { language } = useLanguage();
  const [signupOpen, setSignupOpen] = useState(false);
  const checkoutReturnPath = language === "de" ? "/de/pricing" : "/pricing";
  const proCheckoutHref = buildStripeCheckoutPath({
    plan: "draft",
    interval: "monthly",
    currency: "EUR",
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
              "Upgrade to Pro - €14.99/month",
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
