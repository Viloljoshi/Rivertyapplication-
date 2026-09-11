import { ShadowLab } from "@/components/shadow-lab";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("Shadow Lab", "Compare champion and challenger decisions by cohort before choosing a segmented release.", "shadow-lab");

export default function ShadowLabPage() {
  return <ShadowLab />;
}
