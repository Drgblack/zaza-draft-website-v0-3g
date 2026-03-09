import { notFound } from "next/navigation";
import { ProgrammaticTemplate } from "@/components/ProgrammaticTemplate";
import {
  generateMetadata as buildProgrammaticMetadata,
  slugToProps,
} from "@/lib/programmatic";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata("uk-school-communication");

export default function UkSchoolCommunicationPage() {
  const page = slugToProps("uk-school-communication");

  if (!page) {
    notFound();
  }

  return <ProgrammaticTemplate page={page} />;
}
