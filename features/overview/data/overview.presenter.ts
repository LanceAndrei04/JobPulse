import { Atom, Cloud, Code2 } from "lucide-react";
import { getRoleSlug } from "@/lib/role-classifier";
import type { OverviewAnalyticsDto } from "@/types/intelligence";
import {
  geographicSignals as fallbackGeographicSignals,
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
      technologyDemand: fallbackTechnologyDemand,
      roleSegments: fallbackRoleSegments,
      salarySignals: fallbackSalarySignals,
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
          delta: `${formatCount(data.overview.jobsWithSalary)} salary samples`,
        };
      }

      return {
        ...metric,
        value: formatCount(data.overview.totalSkills),
        fill: getFill(data.overview.totalSkills, Math.max(data.overview.totalSkills, 1)),
      };
    }),
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
      observations: `${formatCount(skill.jobsWithSalary)} obs.`,
      delta: data.overview.averageSalary
        ? Math.round(((skill.averageSalary - data.overview.averageSalary) / data.overview.averageSalary) * 100)
        : 0,
      href: `/skill/${slugify(skill.name)}`,
    })),
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
