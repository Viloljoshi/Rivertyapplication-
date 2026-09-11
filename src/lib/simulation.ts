import { shadowCohorts } from "@/lib/data";
import type { ShadowCohort, WorkItem } from "@/lib/types";

export function priorityScore(item: WorkItem) {
  const numerator =
    item.urgency * 1.5 +
    item.riskReduction * 1.35 +
    item.enablement * 1.25 +
    item.reach;
  return Number(((numerator * item.confidence) / item.effort).toFixed(1));
}

export function rankedWork(items: WorkItem[]) {
  return [...items].sort((a, b) => priorityScore(b) - priorityScore(a));
}

export function limitScenario(limit: number) {
  const approval = 66.8 + (limit - 250) * 0.0088;
  const loss = 0.69 + Math.pow(Math.max(0, limit - 300) / 640, 1.45) * 0.86;
  const margin = 3.1 + (limit - 250) * 0.012 - loss * 2.1;
  const overextension = 1.4 + Math.pow(Math.max(0, limit - 360) / 500, 1.35) * 3.4;
  return {
    approval: approval.toFixed(1),
    loss: loss.toFixed(2),
    margin: margin.toFixed(1),
    overextension: overextension.toFixed(1),
  };
}

export type ReleaseMode = "global" | "segmented" | "champion";

export function releaseScenario(mode: ReleaseMode) {
  if (mode === "champion") {
    return {
      approval: "+0.0pp",
      loss: "+0bp",
      fraud: "+0bp",
      coverage: "0%",
      label: "Keep champion",
      note: "Safest short-term choice, but leaves proven value in stable cohorts unrealised.",
    };
  }
  if (mode === "global") {
    return {
      approval: "+2.6pp",
      loss: "+22bp",
      fraud: "+4bp",
      coverage: "100%",
      label: "Global challenger",
      note: "The aggregate looks attractive, but the SE new-customer regression breaches the +25bp loss guardrail.",
    };
  }
  return {
    approval: "+2.7pp",
    loss: "+10bp",
    fraud: "−2bp",
    coverage: "72%",
    label: "Segmented release",
    note: "Deploy to DE/NL returning customers first; retain champion and added controls for vulnerable cohorts.",
  };
}

export function cohortRows(mode: ReleaseMode): ShadowCohort[] {
  if (mode === "global") return shadowCohorts;
  if (mode === "champion") return [];
  return shadowCohorts.filter((row) => row.recommendation !== "hold");
}

export type FailureId = "healthy" | "bureau" | "fraud" | "features" | "registry";

const failureStates = {
  healthy: {
    title: "All dependencies healthy",
    customer: "Decision completes normally",
    action: "Use primary models and market policy",
    latency: "84 ms",
    availability: "99.99%",
    tone: "positive",
  },
  bureau: {
    title: "Credit bureau timeout",
    customer: "Returning customers continue; new-to-Riverty customers receive a secure alternative",
    action: "Use internal history where sufficient; cap exposure; never default to full approval",
    latency: "118 ms",
    availability: "99.94%",
    tone: "warning",
  },
  fraud: {
    title: "Fraud model unavailable",
    customer: "Higher-risk cohorts step up; low-risk returning cohorts continue",
    action: "Route through deterministic velocity policy + SCA; alert on-call owner",
    latency: "102 ms",
    availability: "99.91%",
    tone: "risk",
  },
  features: {
    title: "Feature snapshot stale",
    customer: "Decision is restricted to safe exposure band",
    action: "Reject stale high-volatility features; use last-known stable credit state only",
    latency: "91 ms",
    availability: "99.96%",
    tone: "warning",
  },
  registry: {
    title: "Policy registry unreachable",
    customer: "Pinned last-known-good strategy remains available",
    action: "Freeze writes, serve signed cached bundle, block new rollout and start incident record",
    latency: "88 ms",
    availability: "99.98%",
    tone: "risk",
  },
} as const;

export function failureScenario(id: FailureId) {
  return failureStates[id];
}

export function rampScenario(percent: number) {
  const incidents = Math.max(0, Math.round((percent - 35) / 18));
  const parity = Math.max(96.8, 99.94 - Math.pow(percent / 100, 1.7) * 1.6);
  const rollback = percent <= 25 ? "< 2 min" : percent <= 60 ? "< 5 min" : "< 8 min";
  return {
    parity: `${parity.toFixed(2)}%`,
    incidents: `${incidents}`,
    rollback,
    stage: percent === 0 ? "Dual-run only" : percent < 25 ? "Internal cohort" : percent < 60 ? "Market cohort" : percent < 100 ? "Controlled majority" : "Migration complete",
  };
}
