"use client";

import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  SelfServeCheckoutState,
  SelfServeInterval,
} from "@/config/pricing";
import type { FoundingFunnelCopy } from "./content";

type FoundingOfferSectionProps = {
  annualPriceLabel: string;
  monthlyPriceLabel: string;
  annualCheckout: SelfServeCheckoutState;
  monthlyCheckout: SelfServeCheckoutState;
  onCheckoutAction: (interval: SelfServeInterval, ctaText: string) => void;
  copy: FoundingFunnelCopy["offer"];
};

const FoundingOfferSection = ({
  annualPriceLabel,
  monthlyPriceLabel,
  annualCheckout,
  monthlyCheckout,
  onCheckoutAction,
  copy,
}: FoundingOfferSectionProps) => {
  const cardConfig = {
    annual: {
      ...copy.cards[0],
      priceLabel: annualPriceLabel,
      checkout: annualCheckout,
      ctaLabel: `Founding Annual - ${annualPriceLabel}`,
    },
    monthly: {
      ...copy.cards[1],
      priceLabel: monthlyPriceLabel,
      checkout: monthlyCheckout,
      ctaLabel: `Founding Monthly - ${monthlyPriceLabel}`,
    },
  } as const;

  const hasUnavailableCheckout =
    !annualCheckout.isAvailable || !monthlyCheckout.isAvailable;

  return (
    <section
      id="founding-offer"
      className="relative overflow-hidden bg-gradient-to-br from-pink-50/90 to-violet-50/80 px-4 py-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-16 top-16 h-72 w-72 rounded-full bg-gradient-to-br from-pink-200/25 to-pink-300/10 blur-3xl" />
        <div className="absolute bottom-16 left-16 h-80 w-80 rounded-full bg-gradient-to-tr from-violet-200/20 to-fuchsia-200/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-[#c026d3]">
            {copy.eyebrow}
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-calm-800 md:text-5xl">
            {copy.heading}
          </h2>
          <p className="mx-auto mb-5 max-w-2xl text-xl text-calm-600">
            {copy.subheading}
          </p>
          <div className="glass-strong rounded-[1.5rem] border border-white/60 px-6 py-5 text-sm font-medium text-calm-700">
            {copy.lockedPricingNote}
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {(Object.keys(cardConfig) as SelfServeInterval[]).map((interval) => {
            const card = cardConfig[interval];
            const isPrimary = interval === "annual";

            return (
              <Card
                key={interval}
                className={`relative rounded-[1.9rem] p-8 ${
                  isPrimary
                    ? "glass-strong border-2 border-zaza-400/60 shadow-[0_24px_60px_rgba(168,85,247,0.18)]"
                    : "glass border border-white/65"
                }`}
              >
                {card.badge ? (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg">
                    {card.badge}
                  </div>
                ) : null}

                <CardContent className="pt-0">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-calm-800">
                      {card.title}
                    </h3>
                    <div className="mb-3 text-4xl font-bold text-calm-800">
                      {card.priceLabel}
                    </div>
                    <p className="text-calm-600">{card.description}</p>
                  </div>

                  <ul className="mb-8 space-y-4">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-zaza-500" />
                        <span className="text-calm-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    type="button"
                    variant={isPrimary ? "default" : "outline"}
                    disabled={!card.checkout.isAvailable}
                    onClick={() => {
                      if (!card.checkout.isAvailable) {
                        return;
                      }

                      onCheckoutAction(interval, card.ctaLabel);
                      window.location.assign(card.checkout.href);
                    }}
                    className={`h-auto w-full rounded-2xl px-6 py-4 text-base font-semibold ${
                      isPrimary
                        ? "btn-primary"
                        : "border border-zaza-200 bg-white text-calm-700 shadow-sm hover:border-zaza-300 hover:bg-zaza-50"
                    }`}
                  >
                    {card.ctaLabel}
                  </Button>

                  <p className="mt-3 text-center text-xs text-calm-500">
                    {card.note}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-4xl text-center">
          <p className="text-base text-calm-600">{copy.reassurance}</p>
          {hasUnavailableCheckout ? (
            <p className="mt-3 text-sm font-medium text-calm-500">
              {copy.unavailableNote}
            </p>
          ) : null}
        </div>

        <div className="mt-16 pt-8">
          <div className="funnel-section-divider mx-auto mb-8 max-w-2xl" />
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-calm-500 sm:flex-row sm:gap-6">
            {copy.supportItems.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundingOfferSection;
