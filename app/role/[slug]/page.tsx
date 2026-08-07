import { notFound } from "next/navigation";
import { RoleIntelligencePage } from "@/features/role-intelligence/components/role-intelligence-page";
import { getRoleIntelligenceMock } from "@/features/role-intelligence/mocks/role-intelligence.mock";

export default async function RolePage({ params }: PageProps<"/role/[slug]">) {
  const { slug } = await params;
  const analysis = getRoleIntelligenceMock(slug);

  if (!analysis) {
    notFound();
  }

  return <RoleIntelligencePage data={analysis} />;
}
