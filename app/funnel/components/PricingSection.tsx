import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { type PricingCurrency, type SelfServeInterval } from "@/config/pricing";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import { CurrencyToggle } from "@/components/pricing/currency-toggle";
import type { FunnelCopy } from "../content";

type PricingSectionProps = {
  currency: PricingCurrency;
  onCurrencyChange: (currency: PricingCurrency) => void;
  billingPeriod: SelfServeInterval;
  onBillingPeriodChange: (interval: SelfServeInterval) => void;
  freePriceLabel: string;
  proPriceLabel: string;
  proCtaLabel: string;
  annualSavingsLabel: string;
  proCheckoutHref: string;
  proCheckoutAvailable: boolean;
  onFreeAction: () => void;
  onProAction: () => void;
  copy: FunnelCopy["pricing"];
};

const PricingSection = ({
  currency,
  onCurrencyChange,
  billingPeriod,
  onBillingPeriodChange,
  freePriceLabel,
  proPriceLabel,
  proCtaLabel,
  annualSavingsLabel,
  proCheckoutHref,
  proCheckoutAvailable,
  onFreeAction,
  onProAction,
  copy,
}: PricingSectionProps) => {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-br from-zaza-50/45 to-white/45 px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            {copy.heading}
            <span className="text-gradient"> {copy.headingAccent}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-calm-600">
            {copy.subheading(proPriceLabel)}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-500">
                {copy.currencyLabel}
              </span>
              <CurrencyToggle currency={currency} onChange={onCurrencyChange} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-500">
                {copy.billingLabel}
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/80 p-1.5 shadow-sm backdrop-blur">
                <button
                  type="button"
                  onClick={() => onBillingPeriodChange("monthly")}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                    billingPeriod === "monthly"
                      ? "bg-calm-800 text-white shadow-sm"
                      : "bg-transparent text-calm-500 hover:text-calm-700"
                  }`}
                >
                  {copy.monthlyLabel}
                </button>
                <button
                  type="button"
                  onClick={() => onBillingPeriodChange("annual")}
                  className={`relative rounded-lg border px-5 py-2 text-sm font-semibold transition-all ${
                    billingPeriod === "annual"
                      ? "border-zaza-500 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white shadow-lg shadow-fuchsia-200/70"
                      : "border-zaza-200 bg-zaza-50 text-zaza-700 hover:border-zaza-300 hover:text-zaza-800"
                  }`}
                >
                  {copy.annualLabel}
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      billingPeriod === "annual"
                        ? "border-white/40 bg-white/20 text-white"
                        : "border-zaza-200 bg-white text-zaza-600"
                    }`}
                  >
                    {copy.annualRecommendedLabel}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-calm-500">
            {copy.supportLine(currency)}
          </p>
          {billingPeriod === "annual" ? (
            <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-zaza-600">
              {annualSavingsLabel}
            </p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Card className="glass rounded-[1.75rem] p-8 relative">
            <CardContent className="pt-0">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-calm-800">
                  {copy.freeTitle}
                </h3>
                <div className="mb-2 text-4xl font-bold text-calm-800">
                  {freePriceLabel}
                </div>
                <p className="text-calm-600">{copy.freeDescription}</p>
              </div>

              <ul className="mb-8 space-y-4">
                {copy.freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-zaza-500" />
                    <span className="text-calm-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                onClick={onFreeAction}
                className="btn-secondary h-auto w-full rounded-2xl px-6 py-4 text-base font-semibold"
              >
                {copy.freeCtaLabel}
              </Button>
              <p className="mt-3 text-center text-xs text-calm-500">
                {copy.freeNote}
              </p>
            </CardContent>
          </Card>

          <Card
            className={`glass-strong relative rounded-[1.75rem] border-2 p-8 shadow-xl transition-all ${
              billingPeriod === "annual"
                ? "border-zaza-400/60 shadow-[0_24px_60px_rgba(168,85,247,0.18)]"
                : "border-zaza-300/45"
            }`}
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg">
              {copy.mostPopularBadge}
            </div>
            <CardContent className="pt-0">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-calm-800">
                  {copy.proTitle}
                </h3>
                <div className="mb-2 text-4xl font-bold text-calm-800">
                  {proPriceLabel}
                </div>
                {billingPeriod === "annual" ? (
                  <p className="mb-3 text-sm font-medium text-calm-600">
                    {copy.annualAnchor}
                  </p>
                ) : null}
                <p className="text-calm-600">{copy.proDescription}</p>
              </div>

              <ul className="mb-8 space-y-4">
                {copy.proFeatures.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-zaza-500" />
                    <span className="text-calm-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                disabled={!proCheckoutAvailable}
                onClick={() => {
                  if (!proCheckoutAvailable) {
                    return;
                  }

                  onProAction();
                  window.location.assign(proCheckoutHref);
                }}
                className="btn-primary h-auto w-full rounded-2xl px-6 py-4 text-base font-semibold"
              >
                {proCtaLabel}
              </Button>
              <p className="mt-3 text-center text-xs text-calm-500">
                {proCheckoutAvailable ? copy.proNote : copy.unavailableNote}
              </p>
              {billingPeriod === "annual" ? (
                <p className="mt-2 text-center text-xs font-semibold text-zaza-600">
                  {annualSavingsLabel}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="glass-strong mx-auto max-w-3xl rounded-[2rem] p-10">
            <CardContent className="pt-0">
              <h3 className="mb-4 text-xl font-semibold text-calm-800">
                {copy.whyTitle}
              </h3>
              <div className="grid gap-6 text-center md:grid-cols-3">
                {copy.whyItems.map((item) => (
                  <div key={item.title}>
                    <div className="mb-2 text-2xl font-bold text-zaza-600">
                      {item.title}
                    </div>
                    <p className="text-sm text-calm-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
