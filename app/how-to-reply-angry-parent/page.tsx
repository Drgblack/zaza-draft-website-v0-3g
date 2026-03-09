import { redirect } from "next/navigation";

export default function HowToReplyAngryParentRedirectPage() {
  redirect("/diagnosis?issue=angry-parent-email&tone=de-escalate");
}
