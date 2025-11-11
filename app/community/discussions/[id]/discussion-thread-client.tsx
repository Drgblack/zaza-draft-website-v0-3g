"use client";

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageCircle, Eye, Share2, Flag, Crown, Star, Clock, CheckCircle } from "lucide-react"
import { analytics } from "@/lib/analytics"
import Link from "next/link"

// Mock discussion data - in production, this would come from a database
const discussionData: Record<string, any> = {
  "1": {
    id: "1",
    title: "How I saved 10 hours this week using AI for parent emails",
    author: {
      name: "Sarah Martinez",
      level: "Expert",
      badge: "Ambassador",
      avatar: "SM",
      reputation: 8765,
      posts: 1234,
      joined: "Jan 2024",
    },
    category: "parent-communication",
    createdAt: "2 hours ago",
    views: 2345,
    likes: 156,
    replies: 87,
    content: `I've been using Zaza Draft for parent communication and wanted to share my workflow that's been a game-changer.

**My Weekly Parent Communication Workflow:**

1. **Monday Morning:** I spend 15 minutes reviewing the week's events and creating a template for common scenarios (behavior updates, academic progress, upcoming events).

2. **Throughout the Week:** When I need to send an email, I use Zaza Draft with my pre-made templates. I just input the student's name and specific details, and it generates a professional, empathetic email in seconds.

3. **Friday Afternoon:** I batch-process any remaining communications. What used to take 2-3 hours now takes 20 minutes.

**Key Tips:**
- Save your best prompts as templates
- Always personalize the AI output with specific student details
- Use the tone adjustment feature to match your communication style
- Keep a "wins" folder of particularly effective emails

**Results:**
- Saved 10+ hours per week
- More consistent communication quality
- Parents have commented on how responsive I am
- Less stress about writing the "perfect" email

Happy to answer any questions about my workflow!`,
    replies: [
      {
        id: "r1",
        author: {
          name: "Michael Chen",
          level: "Advanced",
          badge: null,
          avatar: "MC",
          reputation: 6543,
        },
        createdAt: "1 hour ago",
        likes: 45,
        content:
          "This is brilliant! I've been struggling with parent emails taking up so much time. Do you have any specific prompts you'd be willing to share for behavior updates?",
        isAccepted: false,
      },
      {
        id: "r2",
        author: {
          name: "Sarah Martinez",
          level: "Expert",
          badge: "Ambassador",
          avatar: "SM",
          reputation: 8765,
        },
        createdAt: "45 minutes ago",
        likes: 67,
        content: `Here's my go-to prompt for positive behavior updates:

"Write a warm, encouraging email to [student name]'s parent about their positive behavior today. Specific details: [describe the behavior]. Tone: enthusiastic but professional. Length: 3-4 sentences."

For challenging behaviors, I use:

"Write an empathetic, solution-focused email to [student name]'s parent about [describe situation]. Include: what happened, why it's a concern, and 2-3 collaborative next steps. Tone: supportive and partnership-oriented."

The key is being specific about the tone and including concrete details!`,
        isAccepted: true,
      },
      {
        id: "r3",
        author: {
          name: "Rachel Thompson",
          level: "Intermediate",
          badge: null,
          avatar: "RT",
          reputation: 4321,
        },
        createdAt: "30 minutes ago",
        likes: 23,
        content:
          "Thank you for sharing this! I'm going to try this workflow next week. Do you find that parents can tell the emails are AI-assisted?",
        isAccepted: false,
      },
    ],
  },
}

