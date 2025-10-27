import Header from "@/components/Header";
"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ContactPage() {
  const { t, language } = useLanguage()
  const fallback: Record<string, Record<string, string>> = {
    en: {
      "contact.title": "Contact Us",
      "contact.subtitle": "Have a question about Zaza? Weâ€™re here to help.",
      "contact.form.name": "Name",
      "contact.form.email": "Email",
      "contact.form.message": "Message",
      "contact.form.placeholder": "How can we help? Please share details so we can respond quickly.",
      "contact.form.submit": "Send Message",
      "contact.form.sending": "Sendingâ€¦",
      "contact.form.success": "Thanks! Your message has been sent.",
      "contact.form.error": "Something went wrong. Please try again.",
      "contact.form.dataNote": "Weâ€™ll only use your email to reply to your request.",
      "contact.direct.title": "Contact the Team",
      "contact.direct.email": "Email",
      "contact.direct.response": "We typically respond within 1 business day.",
      "contact.help.title": "Need quick help?",
      "contact.help.description": "You might find answers in our FAQ or support resources.",
      "contact.help.faq": "Read the FAQ",
      "contact.help.support": "Visit Support",
    },
    de: {
      "contact.title": "Kontakt",
      "contact.subtitle": "Fragen zu Zaza? Wir helfen gerne weiter.",
      "contact.form.name": "Name",
      "contact.form.email": "Eâ€‘Mail",
      "contact.form.message": "Nachricht",
      "contact.form.placeholder": "Wobei kÃ¶nnen wir helfen? Bitte teilen Sie Details fÃ¼r eine schnelle Antwort.",
      "contact.form.submit": "Nachricht senden",
      "contact.form.sending": "Wird gesendetâ€¦",
      "contact.form.success": "Danke! Ihre Nachricht wurde gesendet.",
      "contact.form.error": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      "contact.form.dataNote": "Wir verwenden Ihre Eâ€‘Mail nur, um auf Ihre Anfrage zu antworten.",
      "contact.direct.title": "Team kontaktieren",
      "contact.direct.email": "Eâ€‘Mail",
      "contact.direct.response": "Wir antworten in der Regel innerhalb von 1 Werktag.",
      "contact.help.title": "Schnelle Hilfe",
      "contact.help.description": "Antworten finden Sie oft in unserem FAQ oder Supportâ€‘Bereich.",
      "contact.help.faq": "FAQ lesen",
      "contact.help.support": "Zum Support",
    },
  }
  const ct = (key: string) => {
    const v = t(key)
    return v === key ? (fallback[language]?.[key] ?? fallback.en[key] ?? key) : v
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      // Mock submission - in production, this would send to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(true)
      setTimeout(() => setError(false), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0B1220]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              {t("nav.home")}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-white">{ct("contact.title")}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{ct("contact.title")}</h1>
            <p className="text-xl text-gray-300">{ct("contact.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 p-8">
              {success ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-lg text-white">{ct("contact.form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      {ct("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {ct("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {ct("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder={ct("contact.form.placeholder")}
                    />
                  </div>

                  {error && <p className="text-sm text-red-400">{ct("contact.form.error")}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
                  >
                    {loading ? ct("contact.form.sending") : ct("contact.form.submit")}
                  </Button>

                  <p className="text-sm text-gray-400 text-center">{ct("contact.form.dataNote")}</p>
                </form>
              )}
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{ct("contact.direct.title")}</h2>
                <Card className="bg-white/5 border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Mail className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{ct("contact.direct.email")}</h3>
                      <a
                        href="mailto:help@zazatechnologies.com"
                        className="text-lg text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        help@zazatechnologies.com
                      </a>
                      <p className="text-sm text-gray-400 mt-3">{ct("contact.direct.response")}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">{ct("contact.help.title")}</h3>
                <p className="text-gray-300 mb-4">{ct("contact.help.description")}</p>
                <div className="space-y-2">
                  <Link href="/faq" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    â†’ {ct("contact.help.faq")}
                  </Link>
                  <Link href="/support" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    â†’ {ct("contact.help.support")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 






