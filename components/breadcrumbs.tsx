"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useLanguage()

  return (
    <nav className="flex items-center space-x-2 text-sm mb-8" aria-label="Breadcrumb">
      <Link href="/" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
        {t("nav.home")}
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-[#6B7280]" />
          {item.href ? (
            <Link href={item.href} className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#F9FAFB]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

