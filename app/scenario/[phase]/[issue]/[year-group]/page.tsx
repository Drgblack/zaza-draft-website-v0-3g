import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ScenarioPage } from "@/components/ScenarioPage";
import {
  buildScenarioPageData,
  getScenarioCombinations,
  type Issue,
  type Phase,
  type YearGroup,
} from "@/lib/matrix";
import {
  buildProgrammaticMetadata,
  buildProgrammaticNotFoundMetadata,
} from "@/lib/seo-helpers";
import { getIndexControlDecision } from "@/lib/index-control";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return getScenarioCombinations().map((item) => ({
    phase: item.phase,
    issue: item.issue,
    "year-group": item.yearGroup,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { phase: string; issue: string; "year-group": string };
}): Metadata {
  const page = buildScenarioPageData(
    params.phase as Phase,
    params.issue as Issue,
    params["year-group"] as YearGroup,
  );

  if (!page) {
    return buildProgrammaticNotFoundMetadata(
      "Scenario page not found | Zaza Draft",
      "The requested scenario page could not be found.",
    );
  }

  const indexDecision = getIndexControlDecision(page.path);

  if (!indexDecision.indexable) {
    console.info(
      `[index-control] noindex ${page.path} :: ${indexDecision.reason} :: variation-signals=${indexDecision.variationSignalCount ?? "n/a"}`,
    );
  }

  return {
    ...buildProgrammaticMetadata({
      title: page.title,
      description: page.metaDescription,
      path: page.path,
      type: "article",
      keywords: [
        page.keyword,
        "teacher parent communication",
        "professional communication",
        "behaviour letter",
        "parents' evening",
        "Ofsted",
        "safeguarding",
        "teacher-first AI",
      ],
    }),
    robots: {
      index: indexDecision.indexable,
      follow: true,
    },
  };
}

export default function ScenarioMatrixPage({
  params,
}: {
  params: { phase: string; issue: string; "year-group": string };
}) {
  const page = buildScenarioPageData(
    params.phase as Phase,
    params.issue as Issue,
    params["year-group"] as YearGroup,
  );

  if (!page) {
    notFound();
  }

  return (
    <ScenarioPage
      mode="scenario"
      phase={params.phase as Phase}
      issue={params.issue as Issue}
      yearGroup={params["year-group"] as YearGroup}
    />
  );
}
