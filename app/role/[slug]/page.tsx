import { notFound } from "next/navigation";
import { RoleIntelligencePage } from "@/features/role-intelligence/components/role-intelligence-page";
import { getRoleIntelligenceMock } from "@/features/role-intelligence/mocks/role-intelligence.mock";
import { IntelligenceService } from "@/services/intelligence.service";

export const dynamic = "force-dynamic";

export default async function RolePage({ params }: PageProps<"/role/[slug]">) {
  const { slug } = await params;
  const analysis = (await getLiveRoleIntelligence(slug)) ?? getRoleIntelligenceMock(slug);

  if (!analysis) {
    notFound();
  }

  return <RoleIntelligencePage data={analysis} />;
}

async function getLiveRoleIntelligence(slug: string) {
  try {
    const service = new IntelligenceService();
    return await service.getRoleIntelligence(slug);
  } catch (error) {
    console.error("Role intelligence fallback:", error);
    return null;
  }
}
