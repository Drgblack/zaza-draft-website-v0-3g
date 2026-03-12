"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../../src/contexts/LanguageContext";
import Link from "next/link";
import {
  ChevronRight,
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { track } from "@/lib/analytics";
import { describeBrevoError, submitBrevoContact } from "@/lib/brevo-client";

const salesLabels = {
  department: {
    en: "Department",
    de: "Department",
  },
  enterprise: {
    en: "Schools & Districts",
    de: "Schulen & Bezirke",
  },
  general: {
    en: "Pricing",
    de: "Preise",
  },
} as const;

const teacherCountOptions = ["1-5", "6-20", "21-50", "51-200", "200+"] as const;

function buildSalesMessage(plan: keyof typeof salesLabels, isGerman: boolean) {
  const planLabel = isGerman ? salesLabels[plan].de : salesLabels[plan].en;

  return isGerman
    ? `Ich interessiere mich für ${planLabel}. Bitte kontaktieren Sie mich zu Preisen, Onboarding und Verfügbarkeit.`
    : `I am interested in ${planLabel}. Please contact me about pricing, onboarding, and availability.`;
}

const content = {
  en: {
    nav: { home: "Home" },
    contact: {
      title: "Contact Us",
      subtitle:
        "We are here to help. Send us a message and we will respond as soon as possible.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        placeholder: "How can we help you?",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Something went wrong. Please try again.",
        dataNote: "We respect your privacy. Your data is never shared.",
      },
      direct: {
        title: "Direct Contact",
        email: "Email Support",
        response: "Typical response time: 24 hours",
      },
      help: {
        title: "Need Help?",
        description: "Check our help resources for quick answers.",
        faq: "Read FAQ",
        support: "Visit Support Center",
      },
    },
  },
  de: {
    nav: { home: "Startseite" },
    contact: {
      title: "Kontakt",
      subtitle:
        "Wir sind hier, um zu helfen. Senden Sie uns eine Nachricht und wir werden so schnell wie möglich antworten.",
      form: {
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        placeholder: "Wie können wir Ihnen helfen?",
        submit: "Nachricht senden",
        sending: "Wird gesendet...",
        success: "Nachricht erfolgreich gesendet!",
        error: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
        dataNote:
          "Wir respektieren Ihre Privatsphäre. Ihre Daten werden niemals weitergegeben.",
      },
      direct: {
        title: "Direkter Kontakt",
        email: "E-Mail-Support",
        response: "Typische Antwortzeit: 24 Stunden",
      },
      help: {
        title: "Brauchen Sie Hilfe?",
        description:
          "Überprüfen Sie unsere Hilferessourcen für schnelle Antworten.",
        faq: "FAQ lesen",
        support: "Support-Center besuchen",
      },
    },
  },
};

