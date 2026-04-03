"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/language-context";

interface SetLanguageProps {
  lang: "en" | "de";
}

export function SetLanguage({ lang }: SetLanguageProps) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    setLanguage(lang);
  }, [lang, setLanguage]);

  return null;
}
