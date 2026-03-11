import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "how-to-document-parent-contact-for-slt-without-stress",
);

export default function HowToDocumentParentContactForSltWithoutStressPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke(
        "how-to-document-parent-contact-for-slt-without-stress",
      )}
    />
  );
}
