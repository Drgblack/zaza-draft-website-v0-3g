import aiLiteracyEn from "./en/aiLiteracy"
import commonEn from "./en/common"
import communityEn from "./en/community"
import heroEn from "./en/hero"
import navEn from "./en/nav"
import pricingEn from "./en/pricing"
import productsEn from "./en/products"
import statsEn from "./en/stats"
import testimonialsEn from "./en/testimonials"
import videosEn from "./en/videos"

import aiLiteracyDe from "./de/aiLiteracy"
import commonDe from "./de/common"
import communityDe from "./de/community"
import heroDe from "./de/hero"
import navDe from "./de/nav"
import pricingDe from "./de/pricing"
import productsDe from "./de/products"
import statsDe from "./de/stats"
import testimonialsDe from "./de/testimonials"
import videosDe from "./de/videos"

const translations = {
  en: {
    aiLiteracy: aiLiteracyEn,
    common: commonEn,
    community: communityEn,
    hero: heroEn,
    nav: navEn,
    pricing: pricingEn,
    products: productsEn,
    stats: statsEn,
    testimonials: testimonialsEn,
    videos: videosEn,
  },
  de: {
    aiLiteracy: aiLiteracyDe,
    common: commonDe,
    community: communityDe,
    hero: heroDe,
    nav: navDe,
    pricing: pricingDe,
    products: productsDe,
    stats: statsDe,
    testimonials: testimonialsDe,
    videos: videosDe,
  },
} as const

export default translations