export default function DiscussionThreadClient() {
  const params = useParams()
  const discussionId = params.id as string
  const discussion = discussionData[discussionId]

  const [replyText, setReplyText] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("popular")
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set())
  const [discussionLiked, setDiscussionLiked] = useState(false)

  useEffect(() => {
    if (discussion) {
      analytics.community.viewDiscussion(discussion.id, discussion.title)
    }
  }, [discussion])

  if (!discussion) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Discussion not found</h1>
          <Link href="/community">
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">Back to Community</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleLikeDiscussion = () => {
    setDiscussionLiked(!discussionLiked)
    analytics.community.likeDiscussion(discussion.id)
  }

  const handleLikeReply = (replyId: string) => {
    const newLiked = new Set(likedReplies)
    if (newLiked.has(replyId)) {
      newLiked.delete(replyId)
    } else {
      newLiked.add(replyId)
    }
    setLikedReplies(newLiked)
  }

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      analytics.community.postReply(discussion.id, replyText.length)
      setReplyText("")
      // In production, this would submit to the backend
    }
  }

  const sortedReplies = [...discussion.replies].sort((a, b) => {
    if (sortBy === "popular") return b.likes - a.likes
    if (sortBy === "newest") return 0 // Would use actual timestamps
    return 0 // oldest
  })

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Breadcrumb */}
      <div className="bg-[#1E293B] border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/community" className="hover:text-[#A78BFA] transition-colors">
              Community
            </Link>
            <span>/</span>
            <Link
              href={`/community?category=${discussion.category}`}
              className="hover:text-[#A78BFA] transition-colors"
            >
              {discussion.category.replace("-", " ")}
            </Link>
            <span>/</span>
            <span className="text-white truncate">{discussion.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Discussion Header */}
        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{discussion.title}</h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-14 h-14 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {discussion.author.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-lg">{discussion.author.name}</span>
                <span className="text-xs bg-[#8B5CF6]/20 text-[#A78BFA] px-2 py-1 rounded">
                  {discussion.author.level}
                </span>
                {discussion.author.badge && (
                  <span className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                    <Crown className="w-3 h-3" />
                    {discussion.author.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {discussion.author.reputation.toLocaleString()} reputation
                </span>
                <span>â€¢</span>
                <span>{discussion.author.posts.toLocaleString()} posts</span>
                <span>â€¢</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {discussion.createdAt}
                </span>
              </div>
            </div>
          </div>

          {/* Discussion Content */}
          <div className="prose prose-invert max-w-none mb-6">
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">{discussion.content}</div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${discussionLiked ? "text-[#A78BFA]" : "text-gray-400"} hover:text-[#A78BFA]`}
              onClick={handleLikeDiscussion}
            >
              <ThumbsUp className={`w-5 h-5 ${discussionLiked ? "fill-current" : ""}`} />
              <span>{discussion.likes + (discussionLiked ? 1 : 0)}</span>
            </Button>
            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle className="w-5 h-5" />
              <span>{discussion.replies.length} replies</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Eye className="w-5 h-5" />
              <span>{discussion.views} views</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-400 hover:text-[#A78BFA] ml-auto"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-400 hover:text-red-400">
              <Flag className="w-5 h-5" />
              <span>Report</span>
            </Button>
          </div>
        </div>

        {/* Replies Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{discussion.replies.length} Replies</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#1E293B] border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:border-[#8B5CF6] focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Reply List */}
          <div className="space-y-4">
            {sortedReplies.map((reply) => (
              <div
                key={reply.id}
                className={`bg-[#1E293B] border rounded-xl p-6 ${
                  reply.isAccepted ? "border-green-500/50 bg-green-500/5" : "border-white/10"
                }`}
              >
                {reply.isAccepted && (
                  <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span>Accepted Answer</span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {reply.author.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-white">{reply.author.name}</span>
                      <span className="text-xs bg-[#8B5CF6]/20 text-[#A78BFA] px-2 py-0.5 rounded">
                        {reply.author.level}
                      </span>
                      {reply.author.badge && (
                        <span className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                          <Crown className="w-3 h-3" />
                          {reply.author.badge}
                        </span>
                      )}
                      <span className="text-sm text-gray-400">â€¢ {reply.createdAt}</span>
                    </div>
                    <div className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">{reply.content}</div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-2 ${likedReplies.has(reply.id) ? "text-[#A78BFA]" : "text-gray-400"} hover:text-[#A78BFA]`}
                        onClick={() => handleLikeReply(reply.id)}
                      >
                        <ThumbsUp className={`w-4 h-4 ${likedReplies.has(reply.id) ? "fill-current" : ""}`} />
                        <span>{reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#A78BFA]">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Add Your Reply</h3>
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Share your thoughts, experiences, or questions..."
            className="bg-[#0F172A] border-white/10 text-white placeholder:text-gray-400 min-h-[150px] mb-4"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Be respectful and constructive. See our{" "}
              <Link href="/community/guidelines" className="text-[#A78BFA] hover:underline">
                community guidelines
              </Link>
              .
            </p>
            <Button
              onClick={handleSubmitReply}
              disabled={!replyText.trim()}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
            >
              Post Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
