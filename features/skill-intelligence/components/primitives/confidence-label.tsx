import type { SampleConfidence } from "../../types/skill-intelligence.types";

const labels: Record<SampleConfidence, string> = {
  insufficient: "Insufficient",
  limited: "Limited sample",
  directional: "Directional",
  supported: "Supported",
};

type ConfidenceLabelProps = {
  confidence: SampleConfidence;
};

export function ConfidenceLabel({ confidence }: ConfidenceLabelProps) {
  return (
    <span className="inline-flex rounded-md border border-border bg-card/45 px-2 py-1 text-xs font-medium text-muted-foreground">
      {labels[confidence]}
    </span>
  );
}
