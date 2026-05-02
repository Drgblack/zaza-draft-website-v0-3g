import { Metadata } from "next";
// FINAL CORRECTION: Using the confirmed component name (VideoHubClient) and correct path.
import { VideoHubClient } from "../../videos/video-hub-client";

export const metadata: Metadata = {
  title: "KI-Videos für Lehrer - Zaza Draft",
  description:
    "Sehen Sie sich kurze, lehrreiche Videos über den Einsatz von KI in Ihrem Klassenzimmer an, von der Zeugniserstellung bis zur Elternkommunikation.",
  alternates: {
    canonical: "https://zazadraft.com/de/videos",
    languages: {
      "en-GB": "/videos",
      "de-DE": "/de/videos",
      "x-default": "/videos",
    },
  },
};

export default function DeVideosPage() {
  return <VideoHubClient />;
}
