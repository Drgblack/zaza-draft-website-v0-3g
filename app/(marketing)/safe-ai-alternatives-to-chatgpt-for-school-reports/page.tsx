import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "safe-ai-alternatives-to-chatgpt-for-school-reports",
);

export default function SafeAiAlternativesToChatGptForSchoolReportsPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke(
        "safe-ai-alternatives-to-chatgpt-for-school-reports",
      )}
    />
  );
}
