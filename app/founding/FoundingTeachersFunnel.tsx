"use client";

import {
  resolveSelfServeCheckout,
  type SelfServeInterval,
} from "@/config/pricing";
import { track, trackCtaClick } from "@/lib/analytics";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import FAQSection from "../funnel/components/FAQSection";
import HeroSection from "../funnel/components/HeroSection";
import HowItWorksSection from "../funnel/components/HowItWorksSection";
import PainSection from "../funnel/components/PainSection";
import SolutionSection from "../funnel/components/SolutionSection";
import { foundingFunnelCopy } from "./content";
import FoundingOfferSection from "./FoundingOfferSection";

const foundingReturnPath = "/founding";
const annualCheckout = resolveSelfServeCheckout({
  plan: "founding",
  interval: "annual",
  currency: "EUR",
  returnPath: foundingReturnPath,
});
const monthlyCheckout = resolveSelfServeCheckout({
  plan: "founding",
  interval: "monthly",
  currency: "EUR",
  returnPath: foundingReturnPath,
});

const annualPriceLabel = `${formatLocalizedPrice(
  annualCheckout.displayAmount,
  "EUR",
  {
    locale: "en-IE",
  },
)}/year`;
const monthlyPriceLabel = `${formatLocalizedPrice(
  monthlyCheckout.displayAmount,
  "EUR",
  {
    locale: "en-IE",
  },
)}/month`;

export default function FoundingTeachersFunnel() {
  const scrollToOffer = () => {
    trackCtaClick({
      ctaText: foundingFunnelCopy.heroCtaLabel,
      ctaLocation: "founding_hero",
    });

    document
      .getElementById("founding-offer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const trackFoundingCheckoutStart = (
    interval: SelfServeInterval,
    ctaText: string,
  ) => {
    const checkout = interval === "annual" ? annualCheckout : monthlyCheckout;

    trackCtaClick({
      ctaText,
      ctaLocation: `founding_offer_${interval}`,
    });
    track(
      interval === "annual"
        ? "founding_annual_cta_clicked"
        : "founding_monthly_cta_clicked",
      {
        billing_cycle: interval,
        stripe_price_id: checkout.priceId ?? undefined,
        destination: checkout.href,
      },
    );
    track("founding_checkout_started", {
      billing_cycle: interval,
      stripe_price_id: checkout.priceId ?? undefined,
      destination: checkout.href,
    });
  };

  return (
    <div className="funnel-theme">
      <main className="funnel-main">
        <HeroSection
          onPrimaryAction={scrollToOffer}
          primaryCtaLabel={foundingFunnelCopy.heroCtaLabel}
          copy={foundingFunnelCopy.hero}
        />
        <PainSection copy={foundingFunnelCopy.pain} />
        <SolutionSection copy={foundingFunnelCopy.solution} />
        <HowItWorksSection copy={foundingFunnelCopy.howItWorks} />
        <FAQSection copy={foundingFunnelCopy.faq} />
        <FoundingOfferSection
          annualPriceLabel={annualPriceLabel}
          monthlyPriceLabel={monthlyPriceLabel}
          annualCheckout={annualCheckout}
          monthlyCheckout={monthlyCheckout}
          onCheckoutAction={trackFoundingCheckoutStart}
          copy={foundingFunnelCopy.offer}
        />
      </main>
    </div>
  );
}
