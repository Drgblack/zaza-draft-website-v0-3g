"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

export function AboutSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const links = [
    { href: "/about/company", label: t("about.nav.company"), disabled: false },
    { href: "/about/founder", label: t("about.nav.founder"), disabled: false },
    { href: "/about/careers", label: t("about.nav.careers"), disabled: true },
    { href: "/about/press", label: t("about.nav.press"), disabled: false },
  ]

  return (
    <nav className="sticky top-24 space-y-1">
      <h3 className="mb-4 text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">{t("about.nav.title")}</h3>
      {links.map((link) => {
        const isActive = pathname === link.href
        return link.disabled ? (
          <div
            key={link.href}
            className="block px-4 py-2 text-sm text-[#6B7280] opacity-50 cursor-not-allowed rounded-lg"
            aria-disabled="true"
          >
            {link.label}
          </div>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-4 py-2 text-sm rounded-lg transition-colors",
              "hover:bg-[#1F2937] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]",
              isActive
                ? "bg-[#7C3AED]/10 text-[#A78BFA] font-medium border-l-2 border-[#7C3AED]"
                : "text-[#D1D5DB] hover:text-[#F9FAFB]",
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

