# Riverty Risk Decisioning Evolution Lab

An independent, interactive Product Management Lead work sample about governing change across a real-time credit and fraud decisioning platform.

> **Core thesis:** A better risk platform does not just make better decisions. It makes change safer.

The concept is grounded in Riverty’s public Product Management Lead role, public product documentation and primary EU regulatory sources. Every customer, transaction, model, score, metric, cohort, incident, resource constraint and roadmap date inside the prototype is synthetic.

This is not a representation of Riverty’s internal architecture, controls, performance or regulatory readiness.

## Product problem

A live risk platform must absorb simultaneous demands from Commercial, Credit Risk, Fraud, Compliance, Data Science, Operations and Platform Engineering. Optimizing any one request locally can create customer, portfolio, operational or resilience risk elsewhere.

The prototype proposes a common safe-change layer:

- a versioned **Decision Ledger** containing inputs, policy/model versions, reasons, fallbacks, latency and outcomes;
- replay and champion/challenger shadowing before authority changes;
- cohort-level release guardrails instead of global averages;
- a governed set of next-best customer actions—not only approve or reject;
- behavioral parity, failure rehearsal and fast rollback for legacy modernization;
- a traceability chain from regulation to product capability to evidence;
- Product Decision Records and a domain scorecard that align teams around outcomes.

## Product journey

1. **Decision Room** — prioritize five competing demands under a two-squad, ten-week illustrative constraint.
2. **Live Decision** — resolve credit, fraud, identity and exposure evidence into a conditional customer action.
3. **Portfolio** — test limits against approval, loss, contribution and overextension guardrails.
4. **Shadow Lab** — expose a cohort regression hidden by an attractive global average.
5. **Modernization** — dual-run legacy and modern decisions, ramp cohorts and rehearse dependency failures.
6. **Regulation** — map CCD2, AI Act and DORA requirements to working capabilities and evidence.
7. **Roadmap** — show the first 90 days, PM topology, decision cadence, scorecard and launch record.
8. **Why me** — a pure value proposition tied directly to demonstrated product artifacts.
9. **About** — disclosure, assumptions and primary source trail.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## GitHub Pages

The repository includes a GitHub Actions workflow that creates a static export under `/Rivertyapplication-` and deploys it on every push to `main`.

In repository settings, choose **Pages → Build and deployment → Source: GitHub Actions**. The artifact will then publish at:

<https://viloljoshi.github.io/Rivertyapplication-/>

## Public sources

- [Riverty Product Management Lead role](https://jobsearch.createyourowncareer.com/Riverty/job/Amsterdam-Product-Management-Lead-%28mfd%29-1079-MZ/1428381433/)
- [Riverty establishes bank in Luxembourg](https://www.riverty.com/no-no/bedrift/newsroom/riverty-establishes-bank-in-luxembourg/)
- [Riverty invoice payment](https://www.riverty.com/en/business/products/payment-methods/invoice-payment/)
- [Authorize payment documentation](https://docs.riverty.com/bnpl/documentation/authorize_payment)
- [Authorize API action codes](https://docs.riverty.com/bnpl/api_reference/authorize_payment/)
- [Risk-driven strong customer authentication](https://docs.riverty.com/bnpl/documentation/sca/)
- [Consumer Credit Directive (EU) 2023/2225](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A32023L2225)
- [EU Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)
- [Digital Operational Resilience Act](https://eur-lex.europa.eu/eli/reg/2022/2554/oj)

## Implementation

- Next.js App Router and TypeScript
- deterministic local simulations; no backend, database or external API
- Recharts for portfolio visualizations
- Lucide icons
- responsive keyboard-accessible interactions
- Playwright regression tests across desktop and mobile
