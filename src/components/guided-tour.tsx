"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const tourSteps = [
  {
    view: "Decision Room",
    href: "/",
    title: "Begin with the decision, not the dashboard.",
    description: "See the product thesis and how competing commercial, regulatory, risk and technology demands are ranked against one shared platform strategy.",
    action: "Select two demands and compare the score, rationale and reusable primitive.",
    takeaway: "The PM decision is what to fund first and what evidence would change that order.",
  },
  {
    view: "Live Decision",
    href: "/live-decision",
    title: "Follow one checkout from signals to customer action.",
    description: "Credit capacity, fraud uncertainty, identity continuity, exposure and policy combine into an action that must be explainable to the customer.",
    action: "Compare a blanket decline with conditional approval, then open the explanation.",
    takeaway: "The platform orchestrates the safest next action. It does not expose a raw model score as a product decision.",
  },
  {
    view: "Portfolio",
    href: "/portfolio",
    title: "Connect instant approval to outcomes that mature later.",
    description: "Approval quality is evaluated against loss, fraud, exposure, contribution and customer overextension instead of a single conversion metric.",
    action: "Increase the proposed credit limit until a responsible-lending guardrail fails.",
    takeaway: "A short-term checkout gain is not a win if it creates downstream loss or customer harm.",
  },
  {
    view: "Shadow Lab",
    href: "/shadow-lab",
    title: "Prove a change before it receives authority.",
    description: "Champion and challenger run on the same traffic so a strong global average cannot hide a weak country, tenure or value cohort.",
    action: "Compare global and segmented release, then inspect the Sweden new-customer cohort.",
    takeaway: "Release authority follows cohort evidence, guardrails and rollback readiness.",
  },
  {
    view: "Modernization",
    href: "/modernization",
    title: "Modernize behind a stable decision contract.",
    description: "Legacy and modern services can coexist while decision parity, fallbacks and customer-safe recovery are demonstrated in production-like conditions.",
    action: "Change migration authority and rehearse a model, bureau, feature or registry failure.",
    takeaway: "Code completion is not migration completion. Customer outcomes and recovery evidence are the gate.",
  },
  {
    view: "Regulation",
    href: "/regulation",
    title: "Turn obligations into capabilities and evidence.",
    description: "CCD2, the AI Act and DORA are mapped to product behavior, accountable ownership and the evidence required at review time.",
    action: "Filter by framework and trace one requirement through capability, evidence and owner.",
    takeaway: "Regulatory readiness becomes part of normal product delivery instead of a separate compliance project.",
  },
  {
    view: "Roadmap",
    href: "/roadmap",
    title: "Finish with the operating model and leadership proposition.",
    description: "The roadmap shows how a Product Management Lead would align strategy, PM ownership, metrics and consequential decisions during the first 90 days.",
    action: "Open each phase, review the Product Decision Record, then continue to Why me.",
    takeaway: "The output is a decision system for teams, not a longer queue of tickets.",
  },
];

export function GuidedTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const activeStep = tourSteps[step];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  function openTour() {
    setStep(0);
    setOpen(true);
  }

  return (
    <>
      <button ref={triggerRef} type="button" className="topbar-guide" onClick={openTour} aria-label="Start guided tour">
        <Compass size={15} aria-hidden="true" />
        <span className="guide-full">Start guided tour</span>
        <span className="guide-short">Tour</span>
      </button>

      {open && createPortal((
        <div className="tour-overlay" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section
            ref={dialogRef}
            className="tour-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-title"
            aria-describedby="tour-description"
          >
            <header className="tour-header">
              <div><Compass size={17} aria-hidden="true" /><span>Guided tour</span></div>
              <button ref={closeRef} type="button" className="tour-close" onClick={() => setOpen(false)} aria-label="Close guided tour">
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="tour-progress">
              <span>Step {String(step + 1).padStart(2, "0")} of {String(tourSteps.length).padStart(2, "0")}</span>
              <div aria-hidden="true"><i style={{ width: `${((step + 1) / tourSteps.length) * 100}%` }} /></div>
            </div>

            <div className="tour-content">
              <span className="tour-view">{activeStep.view}</span>
              <h2 id="tour-title">{activeStep.title}</h2>
              <p id="tour-description">{activeStep.description}</p>
              <dl className="tour-prompts">
                <div><dt>Try this</dt><dd>{activeStep.action}</dd></div>
                <div><dt>PM takeaway</dt><dd>{activeStep.takeaway}</dd></div>
              </dl>
            </div>

            <footer className="tour-footer">
              <div className="tour-step-controls">
                <button type="button" onClick={() => setStep((current) => current - 1)} disabled={step === 0}>
                  <ArrowLeft size={15} aria-hidden="true" /> Previous
                </button>
                {step < tourSteps.length - 1 ? (
                  <button type="button" onClick={() => setStep((current) => current + 1)}>
                    Next <ArrowRight size={15} aria-hidden="true" />
                  </button>
                ) : (
                  <button type="button" onClick={() => setOpen(false)}>Finish</button>
                )}
              </div>
              <Link href={activeStep.href} className="tour-open-link" onClick={() => setOpen(false)}>
                Open {activeStep.view} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </footer>
          </section>
        </div>
      ), document.body)}
    </>
  );
}
