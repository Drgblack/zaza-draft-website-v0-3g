"use client";

import { Globe } from "lucide-react";
import { type PricingCurrency, SUPPORTED_CURRENCIES } from "@/config/pricing";
import { cn } from "@/lib/utils";

type CurrencyToggleProps = {
  currency: PricingCurrency;
  onChange: (currency: PricingCurrency) => void;
  className?: string;
};

export function CurrencyToggle({
  currency,
  onChange,
  className,
}: CurrencyToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm",
        className,
      )}
    >
      <Globe className="ml-2 h-4 w-4 text-[#94A3B8]" />
      {SUPPORTED_CURRENCIES.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.14em] transition-all",
            currency === option
              ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25"
              : "text-[#94A3B8] hover:text-white",
          )}
          aria-pressed={currency === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
