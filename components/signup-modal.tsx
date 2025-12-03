"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { subscribeToNewsletter } from "@/app/actions/signup"

interface SignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignupModal({ open, onOpenChange }: SignupModalProps) {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setError(t("form.consentRequired"))
      return
    }

    setLoading(true)
    setError("")

    try {
      const result = await subscribeToNewsletter(name, email)

      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || t("form.error"))
      }
    } catch (err) {
      console.error("[v0] Signup error:", err)
      setError(t("form.error"))
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setSuccess(false)
      setName("")
      setEmail("")
      setConsent(false)
      setError("")
    }, 300)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#111827] rounded-2xl shadow-2xl border border-[#1F2937] p-6">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">{t("form.close")}</span>
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">{t("form.success")}</h3>
            <p className="text-[#9CA3AF]">{t("form.successNote")}</p>
            <Button onClick={handleClose} className="mt-6 gradient-primary text-white">
              {t("form.close")}
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#F9FAFB] mb-2">{t("nav.getStarted")}</h2>
            <p className="text-[#9CA3AF] mb-6">{t("form.trialCopy")}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#D1D5DB] mb-2">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#0F172A] border border-[#1F2937] rounded-xl text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  placeholder={t("form.placeholder.name")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#D1D5DB] mb-2">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#0F172A] border border-[#1F2937] rounded-xl text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  placeholder={t("form.placeholder.email")}
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#1F2937] bg-[#0F172A] text-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]"
                />
                <label htmlFor="consent" className="text-sm text-[#9CA3AF]">
                  {t("form.consent")}{" "}
                  <a href="/legal/privacy" className="text-[#60A5FA] hover:underline">
                    {t("form.privacyLink")}
                  </a>
                </label>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <Button
                type="submit"
                disabled={loading || !consent}
                className="w-full gradient-primary text-white font-medium disabled:opacity-50"
              >
                {loading ? t("form.submitting") : t("form.submit")}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

