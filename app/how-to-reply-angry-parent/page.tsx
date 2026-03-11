import { permanentRedirect } from "next/navigation";

export default function HowToReplyAngryParentRedirectPage() {
  permanentRedirect("/diagnosis?issue=angry-parent-email&tone=de-escalate");
}
