"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  Braces,
  ChartNoAxesCombined,
  Clock3,
  GitBranch,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { workItems } from "@/lib/data";
import { priorityScore, rankedWork } from "@/lib/simulation";
import { Callout, PageHeader, SectionHeader, StatusPill, Tooltip } from "@/components/ui";

const sequence = [
  { stage: "Foundation", label: "Decision Ledger", state: "build" },
  { stage: "Evidence", label: "Replay + reason taxonomy", state: "build" },
  { stage: "Rights", label: "CCD2 review flow", state: "ship" },
  { stage: "Response", label: "NL fraud containment", state: "ship" },
  { stage: "Experiment", label: "Challenger shadow", state: "learn" },
  { stage: "Release", label: "Segmented ramp", state: "decide" },
];

const prototypePaths = [
  {
    href: "/live-decision",
    label: "Decide",
    pages: "Decision Room + Live Decision",
    icon: ArrowRightLeft,
    purpose: "See how platform signals become an explainable customer action and how competing demands are prioritized.",
    action: "Start with one checkout decision",
    help: "Use this path to discuss product judgment: what ships first, how policy balances credit and fraud, and what the customer experiences.",
  },
  {
    href: "/portfolio",
    label: "Prove",
    pages: "Portfolio + Shadow Lab",
    icon: ChartNoAxesCombined,
    purpose: "Connect instant approval to matured outcomes, then test whether a challenger is safe for each customer cohort.",
    action: "Stress a limit and test a segmented release",
    help: "Use this path to discuss evidence quality: delayed loss, customer overextension, cohort regressions, guardrails and rollback criteria.",
  },
  {
    href: "/modernization",
    label: "Deliver",
    pages: "Modernization + Regulation + Roadmap + Why me",
    icon: Network,
    purpose: "Inspect migration authority, regulatory evidence, the first 90 days and the leadership value behind the proposal.",
    action: "Rehearse a failure, then inspect the operating model",
    help: "Use this path to discuss execution: stable contracts, resilience, accountable regulation, PM leadership and measurable decisions.",
  },
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
        aside={<StatusPill tone="info">Start here</StatusPill>}
      />

      <section className="orientation-panel" aria-label="What this prototype is and why it exists">
        <article>
          <span>What you are looking at</span>
          <h2>An interactive Product Management Lead work sample.</h2>
          <p>It turns a risk-platform strategy into decisions you can inspect, challenge and change.</p>
        </article>
        <article>
          <span>Why this problem</span>
          <h2>Live credit and fraud systems must improve without becoming unsafe.</h2>
          <p>The role combines platform ownership, portfolio outcomes, modernization, regulation and PM leadership.</p>
        </article>
        <article>
          <span>What to evaluate</span>
          <h2>Product judgment, technical depth and leadership clarity.</h2>
          <p>Look for explicit trade-offs, customer consequences, release evidence and accountable decisions.</p>
          <Link href="/about" className="orientation-source">See the research basis <ArrowRight size={14} aria-hidden="true" /></Link>
        </article>
      </section>

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

      <Callout title="First discovery question" tone="info">
        Where does change friction concentrate today: fragmented decision evidence, inconsistent release gates, or ownership across legacy and modern services? I would test this with incident data, replay coverage, cohort reversals, manual review volume and time to rollback before committing to the solution.
      </Callout>

      <section id="walkthrough" className="surface walkthrough-surface">
        <SectionHeader
          title="Choose the question you want to test"
          description="Use the guided tour in the top bar for the complete story, or take one of these three interview paths."
          aside={
            <span className="walkthrough-key">
              3 connected paths
              <Tooltip label="prototype navigation" align="right" triggerText="How it works">
                Every path moves from a product question to an interaction, an evidence threshold and a decision. Use the page footer to continue through the full sequence.
              </Tooltip>
            </span>
          }
        />
        <div className="walkthrough-grid">
          {prototypePaths.map(({ href, label, pages, icon: Icon, purpose, action, help }, index) => (
            <article className="walkthrough-card" key={label}>
              <div className="walkthrough-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={20} aria-hidden="true" />
                <Tooltip label={label} align="right" triggerText="Why?">{help}</Tooltip>
              </div>
              <h3>{label}</h3>
              <span className="walkthrough-pages">{pages}</span>
              <p>{purpose}</p>
              <div className="walkthrough-action">
                <span>Try this</span>
                <strong>{action}</strong>
              </div>
              <Link href={href} className="walkthrough-link">
                Start this path <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="surface priority-surface">
        <SectionHeader
          title="Five asks. One platform. What ships first?"
          description="A risk-adjusted ordering that values urgency, loss prevention, strategic enablement, reach, effort and confidence. Select any demand to inspect the rationale."
          aside={<span className="formula-chip">Risk-adjusted score <Tooltip label="priority score" align="right">Higher urgency, risk reduction, enablement and reach increase the score. Greater effort reduces it, and confidence tempers uncertain estimates.</Tooltip></span>}
        />
        <div className="priority-layout">
          <div className="priority-list" role="group" aria-label="Ranked product demands">
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
              <span>{item.stage}</span>
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
