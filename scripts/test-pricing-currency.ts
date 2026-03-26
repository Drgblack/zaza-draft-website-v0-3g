import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import {
  buildStripeCheckoutPath,
  getAnnualSavingsAmount,
  getLocalizedDepartmentAmount,
  getLocalizedPlanAmount,
  getStripePriceId,
  hasStripePriceId,
  resolveSelfServeCheckout,
} from "@/config/pricing";
import { GET as startStripeCheckout } from "@/app/api/stripe/checkout/route";
import {
  clearPreferredCurrency,
  formatLocalizedPrice,
  formatPriceWithInterval,
  getPreferredCurrency,
  persistPreferredCurrency,
  PRICING_CURRENCY_STORAGE_KEY,
  resolveCurrencyFromLocales,
} from "@/lib/pricing-currency";

class MemoryStorage {
  private data = new Map<string, string>();

  getItem(key: string) {
    return this.data.has(key) ? this.data.get(key)! : null;
  }

  setItem(key: string, value: string) {
    this.data.set(key, value);
  }

  removeItem(key: string) {
    this.data.delete(key);
  }
}

const storage = new MemoryStorage();

async function main() {
  assert.equal(resolveCurrencyFromLocales(["en-US"]), "USD");
  assert.equal(resolveCurrencyFromLocales(["es-US", "en-GB"]), "USD");
  assert.equal(resolveCurrencyFromLocales(["de-DE"]), "EUR");
  assert.equal(resolveCurrencyFromLocales(["fr-FR"]), "EUR");
  assert.equal(resolveCurrencyFromLocales([]), "EUR");

  persistPreferredCurrency("USD", storage);
  assert.equal(storage.getItem(PRICING_CURRENCY_STORAGE_KEY), "USD");
  assert.equal(getPreferredCurrency({ storage, locales: ["de-DE"] }), "USD");

  clearPreferredCurrency(storage);
  assert.equal(storage.getItem(PRICING_CURRENCY_STORAGE_KEY), null);
  assert.equal(getPreferredCurrency({ storage, locales: ["de-DE"] }), "EUR");

  assert.equal(formatLocalizedPrice(0, "EUR"), "€0");
  assert.equal(formatLocalizedPrice(14.99, "EUR"), "€14.99");
  assert.equal(formatLocalizedPrice(16.99, "USD"), "$16.99");
  assert.equal(
    formatPriceWithInterval(14.99, "EUR", "monthly", "long"),
    "€14.99/month",
  );
  assert.equal(formatPriceWithInterval(169.99, "USD", "annual"), "$169.99/yr");
  assert.equal(getLocalizedPlanAmount("draft", "monthly", "EUR"), 14.99);
  assert.equal(getLocalizedPlanAmount("draft", "monthly", "USD"), 16.99);
  assert.equal(getLocalizedPlanAmount("draft", "annual", "USD"), 169.99);
  assert.equal(getLocalizedDepartmentAmount("USD"), 9);
  assert.ok(Math.abs(getAnnualSavingsAmount("draft", "EUR") - 30.88) < 0.001);
  assert.ok(Math.abs(getAnnualSavingsAmount("draft", "USD") - 33.89) < 0.001);
  assert.equal(hasStripePriceId("draft", "monthly", "EUR"), true);
  assert.equal(hasStripePriceId("draft", "monthly", "USD"), true);
  assert.equal(hasStripePriceId("draft", "annual", "USD"), true);
  assert.equal(hasStripePriceId("bundle", "annual", "USD"), false);

  assert.equal(
    buildStripeCheckoutPath({
      plan: "draft",
      interval: "monthly",
      currency: "USD",
      returnPath: "/pricing",
    }),
    "/api/stripe/checkout?plan=draft&interval=monthly&currency=USD&returnPath=%2Fpricing",
  );

  assert.equal(
    getStripePriceId("draft", "monthly", "EUR"),
    "price_1TA6ouHXkbT25qrKoapecaPz",
  );
  assert.equal(
    getStripePriceId("draft", "monthly", "USD"),
    "price_1TF10HHXkbT25qrKnyPPQPPu",
  );
  assert.equal(
    getStripePriceId("draft", "annual", "USD"),
    "price_1TF1SgHXkbT25qrKIhDmrJLo",
  );
  assert.deepEqual(
    resolveSelfServeCheckout({
      plan: "draft",
      interval: "annual",
      currency: "USD",
      returnPath: "/pricing",
    }),
    {
      href: "/api/stripe/checkout?plan=draft&interval=annual&currency=USD&returnPath=%2Fpricing",
      priceId: "price_1TF1SgHXkbT25qrKIhDmrJLo",
      isAvailable: true,
      displayAmount: 169.99,
    },
  );

  const invalidCurrencyResponse = await startStripeCheckout(
    new NextRequest(
      "http://localhost:3000/api/stripe/checkout?plan=draft&interval=monthly&currency=GBP&returnPath=%2Fpricing",
    ),
  );
  assert.equal(invalidCurrencyResponse.status, 400);

  const invalidIntervalResponse = await startStripeCheckout(
    new NextRequest(
      "http://localhost:3000/api/stripe/checkout?plan=draft&interval=weekly&currency=EUR&returnPath=%2Fpricing",
    ),
  );
  assert.equal(invalidIntervalResponse.status, 400);

  const unavailableUsdResponse = await startStripeCheckout(
    new NextRequest(
      "http://localhost:3000/api/stripe/checkout?plan=bundle&interval=annual&currency=USD&returnPath=%2Fpricing",
    ),
  );
  assert.equal(unavailableUsdResponse.status, 400);

  console.log("pricing currency tests passed");
}

void main();
