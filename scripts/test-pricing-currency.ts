import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import {
  buildStripeCheckoutPath,
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
  assert.equal(getLocalizedDepartmentAmount("USD"), 9);
  assert.equal(hasStripePriceId("draft", "monthly", "EUR"), true);
  assert.equal(hasStripePriceId("draft", "monthly", "USD"), false);
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
  assert.equal(getStripePriceId("draft", "monthly", "USD"), null);
  assert.deepEqual(
    resolveSelfServeCheckout({
      plan: "draft",
      interval: "monthly",
      currency: "USD",
      returnPath: "/pricing",
    }),
    {
      href: "/api/stripe/checkout?plan=draft&interval=monthly&currency=USD&returnPath=%2Fpricing",
      priceId: null,
      isAvailable: false,
      displayAmount: 16.99,
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
      "http://localhost:3000/api/stripe/checkout?plan=draft&interval=monthly&currency=USD&returnPath=%2Fpricing",
    ),
  );
  assert.equal(unavailableUsdResponse.status, 400);

  console.log("pricing currency tests passed");
}

void main();
