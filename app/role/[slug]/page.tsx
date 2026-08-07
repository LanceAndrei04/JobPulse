import { notFound } from "next/navigation";
import { EntityAnalysisPage } from "@/components/entity-analysis-page";
import { getRoleAnalysis } from "@/lib/market-analysis-data";

export default async function RolePage({ params }: PageProps<"/role/[slug]">) {
  const { slug } = await params;
  const analysis = getRoleAnalysis(slug);

  if (!analysis) {
    notFound();
  }

  return <EntityAnalysisPage analysis={analysis} />;
}
