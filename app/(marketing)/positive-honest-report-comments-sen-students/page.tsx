import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "positive-honest-report-comments-sen-students",
);

export default function PositiveHonestReportCommentsSenStudentsPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("positive-honest-report-comments-sen-students")}
    />
  );
}
