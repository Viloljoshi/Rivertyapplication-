import { Regulation } from "@/components/regulation";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("Regulation", "Translate CCD2, AI Act and DORA obligations into product capabilities, evidence and ownership.", "regulation");

export default function RegulationPage() {
  return <Regulation />;
}
