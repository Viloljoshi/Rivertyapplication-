import { DecisionRoom } from "@/components/decision-room";
import { buildPageMetadata, siteDescription, siteName } from "@/lib/page-metadata";

export const metadata = buildPageMetadata(siteName, siteDescription);

export default function HomePage() {
  return <DecisionRoom />;
}
