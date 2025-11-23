"use client";

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users, TrendingUp } from "lucide-react"

type Category = "all" | "elementary" | "middle" | "high" | "district" | "special-ed" | "multilingual"

interface CaseStudy {
  slug: string
  title: string
  school: string
  location: string
  students: string
  category: Category
  metric: string
  metricValue: string
  quote: string
  thumbnail: string
}

export function SuccessStoriesClient() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  
  // Use "de" if language is explicitly German, otherwise default to "en"
  const lang = language === "de" ? "de" : "en"

  // --- TRANSLATIONS ---
  const content = {
    en: {
      hero: {
        badge: "Proven Results",
        title: "See how teachers and schools transform communication with Zaza Draft",
        subtitle: "Real stories from educators who've saved hundreds of hours and built stronger relationships with families."
      },
      metrics: {
        teachers: "teachers trust Zaza",
        emails: "parent emails sent",
        savings: "average time savings"
      },
      readStory: "Read Full Story",
      cta: {
        title: "Join thousands of teachers",
        subtitle: "Start transforming your communication today",
        primary: "Try Zaza Draft Free",
        secondary: "Talk to Our Team"
      },
      categories: [
        { id: "all" as Category, label: "All Stories" },
        { id: "elementary" as Category, label: "Elementary School" },
        { id: "middle" as Category, label: "Middle School" },
        { id: "high" as Category, label: "High School" },
        { id: "district" as Category, label: "District-Wide" },
        { id: "special-ed" as Category, label: "Special Education" },
        { id: "multilingual" as Category, label: "Multilingual Schools" },
      ],
      caseStudies: [
        {
          slug: "lincoln-elementary-parent-communication",
          title: "How Lincoln Elementary Cut Parent Communication Time by 75%",
          school: "Lincoln Elementary",
          location: "Austin, TX",
          students: "450 students",
          category: "elementary",
          metric: "Time Saved",
          metricValue: "12 hours/week",
          quote: "I actually look forward to parent communication now. It's no longer a source of stress.",
          thumbnail: "/elementary-school-classroom-teacher.jpg",
        },
        {
          slug: "riverside-unified-district-rollout",
          title: "District-Wide AI Rollout: How Riverside Unified Trained 200 Teachers",
          school: "Riverside Unified",
          location: "California",
          students: "15,000 students",
          category: "district",
          metric: "Teachers Onboarded",
          metricValue: "200 teachers",
          quote: "The professional development was seamless. Teachers were confident within days.",
          thumbnail: "/school-district-meeting-teachers.jpg",
        },
        {
          slug: "washington-middle-language-barriers",
          title: "Breaking Language Barriers: ESL Success at Washington Middle",
          school: "Washington Middle",
          location: "New York, NY",
          students: "800 students",
          category: "multilingual",
          metric: "Languages Supported",
          metricValue: "15 languages",
          quote: "For the first time, every family gets messages in their language. The impact is profound.",
          thumbnail: "/diverse-multilingual-classroom.jpg",
        },
        {
          slug: "oakwood-special-education-reports",
          title: "Special Education Reports: Compliance Meets Compassion",
          school: "Oakwood High School",
          location: "Chicago, IL",
          students: "1,200 students",
          category: "special-ed",
          metric: "IEP Reports",
          metricValue: "40 reports in 1 day",
          quote: "I can focus on the kids, not just the paperwork. Zaza Shield ensures compliance.",
          thumbnail: "/special-education-teacher.jpg",
        },
        {
          slug: "jefferson-new-teacher-confidence",
          title: "New Teacher Confidence: From Anxious to Assured in 30 Days",
          school: "Jefferson Elementary",
          location: "Seattle, WA",
          students: "600 students",
          category: "elementary",
          metric: "First Year Teacher",
          metricValue: "30 days to confidence",
          quote: "My mentor teacher was impressed by my communication. Zaza gave me the confidence I needed.",
          thumbnail: "/young-teacher-confident-classroom.jpg",
        },
      ]
    },
    de: {
      hero: {
        badge: "Bewiesene Ergebnisse",
        title: "Erfahren Sie, wie Lehrkräfte und Schulen die Kommunikation mit Zaza Draft transformieren",
        subtitle: "Echte Geschichten von Pädagogen, die hunderte Stunden gespart und stärkere Beziehungen zu Familien aufgebaut haben."
      },
      metrics: {
        teachers: "Lehrkräfte vertrauen Zaza",
        emails: "versendete Eltern-E-Mails",
        savings: "durchschnittliche Zeitersparnis"
      },
      readStory: "Ganze Geschichte lesen",
      cta: {
        title: "Schließen Sie sich tausenden Lehrkräften an",
        subtitle: "Beginnen Sie noch heute mit der Transformation Ihrer Kommunikation",
        primary: "Zaza Draft kostenlos testen",
        secondary: "Kontaktieren Sie uns"
      },
      categories: [
        { id: "all" as Category, label: "Alle Geschichten" },
        { id: "elementary" as Category, label: "Grundschule" },
        { id: "middle" as Category, label: "Mittelschule" },
        { id: "high" as Category, label: "Oberschule / Gymnasium" },
        { id: "district" as Category, label: "Distriktweit" },
        { id: "special-ed" as Category, label: "Sonderpädagogik" },
        { id: "multilingual" as Category, label: "Mehrsprachige Schulen" },
      ],
      caseStudies: [
        {
          slug: "lincoln-elementary-parent-communication",
          title: "Wie die Lincoln Elementary die Zeit für Elternkommunikation um 75% reduzierte",
          school: "Lincoln Elementary",
          location: "Austin, TX",
          students: "450 Schüler",
          category: "elementary",
          metric: "Zeitersparnis",
          metricValue: "12 Std./Woche",
          quote: "Ich freue mich jetzt tatsächlich auf die Elternkommunikation. Sie ist kein Stressfaktor mehr.",
          thumbnail: "/elementary-school-classroom-teacher.jpg",
        },
        {
          slug: "riverside-unified-district-rollout",
          title: "Distriktweite KI-Einführung: Wie Riverside Unified 200 Lehrkräfte schulte",
          school: "Riverside Unified",
          location: "Kalifornien",
          students: "15.000 Schüler",
          category: "district",
          metric: "Lehrkräfte geschult",
          metricValue: "200 Lehrkräfte",
          quote: "Die Fortbildung war nahtlos. Die Lehrkräfte waren innerhalb weniger Tage sicher im Umgang.",
          thumbnail: "/school-district-meeting-teachers.jpg",
        },
        {
          slug: "washington-middle-language-barriers",
          title: "Sprachbarrieren überwinden: ESL-Erfolg an der Washington Middle",
          school: "Washington Middle",
          location: "New York, NY",
          students: "800 Schüler",
          category: "multilingual",
          metric: "Unterstützte Sprachen",
          metricValue: "15 Sprachen",
          quote: "Zum ersten Mal erhält jede Familie Nachrichten in ihrer Sprache. Die Wirkung ist enorm.",
          thumbnail: "/diverse-multilingual-classroom.jpg",
        },
        {
          slug: "oakwood-special-education-reports",
          title: "Sonderpädagogische Berichte: Compliance trifft auf Mitgefühl",
          school: "Oakwood High School",
          location: "Chicago, IL",
          students: "1.200 Schüler",
          category: "special-ed",
          metric: "Förderpläne",
          metricValue: "40 Berichte an 1 Tag",
          quote: "Ich kann mich auf die Kinder konzentrieren, nicht nur auf den Papierkram. Zaza Shield sichert die Compliance.",
          thumbnail: "/special-education-teacher.jpg",
        },
        {
          slug: "jefferson-new-teacher-confidence",
          title: "Selbstvertrauen neuer Lehrkräfte: Von ängstlich zu sicher in 30 Tagen",
          school: "Jefferson Elementary",
          location: "Seattle, WA",
          students: "600 Schüler",
          category: "elementary",
          metric: "Berufseinsteiger",
          metricValue: "30 Tage bis zur Sicherheit",
          quote: "Mein Mentor war beeindruckt von meiner Kommunikation. Zaza gab mir das nötige Selbstvertrauen.",
          thumbnail: "/young-teacher-confident-classroom.jpg",
        },
      ]
    }
  }

  const text = content[lang]
  const categories = text.categories
  const caseStudies = text.caseStudies as CaseStudy[]

  const filteredStudies =
    selectedCategory === "all" ? caseStudies : caseStudies.filter((study) => study.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/10 text-purple-300 border-purple-500/20 px-4 py-1.5">
            {text.hero.badge}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            {text.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto text-pretty">
            {text.hero.subtitle}
          </p>

          {/* Trust Metrics  */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">10,000+</div>
              <div className="text-gray-400">{text.metrics.teachers}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500,000+</div>
              <div className="text-gray-400">{text.metrics.emails}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">70%</div>
              <div className="text-gray-400">{text.metrics.savings}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="sticky top-20 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-y border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/success-stories/${study.slug}`}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={study.thumbnail || "/placeholder.svg"}
                    alt={study.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-purple-500/90 text-white border-0">
                    {categories.find((c) => c.id === study.category)?.label}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors text-balance">
                    {study.title}
                  </h3>

                  <div className="text-sm text-gray-400 mb-4">
                    {study.school} • {study.location} • {study.students}
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-4">
                    <div className="text-sm text-purple-300 mb-1">{study.metric}</div>
                    <div className="text-2xl font-bold text-white">{study.metricValue}</div>
                  </div>

                  <blockquote className="text-gray-300 italic mb-4 line-clamp-2">"{study.quote}"</blockquote>

                  <div className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                    {text.readStory}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{text.cta.title}</h2>
          <p className="text-xl text-gray-300 mb-8">{text.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-6 rounded-full shadow-lg shadow-purple-500/25"
            >
              <Link href="/signup">{text.cta.primary}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full bg-transparent"
            >
              <Link href="/contact?topic=success-stories">{text.cta.secondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Success Stories",
            description: "Real stories from educators using Zaza Draft",
            url: "https://zazadraft.com/success-stories",
            publisher: {
              "@type": "Organization",
              name: "Zaza",
            },
          }),
        }}
      />
    </div>
  )
}
