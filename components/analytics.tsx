"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

    if (!measurementId) {
      console.log("[v0] GA4 measurement ID not configured")
      return
    }

    // Load GA4 script
    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize GA4
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag("js", new Date())
    gtag("config", measurementId)

    console.log("[v0] GA4 initialized with ID:", measurementId)
  }, [])

  return null
}

declare global {
  interface Window {
    dataLayer: any[]
  }
}

