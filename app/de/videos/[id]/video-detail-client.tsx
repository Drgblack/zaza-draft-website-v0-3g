"use client";

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Eye, Download, Share2, BookOpen, ChevronRight, ThumbsUp, MessageSquare } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

// Video data (in production, this would come from a CMS or API)
const videoData: Record<string, any> = {
  "welcome-to-zaza-draft": {
    id: "welcome-to-zaza-draft",
    title: "Welcome to Zaza Draft",
    description: "A quick introduction to Zaza Draft and what you can accomplish with AI-powered parent communication.",
    category: "getting-started",
    duration: "3:24",
    views: 15420,
    likes: 892,
    comments: 45,
    thumbnail: "/welcome-introduction-video.jpg",
    videoUrl: "https://example.com/videos/welcome.mp4",
    publishedDate: "2025-01-15",
    transcript: [
      {
        time: "0:00",
        text: "Welcome to Zaza Draft! I'm excited to show you how our AI-powered platform can transform the way you communicate with parents.",
      },
      {
        time: "0:15",
        text: "Zaza Draft helps teachers save hours every week by generating personalized, professional parent messages in seconds.",
      },
      {
        time: "0:30",
        text: "Whether you're writing progress reports, behavior updates, or weekly newsletters, Zaza Draft makes it easy.",
      },
      {
        time: "0:45",
        text: "In this video, we'll give you a quick overview of what you can accomplish with Zaza Draft.",
      },
      {
        time: "1:00",
        text: "First, let's talk about the core features. Zaza Draft uses advanced AI to understand your intent and generate messages that sound natural and authentic.",
      },
      {
        time: "1:20",
        text: "You can customize the tone, formality, and language to match your communication style and the specific situation.",
      },
      {
        time: "1:40",
        text: "Zaza Draft also supports multilingual communication, so you can reach parents in their preferred language.",
      },
      {
        time: "2:00",
        text: "Our templates library gives you a head start with pre-built messages for common scenarios.",
      },
      {
        time: "2:20",
        text: "And with our integration with Google Classroom and other platforms, you can streamline your entire workflow.",
      },
      {
        time: "2:45",
        text: "Ready to get started? Check out our other tutorials to learn more about specific features.",
      },
      { time: "3:00", text: "Thanks for watching, and welcome to the Zaza Draft community!" },
    ],
    resources: [
      { name: "Quick Start Guide (PDF)", size: "2.4 MB", url: "#" },
      { name: "Keyboard Shortcuts Cheat Sheet", size: "1.1 MB", url: "#" },
    ],
    relatedVideos: ["first-parent-message", "customizing-tone", "templates-library"],
  },
  "first-parent-message": {
    id: "first-parent-message",
    title: "Creating Your First Parent Message",
    description: "Step-by-step guide to writing your first AI-powered parent message with Zaza Draft.",
    category: "getting-started",
    duration: "5:12",
    views: 12350,
    likes: 745,
    comments: 32,
    thumbnail: "/writing-message-tutorial.jpg",
    videoUrl: "https://example.com/videos/first-message.mp4",
    publishedDate: "2025-01-16",
    transcript: [
      {
        time: "0:00",
        text: "In this tutorial, we'll walk through creating your first parent message using Zaza Draft.",
      },
      {
        time: "0:15",
        text: "Let's start by logging into your Zaza Draft account and navigating to the message composer.",
      },
      {
        time: "0:30",
        text: "You'll see a simple interface with a text box where you can describe what you want to communicate.",
      },
      {
        time: "0:50",
        text: "For example, let's say you want to inform a parent about their child's excellent progress in math.",
      },
      {
        time: "1:10",
        text: "Simply type: 'Write a positive message to Sarah's parents about her excellent progress in math this week.'",
      },
      { time: "1:30", text: "Click the Generate button, and Zaza Draft will create a personalized message for you." },
      {
        time: "1:50",
        text: "You can see the AI has generated a warm, professional message that highlights specific achievements.",
      },
      {
        time: "2:15",
        text: "If you want to adjust the tone or add more details, you can edit the prompt and regenerate.",
      },
      { time: "2:40", text: "You can also use the tone selector to make the message more formal or casual." },
      {
        time: "3:05",
        text: "Once you're happy with the message, you can copy it to your clipboard or send it directly through your preferred platform.",
      },
      {
        time: "3:30",
        text: "Zaza Draft also saves your message history, so you can reference previous communications.",
      },
      { time: "4:00", text: "That's it! You've just created your first AI-powered parent message." },
      {
        time: "4:20",
        text: "In the next video, we'll explore how to customize tone and style for different situations.",
      },
    ],
    resources: [
      { name: "Message Templates Library", size: "3.2 MB", url: "#" },
      { name: "Tone & Style Guide", size: "1.8 MB", url: "#" },
    ],
    relatedVideos: ["welcome-to-zaza-draft", "customizing-tone", "multilingual-messages"],
  },
  "advanced-prompts": {
    id: "advanced-prompts",
    title: "Advanced Prompt Engineering",
    description: "Master the art of crafting effective prompts to get better results from Zaza Draft's AI.",
    category: "advanced",
    duration: "8:42",
    views: 6780,
    likes: 423,
    comments: 28,
    thumbnail: "/advanced-prompts.jpg",
    videoUrl: "https://example.com/videos/advanced-prompts.mp4",
    publishedDate: "2025-01-20",
    transcript: [
      { time: "0:00", text: "Welcome to Advanced Prompt Engineering for Zaza Draft." },
      {
        time: "0:15",
        text: "In this tutorial, we'll dive deep into how to craft effective prompts that get you exactly the results you need.",
      },
      { time: "0:35", text: "The key to great AI-generated messages is being specific about what you want." },
      {
        time: "1:00",
        text: "Instead of saying 'Write a message about homework,' try 'Write a friendly reminder to parents about the science project due Friday, emphasizing the importance of starting early.'",
      },
      { time: "1:30", text: "Let's break down the anatomy of a great prompt." },
      {
        time: "1:50",
        text: "First, specify the purpose: Are you informing, requesting, celebrating, or addressing a concern?",
      },
      {
        time: "2:15",
        text: "Second, include relevant context: Student name, specific subject, recent events, or achievements.",
      },
      { time: "2:40", text: "Third, set the tone: Should it be formal, casual, empathetic, or celebratory?" },
      {
        time: "3:05",
        text: "Fourth, mention any specific details you want included, like dates, assignments, or action items.",
      },
      { time: "3:35", text: "Let me show you some examples of weak prompts versus strong prompts." },
      {
        time: "4:00",
        text: "Weak: 'Tell parents about behavior.' Strong: 'Write an empathetic message to Jake's parents about his disruptive behavior in class today, focusing on solutions and requesting a meeting.'",
      },
      { time: "4:40", text: "You can also use prompt modifiers to fine-tune the output." },
      {
        time: "5:05",
        text: "For example, add 'Keep it under 100 words' or 'Include a specific example' to guide the AI.",
      },
      { time: "5:35", text: "Another advanced technique is iterative refinement." },
      {
        time: "6:00",
        text: "Generate a message, then ask the AI to 'Make it more empathetic' or 'Add a specific example about the math test.'",
      },
      { time: "6:30", text: "You can also save your best prompts as templates for future use." },
      {
        time: "7:00",
        text: "Remember, the AI learns from your feedback, so the more you use it, the better it gets at understanding your style.",
      },
      {
        time: "7:30",
        text: "Practice makes perfect. Experiment with different prompt structures to find what works best for you.",
      },
      { time: "8:00", text: "That's it for advanced prompt engineering. Happy prompting!" },
    ],
    resources: [
      { name: "Prompt Engineering Workbook", size: "4.5 MB", url: "#" },
      { name: "100 Example Prompts", size: "2.1 MB", url: "#" },
    ],
    relatedVideos: ["first-parent-message", "customizing-tone", "batch-processing"],
  },
}

