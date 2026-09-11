import { Portfolio } from "@/components/portfolio";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata("Portfolio", "Connect checkout policy to approval, matured loss, fraud, exposure and responsible customer outcomes.", "portfolio");

export default function PortfolioPage() {
  return <Portfolio />;
}
