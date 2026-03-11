import { notFound } from "next/navigation";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata("parent-email-scenarios");

export default function ParentEmailScenariosPage() {
  const page = slugToProps("parent-email-scenarios");

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
