import type { BlogPost } from "./fallback-posts"
import fallbackPosts from "./fallback-posts"

let postsData: BlogPost[] = []
try {
  // Dynamic import to handle potential errors gracefully
  const postsModule = await import("./posts-data")
  postsData = postsModule.default || postsModule.blogPosts || []

  if (!Array.isArray(postsData) || postsData.length === 0) {
    console.log("[v0] posts-data is empty, using fallback")
    postsData = fallbackPosts
  }
} catch (error) {
  console.error("[v0] Failed to load posts-data, using fallback:", error)
  postsData = fallbackPosts
}

let inboxPosts: BlogPost[] = []
try {
  const { transformInboxToPosts } = await import("./inbox-transform")
  inboxPosts = transformInboxToPosts?.() || []
} catch {
  // Inbox is optional, no error needed
  inboxPosts = []
}

// Merge posts-data with inbox posts
export const posts: BlogPost[] = [...postsData, ...inboxPosts]

export default posts

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.publishedAt || "2025-01-01")
    const dateB = new Date(b.publishedAt || "2025-01-01")
    return dateB.getTime() - dateA.getTime()
  })
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getRelatedPosts(postId: string, limit = 3): BlogPost[] {
  const currentPost = posts.find((post) => post.id === postId)
  if (!currentPost) return []

  const related = posts
    .filter((post) => post.id !== postId)
    .filter((post) => {
      // Match by category
      if (post.category === currentPost.category) return true
      // Match by tags
      if (post.tags && currentPost.tags) {
        return post.tags.some((tag) => currentPost.tags?.includes(tag))
      }
      return false
    })
    .slice(0, limit)

  return related
}
