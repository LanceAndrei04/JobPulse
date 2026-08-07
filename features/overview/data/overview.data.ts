import {
  Atom,
  Building2,
  CircleDollarSign,
  Cloud,
  Code2,
  Database,
  Layers3,
  Link2,
  Network,
  TrendingUp,
} from "lucide-react";

export const snapshotMetrics = [
  {
    label: "Postings analyzed",
    value: "1,284",
    detail: "Collected developer postings",
    context: "Sample size behind page percentages.",
    icon: Database,
    fill: 82,
  },
  {
    label: "Companies represented",
    value: "826",
    detail: "Distinct detected employers",
    context: "Distinct employers in the sample.",
    icon: Building2,
    fill: 64,
  },
  {
    label: "Est. avg salary",
    value: "$138K",
    detail: "Based on salary data",
    context: "Baseline for salary comparison.",
    icon: CircleDollarSign,
    fill: 72,
    delta: "+4% vs sample median",
  },
  {
    label: "Skills tracked",
    value: "242",
    detail: "Normalized tech signals",
    context: "Normalized skill terms tracked.",
    icon: Layers3,
    fill: 58,
  },
];

export const keySignals = [
  {
    icon: TrendingUp,
    title: "React and AWS lead detected technology patterns.",
    stat: "18% and 16%",
  },
  {
    icon: Network,
    title: "Software engineering and backend roles dominate classified postings.",
    stat: "33% combined",
  },
  {
    icon: Link2,
    title: "TypeScript appears alongside React in most matching postings.",
    stat: "68% co-detected",
  },
];

export const technologyDemand = [
  {
    label: "React",
    logo: "react",
    icon: Atom,
    count: "427",
    value: "~18%",
    percentage: 100,
    href: "/skill/react",
  },
  {
    label: "AWS",
    logo: "aws",
    icon: Cloud,
    count: "386",
    value: "~16%",
    percentage: 90,
    href: "/skill/aws",
  },
  {
    label: "Python",
    logo: "python",
    icon: Code2,
    count: "342",
    value: "~14%",
    percentage: 80,
    href: "/skill/python",
  },
  {
    label: "TypeScript",
    logo: "ts",
    count: "311",
    value: "~13%",
    percentage: 73,
    href: "/skill/typescript",
  },
];

export const roleSegments = [
  { label: "Software engineer", value: 18, color: "bg-primary" },
  { label: "Backend", value: 15, color: "bg-sky-300" },
  { label: "Frontend", value: 12, color: "bg-emerald-300" },
  { label: "Full stack", value: 10, color: "bg-amber-300" },
  { label: "DevOps", value: 8, color: "bg-slate-500" },
];

export const salarySignals = [
  {
    label: "Go",
    salary: "$149K",
    observations: "37 obs.",
    delta: 8,
    href: "/skill/go",
  },
  {
    label: "AWS",
    salary: "$145K",
    observations: "214 obs.",
    delta: 5,
    href: "/skill/aws",
  },
  {
    label: "React",
    salary: "$137K",
    observations: "312 obs.",
    delta: -1,
    href: "/skill/react",
  },
];

export const geographicSignals = [
  { label: "California", value: "14%", percentage: 100 },
  { label: "Texas", value: "11%", percentage: 79 },
  { label: "Virginia", value: "9%", percentage: 64 },
];
