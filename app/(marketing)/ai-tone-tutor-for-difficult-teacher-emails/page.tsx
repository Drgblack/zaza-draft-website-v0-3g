import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "ai-tone-tutor-for-difficult-teacher-emails",
);

export default function AiToneTutorForDifficultTeacherEmailsPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("ai-tone-tutor-for-difficult-teacher-emails")}
    />
  );
}
