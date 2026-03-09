import { redirect } from "next/navigation";

export default function ReportWritingStressRedirectPage() {
  redirect(
    "/diagnosis?issue=report-writing-stress&studentContext=struggling-academically&tone=detailed-report&phase=ks2",
  );
}
