import { SetLanguage } from "@/components/set-language";
import { ParentEmailSeoTemplate } from "@/components/seo/parent-email-seo-template";
import {
  buildParentEmailSeoMetadata,
  getParentEmailSeoPageOrThrow,
} from "@/lib/seo/parent-email-seo-pages";

const page = getParentEmailSeoPageOrThrow(
  "how-to-respond-when-a-parent-blames-you-for-their-childs-behaviour",
);

export const metadata = buildParentEmailSeoMetadata(page);

export default function HowToRespondWhenAParentBlamesYouForTheirChildsBehaviourPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailSeoTemplate page={page} />
    </>
  );
}
