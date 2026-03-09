import { ClusterSpokeOutlinePage } from "@/components/seo/cluster-spoke-outline-page";
import {
  buildClusterSpokeMetadata,
  getClusterSpoke,
} from "@/lib/seo/teacher-safe-ai-cluster";

export const metadata = buildClusterSpokeMetadata(
  "gdpr-compliant-ai-report-writer-uk-teachers",
);

export default function GdprCompliantAiReportWriterUkTeachersPage() {
  return (
    <ClusterSpokeOutlinePage
      page={getClusterSpoke("gdpr-compliant-ai-report-writer-uk-teachers")}
    />
  );
}
