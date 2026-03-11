import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "ofsted-friendly-parent-email-examples",
);

export default function OfstedFriendlyParentEmailExamplesPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("ofsted-friendly-parent-email-examples")}
    />
  );
}
