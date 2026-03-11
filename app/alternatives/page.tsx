import { notFound } from "next/navigation";
import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic-seo";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata("alternatives");

export default function AlternativesHubPage() {
  const page = slugToProps("alternatives");

  if (!page) {
    notFound();
  }

  return <ProgrammaticPage page={page} />;
}
