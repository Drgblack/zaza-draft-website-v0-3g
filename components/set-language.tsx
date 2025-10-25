"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

export function SetLanguage({ lang }: { lang: "en" | "de" | "es" | "fr" | "it" }) {
  const { language, setLanguage } = useLanguage()
  useEffect(() => {
    if (language !== lang) setLanguage(lang)
  }, [lang, language, setLanguage])
  return null
}

