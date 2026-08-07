import { GeographicConcentrationSection } from "@/features/overview/components/geographic-concentration-section";
import { MarketSnapshotSection } from "@/features/overview/components/market-snapshot-section";
import { OverviewBackground } from "@/features/overview/components/overview-background";
import { OverviewHeroSection } from "@/features/overview/components/overview-hero-section";
import { RoleLandscapeSection } from "@/features/overview/components/role-landscape-section";
import { SalarySignalsSection } from "@/features/overview/components/salary-signals-section";
import { TechnologyDemandSection } from "@/features/overview/components/technology-demand-section";
import { buildOverviewData } from "@/features/overview/data/overview.presenter";
import { AnalyticsService } from "@/services/analytics.service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const overview = buildOverviewData(await getOverviewAnalytics());

  return (
    <main className="overview-shell relative flex-1 overflow-hidden">
      <OverviewBackground />
      <div className="relative z-10">
        <OverviewHeroSection
          totalJobs={overview.hero.totalJobs}
          signals={overview.hero.signals}
        />
        <MarketSnapshotSection
          metrics={overview.snapshotMetrics}
          signals={overview.keySignals}
        />
        <TechnologyDemandSection items={overview.technologyDemand} />
        <RoleLandscapeSection segments={overview.roleSegments} />
        <SalarySignalsSection
          skills={overview.salarySignals}
          roles={overview.roleSalarySignals}
          baseline={overview.salaryBaseline}
        />
        <GeographicConcentrationSection items={overview.geographicSignals} />
      </div>
    </main>
  );
}

async function getOverviewAnalytics() {
  try {
    const service = new AnalyticsService();
    return await service.getDashboard();
  } catch (error) {
    console.error("Overview analytics fallback:", error);
    return null;
  }
}
