"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw, LifeBuoy } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-[#0B1220] text-[#E2E8F0] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 left-10 h-56 w-56 rounded-full bg-[#7C3AED]/15 blur-3xl" />
        <div className="absolute bottom-4 right-8 h-56 w-56 rounded-full bg-[#0EA5E9]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl items-center px-6 pt-24 pb-16 sm:pt-28">
        <div className="w-full space-y-6 rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm shadow-2xl">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-[#C7D2FE]">
            {t("error.title")}
          </div>
          <h1 className="text-3xl font-bold text-white">{t("error.title")}</h1>
          <p className="text-lg text-[#CBD5E1] max-w-2xl">{t("error.subtitle")}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={reset}
              className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white px-5 py-2.5"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {t("error.home")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full text-[#C7D2FE] hover:bg-white/10"
            >
              <Link href="/contact">
                <LifeBuoy className="mr-2 h-4 w-4" />
                {t("error.contact")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
