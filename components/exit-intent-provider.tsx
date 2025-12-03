"use client"

import { usePathname } from "next/navigation"
import { ExitIntentPopup } from "./exit-intent-popup"

export function ExitIntentProvider() {
  const pathname = usePathname()

  // Determine page type based on pathname
  const getPageType = () => {
    if (pathname === "/") return "home"
    if (pathname === "/pricing") return "pricing"
    if (pathname?.startsWith("/blog")) return "blog"
    if (pathname?.startsWith("/compare")) return "comparison"
    return "default"
  }

  // Don't show on certain pages
  const shouldShowPopup = () => {
    // Don't show on contact, signup, or other conversion pages
    const excludedPaths = ["/contact", "/signup", "/thank-you", "/dashboard"]
    return !excludedPaths.some((path) => pathname?.startsWith(path))
  }

  if (!shouldShowPopup()) {
    return null
  }

  return <ExitIntentPopup pageType={getPageType()} />
}

