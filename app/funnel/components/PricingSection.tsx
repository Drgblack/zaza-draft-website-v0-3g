import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { type PricingCurrency } from "@/config/pricing";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import { CurrencyToggle } from "@/components/pricing/currency-toggle";

type PricingSectionProps = {
  currency: PricingCurrency;
  onCurrencyChange: (currency: PricingCurrency) => void;
  proMonthlyPrice: string;
  proCheckoutHref: string;
  proCheckoutAvailable: boolean;
  onFreeAction: () => void;
  onProAction: () => void;
};

const PricingSection = ({
  currency,
  onCurrencyChange,
  proMonthlyPrice,
  proCheckoutHref,
  proCheckoutAvailable,
  onFreeAction,
  onProAction,
}: PricingSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-zaza-50/45 to-white/45 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-calm-800 md:text-4xl">
            Start free now.
            <span className="text-gradient">
              {" "}
              Upgrade only when you need more.
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-calm-600">
            Get 5 drafts a month for free, then move to Zaza Draft Pro for
            unlimited writing support at {proMonthlyPrice}.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-500">
              Currency
            </span>
            <CurrencyToggle currency={currency} onChange={onCurrencyChange} />
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-calm-500">
            Prices are currently shown in {currency}. Taxes may be calculated at
            checkout. Free starts with no credit card.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Card className="glass rounded-[1.75rem] p-8 relative">
            <CardContent className="pt-0">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-calm-800">
                  Free Forever
                </h3>
                <div className="mb-2 text-4xl font-bold text-calm-800">
                  {formatLocalizedPrice(0, currency)}
                </div>
                <p className="text-calm-600">
                  5 drafts every month. No card required.
                </p>
              </div>

              <ul className="mb-8 space-y-4">
                {[
                  "5 drafts per month",
                  "All subjects supported",
                  "Fully editable comments",
                  "Works on any device",
                ].map((feature) => (
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
                Start Free - 5 Drafts/Month
              </Button>
              <p className="mt-3 text-center text-xs text-calm-500">
                Opens the free signup form. No credit card required.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-strong relative rounded-[1.75rem] border-2 border-zaza-300/45 p-8 shadow-xl">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg">
              Most popular
            </div>
            <CardContent className="pt-0">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-calm-800">Pro</h3>
                <div className="mb-2 text-4xl font-bold text-calm-800">
                  {proMonthlyPrice}
                  <span className="text-lg font-normal text-calm-600">
                    /month
                  </span>
                </div>
                <p className="text-calm-600">
                  Unlimited drafts for individual teachers
                </p>
              </div>

              <ul className="mb-8 space-y-4">
                {[
                  "Unlimited drafts",
                  "Priority support",
                  "Advanced personalization",
                  "Parent communication templates",
                  "IEP and 504 adaptations",
                ].map((feature) => (
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
                {proCheckoutAvailable
                  ? `Upgrade to Pro - ${proMonthlyPrice}`
                  : "USD checkout is not live yet"}
              </Button>
              <p className="mt-3 text-center text-xs text-calm-500">
                {proCheckoutAvailable
                  ? `Secure Stripe checkout. ${proMonthlyPrice}. Cancel anytime. Taxes may be calculated at checkout.`
                  : "USD prices are shown while USD checkout is being finalized. Switch to EUR to subscribe today."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="glass-strong mx-auto max-w-3xl rounded-[2rem] p-10">
            <CardContent className="pt-0">
              <h3 className="mb-4 text-xl font-semibold text-calm-800">
                Why teachers choose Zaza Draft:
              </h3>
              <div className="grid gap-6 text-center md:grid-cols-3">
                <div>
                  <div className="mb-2 text-2xl font-bold text-zaza-600">
                    Seconds
                  </div>
                  <p className="text-sm text-calm-600">Per comment generated</p>
                </div>
                <div>
                  <div className="mb-2 text-2xl font-bold text-zaza-600">
                    Your voice
                  </div>
                  <p className="text-sm text-calm-600">Not a robot's</p>
                </div>
                <div>
                  <div className="mb-2 text-2xl font-bold text-zaza-600">
                    Always editable
                  </div>
                  <p className="text-sm text-calm-600">You stay in control</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
