import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "reduce-sunday-night-report-stress-with-ai",
);

export default function ReduceSundayNightReportStressWithAiPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("reduce-sunday-night-report-stress-with-ai")}
    />
  );
}
