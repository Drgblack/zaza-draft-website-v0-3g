"use client"

import { useLanguage } from "./language-context"
import translations from "@/locales"

// Infer language + namespace types from the translations object
type Language = keyof typeof translations
type Namespaces<L extends Language> = keyof (typeof translations)[L]
type NamespaceKey<L extends Language, N extends Namespaces<L>> =
  keyof (typeof translations)[L][N]

// Hook: returns a typed t() and the current language
export function useTranslations<
  L extends Language = "en",
  N extends Namespaces<L> = Namespaces<L>
>(ns: N) {
  const { language } = useLanguage()
  const lang = (language as Language) || "en"

  const t = (key: NamespaceKey<L, N> | string): string => {
    const langTranslations = translations[lang] as any
    const nsTranslations = langTranslations?.[ns as string] || {}
    return (nsTranslations as any)[key as string] || (key as string)
  }

  return { t, language: lang }
}
