import { LiveDecision } from "@/components/live-decision";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("Live Decision", "Explore how credit, fraud, identity and exposure evidence resolve into a next-best customer action.", "live-decision");

export default function LiveDecisionPage() {
  return <LiveDecision />;
}
