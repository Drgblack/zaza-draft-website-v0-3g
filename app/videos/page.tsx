import type { Metadata } from "next";
import { VideoHubClient } from "./video-hub-client";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Video Tutorials and Demos | Zaza Draft";
  const description =
    "Watch step-by-step tutorials and product demos to master AI-powered parent communication.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://zazadraft.com/videos",
      languages: {
        "en-GB": "https://zazadraft.com/videos",
        "de-DE": "https://zazadraft.com/de/videos",
        "x-default": "https://zazadraft.com/videos",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function VideoHubPage() {
  return <VideoHubClient />;
}
