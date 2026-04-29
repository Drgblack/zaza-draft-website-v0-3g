/**
 * Zaza Draft - Creator Landing Page
 *
 * Route: /c/[handle]
 * Example: /c/coach, /c/emily-karst
 *
 * This page is statically generated for every active creator at build time
 * via generateStaticParams, so it stays fast and SEO-friendly. Attribution
 * cookies are set client-side on first visit because server components cannot
 * write cookies directly.
 */

import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getActiveHandles,
  getCreator,
  SEGMENT_DEFAULTS,
} from "@/lib/creators";
import { AttributionSetter } from "./AttributionSetter";

type PageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  return getActiveHandles().map((handle) => ({ handle }));
}

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

  const brandedName = `${creator.displayName} - Zaza Draft`;

  return {
    title: `${brandedName} - Try it free`,
    description: creator.quote,
    openGraph: {
      title: brandedName,
      description: creator.quote,
      type: "website",
      url: `https://zazadraft.com/c/${creator.handle}`,
    },
    twitter: {
      card: "summary_large_image",
      title: brandedName,
      description: creator.quote,
    },
  };
}

export default async function CreatorLandingPage({ params }: PageProps) {
  const { handle } = await params;
  const creator = getCreator(handle);

  if (!creator) {
    notFound();
  }

  const headline =
    creator.headline ?? SEGMENT_DEFAULTS[creator.segment].headline;
  const useCase = creator.useCase ?? SEGMENT_DEFAULTS[creator.segment].useCase;
  const ctaLabel =
    creator.ctaLabel ?? `Try the tool ${creator.displayName} uses - free`;
  const startHref = `/start?via=${creator.handle}${
    creator.couponCode ? `&promo=${creator.couponCode}` : ""
  }`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AttributionSetter
        handle={creator.handle}
        couponCode={creator.couponCode}
      />

      <div className="sticky top-0 z-30 border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 text-sm text-amber-900">
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
            <span className="hidden items-center rounded-full bg-amber-900 px-2 py-1 text-xs font-medium text-amber-50 sm:inline-flex">
              {creator.discountPercent}% off applied
            </span>
          )}
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 pb-8 pt-12 md:pb-12 md:pt-20">
        <div className="grid items-start gap-8 md:grid-cols-[1fr,auto] md:gap-12">
          <div>
            <p className="mb-4 text-sm uppercase tracking-wider text-slate-500">
              {creator.displayName} sent you here
            </p>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {headline}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-xl">
              {useCase}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={startHref}
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3.5 font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                {ctaLabel}
                <span aria-hidden="true" className="ml-2">
                  -&gt;
                </span>
              </a>
              {creator.couponCode && (
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  {creator.discountPercent}% discount applied (
                  <code className="font-mono">{creator.couponCode}</code>)
                </span>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Free for 14 days · No credit card to start · Cancel any time
            </p>
          </div>

          {creator.photoUrl && (
            <div className="hidden flex-shrink-0 md:block">
              <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-amber-100">
                <Image
                  src={creator.photoUrl}
                  alt={creator.displayName}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-slate-600">
                {creator.displayName}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <blockquote className="relative rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-10">
          <svg
            className="absolute left-4 top-4 h-8 w-8 text-slate-300"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="pl-12 text-xl font-medium italic leading-relaxed text-slate-800 md:text-2xl">
            {creator.quote}
          </p>
          <footer className="mt-4 flex items-center gap-3 pl-12">
            {creator.photoUrl && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
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

      <section className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <h2 className="mb-8 text-2xl font-semibold text-slate-900 md:text-3xl">
          How Zaza Draft works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
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

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="rounded-2xl bg-slate-900 p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Ready to try the tool {creator.displayName} uses?
          </h2>
          <p className="mt-3 text-slate-300">
            14 days free. No credit card to start.
            {creator.discountPercent &&
              ` ${creator.discountPercent}% off applied automatically.`}
          </p>
          <a
            href={startHref}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 font-medium text-slate-900 transition hover:bg-slate-100"
          >
            {ctaLabel}
            <span aria-hidden="true" className="ml-2">
              -&gt;
            </span>
          </a>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl border-t border-slate-200 px-4 py-8">
        <p className="text-center text-sm text-slate-500">
          Zaza Draft is built by Zaza Technologies UG. The tagline is{" "}
          <em>&quot;the message you won&apos;t regret tomorrow.&quot;</em>
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
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-900">
        {number}
      </div>
      <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}
