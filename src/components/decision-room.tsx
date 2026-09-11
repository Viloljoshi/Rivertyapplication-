"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Braces,
  Clock3,
  GitBranch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { workItems } from "@/lib/data";
import { priorityScore, rankedWork } from "@/lib/simulation";
import { Callout, Metric, PageHeader, SectionHeader, StatusPill } from "@/components/ui";

const sequence = [
  { week: "Now", label: "Decision Ledger", state: "build" },
  { week: "W2", label: "Replay + reason taxonomy", state: "build" },
  { week: "W4", label: "CCD2 review flow", state: "ship" },
  { week: "W5", label: "NL fraud containment", state: "ship" },
  { week: "W7", label: "Challenger shadow", state: "learn" },
  { week: "W10", label: "Segmented ramp", state: "decide" },
];

export function DecisionRoom() {
  const ranked = useMemo(() => rankedWork(workItems), []);
  const [selectedId, setSelectedId] = useState(ranked[0].id);
  const selected = ranked.find((item) => item.id === selectedId) ?? ranked[0];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Decision Room · Product Management Lead"
        title="Make change safer."
        description="A product operating system for evolving real-time credit and fraud decisions without trading away customer fairness, platform resilience or commercial value."
        aside={<StatusPill tone="positive">Decision window open</StatusPill>}
      />

      <section className="thesis-panel">
        <div>
          <span className="section-number">01 / The thesis</span>
          <h2>A better risk platform doesn’t just make better decisions.</h2>
          <p>It makes every change observable, explainable, reversible and safe to scale.</p>
        </div>
        <div className="thesis-proof">
          <span>Public operating context</span>
          <strong>235M+</strong>
          <p>annual transactions across Riverty Payments & Credit</p>
          <small>Riverty newsroom · July 2026</small>
        </div>
      </section>

      <Callout title="The problem I would validate first" tone="info">
        Riverty’s public role brief points to a convergence problem: commercial, risk, regulatory, analytics and legacy-platform changes all need the same live decision surface. The opportunity is a governed change layer—not a replacement model. This is a public-evidence hypothesis, not a claim about Riverty’s internal architecture.
      </Callout>

      <section className="metric-row four-up" aria-label="Scenario constraints">
        <Metric label="Regulatory clock" value="69 days" detail="CCD2 · 20 Nov 2026" tone="risk" />
        <Metric label="Commercial ask" value="+2.5pp" detail="approval ambition" tone="positive" />
        <Metric label="Delivery capacity" value="2 squads" detail="illustrative constraint" tone="ink" />
        <Metric label="Decision horizon" value="10 weeks" detail="from primitive to ramp" tone="warning" />
      </section>

      <section className="surface priority-surface">
        <SectionHeader
          title="Five asks. One platform. What ships first?"
          description="A risk-adjusted ordering that values urgency, loss prevention, strategic enablement, reach, effort and confidence. Select any demand to inspect the rationale."
          aside={<span className="formula-chip">Score = value × confidence ÷ effort</span>}
        />
        <div className="priority-layout">
          <div className="priority-list" role="list" aria-label="Ranked product demands">
            {ranked.map((item, index) => (
              <button
                key={item.id}
                className={`priority-row ${selected.id === item.id ? "selected" : ""}`}
                onClick={() => setSelectedId(item.id)}
                aria-pressed={selected.id === item.id}
              >
                <span className="rank">{String(index + 1).padStart(2, "0")}</span>
                <span className="priority-copy">
                  <strong>{item.title}</strong>
                  <small>{item.source} · {item.deadline}</small>
                </span>
                <span className="priority-score">{priorityScore(item)}</span>
              </button>
            ))}
          </div>

          <article className="priority-detail" aria-live="polite">
            <div className="priority-detail-top">
              <StatusPill tone={selected.id === "ledger" ? "positive" : "info"}>{selected.source}</StatusPill>
              <span>Priority score {priorityScore(selected)}</span>
            </div>
            <h3>{selected.title}</h3>
            <p>{selected.summary}</p>
            <div className="score-grid" aria-label="Scoring dimensions">
              {[
                ["Urgency", selected.urgency],
                ["Risk reduction", selected.riskReduction],
                ["Enablement", selected.enablement],
                ["Reach", selected.reach],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <span>{label}</span>
                  <strong>{value}/5</strong>
                </div>
              ))}
            </div>
            <div className="primitive-note">
              <Braces size={18} aria-hidden="true" />
              <span>
                <small>Reusable platform primitive</small>
                <strong>{selected.primitive}</strong>
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="surface sequence-surface">
        <SectionHeader
          title="The sequencing decision"
          description="Build the common evidence and control plane once, then let regulation, fraud, model and commercial work reuse it."
        />
        <ol className="sequence-rail">
          {sequence.map((item, index) => (
            <li key={item.label}>
              <div className={`sequence-node ${item.state}`}>
                {index === 0 ? <ShieldCheck size={17} /> : index === sequence.length - 1 ? <Sparkles size={17} /> : <GitBranch size={17} />}
              </div>
              <span>{item.week}</span>
              <strong>{item.label}</strong>
            </li>
          ))}
        </ol>
        <div className="decision-footer">
          <div>
            <Clock3 size={18} />
            <span><strong>First product decision:</strong> fund the Decision Ledger and strategy versioning as shared infrastructure.</span>
          </div>
          <Link href="/live-decision" className="primary-button">
            Inspect a live decision <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
