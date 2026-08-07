import { notFound } from "next/navigation";
import { SkillIntelligencePage } from "@/features/skill-intelligence/components/skill-intelligence-page";
import { getSkillIntelligenceMock } from "@/features/skill-intelligence/mocks/skill-intelligence.mock";

export default async function SkillPage({ params }: PageProps<"/skill/[slug]">) {
  const { slug } = await params;
  const data = getSkillIntelligenceMock(slug);

  if (!data) {
    notFound();
  }

  return <SkillIntelligencePage data={data} />;
}
