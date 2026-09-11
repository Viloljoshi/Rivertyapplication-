"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleGauge,
  Fingerprint,
  History,
  ShieldAlert,
  UserRoundCheck,
} from "lucide-react";
import { decisionOptions, decisionSignals, ledgerRows } from "@/lib/data";
import { Callout, PageHeader, SectionHeader } from "@/components/ui";

export function LiveDecision() {
  const [optionId, setOptionId] = useState<"reject" | "conditional" | "approve">("conditional");
  const option = decisionOptions.find((item) => item.id === optionId) ?? decisionOptions[1];
  const [explanation, setExplanation] = useState(false);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Live Decision · Invoice payment · Germany"
        title="One checkout. More than yes or no."
        description="Separate credit capacity, fraud uncertainty, identity continuity and exposure—then choose the safest next-best action that can still serve the customer."
        aside={<span className="decision-id">RDE-260912-18403 · 84 ms</span>}
      />

      <section className="decision-canvas">
        <article className="customer-context surface">
          <div className="customer-title">
            <div className="customer-avatar" aria-hidden="true">AK</div>
            <div>
              <span>Returning customer · 4.2 years</span>
              <h2>€742 · Pay in 30 days</h2>
              <p>17 paid invoices · €318 open exposure · proposed total €1,060</p>
            </div>
          </div>
          <div className="signal-list">
            {decisionSignals.map((signal) => (
              <div className="signal-row" key={signal.label}>
                <div>
                  <strong>{signal.label}</strong>
                  <small>{signal.detail}</small>
                </div>
                <div className="signal-track" aria-label={`${signal.label}: ${signal.value} out of 100`}>
                  <span className={signal.state} style={{ width: `${signal.value}%` }} />
                </div>
                <b>{signal.value}</b>
              </div>
            ))}
          </div>
          <div className="event-strip" aria-label="Recent customer events">
            <span><History size={15} /> Email changed · 2d</span>
            <span><Fingerprint size={15} /> New device · now</span>
            <span><UserRoundCheck size={15} /> Address changed · 3d</span>
          </div>
        </article>

        <article className={`decision-result ${option.tone}`}>
          <span className="result-kicker">Selected strategy outcome</span>
          <div className="result-icon"><CircleGauge size={28} /></div>
          <h2>{option.decision}</h2>
          <p className="result-limit">{option.limit}</p>
          <div className="next-action">
            <span>Next best action</span>
            <strong>{option.nextStep}</strong>
          </div>
          <div className="result-metrics">
            <div><span>Expected loss</span><strong>{option.expectedLoss}</strong></div>
            <div><span>Expected conversion</span><strong>{option.conversion}</strong></div>
          </div>
          <p className="result-rationale">{option.rationale}</p>
        </article>
      </section>

      <section className="surface strategy-surface">
        <SectionHeader
          title="Choose the policy posture"
          description="The model produces evidence. Product policy chooses the customer action and exposure boundary."
        />
        <div className="option-grid" role="group" aria-label="Decision strategy options">
          {decisionOptions.map((item) => (
            <button key={item.id} className={optionId === item.id ? "selected" : ""} onClick={() => setOptionId(item.id)} aria-pressed={optionId === item.id}>
              <span className={`option-radio ${optionId === item.id ? "checked" : ""}`}>{optionId === item.id && <Check size={13} />}</span>
              <span><strong>{item.label}</strong><small>{item.nextStep}</small></span>
            </button>
          ))}
        </div>
      </section>

      <div className="two-column">
        <section className="surface policy-stack">
          <SectionHeader title="Policy stack" description="Versioned rules resolve from global to cohort-specific controls." />
          {[
            ["Global", "Responsible credit baseline", "v4.2"],
            ["Credit", "Invoice affordability", "v7.2"],
            ["Fraud", "Account takeover graph", "v3.8"],
            ["Market", "Germany · Pay in 30", "v12.4"],
            ["Cohort", "Returning · medium exposure", "v2.1"],
          ].map(([level, name, version], index) => (
            <div className="policy-row" key={level}>
              <span>{index + 1}</span>
              <div><small>{level}</small><strong>{name}</strong></div>
              <b>{version}</b>
            </div>
          ))}
        </section>

        <section className="surface ledger-panel">
          <SectionHeader title="Decision Ledger" description="The immutable evidence bundle that makes change reviewable." />
          <div className="ledger-table">
            {ledgerRows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <button className="text-button" onClick={() => setExplanation((value) => !value)} aria-expanded={explanation}>
            Preview customer explanation <ChevronDown className={explanation ? "rotated" : ""} size={16} />
          </button>
          {explanation && (
            <div className="customer-explanation">
              <ShieldAlert size={18} />
              <p>We could not offer the full amount because your account details recently changed and this purchase would raise your open balance. You can continue with a lower amount after a quick identity check, or ask us to review the decision.</p>
            </div>
          )}
        </section>
      </div>

      <Callout title="Product principle" tone="positive">
        Treat a decline as one possible action—not the definition of risk management. A governed action set can reduce avoidable rejection while preserving exposure, identity and loss controls.
      </Callout>

      <div className="page-next">
        <Link href="/portfolio" className="primary-button">Test the portfolio effect <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}
