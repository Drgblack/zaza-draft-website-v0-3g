"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
  id: string
  question: string
  options: {
    text: string
    value: string
  }[]
}

const questions: Question[] = [
  {
    id: "role",
    question: "What best describes you?",
    options: [
      { text: "Individual Teacher", value: "individual" },
      { text: "School Administrator", value: "admin" },
      { text: "Department Head", value: "department" },
      { text: "District Leader", value: "district" },
    ],
  },
  {
    id: "priority",
    question: "What's your biggest time drain?",
    options: [
      { text: "Parent emails & communication", value: "communication" },
      { text: "Report cards & assessments", value: "reports" },
      { text: "Both equally", value: "both" },
      { text: "Other administrative tasks", value: "other" },
    ],
  },
  {
    id: "volume",
    question: "How many parent emails do you send per week?",
    options: [
      { text: "1-5 emails", value: "low" },
      { text: "6-15 emails", value: "medium" },
      { text: "16-30 emails", value: "high" },
      { text: "30+ emails", value: "very-high" },
    ],
  },
  {
    id: "languages",
    question: "Do you work with multilingual families?",
    options: [
      { text: "Yes, frequently", value: "yes-frequent" },
      { text: "Yes, occasionally", value: "yes-occasional" },
      { text: "Rarely", value: "rarely" },
      { text: "No", value: "no" },
    ],
  },
]

interface Recommendation {
  plan: "free" | "premium" | "team"
  title: string
  description: string
  reasons: string[]
  timeSavings: string
  costBenefit: string
}

export function PricingDecisionTool() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 300)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowResult(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const getRecommendation = (): Recommendation => {
    const role = answers.role
    const volume = answers.volume
    const languages = answers.languages

    // Team plan recommendation
    if (role === "admin" || role === "district" || role === "department") {
      return {
        plan: "team",
        title: "Team Plan",
        description: "Perfect for schools and departments looking to save time across multiple teachers",
        reasons: [
          "Centralized billing and management",
          "Volume discounts for multiple users",
          "Priority support for administrators",
          "Usage analytics and reporting",
          "Custom training and onboarding",
        ],
        timeSavings: "Save 15-20 hours per week across your team",
        costBenefit: "ROI typically achieved within the first month",
      }
    }

    // Premium plan recommendation
    if (volume === "high" || volume === "very-high" || languages === "yes-frequent") {
      return {
        plan: "premium",
        title: "Premium Plan",
        description: "Best value for teachers who communicate frequently with parents",
        reasons: [
          "Unlimited emails and report card comments",
          "Advanced translation for 40+ languages",
          "Priority email support",
          "All premium templates and features",
          "14-day free trial to test it out",
        ],
        timeSavings: "Save 5-8 hours per week on communication",
        costBenefit: "Pays for itself in saved time within 2 weeks",
      }
    }

    // Free plan recommendation
    return {
      plan: "free",
      title: "Free Plan",
      description: "Great starting point to experience Zaza Draft's capabilities",
      reasons: [
        "Try core features at no cost",
        "5 AI-generated emails per month",
        "Access to basic templates",
        "Perfect for occasional use",
        "Upgrade anytime as your needs grow",
      ],
      timeSavings: "Save 1-2 hours per week",
      costBenefit: "Start free, upgrade when you're ready",
    }
  }

  const recommendation = showResult ? getRecommendation() : null

  return (
    <Card className="bg-[#1E293B] border-[#334155] p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Find Your Perfect Plan</h3>
        <p className="text-gray-400">Answer a few quick questions to get a personalized recommendation</p>
      </div>

      {/* Progress Bar */}
      {!showResult && (
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-white mb-6">{questions[currentStep].question}</h4>
            <div className="space-y-3">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                  className="w-full p-4 bg-[#0F172A] hover:bg-[#8B5CF6]/20 border-2 border-[#334155] hover:border-[#8B5CF6] rounded-lg text-left text-white transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-[#A78BFA] group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {recommendation && (
              <div className="space-y-6">
                <div className="text-center">
                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                      recommendation.plan === "premium"
                        ? "bg-[#8B5CF6] text-white"
                        : recommendation.plan === "team"
                          ? "bg-[#FB923C] text-white"
                          : "bg-[#334155] text-gray-300"
                    }`}
                  >
                    Recommended for You
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-2">{recommendation.title}</h4>
                  <p className="text-gray-400 text-lg">{recommendation.description}</p>
                </div>

                <Card className="bg-[#0F172A] border-[#334155] p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">Why this plan is right for you:</h5>
                  <ul className="space-y-3">
                    {recommendation.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-[#8B5CF6]/10 border-[#8B5CF6]/30 p-4">
                    <p className="text-sm text-gray-400 mb-1">Estimated Time Savings</p>
                    <p className="text-lg font-semibold text-white">{recommendation.timeSavings}</p>
                  </Card>
                  <Card className="bg-[#8B5CF6]/10 border-[#8B5CF6]/30 p-4">
                    <p className="text-sm text-gray-400 mb-1">Cost-Benefit</p>
                    <p className="text-lg font-semibold text-white">{recommendation.costBenefit}</p>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    className={`flex-1 py-6 text-lg font-semibold ${
                      recommendation.plan === "premium"
                        ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:scale-105"
                        : recommendation.plan === "team"
                          ? "bg-[#FB923C] text-white hover:bg-[#FB923C]/90"
                          : "bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/90"
                    }`}
                  >
                    {recommendation.plan === "team" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-[#334155] text-gray-300 hover:bg-[#334155]/30 py-6 bg-transparent"
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
