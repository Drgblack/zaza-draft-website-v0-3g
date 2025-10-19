import { blogPosts } from "./posts-data";
export type { BlogPost } from "./inbox-transform";

// Canonical posts array for the blog
export const posts: BlogPost[] = blogPosts as unknown as BlogPost[];

// Minimal API expected by blog pages
export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(postId: number, limit = 3): BlogPost[] {
  const current = posts.find((p) => p.id === postId);
  if (!current) return posts.slice(0, limit);
  return posts.filter((p) => p.id !== postId).slice(0, limit);
}
