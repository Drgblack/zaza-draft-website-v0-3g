"use client"

import { Button } from "@/components/ui/button"
import { Clock, Heart, Users, Globe, Flame, Sparkles } from "lucide-react"
import { SignupModal } from "@/components/signup-modal"
import { useState } from "react"
import Image from "next/image"

export default function TeacherStoriesPage() {
  const [signupOpen, setSignupOpen] = useState(false)

  const stories = [
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      alt: "Sarah K., Year 4 Teacher",
      name: "Sarah K.",
      role: "Year 4 Teacher, Manchester",
      story:
        "I used to dread writing emails to parents about behaviour. It always felt like walking on eggshells. With Draft, I paste my message, choose 'supportive' tone, and it instantly helps me rewrite it so it's clear but kind. What used to take me 30 minutes now takes 5 - and parents respond positively instead of defensively.",
      impacts: [
        { icon: Clock, text: "25 minutes saved per email" },
        { icon: Heart, text: "Less stress" },
        { icon: Users, text: "Stronger parent partnerships" },
      ],
      tag: "Parent Communication",
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      alt: "James M., Secondary English Teacher",
      name: "James M.",
      role: "Secondary English Teacher, Bristol",
      story:
        "Report season used to mean late nights and weekends gone. With Draft, I generate personalised comments for each student, then refine them with my own voice. It feels like having a supportive co-writer who never gets tired. I finished my reports a full week earlier this year and actually had energy left to enjoy the summer break.",
      impacts: [
        { icon: Clock, text: "15+ hours saved per term" },
        { icon: Flame, text: "Reduced burnout" },
        { icon: Sparkles, text: "More personal, meaningful feedback" },
      ],
      tag: "Report Writing",
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      alt: "Priya S., Primary Teacher",
      name: "Priya S.",
      role: "Primary Teacher, Birmingham",
      story:
        "I teach in a diverse school where many parents don't speak English at home. Draft helps me translate my messages into six different languages and adjust the tone so they sound warm and professional in every language. Parents tell me they finally feel included in their child's learning, and I feel confident that nothing gets lost in translation.",
      impacts: [
        { icon: Globe, text: "100% of families reached" },
        { icon: Users, text: "Stronger cross-cultural relationships" },
        { icon: Sparkles, text: "More inclusive community" },
      ],
      tag: "Multilingual Support",
    },
  ]

  return (
    <>
      <main className="min-h-screen bg-[#0F172A]">
        {/* Hero Section */}
        <section className="text-center py-20 px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">Teacher Stories</h1>
          <p className="text-xl md:text-2xl text-gray-400 text-balance">Real teachers. Real time saved. Real impact.</p>
        </section>

        {/* Teacher Story Cards */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.alt}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-[3px] border-purple-500/30 shadow-md"
                  />
                </div>

                {/* Name and Role */}
                <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{story.role}</p>

                {/* Story Quote */}
                <blockquote className="text-gray-300 italic mb-6 leading-relaxed">"{story.story}"</blockquote>

                {/* Impact Section */}
                <div className="space-y-3 mb-4">
                  {story.impacts.map((impact, impactIndex) => (
                    <div key={impactIndex} className="flex items-start gap-3">
                      <impact.icon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{impact.text}</span>
                    </div>
                  ))}
                </div>

                {/* Tag */}
                <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium">
                  {story.tag}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Ready to Reclaim Your Time?</h2>
            <p className="text-xl text-gray-100 mb-8 text-balance leading-relaxed">
              Join thousands of teachers who are writing less and connecting more. Start your 7-day free trial and see
              how Draft can transform your workload.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={() => setSignupOpen(true)}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full"
              >
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Full access to all features</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  )
}
 
