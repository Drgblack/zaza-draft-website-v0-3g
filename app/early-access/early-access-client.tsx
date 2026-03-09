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

export default function EarlyAccessClient() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isGerman = language === "de";
  const privacyHref = isGerman ? "/de/privacy" : "/privacy";

  const copy = isGerman
    ? {
        eyebrow: "WARTELISTE",
        title: "Zur Zaza Draft Warteliste",
        subtitle:
          "Erfahre als Erste oder Erster, wenn Zaza Draft fuer Lehrkraefte geoeffnet wird.",
        support: "Produktupdates, fruehen Zugang und Launch-News per E-Mail.",
        formLabel: "E-Mail-Adresse",
        formPlaceholder: "du@schule.de",
        formButton: "Zur Warteliste",
        helper:
          "Wir melden uns nur zu Produktupdates, Freischaltung und Launch-News.",
        success:
          "Du stehst auf der Warteliste. Wir sagen dir Bescheid, sobald der Zugang offen ist.",
        reassurance: [
          "Frueher Zugang zur Plattform",
          "Produktupdates und Launch-News",
          "10 kostenlose Nachrichten pro Monat, sobald Konten offen sind",
        ],
        trustNote:
          "Fuer Lehrkraefte, die E-Mails an Eltern, Zeugnisformulierungen und andere sensible Schulkommunikation schreiben.",
        faqTitle: "Kurze Antworten",
        faqs: [
          {
            question: "Fuer wen ist die Warteliste?",
            answer:
              "Fuer Lehrkraefte und schulische Mitarbeitende, die ruhige, professionelle Schreibunterstuetzung fuer Elternkommunikation und Zeugnisformulierungen moechten.",
          },
          {
            question: "Was erhalte ich?",
            answer:
              "Du erhaeltst Launch-Updates und eine E-Mail, sobald der Zugang fuer Lehrkraefte geoeffnet wird.",
          },
          {
            question: "Muss ich an etwas teilnehmen?",
            answer:
              "Nein. Die Warteliste bedeutet einfach, dass du benachrichtigt wirst, wenn der Zugang verfuegbar ist.",
          },
          {
            question: "Was kostet es?",
            answer:
              "Zaza Draft bietet einen kostenlosen Tarif mit 10 Nachrichten pro Monat. Fuer Lehrkraefte, die mehr brauchen, wird es bezahlte Optionen geben.",
          },
        ],
        errorFallback:
          "Die Warteliste konnte gerade nicht gespeichert werden. Bitte versuche es erneut.",
        privacy:
          "Mit dem Eintrag bestaetigst du, dass wir dir E-Mails zur Warteliste und zu Produktupdates schicken duerfen.",
        privacyLink: "Datenschutz",
      }
    : {
        eyebrow: "WAITLIST",
        title: "Join the Zaza Draft waitlist",
        subtitle: "Be first to hear when Zaza Draft opens to teachers.",
        support: "Get updates, early product access, and launch news.",
        formLabel: "Email address",
        formPlaceholder: "you@school.org",
        formButton: "Join the waitlist",
        helper:
          "We will only email you about product updates, access, and launch news.",
        success:
          "You’re on the waitlist. We’ll let you know when access opens.",
        reassurance: [
          "Early access to the platform",
          "Product updates and launch news",
          "10 free messages each month when accounts open",
        ],
        trustNote:
          "Built for teachers handling parent emails, report comments, and other high-stakes school communication.",
        faqTitle: "Short FAQ",
        faqs: [
          {
            question: "Who is the waitlist for?",
            answer:
              "Teachers and school staff who want calm, professional writing support for parent communication and report comments.",
          },
          {
            question: "What will I receive?",
            answer:
              "You’ll receive launch updates and an email when teacher access opens.",
          },
          {
            question: "Will I need to attend anything?",
            answer:
              "No. Joining the waitlist simply means you’ll be notified when access is available.",
          },
          {
            question: "How much will it cost?",
            answer:
              "Zaza Draft includes a free tier with 10 messages each month. Paid options will be available for teachers who want more.",
          },
        ],
        errorFallback:
          "We could not join the waitlist just now. Please try again.",
        privacy:
          "By joining, you agree that we can email you about the waitlist and product updates.",
        privacyLink: "Privacy",
      };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await submitBrevoContact({
        email,
        source: isGerman ? "waitlist_page_de" : "waitlist_page_en",
        attributes: {
          LANGUAGE: language.toUpperCase(),
          ENTRYPOINT: "WAITLIST_PAGE",
        },
      });
      setSuccess(true);
      track("form_submit", { form: "waitlist_page", language });
    } catch (submissionError) {
      console.error("[waitlist] Brevo submission failed", submissionError);
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
                        htmlFor="waitlist-email"
                        className="mb-2 block text-sm font-medium text-[#E5E7EB]"
                      >
                        {copy.formLabel}
                      </label>
                      <input
                        id="waitlist-email"
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
                          ? "Wird gespeichert..."
                          : "Joining..."
                        : copy.formButton}
                    </Button>

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
