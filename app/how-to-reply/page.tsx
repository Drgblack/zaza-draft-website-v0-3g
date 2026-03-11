import { notFound } from "next/navigation";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata("how-to-reply");

export default function HowToReplyHubPage() {
  const page = slugToProps("how-to-reply");

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
