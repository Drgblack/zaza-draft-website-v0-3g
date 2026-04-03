import type { Metadata } from "next";
import { SetLanguage } from "@/components/set-language";
import { buildCanonicalAlternates } from "@/lib/seo-canonical";
import { siteConfig } from "@/lib/seo/site-config";
import FoundingTeachersFunnel from "./FoundingTeachersFunnel";
import { foundingFunnelCopy } from "./content";

export const metadata: Metadata = {
  title: "Founding Teachers | Zaza Draft",
  description:
    "Join the first teachers shaping Zaza Draft. Early access for calmer, safer school communication with founding pricing locked for life while your subscription stays active.",
  alternates: {
    ...buildCanonicalAlternates("/founding"),
    languages: {
      en: `${siteConfig.url}/founding`,
      de: `${siteConfig.url}/de/founding`,
    },
  },
};

export default function FoundingPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <FoundingTeachersFunnel copy={foundingFunnelCopy} />
    </>
  );
}
