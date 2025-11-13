"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Award,
  Download,
  GraduationCap,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Video,
  MessageSquare,
  Puzzle,
} from "lucide-react";
import { RelatedResources } from "@/components/related-resources";
import { InlineCTA } from "@/components/conversion/inline-cta";
import { SocialProofBar } from "@/components/conversion/social-proof-bar";
import { TestimonialCard } from "@/components/conversion/testimonial-card";
import { TrustBadges } from "@/components/conversion/trust-badges";
import { LeadMagnet } from "@/components/conversion/lead-magnet";
const learningPaths = [
  {
    id: "beginner",
    title: t("aiLiteracy.beginner.title"),
    description: t("aiLiteracy.beginner.description"),
    duration: "8-12 hours",
    courses: 5,
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    skills: [
      "AI Basics",
      "Prompt Writing",
      "Tool Selection",
      "Privacy Awareness",
    ],
  },
  {
    id: "intermediate",
    title: t("aiLiteracy.intermediate.title"),
    description: t("aiLiteracy.intermediate.description"),
    duration: "12-16 hours",
    courses: 7,
    icon: Target,
    color: "from-purple-500 to-pink-500",
    skills: [
      "Advanced Prompts",
      "Workflow Integration",
      "Assessment Design",
      "Parent Communication",
    ],
  },
  {
    id: "advanced",
    title: t("aiLiteracy.advanced.title"),
    description: t("aiLiteracy.advanced.description"),
    duration: "16-20 hours",
    courses: 8,
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    skills: [
      "AI Strategy",
      "Professional Development",
      "Policy Development",
      "Change Management",
    ],
  },
];

const featuredCourses = [
  {
    id: "ai-basics",
    title: "AI Basics for Teachers",
    description: "Understand how AI works and why it matters for education",
    duration: "45 min",
    level: "Beginner",
    lessons: 6,
    enrolled: "12,450+",
    rating: 4.9,
    path: "beginner",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Fundamentals",
    description: "Master the art of writing effective AI prompts",
    duration: "1.5 hours",
    level: "Beginner",
    lessons: 8,
    enrolled: "10,230+",
    rating: 4.8,
    path: "beginner",
  },
  {
    id: "parent-communication",
    title: "AI for Parent Communication",
    description: "Write professional parent emails 10ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â faster",
    duration: "1 hour",
    level: "Intermediate",
    lessons: 7,
    enrolled: "8,920+",
    rating: 4.9,
    path: "intermediate",
  },
  {
    id: "lesson-planning",
    title: "AI for Lesson Planning",
    description: "Create engaging lessons with AI assistance",
    duration: "1.5 hours",
    level: "Intermediate",
    lessons: 9,
    enrolled: "7,650+",
    rating: 4.7,
    path: "intermediate",
  },
  {
    id: "assessment-feedback",
    title: "AI for Assessment & Feedback",
    description: "Provide meaningful feedback faster",
    duration: "1.5 hours",
    level: "Intermediate",
    lessons: 8,
    enrolled: "6,840+",
    rating: 4.8,
    path: "intermediate",
  },
  {
    id: "ethical-ai",
    title: "Ethical AI Use in Education",
    description: "Navigate the ethical considerations of AI in teaching",
    duration: "1 hour",
    level: "All Levels",
    lessons: 6,
    enrolled: "9,120+",
    rating: 4.9,
    path: "all",
  },
  {
    id: "data-privacy",
    title: "Data Privacy & FERPA Compliance",
    description: "Protect student data while using AI tools",
    duration: "45 min",
    level: "All Levels",
    lessons: 5,
    enrolled: "8,340+",
    rating: 4.8,
    path: "all",
  },
  {
    id: "tool-comparison",
    title: "AI Tools Comparison & Selection",
    description: "Choose the right AI tools for your needs",
    duration: "1 hour",
    level: "Intermediate",
    lessons: 7,
    enrolled: "5,920+",
    rating: 4.7,
    path: "intermediate",
  },
  {
    id: "advanced-prompts",
    title: "Advanced Prompt Techniques",
    description: "Master complex prompting strategies",
    duration: "2 hours",
    level: "Advanced",
    lessons: 10,
    enrolled: "4,560+",
    rating: 4.9,
    path: "advanced",
  },
  {
    id: "ai-workflows",
    title: "Building AI Workflows",
    description: "Create efficient AI-powered teaching workflows",
    duration: "2 hours",
    level: "Advanced",
    lessons: 11,
    enrolled: "3,890+",
    rating: 4.8,
    path: "advanced",
  },
];

