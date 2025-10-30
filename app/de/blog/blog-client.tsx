"use client"

import type React from "react"
import { useState, useMemo } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Search, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/cms/posts"

interface BlogClientProps {
  posts: BlogPost[]
  language: string
}

const CATEGORIES = [
  "All Posts",
  "How-To Guides",
  "AI in Education",
  "Teacher Wellness",
  "Best Practices",
  "Product Updates",
  "Research & Insights",
]

export function BlogClient({ posts, language }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const [searchQuery, setSearchQuery] = useState("")
  const [newsletterEmail, setNewsletterEmail] = useState("")

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Category filter
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter((post) => post.tags.some((tag) => tag.includes(selectedCategory.split(" ")[0])))
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    return filtered
  }, [posts, selectedCategory, searchQuery])

  // Get featured post (most recent)
  const featuredPost = posts[0]
  const regularPosts = filteredPosts.slice(selectedCategory === "All Posts" && !searchQuery ? 1 : 0)

  // Get popular posts (first 5)
  const popularPosts = posts.slice(0, 5)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    console.log("Newsletter signup:", newsletterEmail)
    setNewsletterEmail("")
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section with Featured Post */}
        {selectedCategory === "All Posts" && !searchQuery && featuredPost && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">The Zaza Blog</h1>
              <p className="text-xl text-gray-400">Practical insights on AI, teaching, and effective communication</p>
            </div>

            {/* Featured Post Card */}
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="bg-[#1E293B] border-[#334155] overflow-hidden hover:border-[#8B5CF6]/50 transition-all group">
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-[#8B5CF6] text-white border-0">Featured</Badge>
                    {featuredPost.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-[#8B5CF6]/10 text-[#A78BFA] border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-[#A78BFA] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-400 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Category Navigation */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex gap-3 pb-4 min-w-max">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-0"
                    : "bg-[#1E293B] hover:bg-[#334155] text-gray-300 border-[#334155]"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#1E293B] border-[#334155] text-white placeholder:text-gray-500 focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
              <Card className="bg-[#1E293B] border-[#334155] p-12 text-center">
                <p className="text-gray-400 text-lg">No articles found matching your search.</p>
              </Card>
            ) : (
              <div className="grid gap-8">
                {regularPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="bg-[#1E293B] border-[#334155] overflow-hidden hover:border-[#8B5CF6]/50 transition-all group">
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-[#8B5CF6]/10 text-[#A78BFA] border-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#A78BFA] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter Signup */}
            <Card className="bg-[#1E293B] border-[#334155] p-6">
              <h3 className="text-xl font-bold text-white mb-3">Get Weekly Teacher Tips</h3>
              <p className="text-gray-400 text-sm mb-4">Join 5,000+ teachers receiving practical AI tips every week.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="bg-[#0F172A] border-[#334155] text-white placeholder:text-gray-500 focus:border-[#8B5CF6]"
                />
                <Button type="submit" className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
            </Card>

            {/* Popular Posts */}
            <Card className="bg-[#1E293B] border-[#334155] p-6">
              <h3 className="text-xl font-bold text-white mb-4">Most Popular</h3>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <div>
                      <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-[#A78BFA] transition-colors mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500">5 min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Categories List */}
            <Card className="bg-[#1E293B] border-[#334155] p-6">
              <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-[#8B5CF6]/10 text-[#A78BFA]"
                        : "text-gray-400 hover:bg-[#334155] hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
