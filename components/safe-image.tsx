"use client"

import Image from "next/image"
import { useState } from "react"
import type { ImageProps } from "next/image"

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function SafeImage({ src, fallbackSrc = "/placeholder.svg", alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const isSafeUrl = (url: string | undefined): boolean => {
    if (!url || typeof url !== "string") return false
    return !url.includes("blob:") && !url.includes("vusercontent.net")
  }

  const safeSrc = isSafeUrl(imgSrc as string) ? imgSrc : fallbackSrc

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : safeSrc}
      alt={alt}
      onError={() => {
        console.warn(`[v0] Image failed to load: ${src}, using fallback`)
        setHasError(true)
        setImgSrc(fallbackSrc)
      }}
    />
  )
}

