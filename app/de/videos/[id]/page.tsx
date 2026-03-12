import type { Metadata } from "next";
import { VideoDetailClient } from "@/app/videos/[id]/video-detail-client";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const videoId = params.id;
  const canonical = `https://zazadraft.com/de/videos/${params.id}`;
  const englishUrl = `https://zazadraft.com/videos/${params.id}`;

  return {
    title: `${videoId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} - Video Tutorial | Zaza Draft`,
    description: `Watch this step-by-step video tutorial to learn more about using Zaza Draft effectively.`,
    alternates: {
      canonical,
      languages: {
        en: englishUrl,
        de: canonical,
        "x-default": englishUrl,
      },
    },
    openGraph: {
      title: `${videoId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} - Video Tutorial`,
      description: `Watch this step-by-step video tutorial to learn more about using Zaza Draft effectively.`,
      type: "video.other",
      url: canonical,
      locale: "de_DE",
    },
  };
}

export default function VideoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <VideoDetailClient videoId={params.id} />;
}
