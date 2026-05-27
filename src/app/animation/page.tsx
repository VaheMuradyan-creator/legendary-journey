import type { Metadata } from "next";
import { PortfolioView } from "@/components/PortfolioView";
import { toPortfolio } from "@/lib/portfolio";
import { loadPortfolio } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadPortfolio();
  return {
    title: `${data.name} — Animation`,
    description: "Animation and film portfolio work.",
  };
}

export default async function AnimationPage() {
  const data = await loadPortfolio();
  const portfolio = toPortfolio(data);
  return <PortfolioView portfolio={portfolio} mode="animation" />;
}
