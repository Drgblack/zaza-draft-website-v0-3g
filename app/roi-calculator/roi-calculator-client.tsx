"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Clock, DollarSign, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react"

export function ROICalculatorClient() {
  const { language } = useLanguage()
  const lang = language === "de" ? "de" : "en"

  // --- STATE ---
  const [numTeachers, setNumTeachers] = useState(50)
  const [hourlyRate, setHourlyRate] = useState(45)
  const [hoursPerWeek, setHoursPerWeek] = useState(10) // Admin hours per week per teacher

  // --- CONSTANTS ---
  const WEEKS_PER_YEAR = 36
  const SAVINGS_PERCENTAGE = 0.70 // 70% savings based on Zaza metrics

  // --- CALCULATIONS ---
  const totalHoursCurrent = numTeachers * hoursPerWeek * WEEKS_PER_YEAR
  const totalCostCurrent = totalHoursCurrent * hourlyRate
  
  const hoursSaved = Math.round(totalHoursCurrent * SAVINGS_PERCENTAGE)
  const moneySaved = Math.round(totalCostCurrent * SAVINGS_PERCENTAGE)
  const hoursSavedPerTeacher = Math.round((hoursSaved / numTeachers) / WEEKS_PER_YEAR * 10) / 10

  // --- CONTENT ---
  const content = {
    en: {
      hero: {
        badge: "ROI Calculator",
        title: "Calculate Your Potential Savings",
        subtitle: "See how much time and money your school could save by reducing administrative workload with Zaza Draft."
      },
      inputs: {
        teachers: "Number of Teachers",
        rate: "Avg. Hourly Rate ($)",
        hours: "Weekly Admin Hours (per teacher)"
      },
      results: {
        annualMoney: "Annual Money Saved",
        annualHours: "Annual Hours Reclaimed",
        perTeacher: "Hours Saved / Teacher / Week"
      },
      cta: {
        title: "Ready to realize these savings?",
        primary: "See Pricing",
        secondary: "Contact Sales"
      },
      explanation: "Calculations are based on an average 36-week school year and a conservative 70% reduction in time spent on emails and reports using Zaza Draft."
    },
    de: {
      hero: {
        badge: "ROI-Rechner",
        title: "Berechnen Sie Ihre potenziellen Einsparungen",
        subtitle: "Sehen Sie, wie viel Zeit und Geld Ihre Schule durch die Reduzierung des Verwaltungsaufwands mit Zaza Draft sparen könnte."
      },
      inputs: {
        teachers: "Anzahl der Lehrkräfte",
        rate: "Durchschn. Stundensatz (€)",
        hours: "Wöchentliche Admin-Stunden (pro Lehrer)"
      },
      results: {
        annualMoney: "Jährliche Gelenersparnis",
        annualHours: "Jährlich zurückgewonnene Stunden",
        perTeacher: "Gesparte Stunden / Lehrer / Woche"
      },
      cta: {
        title: "Bereit, diese Einsparungen zu realisieren?",
        primary: "Preise ansehen",
        secondary: "Vertrieb kontaktieren"
      },
      explanation: "Die Berechnungen basieren auf einem durchschnittlichen Schuljahr von 36 Wochen und einer konservativen Reduzierung der Zeit für E-Mails und Berichte um 70 % bei Verwendung von Zaza Draft."
    }
  }

  const text = content[lang]
  const currencySymbol = lang === "de" ? "€" : "$"

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-US").format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/10 text-purple-300 border-purple-500/20 px-4 py-1.5">
            <Calculator className="w-3 h-3 mr-2" />
            {text.hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            {text.hero.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {text.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-fit">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              Configuration
            </h3>
            
            <div className="space-y-8">
              {/* Teacher Count Slider */}
              <div>
                <div className="flex justify-between text-sm mb-4">
                  <label className="text-gray-300 font-medium">{text.inputs.teachers}</label>
                  <span className="text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded">{numTeachers}</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="1000" step="5"
                  value={numTeachers}
                  onChange={(e) => setNumTeachers(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
                />
              </div>

              {/* Hourly Rate Slider */}
              <div>
                <div className="flex justify-between text-sm mb-4">
                  <label className="text-gray-300 font-medium">{text.inputs.rate}</label>
                  <span className="text-blue-300 font-bold bg-blue-500/10 px-2 py-0.5 rounded">{currencySymbol}{hourlyRate}</span>
                </div>
                <input 
                  type="range" 
                  min="15" max="150" step="1"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                />
              </div>

              {/* Admin Hours Slider */}
              <div>
                <div className="flex justify-between text-sm mb-4">
                  <label className="text-gray-300 font-medium">{text.inputs.hours}</label>
                  <span className="text-green-300 font-bold bg-green-500/10 px-2 py-0.5 rounded">{hoursPerWeek} h</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="40" step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500 leading-relaxed">
              {text.explanation}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main Money Card */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign className="w-32 h-32 text-white" />
              </div>
              <div className="relative z-10">
                <div className="text-purple-300 font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {text.results.annualMoney}
                </div>
                <div className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
                  {currencySymbol}{formatNumber(moneySaved)}
                </div>
                <div className="text-gray-400 text-sm">
                  {lang === "de" ? "pro Schuljahr gespart" : "saved per school year"}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hours Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-colors">
                <div className="text-green-300 font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {text.results.annualHours}
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {formatNumber(hoursSaved)} h
                </div>
                <div className="text-gray-400 text-sm">
                  {lang === "de" ? "entspricht" : "equivalent to"} <span className="text-white font-bold">{formatNumber(Math.round(hoursSaved / 8))}</span> {lang === "de" ? "Arbeitstagen" : "work days"}
                </div>
              </div>

              {/* Per Teacher Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
                <div className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {text.results.perTeacher}
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {hoursSavedPerTeacher} h
                </div>
                <div className="text-gray-400 text-sm">
                   {lang === "de" ? "mehr Zeit für Schüler" : "more time for students"}
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{text.cta.title}</h3>
                <p className="text-gray-400 text-sm">{text.hero.subtitle}</p>
              </div>
              <div className="flex gap-3">
                <Button asChild className="bg-white text-purple-900 hover:bg-gray-100">
                   <Link href="/pricing">{text.cta.primary}</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                   <Link href="/contact">{text.cta.secondary}</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
