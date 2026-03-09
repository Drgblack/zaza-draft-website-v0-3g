import { notFound } from "next/navigation";
import { ProgrammaticTemplate } from "@/components/ProgrammaticTemplate";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata(
  "parent-communication-problems",
);

export default function ParentCommunicationProblemsPage() {
  const page = slugToProps("parent-communication-problems");

  if (!page) {
    notFound();
  }

  return <ProgrammaticTemplate page={page} />;
}
