import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import JessicaReedFunnel from "../../funnel/JessicaReedFunnel";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Ruhigere Eltern-E-Mails und bessere Zeugnisbemerkungen starten | Zaza Draft",
  description:
    "Starten Sie mit dem Entwurf, der noch nicht richtig klingt. Zaza Draft hilft Lehrkraeften bei Ton, Professionalitaet und aussagekraeftigeren Berichtskommentaren vor dem Senden oder Einreichen.",
  path: "/de/start",
  alternates: {
    en: "https://zazadraft.com/start",
    de: "https://zazadraft.com/de/start",
  },
});

export default function GermanStartPage() {
  return (
    <Suspense fallback={null}>
      <JessicaReedFunnel locale="de" />
    </Suspense>
  );
}
