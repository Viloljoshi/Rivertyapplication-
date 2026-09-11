import { Roadmap } from "@/components/roadmap";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("Roadmap", "A Product Lead operating system for strategy, PM leadership, prioritization and evidence-led delivery.", "roadmap");

export default function RoadmapPage() {
  return <Roadmap />;
}
