import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "parents-evening-email-templates-uk",
);

export default function ParentsEveningEmailTemplatesUkPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("parents-evening-email-templates-uk")}
    />
  );
}
