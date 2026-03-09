import { redirect } from "next/navigation";

export default function BehaviourEmailDiagnosisRedirectPage() {
  redirect(
    "/diagnosis?issue=behaviour-concern&phase=primary&studentContext=behaviour-issues&tone=professional-but-empathetic",
  );
}
