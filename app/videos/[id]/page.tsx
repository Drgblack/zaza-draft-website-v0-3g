import type { Metadata } from "next";
import { VideoDetailClient } from "./video-detail-client";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const videoId = params.id;

  return buildPageMetadata({
    title: `${videoId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} - Video Tutorial | Zaza Draft`,
    description: `Watch this step-by-step video tutorial to learn more about using Zaza Draft effectively.`,
    path: `/videos/${params.id}`,
    alternates: {
      en: `https://zazadraft.com/videos/${params.id}`,
      de: `https://zazadraft.com/de/videos/${params.id}`,
    },
  });
}

export default function VideoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <VideoDetailClient videoId={params.id} />;
}
