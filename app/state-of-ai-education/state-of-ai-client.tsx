"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Download,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  BarChart3,
  FileText,
  CheckCircle2,
  ArrowRight,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function StateOfAIClient() {
  const { language } = useLanguage()
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track download request
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "report_download_request", {
        event_category: "Lead Generation",
        event_label: "State of AI Report 2025",
      })
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // In production, this would trigger email with download link
    console.log("[v0] Report download requested:", { email, role })
  }

  const keyFindings = [
    {
      stat: "87%",
      label: language === "de" ? "der Lehrkräfte nutzen KI wöchentlich" : "of teachers use AI weekly",
      description:
        language === "de"
          ? "Anstieg von 34% im Jahr 2024, zeigt schnelle Akzeptanz über alle Klassenstufen"
          : "Up from 34% in 2024, showing rapid adoption across all grade levels",
      icon: TrendingUp,
    },
    {
      stat: "6.2 Std",
      label: language === "de" ? "gespart pro Woche pro Lehrkraft" : "saved per week per teacher",
      description:
        language === "de"
          ? "Durchschnittliche Zeitersparnis von regelmäßigen KI-Nutzern für administrative Aufgaben"
          : "Average time savings reported by regular AI users for administrative tasks",
      icon: Users,
    },
    {
      stat: "92%",
      label: language === "de" ? "berichten verbesserte Kommunikation" : "report improved communication",
      description:
        language === "de"
          ? "Lehrkräfte, die KI für Eltern-E-Mails nutzen, berichten von besserem Engagement und Klarheit"
          : "Teachers using AI for parent emails report better engagement and clarity",
      icon: Award,
    },
    {
      stat: "68%",
      label: language === "de" ? "wünschen mehr KI-Schulung" : "want more AI training",
      description:
        language === "de"
          ? "Mehrheit der Pädagogen sucht berufliche Weiterbildung in KI-Kompetenz"
          : "Majority of educators seek professional development in AI literacy",
      icon: BookOpen,
    },
  ]

  const reportSections = [
    {
      title: language === "de" ? "Zusammenfassung" : "Executive Summary",
      description:
        language === "de"
          ? "Übergeordnete Erkenntnisse und wichtige Erkenntnisse für Administratoren und Entscheidungsträger"
          : "High-level insights and key takeaways for administrators and policymakers",
      icon: FileText,
    },
    {
      title: language === "de" ? "Akzeptanztrends" : "Adoption Trends",
      description:
        language === "de"
          ? "Wie sich die KI-Nutzung über Klassenstufen, Fächer und Schultypen entwickelt hat"
          : "How AI usage has evolved across grade levels, subjects, and school types",
      icon: TrendingUp,
    },
    {
      title: language === "de" ? "Anwendungsfälle & Auswirkungen" : "Use Cases & Impact",
      description:
        language === "de"
          ? "Reale Anwendungen und gemessene Ergebnisse von 15.000+ Lehrkräften"
          : "Real-world applications and measured outcomes from 15,000+ teachers",
      icon: BarChart3,
    },
    {
      title: language === "de" ? "Herausforderungen & Bedenken" : "Challenges & Concerns",
      description:
        language === "de"
          ? "Datenschutz, Chancengleichheit, Schulungslücken und ethische Überlegungen"
          : "Privacy, equity, training gaps, and ethical considerations",
      icon: Award,
    },
    {
      title: language === "de" ? "Zukunftsausblick" : "Future Outlook",
      description:
        language === "de"
          ? "Prognosen und Empfehlungen für die nächsten 3-5 Jahre"
          : "Predictions and recommendations for the next 3-5 years",
      icon: BookOpen,
    },
    {
      title: language === "de" ? "Best Practices" : "Best Practices",
      description:
        language === "de"
          ? "Umsetzbare Rahmenwerke von leistungsstarken Schulen und Bezirken"
          : "Actionable frameworks from high-performing schools and districts",
      icon: CheckCircle2,
    },
  ]

  const mediaMentions = [
    {
      outlet: "EdWeek",
      quote:
        language === "de"
          ? "Die umfassendste Analyse der KI-Akzeptanz in der K-12-Bildung bis heute"
          : "The most comprehensive analysis of AI adoption in K-12 education to date",
    },
    {
      outlet: "The Chronicle",
      quote:
        language === "de"
          ? "Pflichtlektüre für jeden Schuladministrator und Entscheidungsträger"
          : "Essential reading for every school administrator and policymaker",
    },
    {
      outlet: "EdSurge",
      quote:
        language === "de"
          ? "Datengestützte Erkenntnisse, die konventionelle Weisheiten über KI in Schulen in Frage stellen"
          : "Data-driven insights that challenge conventional wisdom about AI in schools",
    },
    {
      outlet: "Education Dive",
      quote:
        language === "de"
          ? "Eine wegweisende Studie, die die Bildungspolitik für Jahre prägen wird"
          : "A landmark study that will shape education policy for years to come",
    },
  ]

  const previousReports = [
    { year: "2024", downloads: "47.000+", url: "#" },
    { year: "2023", downloads: "32.000+", url: "#" },
    { year: "2022", downloads: "18.000+", url: "#" },
  ]

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#A78BFA]/5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full mb-6">
                <span className="text-[#A78BFA] text-sm font-medium">
                  {language === "de" ? "Jahresbericht 2025" : "2025 Annual Report"}
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {language === "de" ? "Stand der KI in der Bildung" : "State of AI in Education"}
                <span className="block text-[#A78BFA] mt-2">{language === "de" ? "Bericht 2025" : "2025 Report"}</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {language === "de"
                  ? "Die umfassendste Analyse der KI-Akzeptanz in der K-12-Bildung. 120+ Seiten Erkenntnisse von 15.000+ Lehrkräften aus 50 Bundesstaaten."
                  : "The most comprehensive analysis of AI adoption in K-12 education. 120+ pages of insights from 15,000+ teachers across 50 states."}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-5 h-5 text-[#A78BFA]" />
                  <span>{language === "de" ? "15.000+ befragte Lehrkräfte" : "15,000+ Teachers Surveyed"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FileText className="w-5 h-5 text-[#A78BFA]" />
                  <span>{language === "de" ? "120+ Seiten" : "120+ Pages"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <BarChart3 className="w-5 h-5 text-[#A78BFA]" />
                  <span>{language === "de" ? "50 Bundesstaaten" : "50 States"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  onClick={() => {
                    document.getElementById("download-form")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  {language === "de" ? "Kostenlosen Bericht herunterladen" : "Download Free Report"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/10 bg-transparent"
                  onClick={() => {
                    document.getElementById("key-findings")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {language === "de" ? "Wichtigste Erkenntnisse ansehen" : "View Key Findings"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Column - Report Preview */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#8B5CF6]/20 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-[8.5/11] bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-lg flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <FileText className="w-20 h-20 mx-auto mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">
                      {language === "de" ? "Stand der KI in der Bildung" : "State of AI in Education"}
                    </h3>
                    <p className="text-lg opacity-90">
                      {language === "de" ? "Jahresbericht 2025" : "2025 Annual Report"}
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-sm opacity-75">
                        {language === "de" ? "120+ Seiten | 15.000+ Lehrkräfte" : "120+ Pages | 15,000+ Teachers"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold text-[#A78BFA]">87%</div>
                <div className="text-sm text-gray-400">
                  {language === "de" ? "Wöchentliche KI-Nutzung" : "Weekly AI Usage"}
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold text-[#A78BFA]">6.2{language === "de" ? "Std" : "hrs"}</div>
                <div className="text-sm text-gray-400">
                  {language === "de" ? "Zeitersparnis/Woche" : "Time Saved/Week"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Findings Section */}
      <section id="key-findings" className="py-20 px-4 bg-[#1E293B]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "de" ? "Wichtigste Erkenntnisse" : "Key Findings"}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === "de"
                ? "Datengestützte Erkenntnisse, die zeigen, wie KI die Bildung im Jahr 2025 verändert"
                : "Data-driven insights that reveal how AI is transforming education in 2025"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFindings.map((finding, index) => {
              const Icon = finding.icon
              return (
                <Card
                  key={index}
                  className="bg-[#1E293B] border-[#8B5CF6]/20 p-6 hover:border-[#8B5CF6]/40 transition-all"
                >
                  <Icon className="w-10 h-10 text-[#A78BFA] mb-4" />
                  <div className="text-5xl font-bold text-white mb-2">{finding.stat}</div>
                  <div className="text-lg font-semibold text-[#A78BFA] mb-3">{finding.label}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{finding.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "de" ? "Was ist im Bericht enthalten" : "What's Inside the Report"}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === "de"
                ? "Sechs umfassende Abschnitte zu jedem Aspekt der KI-Akzeptanz in der Bildung"
                : "Six comprehensive sections covering every aspect of AI adoption in education"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportSections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card
                  key={index}
                  className="bg-[#1E293B] border-[#8B5CF6]/20 p-6 hover:border-[#8B5CF6]/40 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#8B5CF6]/10 rounded-lg group-hover:bg-[#8B5CF6]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#A78BFA]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 px-4 bg-[#1E293B]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "de" ? "Forschungsmethodik" : "Research Methodology"}
            </h2>
            <p className="text-xl text-gray-300">
              {language === "de"
                ? "Rigorose, datengestützte Forschung, der Sie vertrauen können"
                : "Rigorous, data-driven research you can trust"}
            </p>
          </div>

          <Card className="bg-[#1E293B] border-[#8B5CF6]/20 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {language === "de" ? "Umfragedesign" : "Survey Design"}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {language === "de"
                    ? "Unser Forschungsteam führte eine umfassende Umfrage mit 45 Fragen durch, die zwischen September und November 2024 an K-12-Pädagogen in allen 50 Bundesstaaten verteilt wurde. Die Umfrage umfasste KI-Akzeptanzraten, Anwendungsfälle, Herausforderungen, Schulungsbedarf und Zukunftsausblick."
                    : "Our research team conducted a comprehensive 45-question survey distributed to K-12 educators across all 50 states between September and November 2024. The survey covered AI adoption rates, use cases, challenges, training needs, and future outlook."}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {language === "de" ? "Stichprobendemografie" : "Sample Demographics"}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="font-medium text-[#A78BFA] mb-2">
                      {language === "de" ? "Klassenstufen:" : "Grade Levels:"}
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• {language === "de" ? "Grundschule (K-5): 38%" : "Elementary (K-5): 38%"}</li>
                      <li>• {language === "de" ? "Mittelschule (6-8): 29%" : "Middle School (6-8): 29%"}</li>
                      <li>• {language === "de" ? "Oberschule (9-12): 33%" : "High School (9-12): 33%"}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-[#A78BFA] mb-2">
                      {language === "de" ? "Schultypen:" : "School Types:"}
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• {language === "de" ? "Öffentlich: 76%" : "Public: 76%"}</li>
                      <li>• {language === "de" ? "Privat: 18%" : "Private: 18%"}</li>
                      <li>• {language === "de" ? "Charter: 6%" : "Charter: 6%"}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {language === "de" ? "Datenanalyse" : "Data Analysis"}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {language === "de"
                    ? "Die Antworten wurden mit statistischen Methoden analysiert, um Trends, Korrelationen und signifikante Muster zu identifizieren. Alle Daten wurden anonymisiert und aggregiert, um die Privatsphäre der Teilnehmer zu schützen. Fehlertoleranz: ±0,8% bei 95% Konfidenzniveau."
                    : "Responses were analyzed using statistical methods to identify trends, correlations, and significant patterns. All data was anonymized and aggregated to protect participant privacy. Margin of error: ±0.8% at 95% confidence level."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Download Form Section */}
      <section id="download-form" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#1E293B] border-[#8B5CF6]/20 p-8">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <Download className="w-16 h-16 text-[#A78BFA] mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {language === "de" ? "Vollständigen Bericht herunterladen" : "Download the Full Report"}
                  </h2>
                  <p className="text-gray-300">
                    {language === "de"
                      ? "Erhalten Sie sofortigen Zugang zu allen 120+ Seiten mit Erkenntnissen, Daten und Empfehlungen"
                      : "Get instant access to all 120+ pages of insights, data, and recommendations"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      {language === "de" ? "E-Mail-Adresse *" : "Email Address *"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={language === "de" ? "ihre.email@schule.de" : "your.email@school.edu"}
                      className="bg-[#0F172A] border-[#8B5CF6]/30 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-white mb-2 block">
                      {language === "de" ? "Ihre Rolle *" : "Your Role *"}
                    </Label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-[#0F172A] border border-[#8B5CF6]/30 rounded-md text-white"
                    >
                      <option value="">{language === "de" ? "Wählen Sie Ihre Rolle..." : "Select your role..."}</option>
                      <option value="teacher">{language === "de" ? "Lehrkraft" : "Teacher"}</option>
                      <option value="administrator">{language === "de" ? "Administrator" : "Administrator"}</option>
                      <option value="instructional-coach">
                        {language === "de" ? "Unterrichtscoach" : "Instructional Coach"}
                      </option>
                      <option value="curriculum-director">
                        {language === "de" ? "Lehrplandirektor" : "Curriculum Director"}
                      </option>
                      <option value="technology-coordinator">
                        {language === "de" ? "Technologiekoordinator" : "Technology Coordinator"}
                      </option>
                      <option value="other">{language === "de" ? "Andere" : "Other"}</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  >
                    {isSubmitting ? (
                      language === "de" ? (
                        "Download-Link wird gesendet..."
                      ) : (
                        "Sending Download Link..."
                      )
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        {language === "de" ? "Kostenlosen Bericht herunterladen" : "Download Free Report"}
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    {language === "de"
                      ? "Wir senden Ihnen einen Download-Link per E-Mail. Kein Spam, niemals. Jederzeit abbestellen."
                      : "We'll email you a download link. No spam, ever. Unsubscribe anytime."}
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  {language === "de" ? "Überprüfen Sie Ihre E-Mails!" : "Check Your Email!"}
                </h3>
                <p className="text-gray-300 mb-6">
                  {language === "de" ? "Wir haben den Download-Link an " : "We've sent the download link to "}
                  <strong className="text-[#A78BFA]">{email}</strong>
                  {language === "de" ? " gesendet" : ""}
                </p>
                <p className="text-sm text-gray-400">
                  {language === "de"
                    ? "Nicht gefunden? Überprüfen Sie Ihren Spam-Ordner oder "
                    : "Don't see it? Check your spam folder or "}
                  <button onClick={() => setIsSubmitted(false)} className="text-[#A78BFA] hover:underline">
                    {language === "de" ? "erneut versuchen" : "try again"}
                  </button>
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Media Mentions Section */}
      <section className="py-20 px-4 bg-[#1E293B]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "de" ? "Was die Leute sagen" : "What People Are Saying"}
            </h2>
            <p className="text-xl text-gray-300">
              {language === "de"
                ? "Berichterstattung von führenden Bildungspublikationen"
                : "Coverage from leading education publications"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mediaMentions.map((mention, index) => (
              <Card key={index} className="bg-[#1E293B] border-[#8B5CF6]/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl text-[#A78BFA]">"</div>
                  <div>
                    <p className="text-gray-300 text-lg mb-4 italic leading-relaxed">{mention.quote}</p>
                    <p className="text-[#A78BFA] font-semibold">— {mention.outlet}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Reports Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "de" ? "Frühere Berichte" : "Previous Reports"}
            </h2>
            <p className="text-xl text-gray-300">
              {language === "de"
                ? "Erkunden Sie unser Archiv der jährlichen Berichte zum Stand der KI in der Bildung"
                : "Explore our archive of annual State of AI in Education reports"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {previousReports.map((report, index) => (
              <Card
                key={index}
                className="bg-[#1E293B] border-[#8B5CF6]/20 p-6 hover:border-[#8B5CF6]/40 transition-all group"
              >
                <FileText className="w-12 h-12 text-[#A78BFA] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === "de" ? `Bericht ${report.year}` : `${report.year} Report`}
                </h3>
                <p className="text-gray-400 mb-4">
                  {report.downloads} {language === "de" ? "Downloads" : "downloads"}
                </p>
                <Link
                  href={report.url}
                  className="text-[#A78BFA] hover:text-[#8B5CF6] font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  {language === "de" ? "Bericht herunterladen" : "Download Report"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-20 px-4 bg-[#1E293B]/30">
        <div className="max-w-4xl mx-auto text-center">
          <Share2 className="w-12 h-12 text-[#A78BFA] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "de" ? "Diesen Bericht teilen" : "Share This Report"}
          </h2>
          <p className="text-gray-300 mb-8">
            {language === "de"
              ? "Helfen Sie, diese Erkenntnisse mit Ihren Kollegen und Ihrem Netzwerk zu teilen"
              : "Help spread these insights with your colleagues and network"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/10 bg-transparent"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).gtag) {
                  ;(window as any).gtag("event", "share", {
                    method: "Twitter",
                    content_type: "report",
                  })
                }
              }}
            >
              {language === "de" ? "Auf Twitter teilen" : "Share on Twitter"}
            </Button>
            <Button
              variant="outline"
              className="border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/10 bg-transparent"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).gtag) {
                  ;(window as any).gtag("event", "share", {
                    method: "LinkedIn",
                    content_type: "report",
                  })
                }
              }}
            >
              {language === "de" ? "Auf LinkedIn teilen" : "Share on LinkedIn"}
            </Button>
            <Button
              variant="outline"
              className="border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/10 bg-transparent"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert(language === "de" ? "Link in Zwischenablage kopiert!" : "Link copied to clipboard!")
              }}
            >
              {language === "de" ? "Link kopieren" : "Copy Link"}
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 border-[#8B5CF6]/20 p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "de"
                ? "Bereit, Ihren Unterricht mit KI zu transformieren?"
                : "Ready to Transform Your Teaching with AI?"}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {language === "de"
                ? "Schließen Sie sich 50.000+ Pädagogen an, die Zaza Draft nutzen, um Zeit zu sparen und die Kommunikation zu verbessern"
                : "Join 50,000+ educators using Zaza Draft to save time and improve communication"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                onClick={() => {
                  const event = new CustomEvent("openSignupModal")
                  window.dispatchEvent(event)
                }}
              >
                {language === "de" ? "Kostenlose Testversion starten" : "Start Free Trial"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/10 bg-transparent"
                asChild
              >
                <Link href="/ai-literacy">
                  {language === "de" ? "KI-Kompetenzzentrum erkunden" : "Explore AI Literacy Center"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
