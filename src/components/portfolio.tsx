"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CircleDollarSign, SlidersHorizontal, TriangleAlert } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { portfolioSeries, vintageSeries } from "@/lib/data";
import { limitScenario } from "@/lib/simulation";
import { Callout, Metric, PageHeader, SectionHeader, StatusPill } from "@/components/ui";

export function Portfolio() {
  const [limit, setLimit] = useState(450);
  const result = limitScenario(limit);
  const guardrailBreached = Number(result.loss) > 1.25 || Number(result.overextension) > 3.4;

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Portfolio · Credit product economics"
        title="Optimize for a healthy book, not an approval rate."
        description="Connect checkout policy to exposure, loss, fraud, customer overextension and contribution margin. The right answer can differ by market, product and customer tenure."
        aside={<StatusPill tone="info">Synthetic monthly cohort</StatusPill>}
      />

      <section className="metric-row four-up">
        <Metric label="Approval rate" value="72.1%" detail="+1.9pp since March" tone="positive" />
        <Metric label="30-day loss rate" value="1.19%" detail="guardrail ≤ 1.25%" tone="warning" />
        <Metric label="Fraud loss" value="0.34%" detail="within 0.40% limit" tone="positive" />
        <Metric label="Open exposure" value="€92M" detail="+18% since March" tone="ink" />
      </section>

      <section className="surface chart-surface">
        <SectionHeader
          title="Portfolio outcome view"
          description="Approval is a leading indicator. Loss and fraud mature later; exposure moves immediately."
          aside={<span className="formula-chip">Illustrative · Mar–Aug 2026</span>}
        />
        <div className="chart-wrap" role="img" aria-label="Approval, loss and fraud trend from March to August">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={portfolioSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#e7e4e2" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#686868", fontSize: 12 }} />
              <YAxis yAxisId="approval" domain={[64, 74]} tickLine={false} axisLine={false} tick={{ fill: "#686868", fontSize: 12 }} />
              <YAxis yAxisId="risk" orientation="right" domain={[0, 1.5]} tickLine={false} axisLine={false} tick={{ fill: "#686868", fontSize: 12 }} />
              <Tooltip contentStyle={{ border: "1px solid #d7d2cf", borderRadius: 0, boxShadow: "none", fontSize: 12 }} />
              <Legend iconType="line" wrapperStyle={{ fontSize: 12, paddingTop: 14 }} />
              <Line yAxisId="approval" type="monotone" dataKey="approval" name="Approval %" stroke="#527a42" strokeWidth={3} dot={{ r: 3 }} />
              <Line yAxisId="risk" type="monotone" dataKey="loss" name="Loss %" stroke="#a45b3c" strokeWidth={2} dot={false} />
              <Line yAxisId="risk" type="monotone" dataKey="fraud" name="Fraud %" stroke="#826a47" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="two-column portfolio-lower">
        <section className="surface simulator-panel">
          <SectionHeader
            title="Credit limit simulator"
            description="Stress the trade-off before changing a live exposure policy."
            aside={<SlidersHorizontal size={18} />}
          />
          <label className="range-label" htmlFor="limit-range">
            <span>Proposed limit</span>
            <strong>€{limit}</strong>
          </label>
          <input
            id="limit-range"
            type="range"
            min="250"
            max="900"
            step="25"
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
          />
          <div className="range-scale"><span>€250</span><span>€900</span></div>
          <div className="simulator-grid" aria-live="polite">
            <div><span>Approval</span><strong>{result.approval}%</strong></div>
            <div><span>Expected loss</span><strong>{result.loss}%</strong></div>
            <div><span>Contribution / 100</span><strong>€{result.margin}</strong></div>
            <div><span>Overextension proxy</span><strong>{result.overextension}%</strong></div>
          </div>
          <div className={`guardrail-result ${guardrailBreached ? "breach" : "pass"}`}>
            {guardrailBreached ? <TriangleAlert size={19} /> : <CircleDollarSign size={19} />}
            <div>
              <strong>{guardrailBreached ? "Guardrail breached" : "Within responsible range"}</strong>
              <p>{guardrailBreached ? "Loss or overextension exceeds the product boundary. Test a lower limit or narrower cohort." : "The scenario preserves the loss boundary while recovering eligible demand."}</p>
            </div>
          </div>
        </section>

        <section className="surface vintage-panel">
          <SectionHeader title="Vintage maturation" description="Early improvement can hide later loss. Compare cohorts at the same age." />
          <div className="mini-chart" role="img" aria-label="Loss maturation by monthly vintage">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vintageSeries} margin={{ top: 8, right: 6, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e7e4e2" />
                <XAxis dataKey="age" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#686868" }} />
                <YAxis domain={[0, 1.4]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#686868" }} />
                <Tooltip contentStyle={{ border: "1px solid #d7d2cf", borderRadius: 0, boxShadow: "none", fontSize: 12 }} />
                <Line dataKey="mar" name="Mar" stroke="#282828" strokeWidth={2} dot={false} />
                <Line dataKey="apr" name="Apr" stroke="#527a42" strokeWidth={2} dot={false} />
                <Line dataKey="may" name="May" stroke="#8da77f" strokeWidth={2} dot={false} />
                <Line dataKey="jun" name="Jun" stroke="#a45b3c" strokeWidth={2.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="vintage-note"><span /> Jun is +17bp above March at M4. Investigate before raising limits globally.</div>
        </section>
      </div>

      <Callout title="What this prevents" tone="warning">
        A policy that looks good at checkout can create delayed loss, customer overextension or concentrated exposure. Portfolio instrumentation turns those lagging consequences into launch guardrails.
      </Callout>

      <div className="page-next"><Link href="/shadow-lab" className="primary-button">Open Shadow Lab <ArrowRight size={16} /></Link></div>
    </div>
  );
}
