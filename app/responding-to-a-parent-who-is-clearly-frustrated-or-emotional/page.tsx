import { SetLanguage } from "@/components/set-language";
import { ParentEmailSeoTemplate } from "@/components/seo/parent-email-seo-template";
import {
  buildParentEmailSeoMetadata,
  getParentEmailSeoPageOrThrow,
} from "@/lib/seo/parent-email-seo-pages";

const page = getParentEmailSeoPageOrThrow(
  "responding-to-a-parent-who-is-clearly-frustrated-or-emotional",
);

export const metadata = buildParentEmailSeoMetadata(page);

export default function RespondingToAParentWhoIsClearlyFrustratedOrEmotionalPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailSeoTemplate page={page} />
    </>
  );
}
