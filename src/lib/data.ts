import type {
  DecisionOption,
  RegulatoryRequirement,
  ShadowCohort,
  WorkItem,
} from "@/lib/types";

export const scenarioDate = "12 September 2026";

export const workItems: WorkItem[] = [
  {
    id: "ledger",
    title: "Decision Ledger + replay",
    source: "Platform + Risk",
    summary:
      "Create one traceable record of inputs, versions, reasons, fallbacks and outcomes for every decision.",
    deadline: "Enables every stream",
    urgency: 5,
    riskReduction: 5,
    enablement: 5,
    reach: 5,
    effort: 3,
    confidence: 0.92,
    primitive: "Explainability, shadowing, incident response and migration evidence",
  },
  {
    id: "ccd2",
    title: "CCD2 explanation + review flow",
    source: "Compliance",
    summary:
      "Give customers understandable decision reasons, a route to express their position and human review.",
    deadline: "69 days to 20 Nov",
    urgency: 5,
    riskReduction: 5,
    enablement: 4,
    reach: 4,
    effort: 3,
    confidence: 0.88,
    primitive: "Reason taxonomy, evidence bundle and review queue",
  },
  {
    id: "fraud",
    title: "NL account-takeover containment",
    source: "Fraud Operations",
    summary:
      "Contain a synthetic spike using step-up authentication and narrow cohort controls, not a blanket decline rule.",
    deadline: "Live incident scenario",
    urgency: 5,
    riskReduction: 5,
    enablement: 2,
    reach: 3,
    effort: 2,
    confidence: 0.81,
    primitive: "Cohort targeting, SCA action and rapid rollback",
  },
  {
    id: "model",
    title: "Credit challenger launch",
    source: "Data Science",
    summary:
      "Move a stronger model through replay, shadow, segmented ramp and post-launch monitoring.",
    deadline: "Model ready now",
    urgency: 3,
    riskReduction: 3,
    enablement: 4,
    reach: 5,
    effort: 3,
    confidence: 0.76,
    primitive: "Version registry, cohort guardrails and outcome join",
  },
  {
    id: "approval",
    title: "+2.5pp approval ambition",
    source: "Commercial",
    summary:
      "Recover good customers with conditional approvals and risk-adjusted limits while preserving loss guardrails.",
    deadline: "Quarter target",
    urgency: 3,
    riskReduction: 2,
    enablement: 3,
    reach: 5,
    effort: 3,
    confidence: 0.72,
    primitive: "Next-best action and limit optimization",
  },
];

export const decisionSignals = [
  { label: "Credit capacity", value: 72, state: "supportive", detail: "17 of 17 invoices paid" },
  { label: "Exposure pressure", value: 61, state: "watch", detail: "€1,060 after purchase" },
  { label: "Identity continuity", value: 38, state: "weak", detail: "Email + address changed" },
  { label: "Fraud likelihood", value: 63, state: "elevated", detail: "New device, new network" },
];

export const decisionOptions: DecisionOption[] = [
  {
    id: "reject",
    label: "Blanket reject",
    decision: "Decline",
    limit: "€0 approved",
    nextStep: "End checkout",
    expectedLoss: "0.00%",
    conversion: "0%",
    rationale:
      "Controls loss, but ignores a four-year repayment history and treats an uncertain identity signal as certainty.",
    tone: "risk",
  },
  {
    id: "conditional",
    label: "Conditional approval",
    decision: "Approve with controls",
    limit: "€450 approved",
    nextStep: "Step-up identity check",
    expectedLoss: "0.74%",
    conversion: "82%",
    rationale:
      "Preserves a good customer relationship while containing the new-device and changed-identity risk.",
    tone: "positive",
  },
  {
    id: "approve",
    label: "Full approval",
    decision: "Approve",
    limit: "€742 approved",
    nextStep: "No added friction",
    expectedLoss: "1.46%",
    conversion: "96%",
    rationale:
      "Maximises acceptance, but leaves correlated identity-change signals untreated and exceeds the preferred exposure band.",
    tone: "warning",
  },
];

export const ledgerRows = [
  ["Decision ID", "RDE-260912-18403"],
  ["Strategy", "invoice-de-v12.4"],
  ["Credit model", "affordability-v7.2"],
  ["Fraud model", "ato-graph-v3.8"],
  ["Feature snapshot", "fs-18403 · 18 ms"],
  ["Primary reasons", "ID-14, EXP-07, REL-02"],
  ["Fallbacks", "None"],
  ["Total latency", "84 ms"],
];

export const portfolioSeries = [
  { month: "Mar", approval: 68.4, loss: 1.02, fraud: 0.31, exposure: 78 },
  { month: "Apr", approval: 69.1, loss: 1.08, fraud: 0.29, exposure: 81 },
  { month: "May", approval: 70.2, loss: 1.13, fraud: 0.32, exposure: 84 },
  { month: "Jun", approval: 71.0, loss: 1.17, fraud: 0.36, exposure: 87 },
  { month: "Jul", approval: 71.8, loss: 1.21, fraud: 0.35, exposure: 90 },
  { month: "Aug", approval: 72.1, loss: 1.19, fraud: 0.34, exposure: 92 },
];

export const vintageSeries = [
  { age: "M0", mar: 0.05, apr: 0.04, may: 0.05, jun: 0.05 },
  { age: "M1", mar: 0.31, apr: 0.28, may: 0.33, jun: 0.38 },
  { age: "M2", mar: 0.59, apr: 0.54, may: 0.63, jun: 0.72 },
  { age: "M3", mar: 0.81, apr: 0.78, may: 0.91, jun: 1.02 },
  { age: "M4", mar: 0.96, apr: 0.92, may: 1.07, jun: 1.18 },
  { age: "M5", mar: 1.04, apr: 1.01, may: 1.16, jun: 1.26 },
];

