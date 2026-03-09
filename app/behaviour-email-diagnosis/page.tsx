import { permanentRedirect } from "next/navigation";

export default function BehaviourEmailDiagnosisRedirectPage() {
  permanentRedirect(
    "/diagnosis?issue=behaviour-concern&phase=primary&studentContext=behaviour-issues&tone=professional-but-empathetic",
  );
}
