/**
 * Zaza Draft — Creator Landing Page
 *
 * Route: /c/[handle]
 * Example: /c/coach, /c/emily-karst
 *
 * This page is statically generated for every active creator at build time
 * (via generateStaticParams), so it's fast and SEO-clean. The attribution
 * cookies are set client-side on first visit because Next.js 15 server
 * components can't write cookies directly.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getCreator,
  getActiveHandles,
  SEGMENT_DEFAULTS,
  type Creator,
} from "@/lib/creators";
import { AttributionSetter } from "./AttributionSetter";

type PageProps = {
  params: Promise<{ handle: string }>;
};

// Pre-render every active creator page at build time.
export async function generateStaticParams() {
  return getActiveHandles().map((handle) => ({ handle }));
}

// Per-creator OG metadata so shared links stay branded.
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const creator = getCreator(handle);
  if (!creator) {
    return {
      title: "Zaza Draft",
      description:
        "The message you won't regret tomorrow. AI for teacher communication.",
    };
  }

  return {
    title: `${creator.displayName} �- Zaza Draft — Try it free`,
    description: creator.quote,
    openGraph: {
      title: `${creator.displayName} �- Zaza Draft`,
      description: creator.quote,
      type: "website",
      url: `https://zazadraft.com/c/${creator.handle}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${creator.displayName} �- Zaza Draft`,
      description: creator.quote,
    },
  };
}

export default async function CreatorLandingPage({ params }: PageProps) {
  const { handle } = await params;
  const creator = getCreator(handle);
  if (!creator) notFound();

  // Resolve segment-default copy if creator hasn't supplied custom.
  const headline =
    creator.headline ?? SEGMENT_DEFAULTS[creator.segment].headline;
  const useCase = creator.useCase ?? SEGMENT_DEFAULTS[creator.segment].useCase;
  const ctaLabel =
    creator.ctaLabel ?? `Try the tool ${creator.displayName} uses — free`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sets the attribution cookie on first visit. Client component. */}
      <AttributionSetter
        handle={creator.handle}
        couponCode={creator.couponCode}
      />

      {/* Trust transfer banner — sticky to keep the "scent" through scroll */}
      <div className="sticky top-0 z-30 bg-amber-50 border-b border-amber-200">
        <div className="mx-auto max-w-5xl px-4 py-2.5 flex items-center gap-3 text-sm text-amber-900">
          <span className="text-base">👋</span>
          <p className="flex-1">
            Special offer for{" "}
            <span className="font-semibold">{creator.displayName}</span>'s
            community
            {creator.platforms.length > 0 && (
              <span className="text-amber-700">
                {" "}
                · as seen on {creator.platforms.join(" & ")}
              </span>
            )}
          </p>
          {creator.discountPercent && (
            <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-full bg-amber-900 text-amber-50 text-xs font-medium">
              {creator.discountPercent}% off applied
            </span>
          )}
        </div>
      </div>

      {/* Hero section */}
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="grid md:grid-cols-[1fr,auto] gap-8 md:gap-12 items-start">
          <div>
            {/* Eyebrow with creator name */}
            <p className="text-sm uppercase tracking-wider text-slate-500 mb-4">
              {creator.displayName} sent you here
            </p>

            {/* Tailored headline */}
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-slate-900">
              {headline}
            </h1>

            {/* Use case */}
            <p className="mt-5 text-lg md:text-xl text-slate-600 leading-relaxed">
              {useCase}
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`/start?via=${creator.handle}${creator.couponCode ? `&promo=${creator.couponCode}` : ""}`}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition shadow-sm"
              >
                {ctaLabel}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </a>
              {creator.couponCode && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                  {creator.discountPercent}% discount applied (
                  <code className="font-mono">{creator.couponCode}</code>)
                </span>
              )}
            </div>

            {/* Reassurance */}
            <p className="mt-4 text-sm text-slate-500">
              Free for 14 days · No credit card to start · Cancel any time
            </p>
          </div>

          {/* Creator headshot — only renders if photoUrl is provided */}
          {creator.photoUrl && (
            <div className="flex-shrink-0 hidden md:block">
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-amber-100">
                <Image
                  src={creator.photoUrl}
                  alt={creator.displayName}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-center text-sm text-slate-600 font-medium">
                {creator.displayName}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Personalised quote */}
      <section className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <blockquote className="relative bg-slate-50 rounded-xl p-6 md:p-10 border border-slate-200">
          <svg
            className="absolute top-4 left-4 w-8 h-8 text-slate-300"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="pl-12 text-xl md:text-2xl leading-relaxed text-slate-800 font-medium italic">
            {creator.quote}
          </p>
          <footer className="pl-12 mt-4 flex items-center gap-3">
            {creator.photoUrl && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={creator.photoUrl}
                  alt={creator.displayName}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            )}
            <cite className="not-italic">
              <span className="block font-semibold text-slate-900">
                {creator.displayName}
              </span>
              <span className="block text-sm text-slate-500">
                {creator.platforms.join(" · ")}
              </span>
            </cite>
          </footer>
        </blockquote>
      </section>

      {/* What it does — universal product explainer */}
      <section className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">
          How Zaza Draft works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Step
            number="1"
            title="Paste the honest version"
            body="The draft you want to send. The one in your head at 9pm with all the frustration in it."
          />
          <Step
            number="2"
            title="Get the version you can send"
            body="Calm, professional, still in your voice. With a regret-risk check before you hit send."
          />
          <Step
            number="3"
            title="Send with confidence"
            body="The message you won't regret tomorrow. Built specifically for teacher communication."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Ready to try the tool {creator.displayName} uses?
          </h2>
          <p className="mt-3 text-slate-300">
            14 days free. No credit card to start.
            {creator.discountPercent &&
              ` ${creator.discountPercent}% off applied automatically.`}
          </p>
          <a
            href={`/start?via=${creator.handle}${creator.couponCode ? `&promo=${creator.couponCode}` : ""}`}
            className="mt-6 inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition"
          >
            {ctaLabel}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-4 py-8 border-t border-slate-200">
        <p className="text-sm text-slate-500 text-center">
          Zaza Draft is built by Zaza Technologies UG. The tagline is{" "}
          <em>"the message you won't regret tomorrow."</em>
        </p>
      </footer>
    </div>
  );
}

function Step({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-6 bg-white">
      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-semibold text-sm flex items-center justify-center mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
