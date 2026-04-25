"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { GuideLinksBlock } from "@/components/seo/GuideLinksBlock";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { SignupModal } from "@/components/signup-modal";
import {
  track,
  trackCtaClick,
  trackPricingClicked,
  trackSignupClicked,
} from "@/lib/analytics";
import {
  getAnnualSavingsAmount,
  resolveSelfServeCheckout,
  type SelfServeInterval,
} from "@/config/pricing";
import { sanitizeLeadSource } from "@/lib/draft-cta";
import { readDistributionMetaFromParams } from "@/lib/distribution-analytics";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";
import { getPopularGuideLinks } from "@/lib/guides";
import { usePricingCurrency } from "@/hooks/use-pricing-currency";
import { funnelCopy, type FunnelLocale } from "./content";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ComparisonSection from "./components/ComparisonSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";

const GUIDE_HREF = "/teacher-guide-to-sensitive-parent-emails";
const CHECKER_HREF = "/parent-email-risk-checker";

type JessicaReedFunnelProps = {
  locale?: FunnelLocale;
};

export default function JessicaReedFunnel({
  locale = "en",
}: JessicaReedFunnelProps) {
  const searchParams = useSearchParams();
  const [signupOpen, setSignupOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] =
    useState<SelfServeInterval>("annual");
  const copy = funnelCopy[locale];
  const distributionMeta = useMemo(
    () => readDistributionMetaFromParams(searchParams),
    [searchParams],
  );
  const { currency, setCurrency } = usePricingCurrency({
    locales: locale === "de" ? ["de-DE"] : undefined,
  });
  const checkoutReturnPath = locale === "de" ? "/de/start" : "/start";
  const defaultSignupSource =
    locale === "de" ? "funnel_start_de" : "funnel_start_en";
  const signupSource = distributionMeta
    ? sanitizeLeadSource(
        `dist_${distributionMeta.pageType}_${distributionMeta.slug}`,
        defaultSignupSource,
      )
    : defaultSignupSource;
  const freeCtaLabel = copy.freeCtaLabel;
  const displayLocale = locale === "de" ? "de-DE" : undefined;
  const proCheckout = resolveSelfServeCheckout({
    plan: "draft",
    interval: billingPeriod,
    currency,
    returnPath: checkoutReturnPath,
  });
  const formattedDisplayAmount = formatLocalizedPrice(
    proCheckout.displayAmount,
    currency,
    displayLocale ? { locale: displayLocale } : undefined,
  );
  const schoolYearDisplayAmount =
    currency === "USD"
      ? locale === "de"
        ? "160 $"
        : "$160"
      : formattedDisplayAmount;
  const proDisplayPriceLabel =
    billingPeriod === "annual"
      ? locale === "de"
        ? `${schoolYearDisplayAmount} pro Schuljahr`
        : `${schoolYearDisplayAmount} per school year`
      : locale === "de"
        ? `${formattedDisplayAmount}/Monat`
        : `${formattedDisplayAmount}/month`;
  const proCtaPriceLabel =
    locale === "de"
      ? `${formattedDisplayAmount}/${billingPeriod === "annual" ? "Jahr" : "Monat"}`
      : `${formattedDisplayAmount}/${billingPeriod === "annual" ? "year" : "month"}`;
  const proCtaLabel = copy.proCtaLabel(proCtaPriceLabel);
  const annualSavingsLabel = copy.pricing.annualSavings(
    formatLocalizedPrice(getAnnualSavingsAmount("draft", currency), currency, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...(displayLocale ? { locale: displayLocale } : {}),
    }),
  );
  const freePriceLabel = formatLocalizedPrice(
    0,
    currency,
    displayLocale ? { locale: displayLocale } : undefined,
  );
  const heroPrimaryHref = copy.hero.primaryCtaHref ?? CHECKER_HREF;
  const heroPrimaryLabel = copy.hero.primaryCtaLabel ?? freeCtaLabel;
  const heroSecondaryHref =
    copy.hero.secondaryLinkHref ??
    (locale === "de" ? "/de/parent-email-risk-checker" : CHECKER_HREF);
  const finalPrimaryHref = copy.finalCta.primaryCtaHref ?? CHECKER_HREF;
  const finalPrimaryLabel = copy.finalCta.primaryCtaLabel ?? freeCtaLabel;
  const finalSecondaryHref = copy.finalCta.secondaryCtaHref ?? GUIDE_HREF;
  const guidesHubHref = "/guides";
  const guidesHubLabel =
    locale === "de" ? "Alle Leitfaeden ansehen" : "Browse all guides";
  const guideLinks = getPopularGuideLinks().slice(0, 4);
  const pricingHref = locale === "de" ? "/de/pricing" : "/pricing";
  const summaryTitle =
    locale === "de"
      ? "Worum es auf dieser Seite eigentlich geht"
      : "What this page is really showing you";
  const summaryIntro =
    locale === "de"
      ? "Wenn du nach unten gescrollt hast und die kurze Version willst, ist hier die Zusammenfassung fuer Lehrkraefte."
      : "If you have scrolled the whole page and want the simple version, this is the summary teachers usually need.";

  const openFreeSignup = (ctaLocation: string, ctaText: string) => {
    trackCtaClick({ ctaText, ctaLocation });
    if (distributionMeta) {
      trackSignupClicked(distributionMeta, {
        cta_location: ctaLocation,
        cta_text: ctaText,
        language: locale,
      });
    }
    setSignupOpen(true);
  };

  const trackPaidPricingClick = (ctaLocation: string, ctaText: string) => {
    trackCtaClick({ ctaText, ctaLocation });
    if (distributionMeta) {
      trackPricingClicked(distributionMeta, {
        cta_location: ctaLocation,
        cta_text: ctaText,
        billing_period: billingPeriod,
        currency,
        language: locale,
      });
    }
  };

  return (
    <div className="funnel-theme">
      <main className="funnel-main">
        <section className="px-6 pt-6 lg:px-8 lg:pt-8">
          <div className="mx-auto max-w-6xl">
            <LastUpdated
              isoDate={CONTENT_FRESHNESS.start.isoDate}
              precision={CONTENT_FRESHNESS.start.precision}
              locale={locale}
            />
          </div>
        </section>
        <HeroSection
          primaryHref={heroPrimaryHref}
          onPrimaryAction={() => {
            trackCtaClick({
              ctaText: heroPrimaryLabel,
              ctaLocation: "funnel_hero_checker",
            });
            track("checker_link_clicked", {
              source: "funnel_hero",
              locale,
            });
          }}
          onSecondaryLinkClick={() => {
            trackCtaClick({
              ctaText: copy.hero.secondaryLinkLabel ?? "Get the free guide",
              ctaLocation: "funnel_hero_guide",
            });
            track("seo_guide_link_clicked", {
              destination: heroSecondaryHref,
              source: "funnel_hero",
              locale,
            });
          }}
          primaryCtaLabel={heroPrimaryLabel}
          secondaryHref={heroSecondaryHref}
          copy={copy.hero}
          locale={locale}
        />
        <PainSection copy={copy.pain} />
        <SolutionSection
          copy={copy.solution}
          onPrimaryAction={() => {
            trackCtaClick({
              ctaText:
                copy.solution.ctaBlock?.primaryLabel ?? "Make this safer",
              ctaLocation: "funnel_mid_checker",
            });
            track("checker_link_clicked", {
              source: "funnel_mid_page",
              locale,
            });
          }}
          onSecondaryAction={() => {
            trackCtaClick({
              ctaText:
                copy.solution.ctaBlock?.secondaryLabel ??
                "See 7 parent emails teachers should never send as-is",
              ctaLocation: "funnel_mid_guide",
            });
            track("seo_guide_link_clicked", {
              destination: copy.solution.ctaBlock?.secondaryHref ?? GUIDE_HREF,
              source: "funnel_mid_page",
              locale,
            });
          }}
        />
        <HowItWorksSection copy={copy.howItWorks} />
        <ComparisonSection copy={copy.comparison} />
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          billingPeriod={billingPeriod}
          onBillingPeriodChange={setBillingPeriod}
          freePriceLabel={freePriceLabel}
          proPriceLabel={proDisplayPriceLabel}
          proCtaLabel={proCtaLabel}
          annualSavingsLabel={annualSavingsLabel}
          proCheckoutHref={proCheckout.href}
          proCheckoutAvailable={proCheckout.isAvailable}
          onFreeAction={() =>
            openFreeSignup("funnel_pricing_free", freeCtaLabel)
          }
          onProAction={() =>
            trackPaidPricingClick("funnel_pricing_pro", proCtaLabel)
          }
          copy={copy.pricing}
        />
        <FAQSection copy={copy.faq} />
        <section className="px-6 pb-10 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <AgentReadableSummary
              locale={locale}
              theme="dark"
              title={summaryTitle}
              intro={summaryIntro}
              answers={{
                whatIsIt:
                  locale === "de" ? (
                    <>
                      Zaza Draft ist eine risikobewusste Schreibhilfe fuer
                      Lehrkraefte. Es hilft bei Elternmails, Zeugnisbemerkungen
                      und anderen Schultexten, die schnell falsch gelesen werden
                      koennen.
                    </>
                  ) : (
                    <>
                      Zaza Draft is a risk-aware writing support tool for
                      teachers. It helps with parent emails, report comments,
                      and other school writing that can easily be misread.
                    </>
                  ),
                whoIsItFor:
                  locale === "de" ? (
                    <>
                      Fuer Lehrkraefte, die professionell schreiben wollen, ohne
                      kalt zu klingen, und bei heiklen Nachrichten weniger
                      zweifeln moechten.
                    </>
                  ) : (
                    <>
                      It is for teachers who want to sound professional without
                      sounding cold, and who want less second-guessing around
                      difficult messages.
                    </>
                  ),
                problemItSolves:
                  locale === "de" ? (
                    <>
                      Es loest das Problem, dass ein Text inhaltlich klar ist,
                      aber im Ton noch zu hart, zu vage oder zu defensiv wirkt.
                    </>
                  ) : (
                    <>
                      It solves the problem of having the facts clear but the
                      tone still feeling too blunt, too vague, or too defensive.
                    </>
                  ),
                howItWorks:
                  locale === "de" ? (
                    <>
                      Du fuegst einen Entwurf oder Stichpunkte ein, waehlst Ton
                      und Ziel, und pruefst die vorgeschlagene Fassung, bevor du
                      irgendetwas sendest oder einreichst.
                    </>
                  ) : (
                    <>
                      You paste a draft or notes, choose the tone and outcome
                      you need, then review the suggested wording before you
                      send or submit anything.
                    </>
                  ),
                whatItCosts:
                  locale === "de" ? (
                    <>
                      Der Einstieg ist kostenlos. Pro ist auf dieser Seite mit{" "}
                      <span className="font-semibold">
                        {proDisplayPriceLabel}
                      </span>{" "}
                      sichtbar, wenn du unbegrenzte Unterstuetzung brauchst.{" "}
                      <Link
                        href={pricingHref}
                        className="font-semibold underline"
                      >
                        Alle Plandetails stehen auf der Pricing-Seite.
                      </Link>
                    </>
                  ) : (
                    <>
                      You can start free. Pro is shown on this page at{" "}
                      <span className="font-semibold">
                        {proDisplayPriceLabel}
                      </span>{" "}
                      when you need unlimited support.{" "}
                      <Link
                        href={pricingHref}
                        className="font-semibold underline"
                      >
                        Full plan details live on the pricing page.
                      </Link>
                    </>
                  ),
                nextStep:
                  locale === "de" ? (
                    <>
                      Pruefe einen echten Entwurf im{" "}
                      <Link
                        href={finalPrimaryHref}
                        className="font-semibold underline"
                      >
                        Risiko-Check fuer Elternmails
                      </Link>{" "}
                      oder lies danach den{" "}
                      <Link
                        href={finalSecondaryHref}
                        className="font-semibold underline"
                      >
                        naechsten Leitfaden
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      Check a real draft in the{" "}
                      <Link
                        href={finalPrimaryHref}
                        className="font-semibold underline"
                      >
                        Parent Email Risk Checker
                      </Link>{" "}
                      or move to the{" "}
                      <Link
                        href={finalSecondaryHref}
                        className="font-semibold underline"
                      >
                        next guide
                      </Link>
                      .
                    </>
                  ),
              }}
            />
          </div>
        </section>
        <section className="px-6 pb-12 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GuideLinksBlock
              theme="dark"
              eyebrow={
                locale === "de"
                  ? "Leitfaeden fuer Lehrkraefte"
                  : "Teacher communication guides"
              }
              title={
                locale === "de"
                  ? "Lieber zuerst Beispiele sehen?"
                  : "Want examples before you start?"
              }
              intro={
                locale === "de"
                  ? "Bevor du deinen eigenen Entwurf bearbeitest, lies diese klaren Beispiele zu veraergerten Eltern, Deeskalation und professionelleren Formulierungen."
                  : "Before you reshape your own draft, read these teacher-first examples on angry parent replies, de-escalation, and more professional report wording."
              }
              links={guideLinks}
              hubHref={guidesHubHref}
              hubLabel={guidesHubLabel}
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={finalPrimaryHref}
                onClick={() => {
                  trackCtaClick({
                    ctaText:
                      locale === "de"
                        ? "Risiko-Check fuer Elternmails"
                        : "Parent Email Risk Checker",
                    ctaLocation: "funnel_guides_support_checker",
                  });
                  track("checker_link_clicked", {
                    source: "funnel_guides_support",
                    locale,
                  });
                }}
                className="inline-flex items-center rounded-full border border-white/10 bg-[#0B1220] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
              >
                {locale === "de"
                  ? "Kostenlosen Risiko-Check testen"
                  : "Try the free risk checker"}
              </Link>
            </div>
          </div>
        </section>
        <FinalCTASection
          primaryHref={finalPrimaryHref}
          secondaryHref={finalSecondaryHref}
          onPrimaryAction={() => {
            trackCtaClick({
              ctaText: finalPrimaryLabel,
              ctaLocation: "funnel_final_checker",
            });
            track("checker_link_clicked", {
              source: "funnel_final_cta",
              locale,
            });
          }}
          onSecondaryAction={() => {
            trackCtaClick({
              ctaText: copy.finalCta.secondaryCtaLabel ?? "Read the free guide",
              ctaLocation: "funnel_final_guide",
            });
            track("seo_guide_link_clicked", {
              destination: finalSecondaryHref,
              source: "funnel_final_cta",
              locale,
            });
          }}
          primaryCtaLabel={finalPrimaryLabel}
          copy={copy.finalCta}
        />
      </main>
      <SignupModal
        open={signupOpen}
        onOpenChange={setSignupOpen}
        source={signupSource}
        distributionMeta={distributionMeta}
      />
    </div>
  );
}
