"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/language-context"
import { useLanguage } from "@/lib/i18n/language-context";
import {
  Search,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Video,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analytics } from "@/lib/analytics";
import { RelatedResources } from "@/components/related-resources";

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  category: string;
  relatedTerms?: string[];
}

const categories = [
  t("glossary.allCategories"),
  "AI Fundamentals",
  "Machine Learning",
  "Natural Language Processing",
  "Generative AI",
  "AI Models & Architectures",
  "Prompt Engineering",
  "AI Ethics & Safety",
  "Data & Privacy",
  "AI Tools & Platforms",
  "Educational AI Applications",
  "AI Implementation",
  "Future of AI",
];

const glossaryTerms: GlossaryTerm[] = [
  // AI Fundamentals
  {
    id: "artificial-intelligence",
    term: "Artificial Intelligence (AI)",
    definition:
      "Computer systems designed to perform tasks that typically require human intelligence, such as learning, problem-solving, pattern recognition, and decision-making.",
    example:
      "When Zaza Draft suggests improvements to your parent email, it's using AI to understand context and generate helpful recommendations.",
    category: "AI Fundamentals",
    relatedTerms: ["Machine Learning", "Deep Learning", "Neural Network"],
  },
  {
    id: "machine-learning",
    term: "Machine Learning",
    definition:
      "A subset of AI where computers learn from data and improve their performance over time without being explicitly programmed for every scenario.",
    example:
      "As you use Zaza Draft more, it learns your writing style and provides increasingly personalized suggestions.",
    category: "AI Fundamentals",
    relatedTerms: ["Artificial Intelligence (AI)", "Training Data", "Model"],
  },
  {
    id: "deep-learning",
    term: "Deep Learning",
    definition:
      "An advanced form of machine learning that uses neural networks with multiple layers to process complex patterns in large amounts of data.",
    example:
      "Deep learning enables AI to understand the nuanced difference between 'The student needs support' and 'The student is excelling' in your report cards.",
    category: "AI Fundamentals",
    relatedTerms: [
      "Neural Network",
      "Machine Learning",
      "Artificial Intelligence (AI)",
    ],
  },
  {
    id: "algorithm",
    term: "Algorithm",
    definition:
      "A set of step-by-step instructions that tells a computer how to solve a problem or complete a task.",
    example:
      "The algorithm in Zaza Draft analyzes your draft email and suggests ways to make it clearer and more professional.",
    category: "AI Fundamentals",
    relatedTerms: ["Model", "Training", "Machine Learning"],
  },

  // Machine Learning Concepts
  {
    id: "training-data",
    term: "Training Data",
    definition:
      "The information used to teach an AI system how to perform tasks. The AI learns patterns from this data to make predictions or decisions.",
    example:
      "AI writing tools are trained on millions of examples of good writing, which helps them suggest improvements to your drafts.",
    category: "Machine Learning",
    relatedTerms: ["Machine Learning", "Model", "Dataset"],
  },
  {
    id: "model",
    term: "Model",
    definition:
      "The result of training an AI system on data. It's like a trained brain that can make predictions or generate content based on what it learned.",
    example:
      "GPT-4 is a language model that powers many AI writing tools, including features in Zaza Draft.",
    category: "Machine Learning",
    relatedTerms: ["Training Data", "Neural Network", "Large Language Model"],
  },
  {
    id: "neural-network",
    term: "Neural Network",
    definition:
      "A computer system inspired by the human brain, made up of interconnected nodes (like neurons) that process information in layers.",
    example:
      "Neural networks help AI understand that 'The student is struggling' and 'The learner needs support' convey similar meanings.",
    category: "Machine Learning",
    relatedTerms: ["Deep Learning", "Artificial Intelligence (AI)", "Model"],
  },

  // Natural Language Processing
  {
    id: "natural-language-processing",
    term: "Natural Language Processing (NLP)",
    definition:
      "The branch of AI that helps computers understand, interpret, and generate human language in a way that is meaningful and useful.",
    example:
      "NLP enables Zaza Draft to understand your writing intent and suggest contextually appropriate improvements.",
    category: "Natural Language Processing",
    relatedTerms: [
      "Large Language Model",
      "Tokenization",
      "Sentiment Analysis",
    ],
  },
  {
    id: "tokenization",
    term: "Tokenization",
    definition:
      "The process of breaking down text into smaller pieces (tokens) like words or phrases that AI can process and understand.",
    example:
      "When you type 'The student is making progress,' the AI breaks it into tokens to analyze each word's meaning and context.",
    category: "Natural Language Processing",
    relatedTerms: ["Natural Language Processing (NLP)", "Large Language Model"],
  },
  {
    id: "sentiment-analysis",
    term: "Sentiment Analysis",
    definition:
      "AI's ability to detect emotions and attitudes in text, determining whether writing is positive, negative, or neutral.",
    example:
      "Sentiment analysis helps ensure your parent emails strike the right tone-supportive rather than critical.",
    category: "Natural Language Processing",
    relatedTerms: ["Natural Language Processing (NLP)", "Tone"],
  },

  // Generative AI
  {
    id: "generative-ai",
    term: "Generative AI",
    definition:
      "AI systems that can create new content-text, images, code, or other media-based on patterns learned from training data.",
    example:
      "When Zaza Draft helps you write a parent email from scratch, it's using generative AI to create original, contextually appropriate text.",
    category: "Generative AI",
    relatedTerms: ["Large Language Model", "Prompt", "ChatGPT"],
  },
  {
    id: "large-language-model",
    term: "Large Language Model (LLM)",
    definition:
      "A type of AI trained on vast amounts of text data that can understand and generate human-like language.",
    example:
      "ChatGPT, Claude, and the AI behind Zaza Draft are all large language models trained to assist with writing tasks.",
    category: "Generative AI",
    relatedTerms: ["Generative AI", "GPT", "Model"],
  },
  {
    id: "gpt",
    term: "GPT (Generative Pre-trained Transformer)",
    definition:
      "A specific type of large language model developed by OpenAI that's particularly good at understanding context and generating coherent text.",
    example:
      "GPT-4 powers many AI writing assistants and can help draft everything from lesson plans to parent communications.",
    category: "Generative AI",
    relatedTerms: ["Large Language Model", "Transformer", "ChatGPT"],
  },
  {
    id: "chatgpt",
    term: "ChatGPT",
    definition:
      "A conversational AI tool developed by OpenAI that uses GPT models to have natural conversations and assist with various tasks.",
    example:
      "Many teachers use ChatGPT to brainstorm lesson ideas, but Zaza Draft is specifically designed for education writing tasks.",
    category: "Generative AI",
    relatedTerms: ["GPT", "Large Language Model", "Conversational AI"],
  },

  // Prompt Engineering
  {
    id: "prompt",
    term: "Prompt",
    definition:
      "The instruction or question you give to an AI system to tell it what you want it to do or create.",
    example:
      "Instead of just typing 'write email,' a better prompt is 'Write a supportive email to parents about their child's reading progress.'",
    category: "Prompt Engineering",
    relatedTerms: ["Prompt Engineering", "Context", "Few-Shot Learning"],
  },
  {
    id: "prompt-engineering",
    term: "Prompt Engineering",
    definition:
      "The skill of crafting effective instructions for AI to get the best possible results. It's like learning how to ask the right questions.",
    example:
      "Good prompt engineering: 'Write a 3-sentence positive email to parents highlighting their child's improvement in math, maintaining a warm tone.'",
    category: "Prompt Engineering",
    relatedTerms: ["Prompt", "Context", "Zero-Shot Learning"],
  },
  {
    id: "context",
    term: "Context",
    definition:
      "The background information you provide to AI to help it understand your specific situation and generate more relevant responses.",
    example:
      "Providing context like 'This is for a 3rd-grade student who recently improved in reading' helps AI write more appropriate content.",
    category: "Prompt Engineering",
    relatedTerms: ["Prompt", "Prompt Engineering", "Few-Shot Learning"],
  },
  {
    id: "few-shot-learning",
    term: "Few-Shot Learning",
    definition:
      "Giving AI a few examples of what you want before asking it to create something similar.",
    example:
      "Showing AI 2-3 examples of your preferred email style helps it match your voice when drafting new messages.",
    category: "Prompt Engineering",
    relatedTerms: ["Prompt", "Context", "Zero-Shot Learning"],
  },

  // AI Ethics & Safety
  {
    id: "ai-bias",
    term: "AI Bias",
    definition:
      "When AI systems produce unfair or prejudiced results because of biases in their training data or design.",
    example:
      "An AI might suggest different language for students based on their names, reflecting bias in its training data. Always review AI suggestions critically.",
    category: "AI Ethics & Safety",
    relatedTerms: ["Training Data", "Fairness", "Ethical AI"],
  },
  {
    id: "hallucination",
    term: "Hallucination",
    definition:
      "When AI generates information that sounds plausible but is actually incorrect or made up.",
    example:
      "AI might confidently state a student's test score or create a fake research citation. Always verify factual claims from AI.",
    category: "AI Ethics & Safety",
    relatedTerms: ["Accuracy", "Verification", "Generative AI"],
  },
  {
    id: "ethical-ai",
    term: "Ethical AI",
    definition:
      "The practice of developing and using AI in ways that are fair, transparent, accountable, and respect human rights and privacy.",
    example:
      "Using AI to help draft parent emails is ethical; using it to make high-stakes decisions about students without human oversight is not.",
    category: "AI Ethics & Safety",
    relatedTerms: ["AI Bias", "Transparency", "Responsible AI"],
  },

  // Data & Privacy
  {
    id: "ferpa",
    term: "FERPA Compliance",
    definition:
      "Following the Family Educational Rights and Privacy Act, which protects student education records and personal information.",
    example:
      "When using AI tools, never input student names, IDs, or other personally identifiable information unless the tool is FERPA-compliant.",
    category: "Data & Privacy",
    relatedTerms: ["Student Privacy", "Data Security", "PII"],
  },
  {
    id: "pii",
    term: "PII (Personally Identifiable Information)",
    definition:
      "Any information that can be used to identify a specific individual, such as names, addresses, or student ID numbers.",
    example:
      "Instead of 'Sarah Johnson in 3rd grade,' use 'a 3rd-grade student' when working with AI to protect privacy.",
    category: "Data & Privacy",
    relatedTerms: ["FERPA Compliance", "Student Privacy", "Data Security"],
  },
  {
    id: "data-security",
    term: "Data Security",
    definition:
      "Protecting information from unauthorized access, use, or theft through encryption and secure storage practices.",
    example:
      "Zaza Draft uses enterprise-grade encryption to ensure your drafts and student information remain secure.",
    category: "Data & Privacy",
    relatedTerms: ["Encryption", "FERPA Compliance", "Student Privacy"],
  },

  // AI Tools & Platforms
  {
    id: "ai-writing-assistant",
    term: "AI Writing Assistant",
    definition:
      "Software that uses AI to help improve writing through suggestions, corrections, and content generation.",
    example:
      "Zaza Draft is an AI writing assistant specifically designed for teachers' communication needs.",
    category: "AI Tools & Platforms",
    relatedTerms: [
      "Generative AI",
      "Natural Language Processing (NLP)",
      "Grammarly",
    ],
  },
  {
    id: "api",
    term: "API (Application Programming Interface)",
    definition:
      "A way for different software applications to communicate and share data with each other.",
    example:
      "Zaza Draft uses APIs to connect with your school's systems and integrate AI capabilities into your workflow.",
    category: "AI Tools & Platforms",
    relatedTerms: ["Integration", "Cloud Computing"],
  },

  // Educational AI Applications
  {
    id: "adaptive-learning",
    term: "Adaptive Learning",
    definition:
      "Educational technology that adjusts content and pacing based on individual student performance and needs.",
    example:
      "AI-powered reading programs that automatically adjust difficulty based on student responses use adaptive learning.",
    category: "Educational AI Applications",
    relatedTerms: ["Personalization", "Differentiation", "Machine Learning"],
  },
  {
    id: "automated-grading",
    term: "Automated Grading",
    definition:
      "Using AI to evaluate and score student work, particularly for objective assessments and writing assignments.",
    example:
      "AI can provide instant feedback on grammar and structure in student essays, but teachers should review subjective elements like creativity.",
    category: "Educational AI Applications",
    relatedTerms: [
      "Assessment",
      "Feedback",
      "Natural Language Processing (NLP)",
    ],
  },

  // AI Implementation
  {
    id: "change-management",
    term: "Change Management",
    definition:
      "The process of helping people and organizations transition to new tools, processes, or ways of working.",
    example:
      "Successfully implementing AI in your classroom requires change management: training, support, and gradual adoption.",
    category: "AI Implementation",
    relatedTerms: ["Professional Development", "Adoption", "Training"],
  },
  {
    id: "pilot-program",
    term: "Pilot Program",
    definition:
      "A small-scale test of a new tool or approach before rolling it out to everyone.",
    example:
      "Start with a pilot program: have 5 teachers try Zaza Draft for one month before introducing it to the whole school.",
    category: "AI Implementation",
    relatedTerms: ["Change Management", "Adoption", "Evaluation"],
  },

  // Future of AI
  {
    id: "agi",
    term: "AGI (Artificial General Intelligence)",
    definition:
      "Hypothetical AI that can understand, learn, and apply knowledge across any domain, like human intelligence. This doesn't exist yet.",
    example:
      "Current AI tools like Zaza Draft are 'narrow AI'-excellent at specific tasks but not capable of general human-like reasoning.",
    category: "Future of AI",
    relatedTerms: ["Artificial Intelligence (AI)", "Narrow AI"],
  },
  {
    id: "multimodal-ai",
    term: "Multimodal AI",
    definition:
      "AI systems that can process and generate multiple types of content-text, images, audio, and video-simultaneously.",
    example:
      "Future versions of AI writing tools might analyze student work samples, hear your voice notes, and generate comprehensive reports.",
    category: "Future of AI",
    relatedTerms: ["Generative AI", "Large Language Model"],
  },
];