export function ContactClient() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const isGerman = language === "de";
  const t = isGerman ? content.de : content.en;
  const intent = searchParams.get("intent");
  const topic = searchParams.get("topic") ?? "";
  const source = searchParams.get("source") ?? "contact_page";
  const salesPlanParam = searchParams.get("plan");
  const salesPlan =
    salesPlanParam === "department" ||
    salesPlanParam === "enterprise" ||
    salesPlanParam === "general"
      ? salesPlanParam
      : "general";
  const isPricingSalesPlan =
    salesPlan === "department" || salesPlan === "enterprise";
  const isPricingSalesInquiry =
    intent === "sales" && topic === "pricing" && isPricingSalesPlan;
  const contactTitle = isPricingSalesInquiry
    ? isGerman
      ? "Mit dem Vertrieb über Schulzugang sprechen"
      : "Talk to sales about school access"
    : t.contact.title;
  const contactSubtitle = isPricingSalesInquiry
    ? isGerman
      ? "Teilen Sie uns kurz etwas über Ihre Schule oder Ihr Team mit, und wir melden uns mit dem besten nächsten Schritt."
      : "Tell us a little about your school or team and we’ll get back to you with the best next step."
    : t.contact.subtitle;
  const formSubmitLabel = isPricingSalesInquiry
    ? isGerman
      ? "Sales-Anfrage senden"
      : "Send sales inquiry"
    : t.contact.form.submit;
  const successMessage = isPricingSalesInquiry
    ? isGerman
      ? "Danke. Unser Team meldet sich bald zu Ihrer Sales-Anfrage."
      : "Thanks. Our team will follow up on your sales inquiry shortly."
    : language === "de"
      ? "Danke für Ihre Nachricht! Wir melden uns in Kürze."
      : "Thanks for your message! We'll reply shortly.";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teacherCount: "",
    message: isPricingSalesInquiry
      ? buildSalesMessage(salesPlan, isGerman)
      : "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.info("[contact] received query params", {
      intent: intent ?? "none",
      topic: topic || "none",
      plan: salesPlan,
      source: source || "none",
    });
    console.info("[contact] selected form variant", {
      variant: isPricingSalesInquiry ? "pricing_sales" : "default_contact",
      trigger: {
        intentIsSales: intent === "sales",
        topicIsPricing: topic === "pricing",
        planIsSupported: isPricingSalesPlan,
      },
    });
  }, [
    intent,
    isPricingSalesInquiry,
    isPricingSalesPlan,
    salesPlan,
    source,
    topic,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError(t.contact.form.error);
      return;
    }
    setLoading(true);
    setError("");

    try {
      const submissionSource = isPricingSalesInquiry
        ? `pricing_sales_${salesPlan}`
        : source;

      console.info("[contact] submitting form", {
        intent: isPricingSalesInquiry ? "sales" : "support",
        plan: isPricingSalesInquiry ? salesPlan : "none",
        topic: topic || "general",
        teacherCount: formData.teacherCount || "unspecified",
        source: submissionSource,
      });

      await submitBrevoContact({
        email: formData.email,
        name: formData.name,
        attributes: {
          MESSAGE: formData.message,
          INTENT: isPricingSalesInquiry ? "sales" : "support",
          TOPIC: topic || "general",
          PLAN: isPricingSalesInquiry ? salesPlan : "general",
          TEACHER_COUNT_RANGE: formData.teacherCount || "unspecified",
          LANGUAGE: language.toUpperCase(),
        },
        source: submissionSource,
      });
      track("form_submit", {
        form: isPricingSalesInquiry ? "sales_contact_form" : "contact_form",
        language,
        plan: isPricingSalesInquiry ? salesPlan : undefined,
        topic: topic || undefined,
        teacher_count_range: formData.teacherCount || undefined,
        source: submissionSource,
      });
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        teacherCount: "",
        message: isPricingSalesInquiry
          ? buildSalesMessage(salesPlan, isGerman)
          : "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      const message = describeBrevoError(err, t.contact.form.error);
      setError(message);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0B1220]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href={isGerman ? "/de" : "/"}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {t.nav.home}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-white">{contactTitle}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {contactTitle}
            </h1>
            <p className="text-xl text-gray-300">{contactSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 p-8">
              {success ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-lg text-white">{successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isPricingSalesInquiry && (
                    <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm text-purple-100">
                      {isGerman
                        ? `Sales-Anfrage fuer: ${salesLabels[salesPlan].de}`
                        : `Sales inquiry for: ${salesLabels[salesPlan].en}`}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {isPricingSalesInquiry && (
                    <div>
                      <label
                        htmlFor="teacher-count"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        {isGerman
                          ? "Wie viele Lehrkraefte benoetigen Zugang?"
                          : "How many teachers would need access?"}
                      </label>
                      <select
                        id="teacher-count"
                        value={formData.teacherCount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            teacherCount: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="" disabled className="text-gray-500">
                          {isGerman ? "Bitte auswaehlen" : "Please select"}
                        </option>
                        {teacherCountOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="text-black"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder={t.contact.form.placeholder}
                    />
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
                  >
                    {loading ? t.contact.form.sending : formSubmitLabel}
                  </Button>

                  {isPricingSalesInquiry && (
                    <p className="text-sm text-center text-[#CBD5E1]">
                      {isGerman
                        ? "Keine Zahlung noetig - wir melden uns mit der besten naechsten Option fuer Ihr Team."
                        : "No payment needed - we’ll reply with the best next option for your team."}
                    </p>
                  )}

                  <p className="text-sm text-gray-400 text-center">
                    {t.contact.form.dataNote}
                  </p>
                </form>
              )}
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {!isPricingSalesInquiry && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {t.contact.direct.title}
                  </h2>
                  <Card className="bg-white/5 border-white/10 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Mail className="h-8 w-8 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-2">
                          {t.contact.direct.email}
                        </h3>
                        <a
                          href="mailto:help@zazatechnologies.com"
                          className="text-lg text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          help@zazatechnologies.com
                        </a>
                        <p className="text-sm text-gray-400 mt-3">
                          {t.contact.direct.response}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">
                  {t.contact.help.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t.contact.help.description}
                </p>
                <div className="space-y-2">
                  <Link
                    href={isGerman ? "/de/faq" : "/faq"}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" /> {t.contact.help.faq}
                  </Link>
                  <Link
                    href={isGerman ? "/de/support" : "/support"}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />{" "}
                    {t.contact.help.support}
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
