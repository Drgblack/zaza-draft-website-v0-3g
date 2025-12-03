"use client";

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  Star,
  Gift,
  Zap,
  Users,
  MessageSquare,
  Award,
  TrendingUp,
  Heart,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Mail,
  Megaphone,
  BookOpen,
  Video,
  Globe,
  Shield,
} from "lucide-react"

// Removed the original benefits, responsibilities, ambassadors, and faqs arrays as they are now defined within contentEN and contentDE

export default function AmbassadorClient() {
  const { language } = useLanguage()
  const isGerman = language === "de"
  const content = isGerman ? contentDE : contentEN

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    role: "",
    experience: "",
    social: "",
    why: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).analytics) {
      ;(window as any).analytics.track("ambassador_page_viewed", {
        referrer: document.referrer,
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      setError(isGerman ? "Bitte geben Sie eine gültige E-Mail-Adresse ein." : "Please enter a valid email address.")
      return
    }
    setError("")
    setIsSubmitting(true)

    // Track application submission
    if (typeof window !== "undefined" && (window as any).analytics) {
      ;(window as any).analytics.track("ambassador_application_submitted", {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      })
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("TODO: connect ambassador application to Brevo", formData)
      setIsSubmitted(true)
    } catch (err) {
      console.error("[ambassador] submission failed", err)
      setError(isGerman ? "Etwas ist schiefgelaufen. Bitte erneut versuchen." : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Star className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">{content.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {content.hero.title} <span className="gradient-text">{content.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{content.hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6">
                <a href="#apply">{content.hero.ctaPrimary}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
              >
                <a href="#ambassadors">{content.hero.ctaSecondary}</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              {content.hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Gift className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">{content.benefits.badge}</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{content.benefits.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{content.benefits.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.benefits.items.map((benefit, index) => {
              // Directly map icons to benefit items based on order
              const Icon = [Gift, Zap, Users, MessageSquare, Award, TrendingUp][index]
              const colors = [
                "from-purple-500 to-pink-500",
                "from-blue-500 to-cyan-500",
                "from-orange-500 to-red-500",
                "from-green-500 to-emerald-500",
                "from-indigo-500 to-purple-500",
                "from-pink-500 to-rose-500",
              ]
              return (
                <div
                  key={benefit.title}
                  className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group"
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">{content.responsibilities.badge}</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{content.responsibilities.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{content.responsibilities.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.responsibilities.items.map((responsibility, index) => {
              // Directly map icons to responsibility items based on order
              const Icon = [Megaphone, MessageSquare, BookOpen, Video, Users, Globe][index]
              return (
                <div
                  key={responsibility.title}
                  className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6] transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#A78BFA]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{responsibility.title}</h3>
                      <span className="text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-2 py-1 rounded">
                        {responsibility.commitment}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{responsibility.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 border border-[#8B5CF6]/30 rounded-2xl p-8 text-center">
            <Heart className="w-12 h-12 text-[#A78BFA] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">{content.responsibilities.authenticity.title}</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">{content.responsibilities.authenticity.description}</p>
          </div>
        </div>
      </section>

      {/* Current Ambassadors */}
      <section id="ambassadors" className="py-20 bg-[#0F172A] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Users className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">{content.ambassadors.badge}</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{content.ambassadors.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{content.ambassadors.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.ambassadors.people.map((ambassador) => (
              <div
                key={ambassador.name}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20"
              >
                <img
                  src={ambassador.image || "/placeholder.svg"}
                  alt={ambassador.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-[#8B5CF6]/30"
                />
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{ambassador.name}</h3>
                  <p className="text-[#A78BFA] text-sm mb-1">{ambassador.role}</p>
                  <p className="text-gray-400 text-xs">{ambassador.location}</p>
                </div>
                <blockquote className="text-gray-300 text-sm italic mb-6 leading-relaxed">
                  "{ambassador.quote}"
                </blockquote>
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{content.ambassadors.joinedLabel}:</span>
                    <span className="text-white font-medium">{ambassador.joined}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{content.ambassadors.contributionsLabel}:</span>
                    <span className="text-white font-medium">{ambassador.contributions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-[#0B1220] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">{content.application.badge}</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{content.application.title}</h2>
            <p className="text-xl text-gray-300">{content.application.description}</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    {content.application.form.name} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#0F172A] border-white/10 text-white"
                    placeholder={content.application.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    {content.application.form.email} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#0F172A] border-white/10 text-white"
                    placeholder={content.application.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="school" className="block text-white font-medium mb-2">
                    {content.application.form.school} *
                  </label>
                  <Input
                    id="school"
                    name="school"
                    type="text"
                    required
                    value={formData.school}
                    onChange={handleChange}
                    className="bg-[#0F172A] border-white/10 text-white"
                    placeholder={content.application.form.schoolPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-white font-medium mb-2">
                    {content.application.form.role} *
                  </label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-[#0F172A] border-white/10 text-white"
                    placeholder={content.application.form.rolePlaceholder}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-white font-medium mb-2">
                  {content.application.form.experience} *
                </label>
                <Input
                  id="experience"
                  name="experience"
                  type="text"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="bg-[#0F172A] border-white/10 text-white"
                  placeholder={content.application.form.experiencePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="social" className="block text-white font-medium mb-2">
                  {content.application.form.social}
                </label>
                <Input
                  id="social"
                  name="social"
                  type="text"
                  value={formData.social}
                  onChange={handleChange}
                  className="bg-[#0F172A] border-white/10 text-white"
                  placeholder={content.application.form.socialPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="why" className="block text-white font-medium mb-2">
                  {content.application.form.why} * {content.application.form.whyLength}
                </label>
                <Textarea
                  id="why"
                  name="why"
                  required
                  rows={6}
                  value={formData.why}
                  onChange={handleChange}
                  className="bg-[#0F172A] border-white/10 text-white"
                  placeholder={content.application.form.whyPlaceholder}
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg py-6"
              >
                {isSubmitting ? content.application.form.submitting : content.application.form.submit}
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>

              <p className="text-gray-400 text-sm text-center">
                {content.application.form.agreement}{" "}
                <Link href="/legal/terms" className="text-[#A78BFA] hover:underline">
                  {content.application.form.terms}
                </Link>{" "}
                {content.application.form.and}{" "}
                <Link href="/legal/privacy" className="text-[#A78BFA] hover:underline">
                  {content.application.form.privacy}
                </Link>
              </p>
            </form>
          ) : (
            <div className="bg-[#1E293B] border border-[#8B5CF6] rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#A78BFA]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{content.application.success.title}</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">{content.application.success.message}</p>
              <p className="text-sm text-gray-400 mb-6">
                {isGerman
                  ? "Dieses Formular ist aktuell eine Vorschau. Schreiben Sie uns bei Fragen an hello@zazatechnologies.com."
                  : "This form is currently a preview. Email hello@zazatechnologies.com if you have questions."}
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
              >
                <Link href="/">{content.application.success.cta}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{content.faq.title}</h2>
            <p className="text-xl text-gray-300">{content.faq.description}</p>
          </div>

          <div className="space-y-6">
            {content.faq.items.map((faq, index) => (
              <div key={index} className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4">{content.faq.contactPrompt}</p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
            >
              <Link href="/support">
                <Mail className="w-5 h-5 mr-2" />
                {content.faq.contactCta}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const contentEN = {
  hero: {
    badge: "Now Accepting Applications",
    title: "Become a Zaza Draft",
    titleHighlight: "Ambassador",
    description:
      "Join an exclusive community of educators shaping the future of AI in education. Get free lifetime access, exclusive perks, and direct influence on our product roadmap.",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Meet Our Ambassadors",
    stats: [
      { value: "50+", label: "Active Ambassadors" },
      { value: "12", label: "Countries Represented" },
      { value: "500K+", label: "Teachers Reached" },
    ],
  },
  benefits: {
    badge: "Exclusive Benefits",
    title: "What You'll Get",
    description: "Ambassadors receive exclusive perks, recognition, and opportunities to grow professionally",
    items: [
      {
        title: "Exclusive Perks",
        description: "Free lifetime Pro account, exclusive swag, and priority support",
      },
      {
        title: "Early Access",
        description: "Be the first to test new features and provide feedback",
      },
      {
        title: "Private Community",
        description: "Join exclusive Slack channel with product team and fellow ambassadors",
      },
      {
        title: "Direct Influence",
        description: "Shape product roadmap with monthly feedback sessions",
      },
      {
        title: "Recognition",
        description: "Featured on our website, social media, and marketing materials",
      },
      {
        title: "Professional Growth",
        description: "Speaking opportunities, co-marketing, and thought leadership",
      },
    ],
  },
  responsibilities: {
    badge: "What We Ask",
    title: "Ambassador Responsibilities",
    description:
      "We ask for 3-5 hours per month. Some activities are required, others are optional based on your interests",
    items: [
      {
        title: "Share Your Story",
        description: "Post about Zaza Draft on social media 2-3 times per month",
        commitment: "2-3 hours/month",
      },
      {
        title: "Provide Feedback",
        description: "Test new features and share honest feedback with our team",
        commitment: "1-2 hours/month",
      },
      {
        title: "Create Content",
        description: "Write blog posts, create tutorials, or share classroom examples",
        commitment: "Optional",
      },
      {
        title: "Join Community Calls",
        description: "Participate in monthly ambassador calls and Q&A sessions",
        commitment: "1 hour/month",
      },
      {
        title: "Support Teachers",
        description: "Answer questions in community forums and help new users",
        commitment: "Optional",
      },
      {
        title: "Represent Zaza",
        description: "Speak at conferences or present at your school/district",
        commitment: "Optional",
      },
    ],
    authenticity: {
      title: "We Value Authenticity Over Perfection",
      description:
        "You don't need to be a social media expert or create polished content. We want your honest voice and real classroom experiences. Share what works, what doesn't, and help us build something teachers truly love.",
    },
  },
  ambassadors: {
    badge: "Meet the Team",
    title: "Current Ambassadors",
    description: "Hear from educators who are already making an impact as Zaza Draft ambassadors",
    joinedLabel: "Joined",
    contributionsLabel: "Contributions",
    people: [
      {
        name: "Sarah Martinez",
        role: "5th Grade Teacher",
        location: "Austin, TX",
        quote:
          "Being a Zaza Ambassador has transformed how I approach parent communication. I love being part of shaping a tool that truly understands teachers.",
        image: "/professional-teacher-headshot-woman.jpg",
        joined: "March 2025",
        contributions: "12 blog posts, 45 social posts",
      },
      {
        name: "James Chen",
        role: "High School English",
        location: "Seattle, WA",
        quote:
          "The ambassador program gave me a voice in product development. It's incredible to see my feedback implemented in features used by thousands of teachers.",
        image: "/professional-teacher-headshot-man.jpg",
        joined: "January 2025",
        contributions: "8 webinars, 30 social posts",
      },
      {
        name: "Maria Rodriguez",
        role: "Special Education",
        location: "Miami, FL",
        quote:
          "I joined to help make AI tools more accessible for special education. The team listens and acts on our feedback. It's truly collaborative.",
        image: "/professional-teacher-headshot-woman-latina.jpg",
        joined: "February 2025",
        contributions: "15 tutorials, 38 social posts",
      },
    ],
  },
  application: {
    badge: "Join the Program",
    title: "Apply to Become an Ambassador",
    description: "Applications are reviewed on a rolling basis. We'll get back to you within 2 weeks.",
    form: {
      name: "Full Name",
      namePlaceholder: "Jane Smith",
      email: "Email Address",
      emailPlaceholder: "jane@school.edu",
      school: "School/District",
      schoolPlaceholder: "Lincoln Elementary",
      role: "Role/Grade Level",
      rolePlaceholder: "5th Grade Teacher",
      experience: "How long have you been using Zaza Draft?",
      experiencePlaceholder: "3 months",
      social: "Social Media Handles (Twitter, LinkedIn, Instagram, etc.)",
      socialPlaceholder: "@teacherjane on Twitter",
      why: "Why do you want to be a Zaza Draft Ambassador?",
      whyLength: "(200-300 words)",
      whyPlaceholder:
        "Tell us about your passion for AI in education, what you love about Zaza Draft, and how you'd like to contribute...",
      submit: "Submit Application",
      submitting: "Submitting...",
      agreement: "By applying, you agree to our",
      terms: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy",
    },
    success: {
      title: "Application Submitted!",
      message:
        "Thank you for applying to the Zaza Draft Ambassador Program. We'll review your application and get back to you within 2 weeks. Check your email for confirmation.",
      cta: "Return to Home",
    },
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Everything you need to know about the ambassador program",
    contactPrompt: "Still have questions?",
    contactCta: "Contact Us",
    items: [
      {
        question: "Who can become an ambassador?",
        answer:
          "We're looking for passionate educators who actively use Zaza Draft, have a social media presence (even small!), and want to help shape the future of AI in education. All grade levels and subjects welcome.",
      },
      {
        question: "What's the time commitment?",
        answer:
          "We ask for 3-5 hours per month minimum: 2-3 social posts, monthly community call, and occasional feedback sessions. Additional activities like content creation and speaking are optional but encouraged.",
      },
      {
        question: "Do I need to be a social media influencer?",
        answer:
          "Not at all! We value authentic voices over follower counts. Whether you have 100 or 10,000 followers, if you're passionate about AI in education, we want to hear from you.",
      },
      {
        question: "How long is the ambassador term?",
        answer:
          "Ambassador terms are 6 months with the option to renew. This gives you time to make an impact while keeping the program fresh with new perspectives.",
      },
      {
        question: "What if I can't fulfill my responsibilities?",
        answer:
          "Life happens! We understand teachers are busy. Just communicate with us. We're flexible and can adjust expectations or pause your ambassadorship if needed.",
      },
      {
        question: "Can I apply if I'm not currently using Zaza Draft?",
        answer:
          "We prefer ambassadors who are already familiar with our product, but if you're excited about AI in education and willing to dive in, we'd love to hear from you!",
      },
    ],
  },
}

const contentDE = {
  hero: {
    badge: "Bewerbungen werden jetzt angenommen",
    title: "Werden Sie Zaza Draft",
    titleHighlight: "Botschafter",
    description:
      "Treten Sie einer exklusiven Gemeinschaft von PÃ¤dagogen bei, die die Zukunft der KI in der Bildung gestalten. Erhalten Sie kostenlosen lebenslangen Zugang, exklusive Vorteile und direkten Einfluss auf unsere Produktentwicklung.",
    ctaPrimary: "Jetzt bewerben",
    ctaSecondary: "Unsere Botschafter kennenlernen",
    stats: [
      { value: "50+", label: "Aktive Botschafter" },
      { value: "12", label: "Vertretene LÃ¤nder" },
      { value: "500K+", label: "Erreichte LehrkrÃ¤fte" },
    ],
  },
  benefits: {
    badge: "Exklusive Vorteile",
    title: "Was Sie erhalten",
    description:
      "Botschafter erhalten exklusive Vorteile, Anerkennung und MÃ¶glichkeiten zur beruflichen Weiterentwicklung",
    items: [
      {
        title: "Exklusive Vorteile",
        description: "Kostenloses Pro-Konto auf Lebenszeit, exklusive Goodies und vorrangiger Support",
      },
      {
        title: "FrÃ¼her Zugang",
        description: "Seien Sie die Ersten, die neue Funktionen testen und Feedback geben",
      },
      {
        title: "Private Community",
        description: "Treten Sie dem exklusiven Slack-Kanal mit dem Produktteam und anderen Botschaftern bei",
      },
      {
        title: "Direkter Einfluss",
        description: "Gestalten Sie die Produkt-Roadmap mit monatlichen Feedback-Sitzungen",
      },
      {
        title: "Anerkennung",
        description: "PrÃ¤sentation auf unserer Website, in sozialen Medien und Marketingmaterialien",
      },
      {
        title: "Berufliche Entwicklung",
        description: "Vortrags-MÃ¶glichkeiten, Co-Marketing und Thought Leadership",
      },
    ],
  },
  responsibilities: {
    badge: "Was wir erwarten",
    title: "Botschafter-Aufgaben",
    description:
      "Wir bitten um 3-5 Stunden pro Monat. Einige AktivitÃ¤ten sind erforderlich, andere optional je nach Ihren Interessen",
    items: [
      {
        title: "Teilen Sie Ihre Geschichte",
        description: "Posten Sie 2-3 Mal pro Monat ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ber Zaza Draft in sozialen Medien",
        commitment: "2-3 Std./Monat",
      },
      {
        title: "Feedback geben",
        description: "Testen Sie neue Funktionen und teilen Sie ehrliches Feedback mit unserem Team",
        commitment: "1-2 Std./Monat",
      },
      {
        title: "Inhalte erstellen",
        description: "Schreiben Sie BlogbeitrÃ¤ge, erstellen Sie Tutorials oder teilen Sie Klassenraum-Beispiele",
        commitment: "Optional",
      },
      {
        title: "Community-Calls beitreten",
        description: "Nehmen Sie an monatlichen Botschafter-Calls und Q&A-Sitzungen teil",
        commitment: "1 Std./Monat",
      },
      {
        title: "LehrkrÃ¤fte unterstÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼tzen",
        description: "Beantworten Sie Fragen in Community-Foren und helfen Sie neuen Nutzern",
        commitment: "Optional",
      },
      {
        title: "Zaza reprÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤sentieren",
        description: "Sprechen Sie auf Konferenzen oder prÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤sentieren Sie an Ihrer Schule/Ihrem Bezirk",
        commitment: "Optional",
      },
    ],
    authenticity: {
      title: "Wir schÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tzen AuthentizitÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤t ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ber Perfektion",
      description:
        "Sie mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ssen kein Social-Media-Experte sein oder ausgefeilte Inhalte erstellen. Wir mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶chten Ihre ehrliche Stimme und echte Klassenraum-Erfahrungen. Teilen Sie, was funktioniert, was nicht, und helfen Sie uns, etwas zu bauen, das LehrkrÃ¤fte wirklich lieben.",
    },
  },
  ambassadors: {
    badge: "Das Team kennenlernen",
    title: "Aktuelle Botschafter",
    description: "HÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ren Sie von PÃ¤dagogen, die bereits als Zaza Draft-Botschafter einen Unterschied machen",
    joinedLabel: "Beigetreten",
    contributionsLabel: "BeitrÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ge",
    people: [
      {
        name: "Sarah Martinez",
        role: "Grundschullehrerin 5. Klasse",
        location: "Austin, TX",
        quote:
          "Als Zaza-Botschafterin hat sich meine Herangehensweise an die Elternkommunikation verÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ndert. Ich liebe es, Teil der Gestaltung eines Tools zu sein, das LehrkrÃ¤fte wirklich versteht.",
        image: "/professional-teacher-headshot-woman.jpg",
        joined: "MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤rz 2025",
        contributions: "12 BlogbeitrÃ¤ge, 45 Social-Media-Posts",
      },
      {
        name: "James Chen",
        role: "Gymnasiallehrer Englisch",
        location: "Seattle, WA",
        quote:
          "Das Botschafter-Programm gab mir eine Stimme in der Produktentwicklung. Es ist unglaublich zu sehen, wie mein Feedback in Funktionen umgesetzt wird, die von Tausenden von LehrkrÃ¤ften genutzt werden.",
        image: "/professional-teacher-headshot-man.jpg",
        joined: "Januar 2025",
        contributions: "8 Webinare, 30 Social-Media-Posts",
      },
      {
        name: "Maria Rodriguez",
        role: "SonderpÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤dagogik",
        location: "Miami, FL",
        quote:
          "Ich bin beigetreten, um KI-Tools fÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼r die SonderpÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤dagogik zugÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤nglicher zu machen. Das Team hÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rt zu und handelt nach unserem Feedback. Es ist wirklich kollaborativ.",
        image: "/professional-teacher-headshot-woman-latina.jpg",
        joined: "Februar 2025",
        contributions: "15 Tutorials, 38 Social-Media-Posts",
      },
    ],
  },
  application: {
    badge: "Dem Programm beitreten",
    title: "Bewerben Sie sich als Botschafter",
    description: "Bewerbungen werden laufend geprÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ft. Wir melden uns innerhalb von 2 Wochen bei Ihnen.",
    form: {
      name: "VollstÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ndiger Name",
      namePlaceholder: "Anna Schmidt",
      email: "E-Mail-Adresse",
      emailPlaceholder: "anna@schule.de",
      school: "Schule/Bezirk",
      schoolPlaceholder: "Grundschule Musterstadt",
      role: "Rolle/Klassenstufe",
      rolePlaceholder: "Grundschullehrerin 5. Klasse",
      experience: "Wie lange nutzen Sie Zaza Draft bereits?",
      experiencePlaceholder: "3 Monate",
      social: "Social-Media-Profile (Twitter, LinkedIn, Instagram, etc.)",
      socialPlaceholder: "@lehrerin_anna auf Twitter",
      why: "Warum mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶chten Sie Zaza Draft-Botschafter werden?",
      whyLength: "(200-300 WÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶rter)",
      whyPlaceholder:
        "ErzÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤hlen Sie uns von Ihrer Leidenschaft fÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼r KI in der Bildung, was Sie an Zaza Draft lieben und wie Sie beitragen mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶chten...",
      submit: "Bewerbung absenden",
      submitting: "Wird gesendet...",
      agreement: "Mit der Bewerbung stimmen Sie unseren",
      terms: "Nutzungsbedingungen",
      and: "und",
      privacy: "Datenschutzrichtlinien",
    },
    success: {
      title: "Bewerbung eingereicht!",
      message:
        "Vielen Dank fÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼r Ihre Bewerbung zum Zaza Draft-Botschafter-Programm. Wir prÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼fen Ihre Bewerbung und melden uns innerhalb von 2 Wochen bei Ihnen. ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“berprÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼fen Sie Ihre E-Mails fÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼r eine BestÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tigung.",
      cta: "Zur Startseite zurÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ckkehren",
    },
  },
  faq: {
    title: "HÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ufig gestellte Fragen",
    description: "Alles, was Sie ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ber das Botschafter-Programm wissen mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼ssen",
    contactPrompt: "Haben Sie noch Fragen?",
    contactCta: "Kontaktieren Sie uns",
    items: [
      {
        question: "Wer kann Botschafter werden?",
        answer:
          "Wir suchen leidenschaftliche PÃ¤dagogen, die Zaza Draft aktiv nutzen, eine Social-Media-PrÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤senz haben (auch klein!) und die Zukunft der KI in der Bildung mitgestalten mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶chten. Alle Klassenstufen und FÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤cher sind willkommen.",
      },
      {
        question: "Wie hoch ist der Zeitaufwand?",
        answer:
          "Wir bitten um mindestens 3-5 Stunden pro Monat: 2-3 Social-Media-Posts, monatlicher Community-Call und gelegentliche Feedback-Sitzungen. ZusÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tzliche AktivitÃ¤ten wie Content-Erstellung und VortrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ge sind optional, aber erwÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼nscht.",
      },
      {
        question: "Muss ich ein Social-Media-Influencer sein?",
        answer:
          "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“berhaupt nicht! Wir schÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤tzen authentische Stimmen mehr als Follower-Zahlen. Ob Sie 100 oder 10.000 Follower haben - wenn Sie fÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼r KI in der Bildung brennen, mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶chten wir von Ihnen hÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ren.",
      },
      {
        question: "Wie lang ist die Botschafter-Laufzeit?",
        answer:
          "Botschafter-Laufzeiten betragen 6 Monate mit der Option zur VerlÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ngerung. Dies gibt Ihnen Zeit, einen Unterschied zu machen, wÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤hrend das Programm mit neuen Perspektiven frisch bleibt.",
      },
      {
        question: "Was ist, wenn ich meine Aufgaben nicht ErfÃ¼llen kann?",
        answer:
          "Das Leben passiert! Wir verstehen, dass LehrkrÃ¤fte beschÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ftigt sind. Kommunizieren Sie einfach mit uns. Wir sind flexibel und kÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶nnen Erwartungen anpassen oder Ihre Botschafterschaft bei Bedarf pausieren.",
      },
      {
        question: "Kann ich mich bewerben, wenn ich Zaza Draft derzeit nicht nutze?",
        answer:
          "Wir bevorzugen Botschafter, die bereits mit unserem Produkt vertraut sind, aber wenn Sie fÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼r KI in der Bildung begeistert sind und bereit sind, einzutauchen, wÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¼rden wir gerne von Ihnen hÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ren!",
      },
    ],
  },
}

