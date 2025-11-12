"use client";
import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n/language-context";

export default function LangProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
