"use client";

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Users,
  Video,
  Play,
  CheckCircle,
  Star,
  Award,
  Download,
  ArrowLeft,
  User,
  BookOpen,
  FileText,
  Share2,
} from "lucide-react"
import { analytics } from "@/lib/analytics"
import { RelatedResources } from "@/components/related-resources"

interface WebinarDetailClientProps {
  webinar: any
}

export default function WebinarDetailClient({ webinar }: WebinarDetailClientProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    analytics.webinars.viewWebinar(webinar.id, webinar.title)
  }, [webinar.id, webinar.title])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email) || !name.trim()) {
      setError("Please enter your name and a valid email.")
      return
    }
    setError("")
    setIsSubmitting(true)
    try {
      analytics.webinars.registerWebinar(webinar.id, webinar.title)
      console.log("TODO: connect webinar registration to Brevo", { email, name, webinarId: webinar.id })
      setIsRegistered(true)
    } catch (err) {
      console.error("[webinar] registration failed", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWatch = () => {
    analytics.webinars.watchRecording(webinar.id, webinar.title)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: webinar.title,
        text: webinar.description,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Back Button */}
      <div className="bg-[#0B1220] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
            <Link href="/webinars">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Webinars
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-16 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
                <Video className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-[#A78BFA] font-medium text-sm capitalize">{webinar.category}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{webinar.title}</h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{webinar.longDescription}</p>

              {/* Webinar Details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {webinar.type === "upcoming" && (
                  <>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-[#A78BFA]" />
                      <span>
                        {new Date(webinar.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-5 h-5 text-[#A78BFA]" />
                      <span>
                        {webinar.time} ({webinar.duration})
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="w-5 h-5 text-[#A78BFA]" />
                      <span>
                        {webinar.attendees}/{webinar.maxAttendees} registered
                      </span>
                    </div>
                  </>
                )}
                {webinar.type === "on-demand" && (
                  <>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-5 h-5 text-[#A78BFA]" />
                      <span>{webinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="w-5 h-5 text-[#A78BFA]" />
                      <span>{webinar.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span>{webinar.rating} rating</span>
                    </div>
                  </>
                )}
                {webinar.certificateOffered && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Award className="w-5 h-5 text-[#A78BFA]" />
                    <span>Certificate included</span>
                  </div>
                )}
              </div>

              {/* Presenter */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {webinar.presenter
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{webinar.presenter}</h3>
                    <p className="text-[#A78BFA] mb-3">{webinar.presenterTitle}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{webinar.presenterBio}</p>
                  </div>
                </div>
              </div>

              {/* Share Button */}
              <Button
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5 bg-transparent"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Webinar
              </Button>
            </div>

            {/* Registration/Watch Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#1E293B] border border-[#8B5CF6] rounded-xl p-8 sticky top-8">
                {webinar.type === "upcoming" && !isRegistered && (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-6">Register Now</h3>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300 mb-2 block">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="bg-[#0F172A] border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300 mb-2 block">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="bg-[#0F172A] border-white/10 text-white"
                        />
                      </div>
                      {error && <p className="text-sm text-red-400">{error}</p>}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white disabled:opacity-60"
                        disabled={webinar.attendees >= webinar.maxAttendees || isSubmitting}
                      >
                        {webinar.attendees >= webinar.maxAttendees
                          ? "Waitlist Full"
                          : isSubmitting
                            ? "Submitting..."
                            : "Register Free"}
                      </Button>
                    </form>
                    <p className="text-sm text-gray-400 text-center mt-4">
                      You'll receive a confirmation email with the webinar link. This preview form is not yet wired to
                      Brevo—email hello@zazatechnologies.com if you need help.
                    </p>
                  </>
                )}

                {webinar.type === "upcoming" && isRegistered && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">You're Registered!</h3>
                    <p className="text-gray-300 mb-6">
                      Check your email for the webinar link and calendar invite. We'll send you a reminder 24 hours
                      before the session. If you do not receive it, email hello@zazatechnologies.com and we will
                      confirm your spot.
                    </p>
                    <Button asChild variant="outline" className="w-full border-white/10 text-gray-300 bg-transparent">
                      <Link href="/webinars">Browse More Webinars</Link>
                    </Button>
                  </div>
                )}

                {webinar.type === "on-demand" && (
                  <>
                    <div className="relative bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-lg h-48 flex items-center justify-center mb-6">
                      <Play className="w-20 h-20 text-white" />
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white mb-4"
                      onClick={handleWatch}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Now
                    </Button>
                    <p className="text-sm text-gray-400 text-center">
                      Lifetime access â€¢ Certificate included â€¢ Downloadable resources
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-16 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-[#1E293B] border border-white/10 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#8B5CF6]">
                <BookOpen className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="agenda" className="data-[state=active]:bg-[#8B5CF6]">
                <Clock className="w-4 h-4 mr-2" />
                Agenda
              </TabsTrigger>
              <TabsTrigger value="materials" className="data-[state=active]:bg-[#8B5CF6]">
                <FileText className="w-4 h-4 mr-2" />
                Materials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Learning Outcomes */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn</h3>
                <div className="space-y-3">
                  {webinar.learningOutcomes.map((outcome: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Covered */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Topics Covered</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {webinar.topics.map((topic: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-[#8B5CF6] rounded-full" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Prerequisites</h3>
                <div className="space-y-3">
                  {webinar.prerequisites.map((prereq: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <User className="w-5 h-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{prereq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agenda">
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Session Agenda</h3>
                <div className="space-y-6">
                  {webinar.agenda.map((item: any, index: number) => (
                    <div key={index} className="flex gap-6 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center">
                          <span className="text-[#A78BFA] font-bold text-sm">{item.time}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">{item.topic}</h4>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="materials">
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Downloadable Materials</h3>
                <p className="text-gray-300 mb-8">All registered participants receive access to these resources:</p>
                <div className="space-y-4">
                  {webinar.materials.map((material: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#0F172A] border border-white/10 rounded-lg hover:border-[#8B5CF6] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-[#A78BFA]" />
                        <span className="text-white">{material}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Resources */}
      <RelatedResources
        title="Continue Learning"
        description="Explore related resources to deepen your understanding"
        resources={[
          {
            title: "AI Literacy Courses",
            description: "Self-paced courses with certification",
            href: "/ai-literacy",
            icon: BookOpen,
            color: "#8B5CF6",
          },
          {
            title: "More Webinars",
            description: "Browse our full webinar library",
            href: "/webinars",
            icon: Video,
            color: "#A78BFA",
          },
          {
            title: "Community Forum",
            description: "Discuss with fellow teachers",
            href: "/community",
            icon: Users,
            color: "#8B5CF6",
          },
        ]}
      />
    </div>
  )
}
