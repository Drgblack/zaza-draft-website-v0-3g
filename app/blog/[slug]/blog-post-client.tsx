"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, ArrowUp, Lightbulb, Apple, Timer, Copy, Check, Quote } from "lucide-react"
import type { BlogPost } from "@/lib/cms/posts"
import { useLanguage } from "@/lib/i18n/language-context"
import { ShareBar } from "@/components/share-bar"
import { sanitizeHtmlContent } from "@/lib/cms/sanitize"
import type { JSX } from "react"

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { language } = useLanguage()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Get content based on language
  const content = language === "de" && post.contentDe ? post.contentDe : post.content

  // Calculate reading time
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  const isHtmlContent = content.trim().startsWith("<")

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)

      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const parseContent = () => {
    const elements: JSX.Element[] = []
    let currentIndex = 0

    try {
      // Split content into segments by comment markers
      const segments: Array<{ type: string; content: string }> = []
      let remaining = content
      let safetyCounter = 0
      const MAX_ITERATIONS = 1000

      while (remaining.length > 0 && safetyCounter < MAX_ITERATIONS) {
        safetyCounter++

        // Look for opening comment marker
        const openMatch = remaining.match(/<!--\s*([A-Z_:]+)\s*-->/)

        if (!openMatch) {
          // No more markers, add remaining content
          if (remaining.trim()) {
            segments.push({ type: "content", content: remaining })
          }
          break
        }

        // Add content before marker
        const beforeMarker = remaining.substring(0, openMatch.index)
        if (beforeMarker.trim()) {
          segments.push({ type: "content", content: beforeMarker })
        }

        // Find closing marker
        const markerType = openMatch[1]
        const closePattern = `<!--\\s*/${markerType}\\s*-->`
        const afterOpen = remaining.substring(openMatch.index! + openMatch[0].length)
        const closeMatch = afterOpen.match(new RegExp(closePattern))

        if (closeMatch) {
          // Extract content between markers
          const markerContent = afterOpen.substring(0, closeMatch.index)
          segments.push({ type: markerType, content: markerContent })

          // Move past closing marker
          remaining = afterOpen.substring(closeMatch.index! + closeMatch[0].length)
        } else {
          // No closing marker found, treat as regular content
          segments.push({ type: "content", content: remaining })
          break
        }
      }

      // Render segments
      let lastWasH2 = false

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i]

        if (segment.type === "content") {
          const htmlContent = isHtmlContent ? addBlogClasses(segment.content) : convertMarkdownToHtml(segment.content)
          if (htmlContent.trim()) {
            const hasH2 = htmlContent.includes("<h2")
            if (hasH2 && currentIndex > 0 && !lastWasH2) {
              elements.push(
                <div key={`divider-${currentIndex}`} className="section-divider">
                  <div className="section-divider-line" />
                </div>,
              )
            }
            lastWasH2 = hasH2
            elements.push(<div key={`content-${currentIndex++}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />)
          }
        } else if (segment.type.startsWith("CALLOUT:")) {
          const calloutType = segment.type.replace("CALLOUT:", "")
          elements.push(renderCallout(calloutType, segment.content, currentIndex++))
          lastWasH2 = false
        } else if (segment.type === "PULL_QUOTE") {
          elements.push(renderPullQuote(segment.content, currentIndex++))
          lastWasH2 = false
        } else if (segment.type === "EXAMPLE") {
          elements.push(renderExample(segment.content, currentIndex++))
          lastWasH2 = false
        }
      }
    } catch (error) {
      console.error("Error parsing content:", error)
      // Fallback: render raw content
      const htmlContent = isHtmlContent ? addBlogClasses(content) : convertMarkdownToHtml(content)
      elements.push(<div key="fallback" dangerouslySetInnerHTML={{ __html: htmlContent }} />)
    }

    return elements
  }

  const addBlogClasses = (html: string): string => {
    if (!html) return ""

    let result = sanitizeHtmlContent(html)

    // Add classes to HTML elements
    result = result.replace(/<h1>/g, '<h1 class="blog-h1">')
    result = result.replace(/<h2>/g, '<h2 class="blog-h2">')
    result = result.replace(/<h3>/g, '<h3 class="blog-h3">')
    result = result.replace(/<p>/g, '<p class="blog-p">')
    result = result.replace(/<ul>/g, '<ul class="blog-ul">')
    result = result.replace(/<ol>/g, '<ol class="blog-ol">')
    result = result.replace(/<li>/g, '<li class="blog-li">')

    return result
  }

  const convertMarkdownToHtml = (markdown: string): string => {
    if (!markdown) return ""

    let html = markdown

    // Convert headings
    html = html.replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1 class="blog-h1">$1</h1>')

    // Convert bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")

    // Convert lists
    html = html.replace(/^\* (.+)$/gm, '<li class="blog-li">$1</li>')
    html = html.replace(/^- (.+)$/gm, '<li class="blog-li">$1</li>')
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="blog-li-numbered">$2</li>')

    // Wrap consecutive list items in ul/ol
    html = html.replace(/(<li class="blog-li">.*?<\/li>\n?)+/gs, '<ul class="blog-ul">$&</ul>')
    html = html.replace(/(<li class="blog-li-numbered">.*?<\/li>\n?)+/gs, '<ol class="blog-ol">$&</ol>')

    // Convert paragraphs
    const lines = html.split("\n\n")
    html = lines
      .map((line) => {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("<")) return trimmed
        return `<p class="blog-p">${trimmed}</p>`
      })
      .join("\n")

    return html
  }

  const renderCallout = (type: string, content: string, index: number) => {
    const calloutConfig: Record<string, { icon: JSX.Element; title: string; className: string }> = {
      QUICK_WIN: {
        icon: <Lightbulb className="h-5 w-5" />,
        title: language === "de" ? "Schneller Gewinn" : "Quick Win",
        className: "callout-quick-win",
      },
      TIME_SAVER: {
        icon: <Timer className="h-5 w-5" />,
        title: language === "de" ? "Zeitsparer" : "Time Saver",
        className: "callout-time-saver",
      },
      CLASSROOM: {
        icon: <Apple className="h-5 w-5" />,
        title: language === "de" ? "FÃ¼r Ihr Klassenzimmer" : "For Your Classroom",
        className: "callout-classroom",
      },
      TEMPLATE: {
        icon: <Copy className="h-5 w-5" />,
        title: language === "de" ? "Vorlage" : "Template",
        className: "callout-template",
      },
      EXAMPLE: {
        icon: <Quote className="h-5 w-5" />,
        title: language === "de" ? "Beispiel" : "Example",
        className: "callout-example",
      },
    }

    const config = calloutConfig[type] || calloutConfig.QUICK_WIN
    const htmlContent = isHtmlContent ? addBlogClasses(content) : convertMarkdownToHtml(content)

    // Check if this is a template that should have a copy button
    const isTemplate = type === "TEMPLATE"
    // Extract plain text for copying
    const plainText = content.replace(/<[^>]+>/g, "").trim()

    return (
      <div key={`callout-${index}`} className={`callout ${config.className}`}>
        <div className="callout-icon">{config.icon}</div>
        <div className="callout-content">
          <div className="flex items-center justify-between mb-2">
            <h4 className="callout-title">{config.title}</h4>
            {isTemplate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(plainText, index)}
                className="h-8 px-2 text-xs"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    {language === "de" ? "Kopiert!" : "Copied!"}
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    {language === "de" ? "Kopieren" : "Copy"}
                  </>
                )}
              </Button>
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    )
  }

  const renderPullQuote = (content: string, index: number) => {
    const htmlContent = isHtmlContent ? addBlogClasses(content) : convertMarkdownToHtml(content)

    return (
      <div key={`quote-${index}`} className="pull-quote">
        <Quote className="pull-quote-icon" />
        <blockquote className="pull-quote-text" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    )
  }

  const renderExample = (content: string, index: number) => {
    const htmlContent = isHtmlContent ? addBlogClasses(content) : convertMarkdownToHtml(content)
    return (
      <div key={`example-${index}`} className="example-box">
        <div className="example-header">
          <Quote className="h-4 w-4" />
          <span>{language === "de" ? "Beispiel" : "Example"}</span>
        </div>
        <div className="example-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#E5E7EB] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#2D5B8F] to-[#6BBF9A] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Back button */}
        <Link href="/blog" className="inline-block mb-8">
          <Button variant="ghost" className="text-[#5A6C7D] hover:text-[#2D5B8F] hover:bg-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "de" ? "ZurÃ¼ck zum Blog" : "Back to Blog"}
          </Button>
        </Link>

        {/* Hero Section */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-[#2D5B8F] text-white border-0">{post.category}</Badge>
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="border-[#6BBF9A] text-[#6BBF9A]">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-6 leading-tight">{post.title}</h1>

          <ShareBar title={post.title} lang={language} />

          <p className="text-xl text-[#5A6C7D] mb-8 leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#5A6C7D]">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#F28B5F]" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#F28B5F]" />
              <span>
                {readingTime} {language === "de" ? "Min. Lesezeit" : "min read"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="blog-content">{parseContent()}</div>

        <ShareBar title={post.title} lang={language} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#E5E7EB]">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">
              {language === "de" ? "Weiterlesen" : "Continue Reading"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                  <Card className="bg-white border-[#E5E7EB] hover:border-[#2D5B8F] hover:shadow-lg transition-all h-full p-6">
                    <Badge className="bg-[#F28B5F]/10 text-[#F28B5F] border-0 mb-3">{relatedPost.category}</Badge>
                    <h3 className="font-bold text-[#2C3E50] mb-2 line-clamp-2 group-hover:text-[#2D5B8F] transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-[#5A6C7D] line-clamp-3">{relatedPost.excerpt}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#2D5B8F] text-white p-3 rounded-full shadow-lg hover:bg-[#2D5B8F]/90 transition-all z-40"
          aria-label={language === "de" ? "Nach oben" : "Back to top"}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
