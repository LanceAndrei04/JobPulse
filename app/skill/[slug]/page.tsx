import { notFound } from "next/navigation";
import { EntityAnalysisPage } from "@/components/entity-analysis-page";
import { getSkillAnalysis } from "@/lib/market-analysis-data";

export default async function SkillPage({ params }: PageProps<"/skill/[slug]">) {
  const { slug } = await params;
  const analysis = getSkillAnalysis(slug);

  if (!analysis) {
    notFound();
  }

  return <EntityAnalysisPage analysis={analysis} />;
}
