import { SetLanguage } from "@/components/set-language";
import { ParentEmailSeoTemplate } from "@/components/seo/parent-email-seo-template";
import {
  buildParentEmailSeoMetadata,
  getParentEmailSeoPageOrThrow,
} from "@/lib/seo/parent-email-seo-pages";

const page = getParentEmailSeoPageOrThrow(
  "how-to-respond-to-a-parent-who-ccd-others-into-the-email",
);

export const metadata = buildParentEmailSeoMetadata(page);

export default function HowToRespondToAParentWhoCcdOthersIntoTheEmailPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailSeoTemplate page={page} />
    </>
  );
}
