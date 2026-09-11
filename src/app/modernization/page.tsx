import { Modernization } from "@/components/modernization";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("Modernization", "Evolve a live risk platform through dual-run evidence, cohort migration, failure rehearsal and fast rollback.", "modernization");

export default function ModernizationPage() {
  return <Modernization />;
}
