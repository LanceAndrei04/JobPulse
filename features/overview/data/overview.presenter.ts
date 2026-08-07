import { Atom, Cloud, Code2, Link2, Network, TrendingUp } from "lucide-react";
import { getRoleSlug } from "@/lib/role-classifier";
import type { OverviewAnalyticsDto } from "@/types/intelligence";
import {
  geographicSignals as fallbackGeographicSignals,
  keySignals as fallbackKeySignals,
  roleSegments as fallbackRoleSegments,
  salarySignals as fallbackSalarySignals,
  snapshotMetrics as fallbackSnapshotMetrics,
  technologyDemand as fallbackTechnologyDemand,
} from "./overview.data";

export function buildOverviewData(data: OverviewAnalyticsDto | null) {
  if (!data) {
    return {
      hero: {
        totalJobs: "1,284",
        signals: [
          { label: "React", detail: "427 postings", icon: "react" as const },
          { label: "AWS", detail: "386 postings", icon: "aws" as const },
          { label: "TypeScript", detail: "68% with React" },
        ],
      },
      snapshotMetrics: fallbackSnapshotMetrics,
      keySignals: fallbackKeySignals,
      technologyDemand: fallbackTechnologyDemand,
      roleSegments: fallbackRoleSegments,
      salarySignals: fallbackSalarySignals,
      roleSalarySignals: [],
      salaryBaseline: "dataset average",
      geographicSignals: fallbackGeographicSignals,
    };
  }

  const totalJobs = data.overview.totalJobs || 1;
  const topSkillMax = Math.max(...data.topSkills.map((skill) => skill.jobCount), 1);
  const topStateMax = Math.max(...data.topStates.map((state) => state.jobCount), 1);
  const totalRoleJobs = data.topRoles.reduce((sum, role) => sum + role.jobCount, 0) || 1;

  return {
    hero: {
      totalJobs: formatCount(data.overview.totalJobs),
      signals: data.topSkills.slice(0, 3).map((skill) => ({
        label: skill.name,
        detail: `${formatCount(skill.jobCount)} postings`,
        icon: getSkillSignalIcon(skill.name),
      })),
    },
    snapshotMetrics: fallbackSnapshotMetrics.map((metric) => {
      if (metric.label === "Postings analyzed") {
        return {
          ...metric,
          value: formatCount(data.overview.totalJobs),
          fill: getFill(data.overview.totalJobs, totalJobs),
        };
      }

      if (metric.label === "Companies represented") {
        return {
          ...metric,
          value: formatCount(data.overview.companies),
          fill: getFill(data.overview.companies, data.overview.totalJobs),
        };
      }

      if (metric.label === "Est. avg salary") {
        return {
          ...metric,
          value: data.overview.averageSalary ? formatSalary(data.overview.averageSalary) : "N/A",
          fill: getFill(data.overview.jobsWithSalary, data.overview.totalJobs),
          delta: `${formatCount(data.overview.jobsWithSalary)} salary records`,
        };
      }

      return {
        ...metric,
        value: formatCount(data.overview.totalSkills),
        fill: getFill(data.overview.totalSkills, Math.max(data.overview.totalSkills, 1)),
      };
    }),
    keySignals: [
      data.topSkills.length >= 2
        ? {
            icon: TrendingUp,
            title: `${data.topSkills[0].name} and ${data.topSkills[1].name} lead current technology demand.`,
            stat: `${getPercent(data.topSkills[0].jobCount, totalJobs)} and ${getPercent(data.topSkills[1].jobCount, totalJobs)}`,
          }
        : null,
      data.topRoles.length >= 2
        ? {
            icon: Network,
            title: `${data.topRoles[0].role} and ${data.topRoles[1].role} make up the largest role share.`,
            stat: `${getPercent(data.topRoles[0].jobCount + data.topRoles[1].jobCount, totalJobs)} combined`,
          }
        : null,
      data.topSkills[0]
        ? {
            icon: Link2,
            title: `${data.topSkills[0].name} is the strongest skill signal in the current dataset.`,
            stat: `${formatCount(data.topSkills[0].jobCount)} postings`,
          }
        : null,
    ].filter((signal) => signal !== null),
    technologyDemand: data.topSkills.slice(0, 4).map((skill) => ({
      label: skill.name,
      logo: skill.name.toLowerCase(),
      icon: getSkillIcon(skill.name),
      count: formatCount(skill.jobCount),
      value: `~${Math.round((skill.jobCount / totalJobs) * 100)}%`,
      percentage: Math.round((skill.jobCount / topSkillMax) * 100),
      href: `/skill/${slugify(skill.name)}`,
    })),
    roleSegments: data.topRoles.slice(0, 5).map((role, index) => ({
      label: role.role,
      value: Math.round((role.jobCount / totalRoleJobs) * 100),
      color: fallbackRoleSegments[index]?.color ?? "bg-slate-500",
    })),
    salarySignals: data.highestPayingSkills.slice(0, 3).map((skill) => ({
      label: skill.name,
      salary: formatSalary(skill.averageSalary),
      observations: `${formatCount(skill.jobsWithSalary)} observations`,
      delta: data.overview.averageSalary
        ? Math.round(
            ((skill.averageSalary - data.overview.averageSalary) /
              data.overview.averageSalary) *
              100
          )
        : 0,
      href: `/skill/${slugify(skill.name)}`,
    })),
    roleSalarySignals: [...data.topRoles]
      .filter((role) => role.averageSalary !== null && role.jobsWithSalary > 0)
      .sort((a, b) => (b.averageSalary ?? 0) - (a.averageSalary ?? 0))
      .slice(0, 3)
      .map((role) => ({
        label: role.role,
        salary: formatSalary(role.averageSalary ?? 0),
        observations: `${formatCount(role.jobsWithSalary)} observations`,
        delta: data.overview.averageSalary
          ? Math.round(
              (((role.averageSalary ?? 0) - data.overview.averageSalary) /
                data.overview.averageSalary) *
                100,
            )
          : 0,
        href: `/role/${slugify(role.role)}`,
      })),
    salaryBaseline: data.overview.averageSalary
      ? formatSalary(data.overview.averageSalary)
      : "the dataset",
    geographicSignals: data.topStates.slice(0, 3).map((state) => ({
      label: state.state ?? "Unknown",
      value: `${Math.round((state.jobCount / totalJobs) * 100)}%`,
      percentage: Math.round((state.jobCount / topStateMax) * 100),
    })),
  };
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatSalary(value: number) {
  return `$${Math.round(value / 1000)}K`;
}

function getPercent(value: number, total: number) {
  return `~${Math.round((value / total) * 100)}%`;
}

function getFill(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.min(Math.round((value / total) * 100), 100);
}

function slugify(value: string) {
  return getRoleSlug(value);
}

function getSkillIcon(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes("react")) return Atom;
  if (normalized.includes("aws") || normalized.includes("cloud")) return Cloud;
  if (normalized.includes("python")) return Code2;
  return undefined;
}

function getSkillSignalIcon(name: string): "react" | "aws" | undefined {
  const normalized = name.toLowerCase();
  if (normalized.includes("react")) return "react";
  if (normalized.includes("aws") || normalized.includes("cloud")) return "aws";
  return undefined;
}
