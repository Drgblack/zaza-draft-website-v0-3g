"use client";

import { useState } from "react";
import { useLanguage } from "../../src/contexts/LanguageContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { describeBrevoError, submitBrevoContact } from "@/lib/brevo-client";

const content = {
  en: {
    nav: { home: "Home" },
    contact: {
      title: "Talk to our team",
      subtitle:
        "Tell us about your school or district and we'll help you find the right rollout option.",
      form: {
        name: "Full name",
        email: "Work email",
        organization: "School or district name",
        role: "Role / job title",
        teacherCount: "Approximate number of teachers",
        message: "Message",
        organizationPlaceholder: "Your school, trust, or district",
        rolePlaceholder: "Headteacher, department lead, procurement, etc.",
        teacherCountPlaceholder: "Select a range",
        placeholder:
          "What are you exploring, and what would a successful rollout need to support?",
        submit: "Send enquiry",
        sending: "Sending...",
        success: "Enquiry sent successfully!",
        error: "Something went wrong. Please try again.",
        dataNote:
          "We respect your privacy. Your details are used only to follow up on this enquiry.",
        options: {
          under10: "1-10 teachers",
          tenTo25: "11-25 teachers",
          twentyFiveTo50: "26-50 teachers",
          fiftyTo100: "51-100 teachers",
          hundredTo250: "101-250 teachers",
          over250: "250+ teachers",
        },
      },
      direct: {
        title: "Prefer to email us directly?",
        email: "Sales & rollout enquiries",
        response: "Typical response time: within 1 business day",
      },
      help: {
        title: "Need more detail first?",
        description:
          "Explore pricing and product support while you prepare your enquiry.",
        faq: "Read FAQ",
        support: "Visit Support Center",
      },
    },
  },
  de: {
    nav: { home: "Startseite" },
    contact: {
      title: "Mit unserem Team sprechen",
      subtitle:
        "Erzählen Sie uns von Ihrer Schule oder Ihrem Bezirk, und wir helfen Ihnen, die passende Rollout-Option zu finden.",
      form: {
        name: "Vollständiger Name",
        email: "Geschäftliche E-Mail",
        organization: "Name der Schule oder des Bezirks",
        role: "Rolle / Jobtitel",
        teacherCount: "Ungefähre Anzahl an Lehrkräften",
        message: "Nachricht",
        organizationPlaceholder: "Ihre Schule, Ihr Träger oder Ihr Bezirk",
        rolePlaceholder: "Schulleitung, Fachbereichsleitung, Einkauf usw.",
        teacherCountPlaceholder: "Bereich auswählen",
        placeholder:
          "Was möchten Sie einführen, und was sollte ein erfolgreicher Rollout unterstützen?",
        submit: "Anfrage senden",
        sending: "Wird gesendet...",
        success: "Anfrage erfolgreich gesendet!",
        error: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
        dataNote:
          "Wir respektieren Ihre Privatsphäre. Ihre Angaben werden nur für die Bearbeitung dieser Anfrage genutzt.",
        options: {
          under10: "1-10 Lehrkräfte",
          tenTo25: "11-25 Lehrkräfte",
          twentyFiveTo50: "26-50 Lehrkräfte",
          fiftyTo100: "51-100 Lehrkräfte",
          hundredTo250: "101-250 Lehrkräfte",
          over250: "250+ Lehrkräfte",
        },
      },
      direct: {
        title: "Sie möchten lieber direkt mailen?",
        email: "Anfragen zu Vertrieb & Rollout",
        response: "Typische Antwortzeit: innerhalb eines Werktags",
      },
      help: {
        title: "Möchten Sie sich zuerst informieren?",
        description:
          "Sehen Sie sich Preise und Support an, während Sie Ihre Anfrage vorbereiten.",
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
  const topic = searchParams?.get("topic")?.trim() || "general";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    teacherCount: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
      await submitBrevoContact({
        email: formData.email,
        name: formData.name,
        attributes: {
          MESSAGE: formData.message,
          SCHOOL_OR_DISTRICT: formData.organization,
          ROLE_TITLE: formData.role,
          TEACHER_COUNT: formData.teacherCount,
          INQUIRY_TOPIC: topic,
          LANGUAGE: language.toUpperCase(),
        },
        source:
          topic === "enterprise" ? "contact_page_enterprise" : "contact_page",
      });
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        organization: "",
        role: "",
        teacherCount: "",
        message: "",
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
            <span className="text-white">{t.contact.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.contact.title}
            </h1>
            <p className="text-xl text-gray-300">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 p-8">
              {success ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-lg text-white">
                    {language === "de"
                      ? "Danke für Ihre Anfrage. Wir melden uns in Kürze mit den nächsten Schritten."
                      : "Thanks for your enquiry. We'll follow up shortly with next steps."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.form.organization}
                    </label>
                    <input
                      type="text"
                      id="organization"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                      required
                      placeholder={t.contact.form.organizationPlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.form.role}
                    </label>
                    <input
                      type="text"
                      id="role"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      required
                      placeholder={t.contact.form.rolePlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="teacherCount"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.form.teacherCount}
                    </label>
                    <select
                      id="teacherCount"
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
                      <option value="" className="bg-[#0B1220] text-gray-400">
                        {t.contact.form.teacherCountPlaceholder}
                      </option>
                      <option value="1-10" className="bg-[#0B1220] text-white">
                        {t.contact.form.options.under10}
                      </option>
                      <option value="11-25" className="bg-[#0B1220] text-white">
                        {t.contact.form.options.tenTo25}
                      </option>
                      <option value="26-50" className="bg-[#0B1220] text-white">
                        {t.contact.form.options.twentyFiveTo50}
                      </option>
                      <option
                        value="51-100"
                        className="bg-[#0B1220] text-white"
                      >
                        {t.contact.form.options.fiftyTo100}
                      </option>
                      <option
                        value="101-250"
                        className="bg-[#0B1220] text-white"
                      >
                        {t.contact.form.options.hundredTo250}
                      </option>
                      <option value="250+" className="bg-[#0B1220] text-white">
                        {t.contact.form.options.over250}
                      </option>
                    </select>
                  </div>

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
                    {loading ? t.contact.form.sending : t.contact.form.submit}
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    {t.contact.form.dataNote}
                  </p>
                </form>
              )}
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
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
