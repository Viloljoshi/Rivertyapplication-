import { ExternalLink, PageHeader, StatusPill } from "@/components/ui";
import { publicSources } from "@/lib/data";

export function About() {
  return (
    <div className="page-stack about-page">
      <PageHeader
        eyebrow="About · Scope and evidence"
        title="A conversation artifact, not an inside view."
        description="This independent work sample turns public information and an illustrative operating scenario into a testable Product Lead proposal. It does not represent Riverty systems, controls, data or readiness."
        aside={<StatusPill tone="warning">Public inference · synthetic data</StatusPill>}
      />

      <section className="disclosure-panel">
        <div><span>What is public</span><p>Role scope, published product behavior, public scale statements and EU regulatory text linked below.</p></div>
        <div><span>What is inferred</span><p>The change-governance problem, common platform primitives and suggested sequencing.</p></div>
        <div><span>What is synthetic</span><p>Every customer, transaction, score, metric, model result, cohort, incident, team capacity and roadmap date.</p></div>
      </section>

      <section className="surface source-section">
        <div className="section-header"><div><h2>Evidence map</h2><p>Each primary source is tied to the specific product assumption it supports. The links do not validate any synthetic metric or claim about Riverty’s internal implementation.</p></div><span className="formula-chip">Reviewed 12 Sep 2026</span></div>
        <div className="source-map-header" aria-hidden="true"><span>Source</span><span>Public evidence</span><span>How it is used here</span></div>
        <div className="source-list">
          {publicSources.map((source, index) => (
            <article key={source.url}>
              <div className="source-identity"><span>{String(index + 1).padStart(2, "0")}</span><small>{source.category}</small></div>
              <div><ExternalLink href={source.url}>{source.label}</ExternalLink><p>{source.note}</p></div>
              <div className="source-use"><span>Prototype use</span><p>{source.supports}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-principles">
        <div><strong>No legal advice</strong><p>Regulatory interpretation must be validated by Riverty Legal, Compliance and accountable risk owners.</p></div>
        <div><strong>No performance claim</strong><p>Numbers are deterministic product-design inputs for exploring trade-offs, not benchmarks or forecasts.</p></div>
        <div><strong>No AI decision theatre</strong><p>AI appears only where purpose, accountability, evidence, monitoring and human intervention can be made explicit.</p></div>
      </section>
    </div>
  );
}
