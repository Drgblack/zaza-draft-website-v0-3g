import { SetLanguage } from "@/components/set-language";
import { ParentEmailSeoTemplate } from "@/components/seo/parent-email-seo-template";
import {
  buildParentEmailSeoMetadata,
  getParentEmailSeoPageOrThrow,
} from "@/lib/seo/parent-email-seo-pages";

const page = getParentEmailSeoPageOrThrow(
  "how-to-reply-when-a-parent-questions-your-teaching-ability",
);

export const metadata = buildParentEmailSeoMetadata(page);

export default function HowToReplyWhenAParentQuestionsYourTeachingAbilityPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailSeoTemplate page={page} />
    </>
  );
}
