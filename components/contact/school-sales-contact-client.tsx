"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronRight,
  HelpCircle,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { track, trackGenerateLead } from "@/lib/analytics";
import { describeBrevoError, submitBrevoContact } from "@/lib/brevo-client";
import {
  parseSchoolSalesPlan,
  sanitizeLeadSource,
  type SchoolSalesPlan,
} from "@/lib/draft-cta";

type SalesFormContent = {
  navHome: string;
  title: string;
  subtitle: string;
  badgePrefix: string;
  directTitle: string;
  directEmail: string;
  directResponse: string;
  helpTitle: string;
  helpDescription: string;
  helpPricing: string;
  helpFaq: string;
  helpSupport: string;
  noPaymentNeeded: string;
  successMessage: string;
  labels: Record<SchoolSalesPlan, string>;
  form: {
    name: string;
    email: string;
    schoolName: string;
    role: string;
    schoolSize: string;
    country: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    schoolNamePlaceholder: string;
    rolePlaceholder: string;
    schoolSizePlaceholder: string;
    countryPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    error: string;
    dataNote: string;
    options: {
      under10: string;
      tenTo25: string;
      twentyFiveTo50: string;
      fiftyTo100: string;
      hundredTo250: string;
      over250: string;
    };
  };
};

const content: Record<"en" | "de", SalesFormContent> = {
  en: {
    navHome: "Home",
    title: "Talk to our schools team",
    subtitle:
      "Tell us about your school, team, or district and we will follow up with the right rollout and pricing path.",
    badgePrefix: "School sales enquiry for",
    directTitle: "Prefer to email us directly?",
    directEmail: "Sales & rollout enquiries",
    directResponse: "Typical response time: within 1 business day",
    helpTitle: "Need more detail first?",
    helpDescription:
      "Explore pricing and support resources while you prepare your enquiry.",
    helpPricing: "View pricing",
    helpFaq: "Read FAQ",
    helpSupport: "Visit Support Center",
    noPaymentNeeded:
      "No payment needed. We will reply with the best next option for your team.",
    successMessage:
      "Thanks for your enquiry. Our schools team will follow up shortly.",
    labels: {
      department: "Department",
      enterprise: "Schools & Districts",
      general: "School pricing",
    },
    form: {
      name: "Full name",
      email: "Work email",
      schoolName: "School or district name",
      role: "Role / job title",
      schoolSize: "Approximate number of teachers",
      country: "Country",
      message: "What do you need?",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@school.org",
      schoolNamePlaceholder: "Your school, trust, or district",
      rolePlaceholder: "Department lead, SLT, procurement, etc.",
      schoolSizePlaceholder: "Select a range",
      countryPlaceholder: "Country",
      messagePlaceholder:
        "What are you exploring, and what would a successful rollout need to support?",
      submit: "Send enquiry",
      sending: "Sending...",
      error: "Something went wrong. Please try again.",
      dataNote:
        "We use these details only to follow up on your school enquiry.",
      options: {
        under10: "1-10 teachers",
        tenTo25: "11-25 teachers",
        twentyFiveTo50: "26-50 teachers",
        fiftyTo100: "51-100 teachers",
        hundredTo250: "101-250 teachers",
        over250: "250+ teachers",
      },
    },
  },
  de: {
    navHome: "Startseite",
    title: "Mit unserem Schulteam sprechen",
    subtitle:
      "Erzählen Sie uns von Ihrer Schule, Ihrem Team oder Ihrem Bezirk, und wir melden uns mit dem passenden Rollout- und Preisweg.",
    badgePrefix: "Schul-Anfrage für",
    directTitle: "Sie möchten lieber direkt mailen?",
    directEmail: "Anfragen zu Vertrieb & Rollout",
    directResponse: "Typische Antwortzeit: innerhalb eines Werktags",
    helpTitle: "Sie möchten sich zuerst informieren?",
    helpDescription:
      "Sehen Sie sich Preise und Support an, während Sie Ihre Anfrage vorbereiten.",
    helpPricing: "Preise ansehen",
    helpFaq: "FAQ lesen",
    helpSupport: "Support-Center besuchen",
    noPaymentNeeded:
      "Keine Zahlung nötig. Wir melden uns mit der besten nächsten Option für Ihr Team.",
    successMessage:
      "Danke für Ihre Anfrage. Unser Schulteam meldet sich in Kürze.",
    labels: {
      department: "Department",
      enterprise: "Schulen & Bezirke",
      general: "Schulpreise",
    },
    form: {
      name: "Vollständiger Name",
      email: "Geschäftliche E-Mail",
      schoolName: "Name der Schule oder des Bezirks",
      role: "Rolle / Jobtitel",
      schoolSize: "Ungefähre Anzahl an Lehrkräften",
      country: "Land",
      message: "Was benötigen Sie?",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "sie@schule.de",
      schoolNamePlaceholder: "Ihre Schule, Ihr Träger oder Ihr Bezirk",
      rolePlaceholder: "Fachbereichsleitung, Schulleitung, Einkauf usw.",
      schoolSizePlaceholder: "Bereich auswählen",
      countryPlaceholder: "Land",
      messagePlaceholder:
        "Was möchten Sie einführen, und was sollte ein erfolgreicher Rollout unterstützen?",
      submit: "Anfrage senden",
      sending: "Wird gesendet...",
      error: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
      dataNote:
        "Wir nutzen diese Angaben nur, um Ihre Schulanfrage zu bearbeiten.",
      options: {
        under10: "1-10 Lehrkräfte",
        tenTo25: "11-25 Lehrkräfte",
        twentyFiveTo50: "26-50 Lehrkräfte",
        fiftyTo100: "51-100 Lehrkräfte",
        hundredTo250: "101-250 Lehrkräfte",
        over250: "250+ Lehrkräfte",
      },
    },
  },
};

