"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRightLeft,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleHelp,
  FlaskConical,
  Landmark,
  Menu,
  Network,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Decision Room", icon: Activity },
  { href: "/live-decision", label: "Live Decision", icon: ArrowRightLeft },
  { href: "/portfolio", label: "Portfolio", icon: ChartNoAxesCombined },
  { href: "/shadow-lab", label: "Shadow Lab", icon: FlaskConical },
  { href: "/modernization", label: "Modernization", icon: Network },
  { href: "/regulation", label: "Regulation", icon: Landmark },
  { href: "/roadmap", label: "Roadmap", icon: BookOpenCheck },
  { href: "/why-me", label: "Why me", icon: BriefcaseBusiness },
];

const bottomItems = navItems.slice(0, 4);

function RivertyWordmark() {
  return (
    <span className="wordmark" aria-label="Riverty">
      <span aria-hidden="true">RIVERTY</span>
    </span>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <aside id="primary-navigation" className={`sidebar ${open ? "is-open" : ""}`}>
        <div className="sidebar-brand">
          <Link href="/" className="brand-link">
            <RivertyWordmark />
            <span>Risk Decisioning Evolution Lab</span>
          </Link>
          <button className="icon-button mobile-only" onClick={() => setOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <div className="concept-label">
          <BadgeCheck size={15} /> Independent concept · synthetic data
        </div>

        <nav aria-label="Primary navigation" className="primary-nav">
          {navItems.map(({ href, label, icon: Icon }, index) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`} onClick={() => setOpen(false)}>
                <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="scenario-stamp">
            <span>Scenario clock</span>
            <strong>69 days</strong>
            <small>to CCD2 application</small>
          </div>
          <Link href="/about" className={`about-link ${pathname === "/about" ? "active" : ""}`} onClick={() => setOpen(false)}>
            <CircleHelp size={17} /> About & sources
          </Link>
        </div>
      </aside>

      {open && <button className="nav-scrim" onClick={() => setOpen(false)} aria-label="Close navigation" />}

      <div className="app-column">
        <header className="topbar">
          <button
            className="icon-button mobile-only"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="primary-navigation"
          >
            <Menu size={20} />
          </button>
          <div className="topbar-context">
            <span className="signal-dot" />
            <span>Illustrative platform scenario</span>
          </div>
          <Link href="/#walkthrough" className="topbar-guide">
            <span className="guide-full">How to use this prototype</span>
            <span className="guide-short">Guide</span>
            <ArrowDown size={15} aria-hidden="true" />
          </Link>
        </header>

        <main id="main-content" className="main-content">
          {children}
        </main>

        <nav className="bottom-nav" aria-label="Mobile navigation">
          {bottomItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={active ? "active" : ""}>
                <Icon size={19} aria-hidden="true" />
                <span>{label.replace("Live Decision", "Decision")}</span>
              </Link>
            );
          })}
          <button onClick={() => setOpen(true)} aria-label="Open all navigation">
            <Menu size={19} />
            <span>More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
