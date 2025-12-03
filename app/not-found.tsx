"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, BookOpen } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text">404</h1>
        </div>
        <h2 className="text-3xl font-bold text-[#F9FAFB] mb-4">{t("404.title")}</h2>
        <p className="text-lg text-[#9CA3AF] mb-8 max-w-md mx-auto">{t("404.subtitle")}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild className="gradient-primary text-white">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t("404.home")}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#1F2937] bg-transparent text-[#F9FAFB] hover:bg-[#1F2937]"
          >
            <Link href="/blog">
              <BookOpen className="mr-2 h-4 w-4" />
              {t("404.blog")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

