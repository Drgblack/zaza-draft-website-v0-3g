import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "behaviour-letter-home-primary-school-ai-help",
);

export default function BehaviourLetterHomePrimarySchoolAiHelpPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("behaviour-letter-home-primary-school-ai-help")}
    />
  );
}
