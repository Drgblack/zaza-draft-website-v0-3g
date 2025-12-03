"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

interface SetLanguageProps {
  lang: "en" | "de"
}

export function SetLanguage({ lang }: SetLanguageProps) {
  const { setLanguage } = useLanguage()

  useEffect(() => {
    setLanguage(lang)
  }, [lang, setLanguage])

  return null
}
