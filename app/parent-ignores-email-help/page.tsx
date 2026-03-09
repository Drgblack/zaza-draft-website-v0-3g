import { redirect } from "next/navigation";

export default function ParentIgnoresEmailRedirectPage() {
  redirect(
    "/diagnosis?issue=parent-ignores-email&studentContext=behaviour-issues&tone=quick-reply",
  );
}
