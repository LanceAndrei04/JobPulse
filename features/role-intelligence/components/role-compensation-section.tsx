import { SectionHeader } from "@/features/skill-intelligence/components/primitives/section-header";
import { formatCount, formatSalary } from "@/features/skill-intelligence/utils/format";
import type { RoleSalaryPeer } from "../types/role-intelligence.types";

type RoleCompensationSectionProps = {
  roleSlug: string;
  peers: RoleSalaryPeer[];
};

export function RoleCompensationSection({ roleSlug, peers }: RoleCompensationSectionProps) {
  if (peers.length === 0) {
    return (
      <section>
        <SectionHeader
          eyebrow="Compensation Position"
          title="Salary peers are still forming"
          question="This view appears when enough comparable roles have salary-bearing postings."
        />
        <div className="rounded-2xl border border-border/75 bg-card/55 p-6 text-sm text-muted-foreground">
          Not enough salary peer data to compare this role yet.
        </div>
      </section>
    );
  }

  const maxSalary = Math.max(...peers.map((peer) => peer.estimatedAverage ?? 0), 1);

  return (
    <section>
      <SectionHeader
        eyebrow="Compensation Position"
        title="Salary signal among comparable roles"
        question="This keeps the salary story relative, which is usually more useful than a raw ranking alone."
      />
      <div className="rounded-2xl border border-border/75 bg-card/55 p-5">
        {peers.map((peer) => {
          const isSelected = peer.slug === roleSlug;
          const salary = peer.estimatedAverage ?? 0;

          return (
            <div key={peer.slug} className="border-b border-border/70 py-4 last:border-0">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className={`font-semibold ${isSelected ? "text-emerald-100" : "text-foreground"}`}>
                    {peer.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatCount(peer.salaryObservations)} salary observations
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">{formatSalary(salary)}</p>
              </div>
              <span className="mt-3 block h-2 overflow-hidden rounded-full bg-muted">
                <span
                  className={`block h-full rounded-full motion-safe:animate-[skill-bar-grow_700ms_ease-out_both] ${
                    isSelected ? "bg-emerald-300" : "bg-slate-500"
                  }`}
                  style={{ width: `${Math.min((salary / maxSalary) * 100, 100)}%` }}
                />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
