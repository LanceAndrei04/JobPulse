import { GeographicConcentrationSection } from "@/features/overview/components/geographic-concentration-section";
import { MarketSnapshotSection } from "@/features/overview/components/market-snapshot-section";
import { OverviewBackground } from "@/features/overview/components/overview-background";
import { OverviewHeroSection } from "@/features/overview/components/overview-hero-section";
import { RoleLandscapeSection } from "@/features/overview/components/role-landscape-section";
import { SalarySignalsSection } from "@/features/overview/components/salary-signals-section";
import { TechnologyDemandSection } from "@/features/overview/components/technology-demand-section";

export default function Home() {
  return (
    <main className="overview-shell relative flex-1 overflow-hidden">
      <OverviewBackground />
      <div className="relative z-10">
        <OverviewHeroSection />
        <MarketSnapshotSection />
        <TechnologyDemandSection />
        <RoleLandscapeSection />
        <SalarySignalsSection />
        <GeographicConcentrationSection />
      </div>
    </main>
  );
}
