"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Gauge,
  GitCompareArrows,
  History,
  Network,
  ServerCog,
  ShieldEllipsis,
  Siren,
} from "lucide-react";
import { failureScenario, rampScenario, type FailureId } from "@/lib/simulation";
import { Callout, Metric, PageHeader, SectionHeader, StatusPill } from "@/components/ui";

const failures: { id: FailureId; label: string }[] = [
  { id: "healthy", label: "Healthy" },
  { id: "bureau", label: "Bureau timeout" },
  { id: "fraud", label: "Fraud model down" },
  { id: "features", label: "Stale features" },
  { id: "registry", label: "Registry down" },
];

const architecture = [
  { label: "Decision API", detail: "Stable contract", icon: Network },
  { label: "Orchestrator", detail: "Parallel credit + fraud", icon: ServerCog },
  { label: "Policy registry", detail: "Versioned, signed, reversible", icon: ShieldEllipsis },
  { label: "Decision Ledger", detail: "Inputs → reasons → outcomes", icon: Database },
];

export function Modernization() {
  const [failureId, setFailureId] = useState<FailureId>("healthy");
  const failure = failureScenario(failureId);
  const [ramp, setRamp] = useState(25);
  const rampResult = rampScenario(ramp);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Modernization · Live platform evolution"
        title="Migrate the decision—not the diagram."
        description="Preserve the authorization contract, prove behavioral parity in dual-run, move cohorts gradually and make rollback a product feature."
        aside={<StatusPill tone="positive">Incremental strangler path</StatusPill>}
      />

      <section className="surface architecture-surface">
        <SectionHeader
          title="Target control plane"
          description="A thin orchestration and evidence layer allows legacy and modern components to coexist while customer outcomes remain observable."
          aside={<span className="formula-chip">No big-bang rewrite</span>}
        />
        <div className="architecture-flow">
          <div className="architecture-input"><span>Checkout</span><strong>Authorize</strong><small>merchant contract unchanged</small></div>
          <ArrowRight className="flow-arrow" size={24} />
          <div className="architecture-core">
            {architecture.map(({ label, detail, icon: Icon }) => (
              <div key={label}><Icon size={20} /><span><strong>{label}</strong><small>{detail}</small></span></div>
            ))}
          </div>
          <ArrowRight className="flow-arrow" size={24} />
          <div className="architecture-actions"><span>Next-best action</span><strong>Approve · step up<br />limit · review · decline</strong><small>one explainable response</small></div>
        </div>
        <div className="engine-rail">
          <div className="legacy-engine"><History size={18} /><span><strong>Legacy engine</strong><small>Champion · production authority</small></span></div>
          <div className="dual-run"><GitCompareArrows size={18} /><span><strong>Dual-run comparator</strong><small>same input · diff reasons · diff action</small></span></div>
          <div className="modern-engine"><Gauge size={18} /><span><strong>Modern services</strong><small>Challenger · cohort ramp</small></span></div>
        </div>
      </section>

      <div className="two-column modernization-lower">
        <section className="surface ramp-panel">
          <SectionHeader title="Cohort migration control" description="Raise authority only while parity and customer guardrails hold." />
          <label className="range-label" htmlFor="ramp-range"><span>Modern decision authority</span><strong>{ramp}%</strong></label>
          <input id="ramp-range" type="range" min="0" max="100" step="5" value={ramp} onChange={(event) => setRamp(Number(event.target.value))} />
          <div className="ramp-track-labels"><span>Dual-run</span><span>Cohort</span><span>Market</span><span>Full</span></div>
          <div className="ramp-stage"><span>{rampResult.stage}</span><div><i style={{ width: `${ramp}%` }} /></div></div>
          <div className="simulator-grid three" aria-live="polite">
            <div><span>Behavioral parity</span><strong>{rampResult.parity}</strong></div>
            <div><span>Guardrail events</span><strong>{rampResult.incidents}</strong></div>
            <div><span>Rollback objective</span><strong>{rampResult.rollback}</strong></div>
          </div>
          <p className="model-note">The slider is a deterministic scenario model, not a forecast of Riverty performance.</p>
        </section>

        <section className="surface failure-panel">
          <SectionHeader title="Failure rehearsal" description="A decision platform’s worst day should already have a customer-safe answer." />
          <div className="failure-tabs" role="group" aria-label="Dependency failure scenario">
            {failures.map((item) => <button key={item.id} onClick={() => setFailureId(item.id)} className={failureId === item.id ? "active" : ""} aria-pressed={failureId === item.id}>{item.label}</button>)}
          </div>
          <div className={`failure-result ${failure.tone}`} aria-live="polite">
            <Siren size={23} />
            <div><strong>{failure.title}</strong><p>{failure.customer}</p></div>
          </div>
          <div className="fallback-detail"><span>Fallback action</span><strong>{failure.action}</strong></div>
          <div className="failure-stats"><span>p95 latency <b>{failure.latency}</b></span><span>scenario availability <b>{failure.availability}</b></span></div>
        </section>
      </div>

      <section className="surface migration-plan">
        <SectionHeader title="Four gates to decommission" description="Technical completion is not the exit criterion; decision evidence is." />
        <ol>
          {[
            ["Instrument", "Ledger completeness ≥99.95%; stable outcome join; reason taxonomy signed off."],
            ["Compare", "Four weeks dual-run; differences classified; no unexplained severe divergence."],
            ["Ramp", "5% → 25% → market cohorts with customer, loss, fraud, latency and override guardrails."],
            ["Retire", "Rollback drill passed; audit evidence accepted; legacy writes disabled before infrastructure removal."],
          ].map(([title, detail], index) => <li key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{detail}</p></div>{index < 3 ? <ArrowRight size={18} /> : <CheckCircle2 size={18} />}</li>)}
        </ol>
      </section>

      <section className="metric-row four-up">
        <Metric label="Decision availability" value="99.99%" detail="proposed SLO" tone="positive" />
        <Metric label="p95 latency" value="<120 ms" detail="authorize budget" tone="ink" />
        <Metric label="Ledger completeness" value="≥99.95%" detail="audit evidence" tone="positive" />
        <Metric label="Rollback" value="<5 min" detail="strategy pin" tone="warning" />
      </section>

      <Callout title="Product ownership in modernization" tone="info">
        The Product Lead owns the migration’s customer contract, measurable parity, release gates, fallback behavior, risk acceptance and decommission evidence—not only the feature roadmap.
      </Callout>
      <div className="page-next"><Link href="/regulation" className="primary-button">Map regulation to capability <ArrowRight size={16} /></Link></div>
    </div>
  );
}
