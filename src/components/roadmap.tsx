"use client";

import { useState } from "react";
import { Check, ClipboardCheck, GitPullRequestArrow, MessageSquareText, Radar, Users } from "lucide-react";
import { PageHeader, SectionHeader, StatusPill } from "@/components/ui";

const phases = [
  {
    id: "stabilize",
    label: "0–30 days",
    title: "See and stabilize",
    outcome: "One shared view of decision health, demand and risk acceptance.",
    bets: ["Instrument Decision Ledger completeness and latency", "Establish single intake and severity language", "Baseline approval, loss, fraud, review and incident metrics", "Agree CCD2 scope and evidence owners"],
  },
  {
    id: "enable",
    label: "31–60 days",
    title: "Build the change layer",
    outcome: "Teams can test, explain and reverse policy and model changes.",
    bets: ["Ship strategy registry and last-known-good pin", "Release replay / shadow comparison", "Implement reason taxonomy and review evidence bundle", "Run first dependency failure rehearsal"],
  },
  {
    id: "scale",
    label: "61–90 days",
    title: "Prove segmented value",
    outcome: "A measurable improvement reaches customers without a global-risk gamble.",
    bets: ["Ramp challenger in evidence-backed cohorts", "Contain NL synthetic ATO scenario with SCA", "Start one legacy market migration", "Publish quarterly Product Decision Review"],
  },
];

const scorecard = [
  ["Customer", "Approval quality", "risk-adjusted approval · explanation comprehension · review turnaround"],
  ["Risk", "Portfolio integrity", "matured loss · fraud loss · overextension proxy · overrides"],
  ["Operations", "Decision toil", "manual reviews · false referrals · analyst handling time"],
  ["Platform", "Change safety", "lead time · ledger completeness · rollback time · incidents"],
  ["Delivery", "Outcome flow", "decision cycle time · learning velocity · unplanned work"],
];

export function Roadmap() {
  const [phaseId, setPhaseId] = useState("stabilize");
  const phase = phases.find((item) => item.id === phaseId) ?? phases[0];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Roadmap · Product Lead operating system"
        title="Run the domain by decisions, not ticket volume."
        description="A transparent system for intake, prioritization, squad outcomes, risk acceptance and post-launch learning—designed for Product, Engineering, Risk, Data, Operations and Commercial teams."
        aside={<StatusPill tone="positive">Outcome cadence</StatusPill>}
      />

      <section className="surface ninety-day-plan">
        <SectionHeader title="First 90 days" description="Start with evidence and shared language; earn the right to accelerate." />
        <div className="phase-tabs" role="tablist" aria-label="First 90 days phases">
          {phases.map((item) => <button key={item.id} role="tab" aria-selected={phaseId === item.id} className={phaseId === item.id ? "active" : ""} onClick={() => setPhaseId(item.id)}><span>{item.label}</span><strong>{item.title}</strong></button>)}
        </div>
        <article className="phase-detail" role="tabpanel" aria-live="polite">
          <div><span>Outcome</span><h2>{phase.outcome}</h2></div>
          <ul>{phase.bets.map((bet) => <li key={bet}><Check size={17} />{bet}</li>)}</ul>
        </article>
      </section>

      <section className="surface operating-model">
        <SectionHeader title="Weekly operating loop" description="The smallest cadence that keeps priorities, risk and delivery aligned." />
        <ol className="operating-loop">
          {[
            [Radar, "Sense", "Metrics, incidents, regulation, customer friction and market signals"],
            [MessageSquareText, "Frame", "Problem, affected cohort, baseline, constraint and decision owner"],
            [GitPullRequestArrow, "Commit", "Outcome, guardrails, scope, dependency and release contract"],
            [ClipboardCheck, "Learn", "Observed effect, cohort regression, evidence and next decision"],
          ].map(([Icon, title, detail], index) => {
            const LoopIcon = Icon as typeof Radar;
            return <li key={title as string}><span className="loop-number">0{index + 1}</span><LoopIcon size={22} /><div><strong>{title as string}</strong><p>{detail as string}</p></div></li>;
          })}
        </ol>
      </section>

      <div className="two-column roadmap-lower">
        <section className="surface scorecard-panel">
          <SectionHeader title="Domain scorecard" description="Five lenses prevent local optimization." />
          {scorecard.map(([lens, metric, detail]) => <div className="scorecard-row" key={lens}><span>{lens}</span><div><strong>{metric}</strong><small>{detail}</small></div></div>)}
        </section>

        <section className="surface team-topology">
          <SectionHeader title="PM topology" description="Clear product problems with a shared platform contract." />
          <div className="product-lead-node"><Users size={20} /><span><strong>Product Management Lead</strong><small>strategy · portfolio · people · risk acceptance</small></span></div>
          <div className="team-branches">
            <div><span>PM · Credit outcomes</span><strong>Affordability, limits, portfolio and CCD2</strong></div>
            <div><span>PM · Fraud & identity</span><strong>ATO, SCA, actioning and operations</strong></div>
            <div><span>Platform partnership</span><strong>Decision API, ledger, reliability and migration</strong></div>
          </div>
          <p className="model-note">Illustrative topology only. Validate against team strengths and current ownership before changing structure.</p>
        </section>
      </div>

      <section className="surface pdr-panel">
        <SectionHeader title="Product Decision Record" description="The durable artifact behind every consequential change." aside={<span className="formula-chip">PDR-027 · Challenger v7.2</span>} />
        <div className="pdr-grid">
          <div><span>Decision</span><strong>Segmented DE/NL rollout; hold SE-new</strong></div>
          <div><span>Evidence</span><strong>30-day shadow; +2.7pp approval; +10bp loss in eligible cohorts</strong></div>
          <div><span>Risk accepted</span><strong>Immature loss signal through M3, capped by 5% initial ramp</strong></div>
          <div><span>Stop rule</span><strong>&gt;25bp loss or &gt;10bp fraud regression in any cohort</strong></div>
          <div><span>Accountable</span><strong>Product Lead · Risk owner · Engineering owner</strong></div>
          <div><span>Revisit</span><strong>Daily for 7 days · weekly through M3 maturity</strong></div>
        </div>
      </section>
    </div>
  );
}
