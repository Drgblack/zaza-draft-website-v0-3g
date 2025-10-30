import type { Metadata } from "next"
import { VideoDetailClient } from "./video-detail-client"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const videoId = params.id

  return {
    title: `${videoId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} - Video Tutorial | Zaza Draft`,
    description: `Watch this step-by-step video tutorial to learn more about using Zaza Draft effectively.`,
    openGraph: {
      title: `${videoId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} - Video Tutorial`,
      description: `Watch this step-by-step video tutorial to learn more about using Zaza Draft effectively.`,
      type: "video.other",
    },
  }
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  return <VideoDetailClient videoId={params.id} />
}
