"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PricingCardProps {
  title: string
  priceMonthly: string | number
  priceYearly: string | number
  priceNote?: string
  features: string[]
  cta: {
    text: string
    href?: string
    onClick?: () => void
  }
  badge?: string
  footnote?: string
  isYearly: boolean
  popular?: boolean
}

export function PricingCard({
  title,
  priceMonthly,
  priceYearly,
  priceNote,
  features,
  cta,
  badge,
  footnote,
  isYearly,
  popular,
}: PricingCardProps) {
  const displayPrice = isYearly ? priceYearly : priceMonthly
  const formattedPrice = typeof displayPrice === "number" ? `$${displayPrice}` : displayPrice

  return (
    <Card
      className={`bg-[#111827] p-8 flex flex-col h-full ${
        popular ? "border-[#7C3AED] ring-2 ring-[#7C3AED]/20" : "border-[#1F2937]"
      }`}
    >
      {badge && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">{title}</h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-bold text-[#F9FAFB]">{formattedPrice}</span>
          {priceNote && <span className="text-[#9CA3AF]">{priceNote}</span>}
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-[#D1D5DB]">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={cta.onClick}
        asChild={!!cta.href && !cta.onClick}
        className={
          popular
            ? "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg shadow-purple-500/25"
            : "w-full border-[#1F2937] bg-transparent text-[#F9FAFB] hover:bg-[#1F2937]"
        }
        variant={popular ? "default" : "outline"}
      >
        {cta.href && !cta.onClick ? <a href={cta.href}>{cta.text}</a> : cta.text}
      </Button>

      {footnote && <p className="text-xs text-[#6B7280] mt-3 text-center">{footnote}</p>}
    </Card>
  )
}
