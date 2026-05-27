import { notFound } from "next/navigation";
import { PortfolioView } from "@/components/PortfolioView";
import { getAllPortfolios, getPortfolio } from "@/lib/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPortfolios().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = getPortfolio(slug);
  if (!portfolio) return { title: "Portfolio" };
  return {
    title: `${portfolio.name} — Animation Portfolio`,
    description: portfolio.subtitle,
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = getPortfolio(slug);
  if (!portfolio) notFound();
  return <PortfolioView portfolio={portfolio} />;
}
