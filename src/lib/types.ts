export type Tone = "ink" | "positive" | "warning" | "risk" | "info";

export type WorkItem = {
  id: string;
  title: string;
  source: string;
  summary: string;
  deadline: string;
  urgency: number;
  riskReduction: number;
  enablement: number;
  reach: number;
  effort: number;
  confidence: number;
  primitive: string;
};

export type DecisionOption = {
  id: "reject" | "conditional" | "approve";
  label: string;
  decision: string;
  limit: string;
  nextStep: string;
  expectedLoss: string;
  conversion: string;
  rationale: string;
  tone: Tone;
};

export type ShadowCohort = {
  market: string;
  segment: string;
  volume: number;
  approvalDelta: number;
  lossDelta: number;
  fraudDelta: number;
  recommendation: "deploy" | "hold" | "guardrail";
};

export type RegulatoryRequirement = {
  id: string;
  framework: "CCD2" | "AI Act" | "DORA";
  requirement: string;
  productCapability: string;
  evidence: string;
  owner: string;
  status: "ready" | "build" | "validate";
};
