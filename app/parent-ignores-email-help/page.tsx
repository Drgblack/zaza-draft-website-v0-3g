import { permanentRedirect } from "next/navigation";

export default function ParentIgnoresEmailRedirectPage() {
  permanentRedirect(
    "/diagnosis?issue=parent-ignores-email&studentContext=behaviour-issues&tone=quick-reply",
  );
}