const resources = [
  {
    category: "Templates",
    items: [
      { name: "Parent Email Templates", downloads: "15,230" },
      { name: "Lesson Plan Templates", downloads: "12,450" },
      { name: "Report Card Comment Bank", downloads: "18,920" },
      { name: "IEP Goal Templates", downloads: "9,340" },
    ],
  },
  {
    category: "Checklists",
    items: [
      { name: "AI Tool Evaluation Checklist", downloads: "8,760" },
      { name: "FERPA Compliance Checklist", downloads: "11,230" },
      { name: "Prompt Quality Checklist", downloads: "7,890" },
    ],
  },
  {
    category: "Guides",
    items: [
      { name: "Getting Started with AI Guide", downloads: "14,560" },
      { name: "Prompt Engineering Handbook", downloads: "10,340" },
      { name: "AI Ethics Framework", downloads: "6,920" },
    ],
  },
];

const certificationLevels = [
  {
    level: "AI-Ready Teacher",
    description: "Foundational AI literacy certification",
    requirements: [
      "Complete Beginner Path",
      "Pass assessment (80%+)",
      "Submit 3 sample prompts",
    ],
    badge: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°",
    holders: "8,450+",
  },
  {
    level: "AI-Confident Educator",
    description: "Intermediate AI application certification",
    requirements: [
      "Complete Intermediate Path",
      "Pass advanced assessment (85%+)",
      "Submit portfolio of AI-enhanced lessons",
    ],
    badge: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥Ãƒâ€¹Ã¢â‚¬Â ",
    holders: "3,920+",
  },
  {
    level: "AI Education Leader",
    description: "Advanced AI leadership certification",
    requirements: [
      "Complete Advanced Path",
      "Pass leadership assessment (90%+)",
      "Lead PD session or create resource",
    ],
    badge: "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡",
    holders: "1,240+",
  },
];

