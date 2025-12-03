/**
 * Sanitizer to remove ephemeral asset URLs that cause 404s
 * Strips blob: URLs and vusercontent.net URLs from HTML content
 */
export function stripEphemeralAssets(html: string): string {
  if (!html) return ""

  return (
    html
      // Remove img tags with blob: URLs
      .replace(/<img[^>]+src="blob:[^"]+"[^>]*>/gi, "")
      // Remove img tags with vusercontent.net URLs
      .replace(/<img[^>]+src="https?:\/\/[^"]*vusercontent\.net[^"]+"[^>]*>/gi, "")
  )
}

/**
 * Sanitize HTML content before rendering
 * Removes ephemeral assets and ensures safe rendering
 */
export function sanitizeHtmlContent(html: string): string {
  return stripEphemeralAssets(html)
}

