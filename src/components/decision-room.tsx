"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  BookOpenCheck,
  Braces,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Clock3,
  FlaskConical,
  GitBranch,
  Landmark,
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

const walkthrough = [
  {
    href: "/",
    label: "Decision Room",
    icon: ShieldCheck,
    purpose: "Frame the product problem and rank competing asks by urgency, risk reduction, strategic enablement, reach, effort and confidence.",
    action: "Select a demand and inspect why a shared platform primitive outranks a local feature.",
    help: "This is the portfolio-level judgment expected of the Product Management Lead: choosing the work that unlocks several outcomes at once.",
  },
  {
    href: "/live-decision",
    label: "Live Decision",
    icon: ArrowRightLeft,
    purpose: "Follow one invoice checkout across credit capacity, fraud uncertainty, identity continuity, exposure and policy.",
    action: "Compare blanket rejection, conditional approval and full approval, then open the customer explanation.",
    help: "The decision is not just a model score. Product policy converts several signals into an explainable customer action.",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: ChartNoAxesCombined,
    purpose: "Connect an instant checkout decision to approval quality, matured loss, fraud, exposure, contribution and overextension.",
    action: "Move the credit-limit slider until a responsible-lending guardrail is breached.",
    help: "Approval is immediate, while loss matures later. Portfolio views prevent a short-term conversion win from hiding downstream harm.",
  },
  {
    href: "/shadow-lab",
    label: "Shadow Lab",
    icon: FlaskConical,
    purpose: "Compare a champion and challenger on the same historical traffic, then find regressions hidden inside the global average.",
    action: "Switch from global to segmented release and inspect the Sweden new-customer cohort.",
    help: "Shadowing tests a new model or policy without giving it production authority. Segmentation lets strong cohorts progress while weak ones stay protected.",
  },
  {
    href: "/modernization",
    label: "Modernization",
    icon: Network,
    purpose: "Show how legacy and modern decision services can coexist behind one contract while behavioral parity is proven.",
    action: "Change migration authority and rehearse a bureau, model, feature or registry failure.",
    help: "The migration is governed by customer outcomes, parity and rollback evidence, not by a code-complete milestone.",
  },
  {
    href: "/regulation",
    label: "Regulation",
    icon: Landmark,
    purpose: "Translate CCD2, the AI Act and DORA from legal requirements into product capabilities, evidence and accountable ownership.",
    action: "Filter by framework and trace one obligation from requirement to evidence.",
    help: "This is a product-readiness map, not legal advice. It makes the implementation and evidence gap visible to every delivery partner.",
  },
  {
    href: "/roadmap",
    label: "Roadmap",
    icon: BookOpenCheck,
    purpose: "Demonstrate the operating model for strategy, PM ownership, outcome metrics, intake and consequential product decisions.",
    action: "Open each 30-day phase and review the Product Decision Record at the end.",
    help: "The roadmap is organized around decisions and measurable outcomes, so teams receive context instead of a queue of tickets.",
  },
  {
    href: "/why-me",
    label: "Why me",
    icon: BriefcaseBusiness,
    purpose: "Connect the artifact directly to the value I would bring across strategy, technical product depth, economics and leadership.",
    action: "Use the six value cards as prompts for the interview conversation.",
    help: "Every value statement points back to a working part of the prototype, keeping the proposition evidence-led rather than adjective-led.",
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
          <Link href="/about" className="orientation-source">Review evidence and assumptions <ArrowRight size={14} aria-hidden="true" /></Link>
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

      <Callout title="The problem I would validate first" tone="info">
        Riverty’s public role brief points to a convergence problem: commercial, risk, regulatory, analytics and legacy-platform changes all need the same live decision surface. The opportunity is a governed change layer, not a replacement model. This is a public-evidence hypothesis, not a claim about Riverty’s internal architecture.
      </Callout>

      <section id="walkthrough" className="surface walkthrough-surface">
        <SectionHeader
          title="How to use this prototype"
          description="Follow the story in order, or open the section closest to your interview question. Each page moves from evidence to a concrete product decision."
          aside={
            <span className="walkthrough-key">
              8 connected sections
              <Tooltip label="guided walkthrough" align="right">
                Start with Decision Room, follow the next-step button at the bottom of each page, and finish with Why me. Every number is either publicly sourced or clearly marked synthetic.
              </Tooltip>
            </span>
          }
        />
        <div className="walkthrough-grid">
          {walkthrough.map(({ href, label, icon: Icon, purpose, action, help }, index) => (
            <article className="walkthrough-card" key={label}>
              <div className="walkthrough-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={20} aria-hidden="true" />
                <Tooltip label={label} align="right">{help}</Tooltip>
              </div>
              <h3>{label}</h3>
              <p>{purpose}</p>
              <div className="walkthrough-action">
                <span>Try this</span>
                <strong>{action}</strong>
              </div>
              <Link href={href} className="walkthrough-link">
                Open {label} <ArrowRight size={15} aria-hidden="true" />
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
