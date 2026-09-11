import { About } from "@/components/about";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("About & sources", "Scope, synthetic-data disclosure and public source trail for this independent Riverty product concept.", "about");

export default function AboutPage() {
  return <About />;
}
