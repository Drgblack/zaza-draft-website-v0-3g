"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface InlineCTAProps {
  title: string
  description: string
  primaryCTA: {
    text: string
    href: string
    onClick?: () => void
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: "default" | "gradient" | "minimal"
}

export function InlineCTA({ title, description, primaryCTA, secondaryCTA, variant = "default" }: InlineCTAProps) {
  const variantStyles = {
    default: "bg-[#1E293B] border-white/10",
    gradient: "bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 border-[#8B5CF6]/30",
    minimal: "bg-transparent border-white/5",
  }

  return (
    <div className={`rounded-2xl border p-8 md:p-12 ${variantStyles[variant]}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
        <p className="text-xl text-gray-300 mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild={!primaryCTA.onClick}
            size="lg"
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6"
            onClick={primaryCTA.onClick}
          >
            {primaryCTA.onClick ? (
              <span>
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            ) : (
              <Link href={primaryCTA.href}>
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            )}
          </Button>
          {secondaryCTA && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

