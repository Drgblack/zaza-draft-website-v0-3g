import { notFound } from "next/navigation";
import { ProgrammaticTemplate } from "@/components/ProgrammaticTemplate";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata("reply-scenarios");

export default function ReplyScenariosPage() {
  const page = slugToProps("reply-scenarios");

  if (!page) {
    notFound();
  }

  return <ProgrammaticTemplate page={page} />;
}
