import { notFound } from "next/navigation";
import { SkillIntelligencePage } from "@/features/skill-intelligence/components/skill-intelligence-page";
import { getSkillIntelligenceMock } from "@/features/skill-intelligence/mocks/skill-intelligence.mock";
import { IntelligenceService } from "@/services/intelligence.service";

export const dynamic = "force-dynamic";

export default async function SkillPage({ params }: PageProps<"/skill/[slug]">) {
  const { slug } = await params;
  const data = (await getLiveSkillIntelligence(slug)) ?? getSkillIntelligenceMock(slug);

  if (!data) {
    notFound();
  }

  return <SkillIntelligencePage data={data} />;
}

async function getLiveSkillIntelligence(slug: string) {
  try {
    const service = new IntelligenceService();
    return await service.getSkillIntelligence(slug);
  } catch (error) {
    console.error("Skill intelligence fallback:", error);
    return null;
  }
}
