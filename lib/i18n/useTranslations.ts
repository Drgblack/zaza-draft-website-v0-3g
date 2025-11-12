import { useLanguage } from "./language-context";
import enCommon from "@/locales/en/common";
import deCommon from "@/locales/de/common";
import enNav from "@/locales/en/nav";
import deNav from "@/locales/de/nav";
import enHero from "@/locales/en/hero";
import deHero from "@/locales/de/hero";
import enAiLiteracy from "@/locales/en/aiLiteracy";
import deAiLiteracy from "@/locales/de/aiLiteracy";
import enCommunity from "@/locales/en/community";
import deCommunity from "@/locales/de/community";
import enVideos from "@/locales/en/videos";
import deVideos from "@/locales/de/videos";
import enPricing from "@/locales/en/pricing";
import dePricing from "@/locales/de/pricing";
import enProducts from "@/locales/en/products";
import deProducts from "@/locales/de/products";
import enStats from "@/locales/en/stats";
import deStats from "@/locales/de/stats";
import enTestimonials from "@/locales/en/testimonials";
import deTestimonials from "@/locales/de/testimonials";

const translations = {
  en: {
    common: enCommon,
    nav: enNav,
    hero: enHero,
    aiLiteracy: enAiLiteracy,
    community: enCommunity,
    videos: enVideos,
    pricing: enPricing,
    products: enProducts,
    stats: enStats,
    testimonials: enTestimonials,
  },
  de: {
    common: deCommon,
    nav: deNav,
    hero: deHero,
    aiLiteracy: deAiLiteracy,
    community: deCommunity,
    videos: deVideos,
    pricing: dePricing,
    products: deProducts,
    stats: deStats,
    testimonials: deTestimonials,
  },
};

export function useTranslations(namespace: string = "common") {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const [ns, ...pathParts] = key.includes(".")
      ? key.split(".")
      : [namespace, key];
    const path = pathParts.join(".");

    const nsTranslations = translations[language]?.[ns] || {};
    const value = getNestedValue(nsTranslations, path);
    if (value) return value;

    const commonValue = getNestedValue(
      translations[language]?.common || {},
      path,
    );
    if (commonValue) return commonValue;

    return key;
  };

  return { t, language };
}

function getNestedValue(obj: any, path: string): string | undefined {
  if (!path) return obj;
  return path.split(".").reduce((current, key) => current?.[key], obj);
}
