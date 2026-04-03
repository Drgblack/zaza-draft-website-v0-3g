"use client";

import {
  resolveSelfServeCheckout,
  type SelfServeInterval,
} from "@/config/pricing";
import { Button } from "@/components/ui/button";
import { track, trackCtaClick } from "@/lib/analytics";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import FAQSection from "../funnel/components/FAQSection";
import HeroSection from "../funnel/components/HeroSection";
import HowItWorksSection from "../funnel/components/HowItWorksSection";
import PainSection from "../funnel/components/PainSection";
import SolutionSection from "../funnel/components/SolutionSection";
import FoundingOfferSection from "./FoundingOfferSection";
import TikTokSocialProofSection from "./TikTokSocialProofSection";
import type { FoundingFunnelCopy } from "./content";

type FoundingTeachersFunnelProps = {
  copy: FoundingFunnelCopy;
  locale?: "en" | "de";
};

export default function FoundingTeachersFunnel({
  copy,
  locale = "en",
}: FoundingTeachersFunnelProps) {
  const isGerman = locale === "de";
  const foundingReturnPath = isGerman ? "/de/founding" : "/founding";
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
      locale: isGerman ? "de-DE" : "en-IE",
    },
  )}/${isGerman ? "Jahr" : "year"}`;
  const monthlyPriceLabel = `${formatLocalizedPrice(
    monthlyCheckout.displayAmount,
    "EUR",
    {
      locale: isGerman ? "de-DE" : "en-IE",
    },
  )}/${isGerman ? "Monat" : "month"}`;

  const scrollToOffer = (ctaText: string, ctaLocation: string) => {
    trackCtaClick({
      ctaText,
      ctaLocation,
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
          onPrimaryAction={() =>
            scrollToOffer(copy.heroCtaLabel, "founding_hero")
          }
          primaryCtaLabel={copy.heroCtaLabel}
          copy={copy.hero}
        />
        <PainSection copy={copy.pain} />
        <TikTokSocialProofSection copy={copy.socialProof} />
        <SolutionSection copy={copy.solution} />
        <HowItWorksSection copy={copy.howItWorks} />
        <section className="px-4 pb-8">
          <div className="mx-auto max-w-3xl">
            <div className="glass-strong rounded-[2rem] px-8 py-10 text-center">
              <h2 className="mb-4 text-2xl font-bold text-calm-800 md:text-3xl">
                {copy.midpageCta.heading}
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-lg text-calm-600">
                {copy.midpageCta.body}
              </p>
              <Button
                type="button"
                onClick={() =>
                  scrollToOffer(copy.midpageCta.buttonLabel, "founding_midpage")
                }
                className="btn-primary h-auto rounded-2xl px-8 py-4 text-base font-semibold"
              >
                {copy.midpageCta.buttonLabel}
              </Button>
            </div>
          </div>
        </section>
        <FAQSection copy={copy.faq} />
        <FoundingOfferSection
          annualPriceLabel={annualPriceLabel}
          monthlyPriceLabel={monthlyPriceLabel}
          annualCheckout={annualCheckout}
          monthlyCheckout={monthlyCheckout}
          onCheckoutAction={trackFoundingCheckoutStart}
          copy={copy.offer}
        />
      </main>
    </div>
  );
}
