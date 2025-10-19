"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  Users,
  BookOpen,
  Video,
  MessageSquare,
  Twitter,
  Linkedin,
  Globe,
  Mail,
  Star,
  CheckCircle,
} from "lucide-react"

// Ambassador data
const ambassadorData: Record<string, any> = {
  "sarah-martinez": {
    name: "Sarah Martinez",
    role: "5th Grade Teacher",
    school: "Lincoln Elementary School",
    location: "Austin, TX",
    joined: "March 2025",
    image: "/professional-teacher-headshot-woman.jpg",
    bio: "Sarah is a passionate educator with 8 years of teaching experience. She specializes in integrating technology into her classroom and has been an early adopter of AI tools for education. Sarah is particularly interested in using AI to improve parent communication and reduce administrative burden.",
    quote:
      "Being a Zaza Ambassador has transformed how I approach parent communication. I love being part of shaping a tool that truly understands teachers.",
    achievements: [
      {
        icon: BookOpen,
        label: "12 Blog Posts",
        description: "Written comprehensive guides on AI in elementary education",
      },
      { icon: MessageSquare, label: "45 Social Posts", description: "Shared classroom success stories and tips" },
      { icon: Users, label: "200+ Teachers Helped", description: "Answered questions in community forums" },
      { icon: Video, label: "3 Webinars", description: "Presented on parent communication strategies" },
    ],
    contributions: [
      {
        type: "Blog Post",
        title: "5 Ways AI Transformed My Parent Communication",
        date: "December 2024",
        link: "/blog/ai-parent-communication-elementary",
      },
      {
        type: "Webinar",
        title: "Getting Started with AI in Elementary School",
        date: "November 2024",
        link: "/webinars/ai-elementary-getting-started",
      },
      {
        type: "Tutorial",
        title: "Creating Effective Parent Update Templates",
        date: "October 2024",
        link: "/resources/parent-update-templates",
      },
    ],
    expertise: ["Parent Communication", "Elementary Education", "Classroom Management", "AI Integration"],
    social: {
      twitter: "https://twitter.com/teachersarah",
      linkedin: "https://linkedin.com/in/sarahmartinez",
      email: "sarah@example.com",
    },
    testimonials: [
      {
        author: "James Chen",
        role: "Fellow Ambassador",
        text: "Sarah's insights on elementary education have been invaluable. She has a gift for explaining complex AI concepts in simple terms.",
      },
      {
        author: "Emily Rodriguez",
        role: "5th Grade Teacher",
        text: "I attended Sarah's webinar and it completely changed how I communicate with parents. Her templates save me hours every week!",
      },
    ],
  },
  "james-chen": {
    name: "James Chen",
    role: "High School English Teacher",
    school: "Roosevelt High School",
    location: "Seattle, WA",
    joined: "January 2025",
    image: "/professional-teacher-headshot-man.jpg",
    bio: "James has been teaching high school English for 12 years and is passionate about using AI to help students improve their writing skills. He's particularly interested in how AI can provide personalized feedback at scale while maintaining the human element of teaching.",
    quote:
      "The ambassador program gave me a voice in product development. It's incredible to see my feedback implemented in features used by thousands of teachers.",
    achievements: [
      { icon: Video, label: "8 Webinars", description: "Led sessions on AI for writing instruction" },
      { icon: MessageSquare, label: "30 Social Posts", description: "Shared student success stories" },
      { icon: BookOpen, label: "6 Blog Posts", description: "Written about AI ethics in education" },
      { icon: Users, label: "150+ Teachers Helped", description: "Mentored new AI adopters" },
    ],
    contributions: [
      {
        type: "Webinar",
        title: "AI-Powered Writing Feedback That Works",
        date: "December 2024",
        link: "/webinars/ai-writing-feedback",
      },
      {
        type: "Blog Post",
        title: "Balancing AI and Human Feedback in English Class",
        date: "November 2024",
        link: "/blog/ai-human-feedback-balance",
      },
      {
        type: "Case Study",
        title: "How AI Helped My Students Improve Writing Scores by 23%",
        date: "October 2024",
        link: "/success-stories/writing-improvement",
      },
    ],
    expertise: ["Writing Instruction", "High School Education", "AI Ethics", "Student Feedback"],
    social: {
      twitter: "https://twitter.com/mrchen",
      linkedin: "https://linkedin.com/in/jameschen",
      website: "https://jameschen.com",
    },
    testimonials: [
      {
        author: "Maria Rodriguez",
        role: "Fellow Ambassador",
        text: "James brings a thoughtful, ethical perspective to AI in education. His webinars are always packed with practical strategies.",
      },
      {
        author: "David Kim",
        role: "English Department Head",
        text: "James's approach to AI-powered feedback has transformed our entire department. His insights are invaluable.",
      },
    ],
  },
  "maria-rodriguez": {
    name: "Maria Rodriguez",
    role: "Special Education Teacher",
    school: "Sunshine Academy",
    location: "Miami, FL",
    joined: "February 2025",
    image: "/professional-teacher-headshot-woman-latina.jpg",
    bio: "Maria has 10 years of experience in special education and is passionate about making AI tools accessible for all learners. She focuses on how AI can support differentiated instruction and help students with diverse learning needs succeed.",
    quote:
      "I joined to help make AI tools more accessible for special education. The team listens and acts on our feedback. It's truly collaborative.",
    achievements: [
      { icon: BookOpen, label: "15 Tutorials", description: "Created accessibility-focused guides" },
      { icon: MessageSquare, label: "38 Social Posts", description: "Shared inclusive teaching strategies" },
      { icon: Users, label: "100+ Teachers Helped", description: "Supported special education teachers" },
      { icon: Video, label: "5 Webinars", description: "Presented on differentiation with AI" },
    ],
    contributions: [
      {
        type: "Tutorial",
        title: "Making AI Tools Accessible for All Learners",
        date: "December 2024",
        link: "/resources/ai-accessibility-guide",
      },
      {
        type: "Webinar",
        title: "Differentiation Made Easy with AI",
        date: "November 2024",
        link: "/webinars/ai-differentiation",
      },
      {
        type: "Blog Post",
        title: "How AI Supports My Special Education Students",
        date: "October 2024",
        link: "/blog/ai-special-education",
      },
    ],
    expertise: ["Special Education", "Differentiation", "Accessibility", "Inclusive Teaching"],
    social: {
      twitter: "https://twitter.com/mariateaches",
      linkedin: "https://linkedin.com/in/mariarodriguez",
      email: "maria@example.com",
    },
    testimonials: [
      {
        author: "Sarah Martinez",
        role: "Fellow Ambassador",
        text: "Maria's work on accessibility has made Zaza Draft better for all students. Her passion for inclusive education is inspiring.",
      },
      {
        author: "Jennifer Lee",
        role: "Special Education Coordinator",
        text: "Maria's tutorials have helped our entire special education team adopt AI tools effectively. She's a true leader.",
      },
    ],
  },
}