export default function AILiteracyClient() {
  const { t } = useLanguage();  const { language } = useLanguage();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).analytics) {
      (window as any).analytics.track("ai_literacy_hub_viewed", {
        referrer: document.referrer,
      });
    }
  }, []);

  const filteredCourses =
    selectedPath && selectedPath !== "all"
      ? featuredCourses.filter(
          (course) => course.path === selectedPath || course.path === "all",
        )
      : featuredCourses;

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <GraduationCap className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">
                Free AI Education for Teachers
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t("aiLiteracy.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">
                {t("aiLiteracy.title").split(" ").slice(-1)}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t("aiLiteracy.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6"
              >
                <Link href="#courses">{t("ctaBrowse")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
              >
                <Link href="#certification">{t("ctaCert")}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">25+</div>
                <div className="text-gray-400 text-sm">Free Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-400 text-sm">Teachers Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">13K+</div>
                <div className="text-gray-400 text-sm">Certified Educators</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialProofBar
            stats={[
              { icon: "users", value: "50K+", label: "Teachers Enrolled" },
              { icon: "star", value: "4.9", label: "Average Rating" },
              { icon: "award", value: "13K+", label: "Certified Educators" },
              { icon: "trending", value: "25+", label: "Free Courses" },
            ]}
          />
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t("aiLiteracy.pathsTitle")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Structured learning paths designed for teachers at every stage of
              their AI journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group cursor-pointer"
                  onClick={() => {
                    setSelectedPath(path.id);
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {path.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{path.courses} courses</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-white mb-2">
                      You'll learn:
                    </div>
                    {path.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 text-[#A78BFA]" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-6 bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30 group-hover:border-[#8B5CF6]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPath(path.id);
                      document
                        .getElementById("courses")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 bg-[#0B1220] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                {selectedPath
                  ? `${learningPaths.find((p) => p.id === selectedPath)?.title} Courses`
                  : t("aiLiteracy.allCourses")}
              </h2>
              <p className="text-xl text-gray-300">
                {selectedPath
                  ? `${filteredCourses.length} courses in this path`
                  : `${featuredCourses.length} courses available`}
              </p>
            </div>
            {selectedPath && (
              <Button
                variant="outline"
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent mt-4 md:mt-0"
                onClick={() => setSelectedPath(null)}
              >
                View All Courses
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/ai-literacy/courses/${course.id}`}
                className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-white">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{course.enrolled}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30 group-hover:border-[#8B5CF6]">
                    Start Course
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t("aiLiteracy.testimonialsTitle")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real feedback from educators who've completed our AI literacy
              courses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The prompt engineering course completely changed how I use AI. I'm getting 10x better results now."
              author="Sarah Martinez"
              role="5th Grade Teacher, California"
              rating={5}
              image="SM"
            />
            <TestimonialCard
              quote="Finally, AI training that's actually designed for teachers. No jargon, just practical strategies I can use tomorrow."
              author="Michael Chen"
              role="High School English, New York"
              rating={5}
              image="MC"
            />
            <TestimonialCard
              quote="The certification gave me the confidence to lead AI professional development at my school. Highly recommend!"
              author="Dr. Jennifer Wilson"
              role="Instructional Coach, Texas"
              rating={5}
              image="JW"
            />
          </div>
        </div>
      </section>

      {/* Resource Library */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Download className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">
                50+ Free Resources
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t("aiLiteracy.libraryTitle")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready-to-use templates, checklists, and guides to accelerate your
              AI adoption
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((category) => (
              <div
                key={category.category}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <Link
                      key={item.name}
                      href={`/ai-literacy/resources/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-[#A78BFA]" />
                        <div>
                          <div className="text-white font-medium group-hover:text-[#A78BFA] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.downloads} downloads
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#A78BFA] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
            >
              <Link href="/ai-literacy/resources">
                Browse All Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-12 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadMagnet
            title="Free AI Prompt Template Library"
            description="Get 50+ ready-to-use AI prompts for lesson planning, parent communication, and assessment. Instant download."
            resourceName="the AI Prompt Template Library"
            onSubmit={(email) => {
              if (typeof window !== "undefined" && (window as any).analytics) {
                (window as any).analytics.track("lead_magnet_submitted", {
                  email,
                  resource: "AI Prompt Template Library",
                  source: "ai_literacy_hub",
                });
              }
            }}
          />
        </div>
      </section>

      {/* Certification Program */}
      <section id="certification" className="py-20 bg-[#0B1220] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Award className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">
                Professional Certification
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t("aiLiteracy.certificationTitle")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn recognized credentials that demonstrate your AI literacy and
              teaching expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certificationLevels.map((cert, index) => (
              <div
                key={cert.level}
                className={`bg-[#1E293B] border ${
                  index === 2 ? "border-[#8B5CF6]" : "border-white/10"
                } rounded-xl p-8 ${index === 2 ? "ring-2 ring-[#8B5CF6]/50" : ""}`}
              >
                <div className="text-6xl mb-4">{cert.badge}</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {cert.level}
                </h3>
                <p className="text-gray-300 mb-6">{cert.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="text-sm font-semibold text-white">
                    Requirements:
                  </div>
                  {cert.requirements.map((req) => (
                    <div
                      key={req}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                  <Users className="w-4 h-4" />
                  <span>{cert.holders} certified teachers</span>
                </div>
                <Button
                  asChild
                  className={`w-full ${
                    index === 2
                      ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                      : "bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30"
                  }`}
                >
                  <Link
                    href={`/ai-literacy/certification/${cert.level.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 border border-[#8B5CF6]/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Why Get Certified?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-[#A78BFA] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">
                        Professional Recognition
                      </div>
                      <div className="text-gray-300 text-sm">
                        Demonstrate your expertise to administrators and
                        colleagues
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-[#A78BFA] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">
                        Career Advancement
                      </div>
                      <div className="text-gray-300 text-sm">
                        Stand out in job applications and promotions
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-[#A78BFA] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">
                        Join the Community
                      </div>
                      <div className="text-gray-300 text-sm">
                        Connect with 13,000+ certified AI educators worldwide
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8">
                <h4 className="text-xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h4>
                <p className="text-gray-300 mb-6">
                  Begin your certification journey today. All courses and
                  assessments are completely free.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                >
                  <Link href="/ai-literacy/certification">
                    Start Certification Path
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* Related Resources Section */}
      <RelatedResources
        title="Continue Your AI Journey"
        description="Explore more resources to enhance your AI teaching skills"
        resources={[
          {
            title: "Live Webinars",
            description: "Join expert-led sessions and earn PD certificates",
            href: "/webinars",
            icon: Video,
            color: "#8B5CF6",
          },
          {
            title: "Teacher Community",
            description: "Connect with 25,000+ educators using AI",
            href: "/community",
            icon: MessageSquare,
            color: "#A78BFA",
          },
          {
            title: "Tool Integrations",
            description: "Connect Zaza Draft with your favorite tools",
            href: "/integrations",
            icon: Puzzle,
            color: "#8B5CF6",
          },
        ]}
      />

      {/* Final CTA */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InlineCTA
            title="Start Your AI Learning Journey"
            description="Join 50,000+ teachers who are confidently using AI to enhance their teaching"
            primaryCTA={{
              text: "Browse Courses",
              href: "#courses",
            }}
            secondaryCTA={{
              text: "Try Zaza Draft Free",
              href: "/signup",
            }}
            variant="gradient"
          />
        </div>
      </section>
    </div>
  );
}
