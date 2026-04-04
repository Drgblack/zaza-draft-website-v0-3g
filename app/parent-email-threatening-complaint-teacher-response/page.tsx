import { SetLanguage } from "@/components/set-language";
import { ParentEmailSeoTemplate } from "@/components/seo/parent-email-seo-template";
import {
  buildParentEmailSeoMetadata,
  getParentEmailSeoPageOrThrow,
} from "@/lib/seo/parent-email-seo-pages";

const page = getParentEmailSeoPageOrThrow(
  "parent-email-threatening-complaint-teacher-response",
);

export const metadata = buildParentEmailSeoMetadata(page);

export default function ParentEmailThreateningComplaintTeacherResponsePage() {
  return (
    <>
      <SetLanguage lang="en" />
      <ParentEmailSeoTemplate page={page} />
    </>
  );
}
