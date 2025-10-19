"use client"

import { useState } from "react"
import { Share2, Mail, Twitter, Linkedin, Facebook, Link, Check } from "lucide-react"

interface BlogShareButtonsProps {
  post: {
    slug: string
    title: string
    language: string
  }
}

export function BlogShareButtons({ post }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${post.slug}`
      : `https://zazadraft.com/blog/${post.slug}`

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(post.title + " - " + fullUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent("I thought you might find this interesting: " + post.title + "\n\n" + fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const heading = post.language === "de" ? "Diesen Beitrag teilen" : "Share this post"

  return (
    <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
      <h3 style={{ color: "white", fontSize: "1.2rem", fontWeight: "600", marginBottom: "16px" }}>{heading}</h3>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          data-share-platform="whatsapp"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            color: "#A78BFA",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
          }}
        >
          <Share2 size={18} />
          WhatsApp
        </a>

        <a
          href={shareLinks.email}
          data-share-platform="email"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            color: "#A78BFA",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
          }}
        >
          <Mail size={18} />
          Email
        </a>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          data-share-platform="twitter"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            color: "#A78BFA",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
          }}
        >
          <Twitter size={18} />
          Twitter
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-share-platform="linkedin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            color: "#A78BFA",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
          }}
        >
          <Linkedin size={18} />
          LinkedIn
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          data-share-platform="facebook"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            color: "#A78BFA",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
          }}
        >
          <Facebook size={18} />
          Facebook
        </a>

        <button
          onClick={handleCopyLink}
          data-share-platform="copy"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            color: "#A78BFA",
            fontWeight: "500",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"
          }}
        >
          {copied ? <Check size={18} /> : <Link size={18} />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  )
}
