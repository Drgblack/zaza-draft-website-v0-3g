"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Twitter, Facebook, Linkedin, Mail, LinkIcon, MessageCircle } from "lucide-react"

interface ShareBarProps {
  title: string
  lang: "en" | "de" | string
  currentUrl?: string
}

export function ShareBar({ title, lang, currentUrl }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  // Get current URL (SSR-safe)
  const getUrl = () => {
    if (currentUrl) return currentUrl
    if (typeof window !== "undefined") return window.location.href
    return ""
  }

  const baseUrl = getUrl()

  // Build shared URL with UTM parameters
  const buildSharedUrl = (platform: string) => {
    const utmParams = `?utm_source=${platform}&utm_medium=social&utm_campaign=blog_share&utm_content=${lang}`
    return `${baseUrl}${utmParams}`
  }

  // URL encode helpers
  const encodeUrl = (url: string) => encodeURIComponent(url)
  const encodeText = (text: string) => encodeURIComponent(text)

  // Share URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeText(title)}&url=${encodeUrl(buildSharedUrl("twitter"))}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl(buildSharedUrl("facebook"))}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl(buildSharedUrl("linkedin"))}`,
    whatsapp: `https://wa.me/?text=${encodeText(title)}%20${encodeUrl(buildSharedUrl("whatsapp"))}`,
    email: `mailto:?subject=${encodeText(title)}&body=${encodeText(title)}%0A%0A${encodeUrl(buildSharedUrl("email"))}`,
  }

  // Copy link to clipboard
  const copyLink = async () => {
    const sharedUrl = buildSharedUrl("copy")

    try {
      await navigator.clipboard.writeText(sharedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback: create a temporary input element
      const input = document.createElement("input")
      input.value = sharedUrl
      input.style.position = "fixed"
      input.style.opacity = "0"
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Translations
  const t = {
    en: {
      shareThisPost: "Share this post",
      shareOnX: "Share on X",
      shareOnFacebook: "Share on Facebook",
      shareOnLinkedIn: "Share on LinkedIn",
      shareOnWhatsApp: "Share on WhatsApp",
      shareByEmail: "Share by Email",
      copyLink: "Copy link",
      copied: "Link copied!",
    },
    de: {
      shareThisPost: "Diesen Beitrag teilen",
      shareOnX: "Auf X teilen",
      shareOnFacebook: "Auf Facebook teilen",
      shareOnLinkedIn: "Auf LinkedIn teilen",
      shareOnWhatsApp: "Per WhatsApp teilen",
      shareByEmail: "Per E-Mail teilen",
      copyLink: "Link kopieren",
      copied: "Link kopiert!",
    },
  }

  const labels = t[lang]

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 py-8">
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-foreground whitespace-nowrap">{labels.shareThisPost}</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* X (Twitter) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="default"
                className="gap-2.5 min-w-[100px]"
                onClick={() => window.open(shareUrls.twitter, "_blank", "noopener,noreferrer")}
                aria-label={labels.shareOnX}
              >
                <Twitter className="h-5 w-5" />
                <span className="text-sm font-medium">X</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{labels.shareOnX}</p>
            </TooltipContent>
          </Tooltip>

          {/* Facebook */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="default"
                className="gap-2.5 min-w-[120px]"
                onClick={() => window.open(shareUrls.facebook, "_blank", "noopener,noreferrer")}
                aria-label={labels.shareOnFacebook}
              >
                <Facebook className="h-5 w-5" />
                <span className="text-sm font-medium">Facebook</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{labels.shareOnFacebook}</p>
            </TooltipContent>
          </Tooltip>

          {/* LinkedIn */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="default"
                className="gap-2.5 min-w-[120px]"
                onClick={() => window.open(shareUrls.linkedin, "_blank", "noopener,noreferrer")}
                aria-label={labels.shareOnLinkedIn}
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm font-medium">LinkedIn</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{labels.shareOnLinkedIn}</p>
            </TooltipContent>
          </Tooltip>

          {/* WhatsApp */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="default"
                className="gap-2.5 min-w-[130px]"
                onClick={() => window.open(shareUrls.whatsapp, "_blank", "noopener,noreferrer")}
                aria-label={labels.shareOnWhatsApp}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">WhatsApp</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{labels.shareOnWhatsApp}</p>
            </TooltipContent>
          </Tooltip>

          {/* Email */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="default"
                className="gap-2.5 min-w-[100px]"
                onClick={() => (window.location.href = shareUrls.email)}
                aria-label={labels.shareByEmail}
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm font-medium">Email</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{labels.shareByEmail}</p>
            </TooltipContent>
          </Tooltip>

          {/* Copy Link */}
          <Tooltip open={copied}>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="default"
                className="gap-2.5 min-w-[130px]"
                onClick={copyLink}
                aria-label={labels.copyLink}
              >
                <LinkIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{copied ? labels.copied : labels.copyLink}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? labels.copied : labels.copyLink}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}


