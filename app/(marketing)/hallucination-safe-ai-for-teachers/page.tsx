import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "hallucination-safe-ai-for-teachers",
);

export default function HallucinationSafeAiForTeachersPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("hallucination-safe-ai-for-teachers")}
    />
  );
}
