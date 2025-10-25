"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";

type Lang = "en" | "de";

export default function AILiteracyClient({ serverLang }: { serverLang?: Lang }) {
  const { language: ctxLang } = useLanguage();
  const language = serverLang ?? ctxLang;

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold">AI Literacy</h1>
      <p className="mt-4">
        Temporary placeholder component while we repair the full page content.
        Current language: <strong>{language}</strong>
      </p>
    </div>
  );
}