export const shadowCohorts: ShadowCohort[] = [
  { market: "DE", segment: "Returning", volume: 38, approvalDelta: 2.9, lossDelta: 7, fraudDelta: -3, recommendation: "deploy" },
  { market: "DE", segment: "New", volume: 19, approvalDelta: 2.3, lossDelta: 14, fraudDelta: 2, recommendation: "guardrail" },
  { market: "NL", segment: "Returning", volume: 14, approvalDelta: 3.4, lossDelta: 9, fraudDelta: -5, recommendation: "deploy" },
  { market: "NL", segment: "New", volume: 9, approvalDelta: 2.1, lossDelta: 18, fraudDelta: 12, recommendation: "guardrail" },
  { market: "SE", segment: "Returning", volume: 12, approvalDelta: 2.5, lossDelta: 21, fraudDelta: 4, recommendation: "hold" },
  { market: "SE", segment: "New", volume: 8, approvalDelta: 3.1, lossDelta: 71, fraudDelta: 16, recommendation: "hold" },
];

export const regulatoryRequirements: RegulatoryRequirement[] = [
  {
    id: "ccd2-explain",
    framework: "CCD2",
    requirement: "Clear and comprehensible explanation of automated assessment",
    productCapability: "Stable reason taxonomy + customer-language explanation service",
    evidence: "Decision Ledger reason codes, content version and delivered explanation",
    owner: "Credit Product",
    status: "build",
  },
  {
    id: "ccd2-review",
    framework: "CCD2",
    requirement: "Human intervention, consumer position and review",
    productCapability: "Review intake, evidence view, SLA and override record",
    evidence: "Queue event, analyst rationale and final customer communication",
    owner: "Operations Product",
    status: "build",
  },
  {
    id: "ai-registry",
    framework: "AI Act",
    requirement: "Govern creditworthiness models proportionately to high-risk obligations",
    productCapability: "Model inventory, purpose, owners, data lineage and monitoring",
    evidence: "Versioned model card, validation and post-market monitoring trail",
    owner: "ML Platform",
    status: "validate",
  },
  {
    id: "ai-separation",
    framework: "AI Act",
    requirement: "Keep creditworthiness and financial-fraud purposes explicitly separated",
    productCapability: "Purpose-tagged model and policy registry",
    evidence: "Purpose, legal basis, downstream decisions and access boundaries",
    owner: "Risk Governance",
    status: "ready",
  },
  {
    id: "dora-fallback",
    framework: "DORA",
    requirement: "ICT continuity, third-party risk and tested recovery",
    productCapability: "Dependency SLOs, fallback matrix and failure simulation",
    evidence: "Drill result, incident record, vendor SLA and recovery evidence",
    owner: "Platform Product",
    status: "validate",
  },
];

export const researchSignals = [
  {
    number: "01",
    title: "The mandate is broader than model performance.",
    signal:
      "The role owns strategy, roadmap and delivery for real-time credit and fraud decisioning. It also carries PM leadership, modernization, prioritization and regulatory translation.",
    response:
      "Treat decision change as a product surface. One operating model should connect demand, policy, evidence, release authority and customer outcomes.",
    sources: [
      {
        label: "Product Management Lead role",
        url: "https://jobsearch.createyourowncareer.com/Riverty/job/Amsterdam-Product-Management-Lead-%28mfd%29-1079-MZ/1428381433/",
      },
    ],
  },
  {
    number: "02",
    title: "Every approval carries customer and balance-sheet consequences.",
    signal:
      "Riverty states that Payments & Credit serves more than 1,800 merchants and about 25 million customers, processes over 235 million transactions annually, guarantees accepted invoice payments and absorbs consumer non-payment risk.",
    response:
      "Judge a decision across conversion, fraud, credit loss, exposure, contribution and customer overextension. A single approval-rate target is not enough.",
    sources: [
      {
        label: "Luxembourg bank announcement",
        url: "https://www.riverty.com/no-no/bedrift/newsroom/riverty-establishes-bank-in-luxembourg/",
      },
      {
        label: "Invoice payment product",
        url: "https://www.riverty.com/en/business/products/payment-methods/invoice-payment/",
      },
    ],
  },
  {
    number: "03",
    title: "The public decision journey already extends beyond approve or decline.",
    signal:
      "Riverty documents transaction-level credit and fraud assessment, authorization outcomes and selective strong customer authentication based on order, identity and risk variables.",
    response:
      "Keep the authorization contract stable while policy selects the safest next action: approve, step up, limit, review or decline. Modernize behind that contract.",
    sources: [
      {
        label: "Authorize payment",
        url: "https://docs.riverty.com/bnpl/documentation/authorize_payment",
      },
      {
        label: "Authorize API reference",
        url: "https://docs.riverty.com/bnpl/api_reference/authorize_payment/",
      },
      {
        label: "Strong customer authentication",
        url: "https://docs.riverty.com/bnpl/documentation/sca/",
      },
    ],
  },
  {
    number: "04",
    title: "Explanation, review and resilience belong in the release criteria.",
    signal:
      "CCD2 establishes rights around explanation, human intervention and review for automated creditworthiness assessment. The AI Act distinguishes creditworthiness from financial-fraud use cases, while DORA raises the bar for operational resilience.",
    response:
      "Version decision reasons, separate model purposes, test customer review paths and prove safe fallbacks before a change receives production authority.",
    sources: [
      {
        label: "Consumer Credit Directive",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023L2225",
      },
      {
        label: "EU AI Act",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      },
      {
        label: "Digital Operational Resilience Act",
        url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
      },
    ],
  },
];
