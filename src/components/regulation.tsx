"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, Check, FileClock, ShieldCheck } from "lucide-react";
import { regulatoryRequirements } from "@/lib/data";
import { Callout, PageHeader, SectionHeader, StatusPill } from "@/components/ui";

type Framework = "All" | "CCD2" | "AI Act" | "DORA";
const frameworks: Framework[] = ["All", "CCD2", "AI Act", "DORA"];

export function Regulation() {
  const [framework, setFramework] = useState<Framework>("All");
  const visible = useMemo(() => regulatoryRequirements.filter((item) => framework === "All" || item.framework === framework), [framework]);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Regulation · Capability readiness"
        title="Turn obligations into working product behavior."
        description="Map each requirement to a reusable capability, an evidence artifact, an accountable owner and a release test. That makes readiness operational rather than document-based."
        aside={<StatusPill tone="risk">CCD2 · 69-day scenario clock</StatusPill>}
      />

      <section className="regulation-hero">
        <div className="regulation-countdown">
          <span>Consumer Credit Directive</span>
          <strong>20 · 11 · 26</strong>
          <p>Application date · illustrative readiness planning date</p>
        </div>
        <div className="regulation-principle">
          <BookOpenCheck size={24} />
          <blockquote>“Compliance-ready” means the product can explain what happened, support review, and reproduce the evidence—not that a policy document exists.</blockquote>
        </div>
      </section>

      <section className="surface requirements-surface">
        <SectionHeader
          title="Requirement → capability → evidence"
          description="A traceability map shared by Product, Risk, Compliance, Operations and Engineering."
          aside={<div className="framework-tabs" role="group" aria-label="Filter by regulatory framework">{frameworks.map((item) => <button key={item} className={framework === item ? "active" : ""} onClick={() => setFramework(item)} aria-pressed={framework === item}>{item}</button>)}</div>}
        />
        <div className="requirement-list" aria-live="polite">
          {visible.map((item) => (
            <article key={item.id} className="requirement-card">
              <div className="requirement-top"><StatusPill tone={item.framework === "CCD2" ? "risk" : item.framework === "DORA" ? "info" : "warning"}>{item.framework}</StatusPill><StatusPill tone={item.status === "ready" ? "positive" : item.status === "build" ? "warning" : "info"}>{item.status}</StatusPill></div>
              <h3>{item.requirement}</h3>
              <div className="requirement-mapping">
                <div><span>Product capability</span><strong>{item.productCapability}</strong></div>
                <ArrowRight size={18} />
                <div><span>Required evidence</span><strong>{item.evidence}</strong></div>
              </div>
              <footer><span>Accountable owner</span><strong>{item.owner}</strong></footer>
            </article>
          ))}
        </div>
      </section>

      <div className="two-column">
        <section className="surface customer-review-flow">
          <SectionHeader title="Automated decision review" description="A customer-facing flow, not an operational exception." />
          <ol>
            {[
              ["Explain", "Give the main decision factors in plain language."],
              ["Listen", "Let the customer correct data or add context."],
              ["Review", "Route a complete evidence bundle to a person."],
              ["Resolve", "Record rationale, notify the customer and join the outcome."],
            ].map(([title, detail], index) => <li key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{detail}</p></div>{index === 3 && <Check size={17} />}</li>)}
          </ol>
          <div className="review-slo"><FileClock size={18} /><span><strong>Proposed review SLO</strong><small>95% resolved within 2 working days</small></span></div>
        </section>
        <section className="surface governance-panel">
          <SectionHeader title="One registry, explicit purpose" description="Creditworthiness and fraud may share infrastructure without sharing governance assumptions." />
          <div className="purpose-split">
            <div><span>Creditworthiness</span><strong>Affordability · capacity · exposure</strong><small>AI Act high-risk assessment applies where in scope</small></div>
            <div><span>Financial fraud</span><strong>Identity · velocity · device risk</strong><small>Purpose is explicitly tagged and separately governed</small></div>
          </div>
          <div className="registry-proof"><ShieldCheck size={19} /><span><strong>Registry record</strong><small>purpose · owner · version · data · approval · monitoring · retirement</small></span></div>
        </section>
      </div>

      <Callout title="Boundary of this concept" tone="warning">
        This is product interpretation of public EU sources, not legal advice or a statement of Riverty readiness. Exact scope, national transposition, legal basis and control design require Riverty Legal and Compliance validation.
      </Callout>
      <div className="page-next"><Link href="/roadmap" className="primary-button">See the product operating model <ArrowRight size={16} /></Link></div>
    </div>
  );
}
