import type { Metadata } from "next";
import FoundingTeachersFunnel from "@/app/founding/FoundingTeachersFunnel";
import { foundingFunnelCopyDe } from "@/app/founding/content-de";
import { SetLanguage } from "@/components/set-language";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Gründungslehrkräfte | Zaza Draft",
  description:
    "Werde Teil der ersten Lehrkräfte, die Zaza Draft mitgestalten. Früher Zugang für ruhigere, professionellere Schulkommunikation mit gesichertem Gründungspreis, solange dein Abo aktiv bleibt.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteConfig.url}/de/founding`,
    languages: {
      "en-GB": `${siteConfig.url}/founding`,
      "de-DE": `${siteConfig.url}/de/founding`,
      "x-default": `${siteConfig.url}/founding`,
    },
  },
};

export default function FoundingDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <FoundingTeachersFunnel copy={foundingFunnelCopyDe} locale="de" />
    </>
  );
}
