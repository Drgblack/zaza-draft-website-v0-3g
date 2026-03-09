import { notFound } from "next/navigation";
import { ProgrammaticTemplate } from "@/components/ProgrammaticTemplate";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata("scenario-combinations");

export default function ScenarioCombinationsPage() {
  const page = slugToProps("scenario-combinations");

  if (!page) {
    notFound();
  }

  return <ProgrammaticTemplate page={page} />;
}
