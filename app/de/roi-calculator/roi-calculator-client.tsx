"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, DollarSign, Calendar, TrendingUp, Download, Mail, Share2, ChevronDown } from "lucide-react"
import Link from "next/link"

type UserType = "teacher" | "admin" | "district"

export function ROICalculatorClient() {
  const [userType, setUserType] = useState<UserType>("teacher")
  const [numTeachers, setNumTeachers] = useState(1)
  const [emailsPerWeek, setEmailsPerWeek] = useState(10)
  const [minutesPerEmail, setMinutesPerEmail] = useState(20)
  const [reportsPerYear, setReportsPerYear] = useState(25)
  const [minutesPerReport, setMinutesPerReport] = useState(15)
  const [hourlyRate, setHourlyRate] = useState(35)
  const [showMethodology, setShowMethodology] = useState(false)

  // Calculations
  const emailTimeReduction = 0.75 // 75%
  const reportTimeReduction = 0.7 // 70%

  const currentEmailHours = (emailsPerWeek * minutesPerEmail * 52) / 60
  const newEmailHours = currentEmailHours * (1 - emailTimeReduction)
  const emailHoursSaved = currentEmailHours - newEmailHours

  const currentReportHours = (reportsPerYear * minutesPerReport) / 60
  const newReportHours = currentReportHours * (1 - reportTimeReduction)
  const reportHoursSaved = currentReportHours - newReportHours

  const totalHoursSaved = emailHoursSaved + reportHoursSaved
  const totalDollarsSaved = totalHoursSaved * hourlyRate

  const totalHoursSavedAllTeachers = totalHoursSaved * numTeachers
  const totalDollarsSavedAllTeachers = totalDollarsSaved * numTeachers

  const weeksEquivalent = (totalHoursSaved / 40).toFixed(1)
  const breakEvenDays = Math.ceil((99 / (totalDollarsSaved / 365)) * 1) // Assuming $99/year subscription

  useEffect(() => {
    // Update defaults based on user type
    if (userType === "teacher") {
      setNumTeachers(1)
    } else if (userType === "admin") {
      setNumTeachers(25)
    } else if (userType === "district") {
      setNumTeachers(100)
    }
  }, [userType])

  const loadScenario = (scenario: string) => {
    switch (scenario) {
      case "elementary":
        setUserType("teacher")
        setNumTeachers(1)
        setEmailsPerWeek(12)
        setMinutesPerEmail(20)
        setReportsPerYear(25)
        setMinutesPerReport(15)
        break
      case "secondary":
        setUserType("teacher")
        setNumTeachers(1)
        setEmailsPerWeek(8)
        setMinutesPerEmail(18)
        setReportsPerYear(120)
        setMinutesPerReport(12)
        break
      case "small-school":
        setUserType("admin")
        setNumTeachers(15)
        setEmailsPerWeek(10)
        setMinutesPerEmail(20)
        setReportsPerYear(50)
        setMinutesPerReport(15)
        break
      case "district":
        setUserType("district")
        setNumTeachers(150)
        setEmailsPerWeek(10)
        setMinutesPerEmail(20)
        setReportsPerYear(50)
        setMinutesPerReport(15)
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/10 text-purple-300 border-purple-500/20 px-4 py-1.5">
            Based on data from 10,000+ teachers
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            Calculate Your Time Savings with Zaza Draft
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            See exactly how many hours and dollars Zaza Draft saves your teachers or district.
          </p>
        </div>
      </section>

      {/* Quick Scenarios */}
      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Quick Start Scenarios</h2>
            <p className="text-gray-400">Click to load a pre-filled scenario, then customize</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { id: "elementary", label: "Elementary Teacher", desc: "1 classroom" },
              { id: "secondary", label: "Secondary Teacher", desc: "5 classes" },
              { id: "small-school", label: "Small School", desc: "15 teachers" },
              { id: "district", label: "Mid-Size District", desc: "150 teachers" },
            ].map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => loadScenario(scenario.id)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl p-4 text-left transition-all"
              >
                <div className="font-semibold text-white mb-1">{scenario.label}</div>
                <div className="text-sm text-gray-400">{scenario.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Interface */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>

              <div className="space-y-6">
                {/* User Type */}
                <div>
                  <Label htmlFor="userType" className="text-white mb-2 block">
                    I am a:
                  </Label>
                  <Select value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Individual Teacher</SelectItem>
                      <SelectItem value="admin">School Administrator</SelectItem>
                      <SelectItem value="district">District Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of Teachers */}
                <div>
                  <Label htmlFor="numTeachers" className="text-white mb-2 block">
                    Number of Teachers: {numTeachers}
                  </Label>
                  <Input
                    id="numTeachers"
                    type="number"
                    min={1}
                    max={10000}
                    value={numTeachers}
                    onChange={(e) => setNumTeachers(Number(e.target.value))}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                {/* Emails per Week */}
                <div>
                  <Label className="text-white mb-2 block">Parent Emails per Teacher per Week: {emailsPerWeek}</Label>
                  <Slider
                    value={[emailsPerWeek]}
                    onValueChange={(value) => setEmailsPerWeek(value[0])}
                    min={0}
                    max={50}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-400">Include individual emails, updates, and responses</p>
                </div>

                {/* Minutes per Email */}
                <div>
                  <Label className="text-white mb-2 block">Minutes per Email Currently: {minutesPerEmail}</Label>
                  <Slider
                    value={[minutesPerEmail]}
                    onValueChange={(value) => setMinutesPerEmail(value[0])}
                    min={5}
                    max={60}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-400">Time from drafting to sending</p>
                </div>

                {/* Reports per Year */}
                <div>
                  <Label htmlFor="reportsPerYear" className="text-white mb-2 block">
                    Report Cards per Teacher per Year: {reportsPerYear}
                  </Label>
                  <Input
                    id="reportsPerYear"
                    type="number"
                    min={0}
                    max={500}
                    value={reportsPerYear}
                    onChange={(e) => setReportsPerYear(Number(e.target.value))}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Total student reports written annually</p>
                </div>

                {/* Minutes per Report */}
                <div>
                  <Label className="text-white mb-2 block">Minutes per Report Card Comment: {minutesPerReport}</Label>
                  <Slider
                    value={[minutesPerReport]}
                    onValueChange={(value) => setMinutesPerReport(value[0])}
                    min={5}
                    max={30}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-400">Average time writing comments per student</p>
                </div>

                {/* Hourly Rate */}
                <div>
                  <Label htmlFor="hourlyRate" className="text-white mb-2 block">
                    Average Teacher Hourly Rate: ${hourlyRate}
                  </Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    min={15}
                    max={100}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Based on salary + benefits. US average is $35/hr</p>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-6">
              {/* Primary Metrics */}
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6">
                  <Clock className="w-10 h-10 text-purple-400 mb-3" />
                  <div className="text-4xl font-bold text-white mb-2">
                    {totalHoursSavedAllTeachers.toFixed(0)} hours/year
                  </div>
                  <div className="text-gray-300 mb-3">That's {weeksEquivalent} weeks returned to teaching</div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: `${(totalHoursSaved / 300) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6">
                  <DollarSign className="w-10 h-10 text-green-400 mb-3" />
                  <div className="text-4xl font-bold text-white mb-2">
                    ${totalDollarsSavedAllTeachers.toFixed(0)}/year
                  </div>
                  <div className="text-gray-300">In teacher time saved</div>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6">
                  <Calendar className="w-10 h-10 text-blue-400 mb-3" />
                  <div className="text-4xl font-bold text-white mb-2">{breakEvenDays} days</div>
                  <div className="text-gray-300">Time to ROI with Zaza Draft</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Detailed Breakdown</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Email Communication Savings</span>
                      <span className="text-white font-semibold">{emailHoursSaved.toFixed(1)} hrs/year</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Current: {currentEmailHours.toFixed(0)} hrs → With Zaza: {newEmailHours.toFixed(0)} hrs
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Report Card Savings</span>
                      <span className="text-white font-semibold">{reportHoursSaved.toFixed(1)} hrs/year</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Current: {currentReportHours.toFixed(0)} hrs → With Zaza: {newReportHours.toFixed(0)} hrs
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total Annual Savings</span>
                      <span className="text-purple-400">{totalHoursSaved.toFixed(1)} hrs</span>
                    </div>
                    {numTeachers > 1 && (
                      <div className="text-sm text-gray-400 mt-1">
                        × {numTeachers} teachers = {totalHoursSavedAllTeachers.toFixed(0)} hours total
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Alternative Uses */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  With {totalHoursSaved.toFixed(0)} hours saved, you could:
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Provide 1-on-1 support to struggling students</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Develop new curriculum units</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Invest in professional development</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Actually take your prep periods</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Reduce evening/weekend work</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Results
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 col-span-2 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Admin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">How We Calculate</h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${showMethodology ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {showMethodology && (
            <div className="bg-white/5 border border-white/10 border-t-0 rounded-b-xl p-6 text-gray-300 space-y-3">
              <p>• Time savings based on average of 10,000+ active teachers</p>
              <p>• Email time reduction: Median 75% (range: 60-85%)</p>
              <p>• Report time reduction: Median 70% (range: 55-80%)</p>
              <p>• Cost calculations use your provided hourly rate or national average</p>
              <p>• Estimates assume consistent usage throughout the year</p>
              <p className="pt-3 text-sm text-gray-400">
                Based on self-reported user surveys and usage analytics. Your results may vary based on teaching style
                and context.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to save {totalHoursSaved.toFixed(0)} hours this year?
          </h2>
          <p className="text-xl text-gray-300 mb-8">Start your free trial today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-6 rounded-full shadow-lg shadow-purple-500/25"
            >
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full bg-transparent"
            >
              <Link href="/pricing">See Pricing Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Zaza Draft ROI Calculator",
            description: "Calculate time and cost savings for teachers using AI communication tools",
            url: "https://zazadraft.com/roi-calculator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </div>
  )
}
