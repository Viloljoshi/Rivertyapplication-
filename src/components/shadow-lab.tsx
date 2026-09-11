"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, CircleSlash2, FlaskConical, ShieldCheck } from "lucide-react";
import { shadowCohorts } from "@/lib/data";
import { releaseScenario, type ReleaseMode } from "@/lib/simulation";
import { Callout, Metric, PageHeader, SectionHeader, StatusPill } from "@/components/ui";

const modes: { id: ReleaseMode; label: string }[] = [
  { id: "champion", label: "Keep champion" },
  { id: "global", label: "Global challenger" },
  { id: "segmented", label: "Segmented release" },
];

export function ShadowLab() {
  const [mode, setMode] = useState<ReleaseMode>("segmented");
  const result = releaseScenario(mode);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Shadow Lab · Champion / challenger"
        title="The average is hiding the decision."
        description="Replay the same historical decisions through a challenger, compare customer and portfolio outcomes, then release only where the evidence supports it."
        aside={<StatusPill tone="warning">30-day shadow · synthetic</StatusPill>}
      />

      <section className="surface release-selector">
        <div className="release-head">
          <div>
            <p className="eyebrow">Release decision</p>
            <h2>Credit model v7.2</h2>
          </div>
          <div className="segmented-control" role="group" aria-label="Release mode">
            {modes.map((item) => <button key={item.id} className={mode === item.id ? "active" : ""} onClick={() => setMode(item.id)} aria-pressed={mode === item.id}>{item.label}</button>)}
          </div>
        </div>
        <section className="metric-row four-up compact" aria-live="polite">
          <Metric label="Approval delta" value={result.approval} detail="vs champion" tone="positive" />
          <Metric label="Loss delta" value={result.loss} detail="guardrail +25bp" tone={mode === "global" ? "risk" : "warning"} />
          <Metric label="Fraud delta" value={result.fraud} detail="matured proxy" tone={mode === "global" ? "warning" : "positive"} />
          <Metric label="Eligible volume" value={result.coverage} detail="of evaluated traffic" tone="ink" />
        </section>
        <div className={`release-verdict ${mode}`}>
          {mode === "global" ? <CircleSlash2 size={22} /> : mode === "segmented" ? <ShieldCheck size={22} /> : <FlaskConical size={22} />}
          <div><strong>{result.label}</strong><p>{result.note}</p></div>
        </div>
      </section>

      <section className="surface cohort-surface">
        <SectionHeader
          title="Cohort regression map"
          description="The challenger wins overall and still fails a specific customer group. That is a product decision, not a model footnote."
          aside={<span className="formula-chip">Loss guardrail ≤ +25bp</span>}
        />
        <div className="cohort-table" role="table" aria-label="Champion challenger results by cohort">
          <div className="cohort-header" role="row">
            <span role="columnheader">Cohort</span><span role="columnheader">Volume</span><span role="columnheader">Approval</span><span role="columnheader">Loss</span><span role="columnheader">Fraud</span><span role="columnheader">Action</span>
          </div>
          {shadowCohorts.map((row) => (
            <div className={`cohort-row ${row.recommendation}`} role="row" key={`${row.market}-${row.segment}`}>
              <span role="cell"><strong>{row.market}</strong><small>{row.segment}</small></span>
              <span role="cell"><b>{row.volume}%</b><i style={{ width: `${row.volume * 2.1}%` }} /></span>
              <span role="cell" className="positive-text">+{row.approvalDelta.toFixed(1)}pp</span>
              <span role="cell" className={row.lossDelta > 25 ? "risk-text" : ""}>+{row.lossDelta}bp</span>
              <span role="cell" className={row.fraudDelta > 8 ? "risk-text" : ""}>{row.fraudDelta > 0 ? "+" : ""}{row.fraudDelta}bp</span>
              <span role="cell"><StatusPill tone={row.recommendation === "deploy" ? "positive" : row.recommendation === "hold" ? "risk" : "warning"}>{row.recommendation}</StatusPill></span>
            </div>
          ))}
        </div>
      </section>

      <div className="two-column">
        <section className="surface evidence-panel">
          <SectionHeader title="Release contract" description="A launch is a falsifiable hypothesis with an owner and reversal path." />
          {[
            ["Hypothesis", "v7.2 recovers ≥2pp approvals without >25bp matured loss"],
            ["Initial cohort", "DE + NL returning customers · ≤€500 exposure"],
            ["Stop rule", "Any cohort >25bp loss or >10bp fraud regression"],
            ["Rollback", "Pin champion strategy within 5 minutes"],
            ["Review", "Daily for 7d, weekly until M3 maturity"],
          ].map(([label, value]) => <div className="evidence-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </section>
        <section className="surface evidence-panel green-panel">
          <SectionHeader title="Decision" description="Ship the learning, not the regression." />
          <div className="big-check"><CheckCircle2 size={30} /><span><strong>Approve segmented ramp</strong><small>72% eligible volume</small></span></div>
          <ol className="decision-list">
            <li>Start at 5% for returning DE/NL cohorts.</li>
            <li>Require SCA for NL new-device cases.</li>
            <li>Keep champion for SE new customers.</li>
            <li>Re-open after SE feature diagnosis.</li>
          </ol>
        </section>
      </div>

      <Callout title="Why shadowing is a platform capability" tone="info">
        Replay needs consistent features, versioned strategies, outcome joins and cohort slices. Once built, the same evidence layer supports model launches, policy changes, incident analysis and legacy migration.
      </Callout>
      <div className="page-next"><Link href="/modernization" className="primary-button">Plan the migration <ArrowRight size={16} /></Link></div>
    </div>
  );
}
