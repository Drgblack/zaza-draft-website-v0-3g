"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Gift, Clock, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface ExitIntentPopupProps {
  pageType?: "home" | "pricing" | "blog" | "comparison" | "default"
}

export function ExitIntentPopup({ pageType = "default" }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem("exitIntentShown")
    if (popupShown) {
      setHasShown(true)
      return
    }

    let exitIntentTriggered = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving toward top of screen (to close tab/window)
      if (e.clientY <= 10 && !exitIntentTriggered && !hasShown) {
        exitIntentTriggered = true
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem("exitIntentShown", "true")
      }
    }

    // Add event listener after a short delay to avoid triggering on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasShown])

  const getContent = () => {
    switch (pageType) {
      case "home":
        return {
          icon: <Clock className="h-12 w-12 text-[#8B5CF6]" />,
          headline: "Wait! Before You Go...",
          subheadline: "See how much time Zaza Draft can save you",
          description:
            "Teachers using Zaza Draft save 5-8 hours per week on parent communication. That's time you can spend on what matters most - your students.",
          benefits: [
            "Write parent emails in 30 seconds instead of 15 minutes",
            "Generate report card comments in minutes, not hours",
            "Translate messages into 40+ languages instantly",
          ],
          primaryCta: "Try Free for 14 Days",
          secondaryCta: "Calculate My Time Savings",
          secondaryLink: "/roi-calculator",
        }
      case "pricing":
        return {
          icon: <Gift className="h-12 w-12 text-[#8B5CF6]" />,
          headline: "Special Offer: Extended Trial",
          subheadline: "Get 21 days free instead of 14",
          description:
            "We want to make sure you have enough time to experience the full value of Zaza Draft. Start your extended trial now - no credit card required.",
          benefits: [
            "Full access to all premium features",
            "Priority email support",
            "Cancel anytime, no questions asked",
          ],
          primaryCta: "Claim Extended Trial",
          secondaryCta: "See Pricing Details",
          secondaryLink: "/pricing",
        }
      case "blog":
        return {
          icon: <TrendingUp className="h-12 w-12 text-[#8B5CF6]" />,
          headline: "Want More Teaching Tips?",
          subheadline: "Join 10,000+ teachers getting our weekly newsletter",
          description:
            "Get practical communication strategies, time-saving tips, and exclusive templates delivered to your inbox every week.",
          benefits: [
            "Weekly teaching tips and strategies",
            "Free email templates and resources",
            "Early access to new features",
          ],
          primaryCta: "Subscribe to Newsletter",
          secondaryCta: "Try Zaza Draft Free",
          secondaryLink: "/pricing",
        }
      case "comparison":
        return {
          icon: <Clock className="h-12 w-12 text-[#8B5CF6]" />,
          headline: "Still Comparing Options?",
          subheadline: "Try Zaza Draft risk-free for 14 days",
          description:
            "The best way to know if Zaza Draft is right for you is to try it. Start your free trial today - no credit card required, cancel anytime.",
          benefits: [
            "Full access to all features during trial",
            "Compare side-by-side with your current tool",
            "Get personalized onboarding support",
          ],
          primaryCta: "Start Free Trial",
          secondaryCta: "Talk to Our Team",
          secondaryLink: "/contact",
        }
      default:
        return {
          icon: <Clock className="h-12 w-12 text-[#8B5CF6]" />,
          headline: "Before You Go...",
          subheadline: "Discover how Zaza Draft can save you hours every week",
          description:
            "Join thousands of teachers who have reclaimed their time with AI-powered parent communication and report writing.",
          benefits: [
            "14-day free trial, no credit card required",
            "Save 5-8 hours per week on communication",
            "FERPA-compliant and teacher-approved",
          ],
          primaryCta: "Try Free for 14 Days",
          secondaryCta: "Learn More",
          secondaryLink: "/",
        }
    }
  }

  const content = getContent()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl bg-[#1E293B] border-[#334155] p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] p-8 text-center">
            <div className="flex justify-center mb-4">{content.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{content.headline}</h2>
            <p className="text-xl text-white/90">{content.subheadline}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">{content.description}</p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {content.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <div className="h-6 w-6 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setIsOpen(false)
                  // Trigger signup modal or navigate
                  window.dispatchEvent(new CustomEvent("openSignupModal"))
                }}
                className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:scale-105 py-6 text-lg font-semibold transition-transform"
              >
                {content.primaryCta}
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false)
                  window.location.href = content.secondaryLink
                }}
                variant="outline"
                className="flex-1 border-[#334155] text-gray-300 hover:bg-[#334155]/30 py-6 text-lg"
              >
                {content.secondaryCta}
              </Button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 pt-6 border-t border-[#334155] flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span>✓ No credit card required</span>
              <span>✓ Cancel anytime</span>
              <span>✓ FERPA compliant</span>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
