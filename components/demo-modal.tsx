"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { useToast } from "@/hooks/use-toast"

type ProductOption = "Teach" | "Draft" | "GradeFlow"

interface DemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultProduct?: ProductOption
  productContext?: ProductOption
}

export function DemoModal({ open, onOpenChange, defaultProduct, productContext }: DemoModalProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    org: "",
    country: "",
    product: defaultProduct || productContext || "Draft",
    timePreference: "",
    notes: "",
    consent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.consent) {
      toast({
        title: t("demoModal.error"),
        description: t("demoModal.consentRequired"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sourcePath: window.location.pathname,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit")

      toast({
        title: t("demoModal.success"),
        description: t("demoModal.successMessage"),
      })

      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        role: "",
        org: "",
        country: "",
        product: defaultProduct || productContext || "Draft",
        timePreference: "",
        notes: "",
        consent: false,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: t("demoModal.error"),
        description: t("demoModal.errorMessage"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#111827] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{t("demoModal.title")}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-white transition-colors rounded-lg p-1 hover:bg-white/5"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                {t("demoModal.name")} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t("demoModal.namePlaceholder")}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                {t("demoModal.email")} <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t("demoModal.emailPlaceholder")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1.5">
              {t("demoModal.role")}
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">{t("demoModal.roleSelect")}</option>
              <option value="Teacher">{t("demoModal.roleTeacher")}</option>
              <option value="Head of Year">{t("demoModal.roleHead")}</option>
              <option value="SEN/Support">{t("demoModal.roleSEN")}</option>
              <option value="Department Lead">{t("demoModal.roleDept")}</option>
              <option value="SLT/Admin">{t("demoModal.roleSLT")}</option>
              <option value="Other">{t("demoModal.roleOther")}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="org" className="block text-sm font-medium text-gray-300 mb-1.5">
                {t("demoModal.org")}
              </label>
              <input
                type="text"
                id="org"
                value={formData.org}
                onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t("demoModal.orgPlaceholder")}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1.5">
                {t("demoModal.country")}
              </label>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t("demoModal.countryPlaceholder")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-1.5">
              {t("demoModal.product")}
            </label>
            <select
              id="product"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value as ProductOption })
              }
              className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Teach">Zaza Teach</option>
              <option value="Draft">Zaza Draft</option>
              <option value="GradeFlow">Zaza GradeFlow</option>
            </select>
          </div>

          <div>
            <label htmlFor="timePreference" className="block text-sm font-medium text-gray-300 mb-1.5">
              {t("demoModal.timePreference")}
            </label>
            <input
              type="text"
              id="timePreference"
              value={formData.timePreference}
              onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={t("demoModal.timePlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1.5">
              {t("demoModal.notes")}
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder={t("demoModal.notesPlaceholder")}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-white/10 bg-[#0B1220] text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#111827]"
            />
            <label htmlFor="consent" className="text-sm text-gray-300">
              {t("demoModal.consent")} <span className="text-red-400">*</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
            >
              {t("demoModal.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg shadow-purple-500/25"
            >
              {loading ? t("demoModal.submitting") : t("demoModal.submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

