import { permanentRedirect } from "next/navigation";

export default function ReportWritingStressRedirectPage() {
  permanentRedirect(
    "/diagnosis?issue=report-writing-stress&studentContext=struggling-academically&tone=detailed-report&phase=ks2",
  );
}