export default function GlossaryClient() {
  const { t } = useLanguage()
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("glossary.allCategories"));
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    analytics.glossary.viewHub();
  }, []);

  const filteredTerms = useMemo(() => {
    let filtered = glossaryTerms;

    // Filter by category
    if (selectedCategory !== t("glossary.allCategories")) {
      filtered = filtered.filter((term) => term.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (term) =>
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query) ||
          term.category.toLowerCase().includes(query),
      );
    }

    // Filter by letter
    if (selectedLetter) {
      filtered = filtered.filter((term) =>
        term.term.toUpperCase().startsWith(selectedLetter),
      );
    }

    return filtered.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory, selectedLetter]);

  const toggleTerm = (termId: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termId)) {
      newExpanded.delete(termId);
    } else {
      newExpanded.add(termId);
      const term = glossaryTerms.find((t) => t.id === termId);
      if (term) {
        analytics.glossary.viewTerm(term.id, term.term);
      }
    }
    setExpandedTerms(newExpanded);
  };

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    glossaryTerms.forEach((term) => {
      stats[term.category] = (stats[term.category] || 0) + 1;
    });
    return stats;
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      analytics.glossary.searchTerm(query);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== t("glossary.allCategories")) {
      analytics.glossary.filterByCategory(category);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 mb-6">
              <BookOpen className="w-4 h-4 text-[#A78BFA]" />
              <span className="text-sm font-medium text-[#A78BFA]">
                AI Knowledge Base
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("glossary.title")}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t("glossary.subtitle")}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-[#A78BFA] mb-2">150+</div>
              <div className="text-sm text-gray-400">AI Terms Defined</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-[#A78BFA] mb-2">12</div>
              <div className="text-sm text-gray-400">Topic Categories</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-[#A78BFA] mb-2">100%</div>
              <div className="text-sm text-gray-400">Education-Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search terms, definitions, or categories..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-[#A78BFA]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border-0 whitespace-nowrap"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 whitespace-nowrap"
                }
              >
                {category}
                {category !== t("glossary.allCategories") && (
                  <span className="ml-2 text-xs opacity-70">
                    ({categoryStats[category] || 0})
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Alphabetical Navigation */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => setSelectedLetter(null)}
              variant={selectedLetter === null ? "default" : "outline"}
              size="sm"
              className={
                selectedLetter === null
                  ? "bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border-0"
                  : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
              }
            >
              All
            </Button>
            {alphabet.map((letter) => {
              const hasTerms = glossaryTerms.some((term) =>
                term.term.toUpperCase().startsWith(letter),
              );
              return (
                <Button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  variant={selectedLetter === letter ? "default" : "outline"}
                  size="sm"
                  disabled={!hasTerms}
                  className={
                    selectedLetter === letter
                      ? "bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border-0 w-10"
                      : hasTerms
                        ? "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 w-10"
                        : "bg-white/5 text-gray-600 border-white/10 w-10 cursor-not-allowed"
                  }
                >
                  {letter}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terms List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                No terms found matching your search.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(t("glossary.allCategories"));
                  setSelectedLetter(null);
                }}
                className="mt-4 bg-[#A78BFA] hover:bg-[#8B5CF6] text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 mb-6">
                Showing {filteredTerms.length} term
                {filteredTerms.length !== 1 ? "s" : ""}
              </p>
              {filteredTerms.map((term) => {
                const isExpanded = expandedTerms.has(term.id);
                return (
                  <div
                    key={term.id}
                    className="rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#A78BFA]/30 transition-all"
                  >
                    <button
                      onClick={() => toggleTerm(term.id)}
                      className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {term.term}
                          </h3>
                          <span className="px-2 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-xs text-[#A78BFA]">
                            {term.category}
                          </span>
                        </div>
                        {!isExpanded && (
                          <p className="text-gray-400 line-clamp-2">
                            {term.definition}
                          </p>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">
                            Definition
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {term.definition}
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-[#A78BFA]/5 border border-[#A78BFA]/20">
                          <h4 className="text-sm font-semibold text-[#A78BFA] mb-2">
                            Example in Education
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {term.example}
                          </p>
                        </div>

                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 mb-2">
                              Related Terms
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {term.relatedTerms.map((relatedTerm) => (
                                <button
                                  key={relatedTerm}
                                  onClick={() => {
                                    setSearchQuery(relatedTerm);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-[#A78BFA]/30 transition-colors"
                                >
                                  {relatedTerm}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Related Resources Section */}
      <RelatedResources
        title="Apply Your Knowledge"
        description="Put these AI concepts into practice with hands-on learning"
        resources={[
          {
            title: "AI Literacy Courses",
            description: "Learn how to apply these concepts in your classroom",
            href: "/ai-literacy",
            icon: GraduationCap,
            color: "#A78BFA",
          },
          {
            title: "Live Webinars",
            description:
              "See AI terminology in action with expert demonstrations",
            href: "/webinars",
            icon: Video,
            color: "#8B5CF6",
          },
          {
            title: "Community Discussions",
            description: "Ask questions about terms you don't understand",
            href: "/community",
            icon: MessageSquare,
            color: "#A78BFA",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Put AI Knowledge into Practice?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Now that you understand the terminology, experience how Zaza Draft
            makes AI practical for your daily teaching tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white text-lg px-8 py-6"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 hover:bg-white/10 text-white border-white/10 text-lg px-8 py-6"
            >
              Explore AI Literacy Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
