"use client"

import { useEffect } from "react"

export function ImageErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const message = event.message || ""
      if (message.includes("blob:") || message.includes("vusercontent.net") || message.includes("Failed to load")) {
        event.preventDefault()
        event.stopPropagation()
        return false
      }
    }

    // Intercept image loading errors at the DOM level
    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement
      if (target.tagName === "IMG") {
        const src = target.src || ""
        if (src.includes("blob:") || src.includes("vusercontent.net")) {
          event.preventDefault()
          event.stopPropagation()
          // Hide the broken image
          target.style.display = "none"
          return false
        }
      }
    }

    window.addEventListener("error", handleError, true)
    document.addEventListener("error", handleImageError, true)

    return () => {
      window.removeEventListener("error", handleError, true)
      document.removeEventListener("error", handleImageError, true)
    }
  }, [])

  return null
}

