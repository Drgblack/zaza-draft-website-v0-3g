"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { track } from "@/lib/analytics";
import { describeBrevoError, submitBrevoContact } from "@/lib/brevo-client";

export default function GetStartedClient() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isGerman = language === "de";
  const privacyHref = isGerman ? "/de/privacy" : "/privacy";
  const draftAppLoginBaseUrl =
    process.env.NEXT_PUBLIC_DRAFT_APP_LOGIN_URL ?? "https://app.zazadraft.com/";

  const buildDraftAppRedirectUrl = (submittedEmail: string) => {
    try {
      const redirectUrl = new URL(draftAppLoginBaseUrl);

      if (
        redirectUrl.protocol !== "https:" &&
        redirectUrl.protocol !== "http:"
      ) {
        throw new Error("Unsupported redirect protocol");
      }

      redirectUrl.searchParams.set("email", submittedEmail);
      redirectUrl.searchParams.set("sendLink", "1");
      return redirectUrl;
    } catch (redirectError) {
      console.error(
        "[get-started] Invalid app login URL, falling back to app root",
        redirectError,
      );
      const fallbackUrl = new URL("https://app.zazadraft.com/");
      fallbackUrl.searchParams.set("email", submittedEmail);
      fallbackUrl.searchParams.set("sendLink", "1");
      return fallbackUrl;
    }
  };

  const copy = isGerman
    ? {
        eyebrow: "KOSTENLOS STARTEN",
        title: "Starte mit dem kostenlosen Draft Tarif",
        subtitle:
          "Gib deinen Namen und deine E-Mail ein, und wir senden dir einen sicheren Anmeldelink per E-Mail. Kein Passwort erforderlich.",
        nameLabel: "Name",
        namePlaceholder: "Dein Name",
        emailLabel: "E-Mail-Adresse",
        emailPlaceholder: "du@schule.de",
        cta: "Sicher schreiben starten",
        loading: "Weiterleitung...",
        reassurance: "Kein Passwort erforderlich. Dauert 30 Sekunden.",
        helper:
          "Wir nutzen deine Angaben, um dir deinen sicheren Anmeldelink und die ersten Zugangsschritte zu senden.",
        errorFallback:
          "Das Formular konnte gerade nicht gesendet werden. Bitte versuche es erneut.",
        privacyLead: "Mit dem Absenden stimmst du unserer",
        privacyLink: "Datenschutzerklaerung",
      }
    : {
        eyebrow: "GET STARTED",
        title: "Start with the free Draft plan",
        subtitle:
          "Enter your name and email and we'll send you a secure login link by email. No password required.",
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@school.org",
        cta: "Start writing safely",
        loading: "Redirecting...",
        reassurance: "No password required. Takes 30 seconds.",
        helper:
          "We use your details to send your secure login link and first access steps.",
        errorFallback:
          "We could not submit the form just now. Please try again.",
        privacyLead: "By continuing, you agree to our",
        privacyLink: "Privacy Policy",
      };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedEmail = email.trim();
    setLoading(true);
    setError("");

    try {
      await submitBrevoContact({
        name,
        email: submittedEmail,
        source: isGerman ? "get_started_page_de" : "get_started_page_en",
        attributes: {
          ENTRYPOINT: "GET_STARTED_PAGE",
          PLAN: "FREE",
          LANGUAGE: language.toUpperCase(),
        },
      });

      const redirectUrl = buildDraftAppRedirectUrl(submittedEmail);

      track("form_submit", {
        form: "get_started_page",
        plan: "free",
        language,
        redirectDestination: redirectUrl.toString(),
      });
      window.location.assign(redirectUrl.toString());
      return;
    } catch (submissionError) {
      console.error("[get-started] Brevo submission failed", submissionError);
      setError(describeBrevoError(submissionError, copy.errorFallback));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-92px)] bg-[#050A16] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_35%),linear-gradient(180deg,#0F172A_0%,#050A16_58%,#030712_100%)] py-20 md:py-28">
        <div className="absolute left-1/2 top-14 h-48 w-48 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[#C4B5FD]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {copy.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
              {copy.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.94),rgba(15,23,42,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.95)] ring-1 ring-white/5 md:p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="get-started-name"
                  className="mb-2 block text-sm font-medium text-[#E5E7EB]"
                >
                  {copy.nameLabel}
                </label>
                <input
                  id="get-started-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={copy.namePlaceholder}
                  className="min-h-[52px] w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 text-base text-white placeholder:text-[#6B7280] focus:border-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
                />
              </div>

              <div>
                <label
                  htmlFor="get-started-email"
                  className="mb-2 block text-sm font-medium text-[#E5E7EB]"
                >
                  {copy.emailLabel}
                </label>
                <input
                  id="get-started-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.emailPlaceholder}
                  className="min-h-[52px] w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 text-base text-white placeholder:text-[#6B7280] focus:border-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
                />
              </div>

              {error ? (
                <p className="text-sm leading-6 text-rose-300">{error}</p>
              ) : null}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-purple-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? copy.loading : copy.cta}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-[#CBD5E1]">
              {copy.reassurance}
            </p>
            <p className="mt-3 text-center text-xs leading-6 text-[#94A3B8]">
              {copy.helper}
            </p>
            <p className="mt-2 text-center text-xs leading-6 text-[#94A3B8]">
              {copy.privacyLead}{" "}
              <Link
                href={privacyHref}
                className="text-[#C4B5FD] underline underline-offset-4 hover:text-white"
              >
                {copy.privacyLink}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
