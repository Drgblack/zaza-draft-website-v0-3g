import { SetLanguage } from "@/components/set-language";
import { ParentEmailSeoTemplate } from "@/components/seo/parent-email-seo-template";
import {
  buildParentEmailSeoMetadata,
  getParentEmailSeoPageOrThrow,
} from "@/lib/seo/parent-email-seo-pages";

const page = getParentEmailSeoPageOrThrow(
  "responding-to-a-parent-who-escalates-to-the-principal",
);

export const metadata = buildParentEmailSeoMetadata(page);

export default function RespondingToAParentWhoEscalatesToThePrincipalPage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailSeoTemplate page={page} />
    </>
  );
}
