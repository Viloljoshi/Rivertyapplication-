import { WhyMe } from "@/components/why-me";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("Why me", "A value-driven proposition for leading Riverty risk decisioning product management.", "why-me");

export default function WhyMePage() {
  return <WhyMe />;
}