function buildPrefillMessage(
  locale: "en" | "de",
  plan: SchoolSalesPlan,
  labels: Record<SchoolSalesPlan, string>,
) {
  if (locale === "de") {
    return `Ich interessiere mich für ${labels[plan]}. Bitte kontaktieren Sie mich zu Preisen, Rollout und Onboarding.`;
  }

  return `I'm interested in ${labels[plan]}. Please contact me about pricing, rollout, and onboarding.`;
}

type SchoolSalesContactClientProps = {
  initialPlan?: SchoolSalesPlan;
  initialSource?: string;
};

export function SchoolSalesContactClient({
  initialPlan = "general",
  initialSource = "pricing_page",
}: SchoolSalesContactClientProps) {
  const { language } = useLanguage();
  const locale = language === "de" ? "de" : "en";
  const t = content[locale];
  const plan = parseSchoolSalesPlan(initialPlan);
  const source = sanitizeLeadSource(initialSource);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolName: "",
    role: "",
    schoolSize: "",
    country: "",
    message: buildPrefillMessage(locale, plan, t.labels),
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError(t.form.error);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitBrevoContact({
        email: formData.email,
        name: formData.name,
        attributes: {
          MESSAGE: formData.message,
          SCHOOL_OR_DISTRICT: formData.schoolName,
          ROLE_TITLE: formData.role,
          TEACHER_COUNT: formData.schoolSize,
          COUNTRY: formData.country,
          PLAN: plan,
          INTENT: "sales",
          TOPIC: "school_pricing",
          ENTRYPOINT: source,
          LANGUAGE: locale.toUpperCase(),
        },
        source: `school_sales_${plan}`,
      });

      track("form_submit", {
        form: "school_sales_contact_form",
        language: locale,
        plan,
        source,
        school_size: formData.schoolSize,
      });
      trackGenerateLead({
        formLocation: "school_sales_contact_form",
        method: "email",
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        schoolName: "",
        role: "",
        schoolSize: "",
        country: "",
        message: buildPrefillMessage(locale, plan, t.labels),
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (submissionError) {
      setError(describeBrevoError(submissionError, t.form.error));
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const homeHref = locale === "de" ? "/de" : "/";
  const pricingHref = locale === "de" ? "/de/pricing" : "/pricing";
  const faqHref = locale === "de" ? "/de/faq" : "/faq";
  const supportHref = locale === "de" ? "/de/support" : "/support";

  return (
    <div className="min-h-screen bg-[#0B1220]">
      <div className="border-b border-white/10 bg-[#0B1220]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href={homeHref}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {t.navHome}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-white">{t.title}</span>
          </nav>
        </div>
      </div>

      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300">{t.subtitle}</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/5 p-8">
              {success ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <Send className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-lg text-white">{t.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm text-purple-100">
                    {t.badgePrefix}: {t.labels[plan]}
                  </div>

                  <div>
                    <label
                      htmlFor="sales-name"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      {t.form.name}
                    </label>
                    <input
                      id="sales-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                      }
                      placeholder={t.form.namePlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sales-email"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      {t.form.email}
                    </label>
                    <input
                      id="sales-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      placeholder={t.form.emailPlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sales-school-name"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      {t.form.schoolName}
                    </label>
                    <input
                      id="sales-school-name"
                      type="text"
                      required
                      value={formData.schoolName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          schoolName: event.target.value,
                        })
                      }
                      placeholder={t.form.schoolNamePlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="sales-role"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        {t.form.role}
                      </label>
                      <input
                        id="sales-role"
                        type="text"
                        required
                        value={formData.role}
                        onChange={(event) =>
                          setFormData({ ...formData, role: event.target.value })
                        }
                        placeholder={t.form.rolePlaceholder}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sales-country"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        {t.form.country}
                      </label>
                      <input
                        id="sales-country"
                        type="text"
                        required
                        value={formData.country}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            country: event.target.value,
                          })
                        }
                        placeholder={t.form.countryPlaceholder}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="sales-school-size"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      {t.form.schoolSize}
                    </label>
                    <select
                      id="sales-school-size"
                      required
                      value={formData.schoolSize}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          schoolSize: event.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" disabled className="text-gray-500">
                        {t.form.schoolSizePlaceholder}
                      </option>
                      <option value="1-10" className="text-black">
                        {t.form.options.under10}
                      </option>
                      <option value="11-25" className="text-black">
                        {t.form.options.tenTo25}
                      </option>
                      <option value="26-50" className="text-black">
                        {t.form.options.twentyFiveTo50}
                      </option>
                      <option value="51-100" className="text-black">
                        {t.form.options.fiftyTo100}
                      </option>
                      <option value="101-250" className="text-black">
                        {t.form.options.hundredTo250}
                      </option>
                      <option value="250+" className="text-black">
                        {t.form.options.over250}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sales-message"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      {t.form.message}
                    </label>
                    <textarea
                      id="sales-message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          message: event.target.value,
                        })
                      }
                      placeholder={t.form.messagePlaceholder}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {error ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    {loading ? t.form.sending : t.form.submit}
                  </Button>

                  <p className="text-center text-sm text-[#CBD5E1]">
                    {t.noPaymentNeeded}
                  </p>
                  <p className="text-center text-sm text-gray-400">
                    {t.form.dataNote}
                  </p>
                </form>
              )}
            </Card>

            <div className="space-y-6">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white">
                  {t.directTitle}
                </h2>
                <Card className="border-white/10 bg-white/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Building2 className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-white">
                        {t.directEmail}
                      </h3>
                      <a
                        href="mailto:sales@zazadraft.com"
                        className="text-lg text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        sales@zazadraft.com
                      </a>
                      <p className="mt-3 text-sm text-gray-400">
                        {t.directResponse}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-600/10 to-blue-600/10 p-6">
                <h3 className="mb-2 font-semibold text-white">{t.helpTitle}</h3>
                <p className="mb-4 text-gray-300">{t.helpDescription}</p>
                <div className="space-y-2">
                  <Link
                    href={pricingHref}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Mail className="h-4 w-4" /> {t.helpPricing}
                  </Link>
                  <Link
                    href={faqHref}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" /> {t.helpFaq}
                  </Link>
                  <Link
                    href={supportHref}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" /> {t.helpSupport}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
