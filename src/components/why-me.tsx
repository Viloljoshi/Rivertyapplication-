import Link from "next/link";
import { ArrowRight, Braces, ChartSpline, Compass, Handshake, Layers3, ShieldCheck } from "lucide-react";
import { Callout, PageHeader, SectionHeader, StatusPill } from "@/components/ui";

const valuePillars = [
  {
    icon: Compass,
    title: "Clarity under competing pressure",
    value: "I turn commercial, regulatory, risk and platform asks into one visible decision system with explicit trade-offs.",
    proof: "Artifact: ranked demand, shared primitives and a sequenced 10-week decision path.",
  },
  {
    icon: Braces,
    title: "Technical product depth",
    value: "I can reason from the checkout contract through orchestration, model and policy versions, evidence, fallbacks and SLOs.",
    proof: "Artifact: Decision Ledger, policy stack, dual-run migration and failure simulation.",
  },
  {
    icon: ChartSpline,
    title: "Portfolio economics, not vanity metrics",
    value: "I connect approval gains to matured loss, fraud, exposure, overextension, operations and contribution margin.",
    proof: "Artifact: limit simulator, vintage view and cohort guardrails.",
  },
  {
    icon: ShieldCheck,
    title: "Regulation as product capability",
    value: "I translate obligations into user journeys, platform behaviors, evidence, ownership and release tests.",
    proof: "Artifact: CCD2 review, AI purpose separation and DORA fallback mapping.",
  },
  {
    icon: Layers3,
    title: "Modernization without theatre",
    value: "I would reduce legacy risk through instrumentation, behavioral comparison, cohort migration and rehearsed rollback.",
    proof: "Artifact: target control plane and four evidence gates to decommission.",
  },
  {
    icon: Handshake,
    title: "Leadership through operating context",
    value: "I create the goals, metrics, decision rights and learning cadence that let PMs and engineers own outcomes instead of waiting for tickets.",
    proof: "Artifact: PM topology, weekly loop, scorecard and Product Decision Record.",
  },
];

export function WhyMe() {
  return (
    <div className="page-stack why-me-page">
      <PageHeader
        eyebrow="Why me · Value proposition"
        title="I would help Riverty make high-stakes change feel boring."
        description="Not by removing complexity, but by making it observable, explainable, reversible and owned. That is the product leadership system demonstrated across this prototype."
        aside={<StatusPill tone="positive">Value over claims</StatusPill>}
      />

      <section className="value-statement">
        <span>My proposition</span>
        <h2>Unify risk decisioning around a safe-change platform, then give teams the context and evidence to improve it continuously.</h2>
        <p>The domain step I want to deepen at Riverty is consumer credit risk at European scale. I am ready to contribute the product-systems discipline required for regulated journeys, decision infrastructure, analytical trade-offs and cross-functional delivery.</p>
      </section>

      <section className="surface value-grid-section">
        <SectionHeader title="What that adds in practice" description="Each proposition is demonstrated somewhere in the artifact rather than left as an interview adjective." />
        <div className="value-grid">
          {valuePillars.map(({ icon: Icon, title, value, proof }, index) => (
            <article key={title}>
              <div className="value-card-top"><span>0{index + 1}</span><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{value}</p>
              <small>{proof}</small>
            </article>
          ))}
        </div>
      </section>

      <div className="two-column">
        <section className="surface promise-panel">
          <SectionHeader title="What I would own" description="Concrete leadership outputs, not activity proxies." />
          {[
            ["A coherent domain strategy", "A small set of product outcomes linking customer fairness, portfolio health, platform safety and regulatory evidence."],
            ["A trusted decision cadence", "One intake, prioritization logic, Product Decision Records and explicit risk acceptance."],
            ["An empowered PM team", "Clear problems, measurable boundaries, technical context and direct stakeholder access."],
            ["A safer modernization path", "Observable parity, cohort rollout, customer-safe fallbacks and decommission evidence."],
          ].map(([title, detail]) => <div className="promise-row" key={title}><ArrowRight size={17} /><div><strong>{title}</strong><p>{detail}</p></div></div>)}
        </section>
        <section className="surface non-goals-panel">
          <SectionHeader title="What I would not do" description="The discipline is as important as the ambition." />
          {[
            "Optimize approval rate without matured portfolio and customer guardrails.",
            "Add AI to customer decisions without a defined purpose, evidence contract and human path.",
            "Treat legacy replacement as a technical project detached from decision outcomes.",
            "Claim knowledge of Riverty’s internal architecture from public information.",
          ].map((item) => <div key={item}><span aria-hidden="true">×</span><p>{item}</p></div>)}
        </section>
      </div>

      <Callout title="How I would use this in the interview" tone="info">
        I would use the prototype to invite correction: Which constraint is most real today? Where does change currently become slow or unsafe? Which common primitive would unlock the most value? The quality of the discussion matters more than defending the hypothesis.
      </Callout>

      <div className="value-close">
        <div><span>The outcome</span><h2>Better decisions today.<br />A safer platform to change tomorrow.</h2></div>
        <Link href="/" className="primary-button">Return to the Decision Room <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}