export function VideoDetailClient({ videoId }: { videoId: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const video = videoData[videoId]

  if (!video) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
          <Link href="/videos">
            <Button>Back to Videos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedVideos = video.relatedVideos.map((id: string) => videoData[id]).filter(Boolean)

  const handleDownload = (resourceName: string) => {
    trackEvent("video_resource_downloaded", { video_id: videoId, resource: resourceName })
  }

  const handleShare = () => {
    trackEvent("video_shared", { video_id: videoId })
    // In production, implement actual sharing functionality
    alert("Share functionality would be implemented here")
  }

  const handleLike = () => {
    trackEvent("video_liked", { video_id: videoId })
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Breadcrumb */}
      <div className="bg-[#0F1F3A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/videos" className="hover:text-white transition-colors">
              Videos
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{video.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden mb-6 aspect-video">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-3">{video.title}</h1>
              <p className="text-gray-300 mb-4">{video.description}</p>

              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {video.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {video.duration}
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {video.likes} likes
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {video.comments} comments
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleLike}
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white/5 border-white/10">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-white/5 border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">About This Video</h3>
                  <p className="text-gray-300 mb-4">{video.description}</p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>
                      <strong className="text-white">Category:</strong>{" "}
                      {video.category
                        .split("-")
                        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </p>
                    <p>
                      <strong className="text-white">Published:</strong>{" "}
                      {new Date(video.publishedDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong className="text-white">Duration:</strong> {video.duration}
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="transcript" className="mt-6">
                <Card className="bg-white/5 border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Video Transcript</h3>
                  <div className="space-y-4">
                    {video.transcript.map((item: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <Badge variant="outline" className="text-purple-400 border-purple-400/30 shrink-0">
                          {item.time}
                        </Badge>
                        <p className="text-gray-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <Card className="bg-white/5 border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Downloadable Resources</h3>
                  <div className="space-y-3">
                    {video.resources.map((resource: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-purple-400" />
                          <div>
                            <p className="text-white font-medium">{resource.name}</p>
                            <p className="text-sm text-gray-400">{resource.size}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDownload(resource.name)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Related Videos</h3>
              <div className="space-y-4">
                {relatedVideos.map((relatedVideo: any) => (
                  <Link key={relatedVideo.id} href={`/videos/${relatedVideo.id}`} className="flex gap-3 group">
                    <div className="relative w-32 h-20 shrink-0 rounded overflow-hidden">
                      <img
                        src={relatedVideo.thumbnail || "/placeholder.svg"}
                        alt={relatedVideo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="absolute bottom-1 right-1 bg-black/60 text-white border-0 text-xs">
                        {relatedVideo.duration}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors line-clamp-2 mb-1">
                        {relatedVideo.title}
                      </h4>
                      <p className="text-xs text-gray-400">{(relatedVideo.views / 1000).toFixed(1)}K views</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
