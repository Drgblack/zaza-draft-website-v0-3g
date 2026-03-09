import { redirect } from "next/navigation";

export default function SltDocumentationHelpRedirectPage() {
  redirect(
    "/diagnosis?issue=documentation-for-slt&studentContext=behaviour-issues&tone=professional-but-empathetic",
  );
}
