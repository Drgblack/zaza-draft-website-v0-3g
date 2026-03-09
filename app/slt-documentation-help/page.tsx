import { permanentRedirect } from "next/navigation";

export default function SltDocumentationHelpRedirectPage() {
  permanentRedirect(
    "/diagnosis?issue=documentation-for-slt&studentContext=behaviour-issues&tone=professional-but-empathetic",
  );
}
