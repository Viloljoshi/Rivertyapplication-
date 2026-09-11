import { ArrowRight } from "lucide-react";
import { ExternalLink, PageHeader, StatusPill } from "@/components/ui";
import { researchSignals } from "@/lib/data";

export function About() {
  return (
    <div className="page-stack about-page">
      <PageHeader
        eyebrow="Research basis"
        title="The case for safer change."
        description="This work sample tests one proposition: a European credit and fraud platform should make every policy, model and service change traceable, testable and reversible before it reaches scale."
        aside={<StatusPill tone="info">Independent work sample</StatusPill>}
      />

      <section className="research-logic" aria-label="How the product hypothesis was formed">
        <article>
          <span>Public signal</span>
          <strong>Role mandate, product mechanics, scale and regulation</strong>
        </article>
        <ArrowRight size={18} aria-hidden="true" />
        <article>
          <span>Product hypothesis</span>
          <strong>Safe change is the shared constraint</strong>
        </article>
        <ArrowRight size={18} aria-hidden="true" />
        <article>
          <span>Prototype response</span>
          <strong>Ledger, replay, shadowing, guardrails and review</strong>
        </article>
      </section>

      <section className="surface research-section">
        <div className="section-header">
          <div>
            <h2>From signal to product response</h2>
            <p>Four public signals shape the proposal. Each one leads to a concrete product response tested elsewhere in the prototype.</p>
          </div>
          <span className="formula-chip">Primary sources</span>
        </div>
        <div className="research-list">
          {researchSignals.map((item) => (
            <article key={item.number}>
              <div className="research-number">{item.number}</div>
              <div className="research-copy">
                <h3>{item.title}</h3>
                <p>{item.signal}</p>
                <div className="research-response">
                  <span>Product response</span>
                  <strong>{item.response}</strong>
                </div>
                <div className="research-links" aria-label={`Sources for ${item.title}`}>
                  {item.sources.map((source) => (
                    <ExternalLink key={source.url} href={source.url}>{source.label}</ExternalLink>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="scope-note">
        <strong>Scope</strong>
        <p>Built from public material and a synthetic operating scenario. Metrics and outcomes are illustrative, the architecture is a hypothesis to validate with Riverty, and regulatory interpretation remains with accountable Legal, Compliance and Risk owners.</p>
      </aside>
    </div>
  );
}
