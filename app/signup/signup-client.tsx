"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { track } from "@/lib/analytics";
import { describeBrevoError, submitBrevoContact } from "@/lib/brevo-client";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.4-1.4a2 2 0 01-.6-1.4V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0"
    />
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 2h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2zm3-9V7a3 3 0 116 0v3"
    />
  </svg>
);

export default function SignupClient() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isGerman = language === "de";
  const privacyHref = isGerman ? "/de/privacy" : "/privacy";

  const copy = isGerman
    ? {
        eyebrow: "KOSTENLOSES KONTO",
        title: "Kostenloses Zaza Draft Konto erstellen",
        subtitle:
          "Starten Sie mit 10 kostenlosen Entwuerfen pro Monat und wechseln Sie spaeter nur dann in den Teacher Tarif, wenn Sie mehr brauchen.",
        support:
          "Keine Kreditkarte erforderlich fuer den kostenlosen Tarif. Bezahlte Teacher Abos laufen separat ueber Stripe.",
        nameLabel: "Vollstaendiger Name",
        namePlaceholder: "Max Mustermann",
        formLabel: "E-Mail-Adresse",
        formPlaceholder: "du@schule.de",
        passwordLabel: "Passwort",
        passwordPlaceholder: "Mindestens 8 Zeichen",
        formButton: "Kostenloses Konto erstellen",
        buttonSupport: "Keine Kreditkarte erforderlich.",
        helper:
          "Wir nutzen Ihre Angaben nur, um Ihr kostenloses Konto einzurichten und Ihnen relevante Produktupdates zu schicken.",
        success:
          "Ihre Anfrage fuer ein kostenloses Konto ist eingegangen. Wir melden uns per E-Mail mit dem naechsten Schritt.",
        reassurance: [
          "10 kostenlose Entwuerfe pro Monat",
          "Keine Kreditkarte fuer den Gratis-Tarif",
          "Upgrade auf Teacher nur bei Bedarf",
        ],
        trustNote:
          "Fuer Lehrkraefte, die E-Mails an Eltern, Zeugnisformulierungen und andere sensible Schulkommunikation schreiben.",
        faqTitle: "Kurze Antworten",
        faqs: [
          {
            question: "Fuer wen ist das kostenlose Konto?",
            answer:
              "Fuer Lehrkraefte und schulische Mitarbeitende, die mit Zaza Draft kostenlos starten und sensible Schulkommunikation ruhiger formulieren moechten.",
          },
          {
            question: "Was ist enthalten?",
            answer:
              "Der kostenlose Tarif enthaelt 10 Entwuerfe pro Monat. Wenn Sie unbegrenzte Entwuerfe moechten, koennen Sie spaeter in den Teacher Tarif wechseln.",
          },
          {
            question: "Brauche ich eine Kreditkarte?",
            answer:
              "Nein. Fuer den kostenlosen Tarif ist keine Kreditkarte erforderlich.",
          },
          {
            question: "Was kostet es?",
            answer:
              "Zaza Draft bietet einen kostenlosen Tarif mit 10 Entwuerfen pro Monat. Der Teacher Tarif fuer unbegrenzte Entwuerfe wird separat ueber Stripe abgeschlossen.",
          },
        ],
        errorFallback:
          "Das kostenlose Konto konnte gerade nicht gestartet werden. Bitte versuchen Sie es erneut.",
        privacy:
          "Mit dem Absenden bestaetigen Sie, dass wir Ihnen E-Mails zu Ihrem Konto und zu relevanten Produktupdates schicken duerfen.",
        privacyLink: "Datenschutz",
      }
    : {
        eyebrow: "FREE ACCOUNT",
        title: "Create your free Zaza Draft account",
        subtitle:
          "Start with 10 free drafts each month and only upgrade to Teacher when you want more.",
        support:
          "No credit card required for the free plan. Paid Teacher subscriptions are handled separately through Stripe.",
        nameLabel: "Full name",
        namePlaceholder: "Jane Smith",
        formLabel: "Email address",
        formPlaceholder: "you@school.org",
        passwordLabel: "Password",
        passwordPlaceholder: "At least 8 characters",
        formButton: "Create free account",
        buttonSupport: "No credit card required.",
        helper:
          "We will use your details to set up your free account request and send relevant product updates.",
        success:
          "Your free account request is in. We will email you with the next step shortly.",
        reassurance: [
          "10 free drafts each month",
          "No credit card for the free plan",
          "Upgrade to Teacher only when you need it",
        ],
        trustNote:
          "Built for teachers handling parent emails, report comments, and other high-stakes school communication.",
        faqTitle: "Short FAQ",
        faqs: [
          {
            question: "Who is the free account for?",
            answer:
              "Teachers and school staff who want to start using Zaza Draft on the free plan for calmer, more professional school writing.",
          },
          {
            question: "What is included?",
            answer:
              "The free plan includes 10 drafts each month. If you need unlimited drafts, you can move to the Teacher plan later.",
          },
          {
            question: "Do I need a credit card?",
            answer: "No. The free plan does not require a credit card.",
          },
          {
            question: "How much will it cost?",
            answer:
              "Zaza Draft includes a free tier with 10 drafts each month. The Teacher plan for unlimited drafts is purchased separately through Stripe.",
          },
        ],
        errorFallback:
          "We could not start your free account just now. Please try again.",
        privacy:
          "By submitting, you agree that we can email you about your account request and relevant product updates.",
        privacyLink: "Privacy",
      };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError(
        isGerman
          ? "Bitte geben Sie Ihren Namen ein."
          : "Please enter your full name.",
      );
      return;
    }

    if (password.trim().length < 8) {
      setError(
        isGerman
          ? "Bitte waehlen Sie ein Passwort mit mindestens 8 Zeichen."
          : "Please choose a password with at least 8 characters.",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitBrevoContact({
        name: trimmedName,
        email,
        source: isGerman ? "signup_page_de" : "signup_page_en",
        attributes: {
          ACCOUNT_CREATION_REQUESTED: true,
          LANGUAGE: language.toUpperCase(),
          ENTRYPOINT: "SIGNUP_PAGE",
          PLAN: "starter",
        },
      });
      setSuccess(true);
      track("form_submit", { form: "signup_page", language });
    } catch (submissionError) {
      console.error("[signup] Brevo submission failed", submissionError);
      setError(describeBrevoError(submissionError, copy.errorFallback));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050A16] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_30%),linear-gradient(180deg,#0F172A_0%,#050A16_58%,#030712_100%)] py-20 md:py-28">
        <div className="absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,440px)] lg:items-start lg:px-8">
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#C4B5FD]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D1D5DB] md:text-xl">
              {copy.subtitle}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#94A3B8]">
              {copy.support}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {copy.reassurance.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-[#E2E8F0] backdrop-blur-sm"
                >
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <p className="mt-3">{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-3xl rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-[#CBD5E1]">
              {copy.trustNote}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.94),rgba(15,23,42,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.95)] ring-1 ring-white/5 md:p-8">
            <div className="absolute -right-12 top-0 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="relative">
              {success ? (
                <div className="py-10 text-center">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                    <CheckIcon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-white">
                    {copy.success}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
                    {copy.helper}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    {copy.formButton}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                    {copy.helper}
                  </p>

                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="signup-name"
                        className="mb-2 block text-sm font-medium text-[#E5E7EB]"
                      >
                        {copy.nameLabel}
                      </label>
                      <input
                        id="signup-name"
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
                        htmlFor="signup-email"
                        className="mb-2 block text-sm font-medium text-[#E5E7EB]"
                      >
                        {copy.formLabel}
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={copy.formPlaceholder}
                        className="min-h-[52px] w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 text-base text-white placeholder:text-[#6B7280] focus:border-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="signup-password"
                        className="mb-2 block text-sm font-medium text-[#E5E7EB]"
                      >
                        {copy.passwordLabel}
                      </label>
                      <input
                        id="signup-password"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder={copy.passwordPlaceholder}
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
                      {loading
                        ? isGerman
                          ? "Wird erstellt..."
                          : "Creating..."
                        : copy.formButton}
                    </Button>
                    <p className="text-center text-xs leading-6 text-[#94A3B8]">
                      {copy.buttonSupport}
                    </p>

                    <p className="text-xs leading-6 text-[#94A3B8]">
                      {copy.privacy}{" "}
                      <a
                        href={privacyHref}
                        className="text-[#C4B5FD] underline underline-offset-4 hover:text-white"
                      >
                        {copy.privacyLink}
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050A16] pb-20 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(3,7,18,0.98))] p-6 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.95)] md:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#C4B5FD]">
                <BellIcon className="h-5 w-5" />
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#93C5FD]">
                <LockIcon className="h-5 w-5" />
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white md:text-3xl">
              {copy.faqTitle}
            </h2>
            <div className="mt-8 space-y-4">
              {copy.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                >
                  <summary className="cursor-pointer list-none text-left text-base font-semibold text-white marker:content-none">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
