import { ProgrammaticPage } from "@/components/ProgrammaticPage";
import type { ProgrammaticPageData } from "@/lib/programmatic-seo";

export type ProgrammaticTemplateProps = {
  page: ProgrammaticPageData;
};

export function ProgrammaticTemplate({ page }: ProgrammaticTemplateProps) {
  return <ProgrammaticPage page={page} />;
}
