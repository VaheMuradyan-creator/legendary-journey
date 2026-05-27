import type { Metadata } from "next";
import { PortfolioView } from "@/components/PortfolioView";
import { getPortfolio } from "@/lib/portfolio";

const portfolio = getPortfolio();

export const metadata: Metadata = {
  title: `${portfolio.name} — Animation Portfolio`,
  description: portfolio.subtitle,
};

export default function HomePage() {
  return <PortfolioView portfolio={portfolio} />;
}
