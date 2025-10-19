import type { Metadata } from "next"
import { VideoHubClient } from "./video-hub-client"

export const metadata: Metadata = {
  title: "Video Tutorials & Demos | Zaza Draft",
  description:
    "Watch step-by-step video tutorials and product demos to master AI-powered parent communication. Learn at your own pace with our comprehensive video library.",
  openGraph: {
    title: "Video Tutorials & Demos | Zaza Draft",
    description: "Watch step-by-step video tutorials and product demos to master AI-powered parent communication.",
    type: "website",
  },
}

export default function VideoHubPage() {
  return <VideoHubClient />
}