export default function AmbassadorProfileClient({ slug }: { slug: string }) {
  const ambassador = ambassadorData[slug]

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).analytics) {
      ;(window as any).analytics.track("ambassador_profile_viewed", {
        ambassador_name: ambassador?.name,
        ambassador_slug: slug,
      })
    }
  }, [slug, ambassador])

  if (!ambassador) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Ambassador Not Found</h1>
          <Button asChild>
            <Link href="/ambassadors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ambassadors
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Back Button */}
      <div className="bg-[#0B1220] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
            <Link href="/ambassadors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ambassadors
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={ambassador.image || "/placeholder.svg"}
                alt={ambassador.name}
                className="w-48 h-48 rounded-2xl border-4 border-[#8B5CF6]/30 shadow-2xl"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-4">
                <Star className="w-5 h-5 text-[#A78BFA]" />
                <span className="text-[#A78BFA] font-medium text-sm">Zaza Draft Ambassador</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">{ambassador.name}</h1>
              <p className="text-2xl text-[#A78BFA] mb-6">{ambassador.role}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-[#A78BFA]" />
                  <span>{ambassador.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-5 h-5 text-[#A78BFA]" />
                  <span>Joined {ambassador.joined}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Award className="w-5 h-5 text-[#A78BFA]" />
                  <span>{ambassador.school}</span>
                </div>
              </div>

              <blockquote className="text-xl text-gray-300 italic mb-8 pl-6 border-l-4 border-[#8B5CF6]">
                "{ambassador.quote}"
              </blockquote>

              {/* Social Links */}
              <div className="flex gap-4">
                {ambassador.social.twitter && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-[#8B5CF6] text-[#A78BFA] bg-transparent"
                  >
                    <a href={ambassador.social.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                )}
                {ambassador.social.linkedin && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-[#8B5CF6] text-[#A78BFA] bg-transparent"
                  >
                    <a href={ambassador.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {ambassador.social.website && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-[#8B5CF6] text-[#A78BFA] bg-transparent"
                  >
                    <a href={ambassador.social.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                {ambassador.social.email && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-[#8B5CF6] text-[#A78BFA] bg-transparent"
                  >
                    <a href={`mailto:${ambassador.social.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">About {ambassador.name.split(" ")[0]}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{ambassador.bio}</p>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Achievements</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {ambassador.achievements.map((achievement: any, index: number) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={index}
                        className="bg-[#1E293B] border border-white/10 rounded-xl p-6 hover:border-[#8B5CF6] transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-[#A78BFA]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{achievement.label}</h3>
                            <p className="text-gray-300 text-sm">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recent Contributions */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Recent Contributions</h2>
                <div className="space-y-4">
                  {ambassador.contributions.map((contribution: any, index: number) => (
                    <Link
                      key={index}
                      href={contribution.link}
                      className="block bg-[#1E293B] border border-white/10 rounded-xl p-6 hover:border-[#8B5CF6] transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
                              {contribution.type}
                            </span>
                            <span className="text-sm text-gray-400">{contribution.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                            {contribution.title}
                          </h3>
                        </div>
                        <CheckCircle className="w-6 h-6 text-[#A78BFA] flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">What Others Say</h2>
                <div className="space-y-6">
                  {ambassador.testimonials.map((testimonial: any, index: number) => (
                    <div key={index} className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                      <p className="text-gray-300 text-lg italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-[#A78BFA]" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{testimonial.author}</div>
                          <div className="text-sm text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Expertise */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {ambassador.expertise.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 border border-[#8B5CF6]/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Become an Ambassador</h3>
                <p className="text-gray-300 mb-6">
                  Join {ambassador.name.split(" ")[0]} and other passionate educators in shaping the future of AI in
                  education.
                </p>
                <Button asChild className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                  <Link href="/ambassadors#apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
