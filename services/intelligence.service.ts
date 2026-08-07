import { IntelligenceRepository } from "@/repositories/intelligence.repository";
import { getRoleNameFromSlug, getRoleSlug, roleNameToSlug, slugify } from "@/lib/role-classifier";
import type {
  RoleIntelligenceDto,
  SearchEntityDto,
  SkillIntelligenceDto,
} from "@/types/intelligence";
import type { SkillCategory } from "@/features/skill-intelligence/types/skill-intelligence.types";

const categoryMap: Record<string, SkillCategory> = {
  FRAMEWORK: "framework",
  LANGUAGE: "language",
  CLOUD: "cloud",
  DATABASE: "database",
  DEVOPS: "platform",
  TOOL: "platform",
  RUNTIME: "platform",
  LIBRARY: "framework",
  TESTING: "platform",
  MOBILE: "platform",
  AI: "platform",
  OTHER: "platform",
};

export class IntelligenceService {
  private repository = new IntelligenceRepository();

  async search(query = "", limit = 8): Promise<SearchEntityDto[]> {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      const [skills, rolePeers] = await Promise.all([
        this.repository.getTopSearchSkills(3),
        this.repository.getRolePeers(2),
      ]);

      return [
        ...skills.map((skill) => ({
          name: skill.name,
          slug: slugify(skill.normalizedName),
          type: "Skill" as const,
          href: `/skill/${slugify(skill.normalizedName)}`,
        })),
        ...rolePeers.map((role) => ({
          name: role.role,
          slug: getRoleSlug(role.role),
          type: "Role" as const,
          href: `/role/${getRoleSlug(role.role)}`,
        })),
      ].slice(0, limit);
    }

    const [skills, rolePeers] = await Promise.all([
      this.repository.getSearchSkills(query.trim(), 30),
      this.repository.getRolePeers(30),
    ]);

    const skillItems = skills.map((skill) => ({
      name: skill.name,
      slug: slugify(skill.normalizedName),
      type: "Skill" as const,
      href: `/skill/${slugify(skill.normalizedName)}`,
    }));

    const roleItems = rolePeers.map((role) => ({
      name: role.role,
      slug: getRoleSlug(role.role),
      type: "Role" as const,
      href: `/role/${getRoleSlug(role.role)}`,
    }));

    return [...skillItems, ...roleItems]
      .filter((item) => !normalized || item.name.toLowerCase().includes(normalized))
      .slice(0, limit);
  }

  async getSkillIntelligence(slug: string): Promise<SkillIntelligenceDto | null> {
    const skill = await this.repository.findSkillBySlug(slug);
    if (!skill) return null;

    const [totalJobs, baseline, matchingJobs, salary, roles, relatedSkills, locations, salaryPeers] =
      await Promise.all([
        this.repository.getTotalJobs(),
        this.repository.getDatasetSalaryBaseline(),
        this.repository.getSkillJobCount(skill.id),
        this.repository.getSkillSalaryStats(skill.id),
        this.repository.getRolesForSkill(skill.id),
        this.repository.getRelatedSkills(skill.id),
        this.repository.getLocationsForSkill(skill.id),
        this.repository.getSalaryPeersByCategory(skill.category),
      ]);

    return {
      skill: {
        id: skill.id,
        name: skill.name,
        slug: slugify(skill.normalizedName),
        category: mapCategory(skill.category),
      },
      demand: {
        matchingJobs,
        datasetShare: getShare(matchingJobs, totalJobs),
        totalJobs,
      },
      salary: {
        estimatedAverage: salary.averageSalary,
        observations: Number(salary.observations),
        datasetBaseline: baseline,
      },
      roles: roles.map((role) => ({
        name: role.role,
        slug: getRoleSlug(role.role),
        matchingJobs: Number(role.jobCount),
        share: getShare(Number(role.jobCount), matchingJobs),
      })),
      relatedSkills: relatedSkills.map((related) => ({
        name: related.name,
        slug: slugify(related.normalizedName),
        category: mapCategory(related.category),
        matchingJobs: Number(related.jobCount),
        share: getShare(Number(related.jobCount), matchingJobs),
      })),
      locations: locations.map((location) => ({
        name: location.state,
        matchingJobs: Number(location.jobCount),
        share: getShare(Number(location.jobCount), matchingJobs),
      })),
      salaryPeers: salaryPeers.map((peer) => ({
        name: peer.name,
        slug: slugify(peer.normalizedName),
        category: mapCategory(peer.category),
        estimatedAverage: peer.averageSalary,
        observations: Number(peer.observations),
      })),
    };
  }

  async getRoleIntelligence(slug: string): Promise<RoleIntelligenceDto | null> {
    const roleName = getRoleNameFromSlug(slug);
    if (!roleName) return null;

    const [totalJobs, baseline, matchingJobs, salary, skills, locations, peers] =
      await Promise.all([
        this.repository.getTotalJobs(),
        this.repository.getDatasetSalaryBaseline(),
        this.repository.getRoleJobCount(roleName),
        this.repository.getRoleSalaryStats(roleName),
        this.repository.getSkillsForRole(roleName),
        this.repository.getLocationsForRole(roleName),
        this.repository.getRolePeers(),
      ]);

    if (matchingJobs === 0) return null;

    const sortedPeers = peers.sort((a, b) => Number(b.jobCount) - Number(a.jobCount));
    const rank = sortedPeers.findIndex((peer) => peer.role === roleName) + 1;

    return {
      role: {
        name: roleName,
        slug,
      },
      opportunity: {
        matchingJobs,
        datasetShare: getShare(matchingJobs, totalJobs),
        totalJobs,
        rank: rank > 0 ? rank : undefined,
      },
      salary: {
        estimatedAverage: salary.averageSalary,
        observations: Number(salary.observations),
        datasetBaseline: baseline,
      },
      skills: skills.map((skill) => ({
        name: skill.name,
        slug: slugify(skill.normalizedName),
        category: mapCategory(skill.category),
        matchingJobs: Number(skill.jobCount),
        share: getShare(Number(skill.jobCount), matchingJobs),
      })),
      salaryPeers: peers.map((peer) => ({
        name: peer.role,
        slug: getRoleSlug(peer.role),
        matchingJobs: Number(peer.jobCount),
        estimatedAverage: peer.averageSalary,
        salaryObservations: Number(peer.observations),
      })),
      opportunityPeers: peers
        .filter((peer) => peer.averageSalary !== null)
        .map((peer) => ({
          name: peer.role,
          slug: getRoleSlug(peer.role),
          jobCount: Number(peer.jobCount),
          estimatedSalary: peer.averageSalary ?? 0,
          salaryObservations: Number(peer.observations),
        })),
      locations: locations.map((location) => ({
        name: location.state,
        matchingJobs: Number(location.jobCount),
        share: getShare(Number(location.jobCount), matchingJobs),
      })),
      adjacentRoles: peers
        .filter((peer) => peer.role !== roleName)
        .slice(0, 3)
        .map((peer) => ({
          name: peer.role,
          slug: getRoleSlug(peer.role),
          reason: "Adjacent classified role",
          metric: Number(peer.jobCount),
        })),
    };
  }
}

export function getImplementedRoleSlugs() {
  return new Set(Object.values(roleNameToSlug));
}

function mapCategory(category: string | null): SkillCategory {
  if (!category) return "platform";
  return categoryMap[category] ?? "platform";
}

function getShare(count: number, total: number) {
  if (total <= 0) return 0;
  return count / total;
}

export function toSlug(value: string) {
  return slugify(value);
}
