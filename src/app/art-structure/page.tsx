import type { Metadata } from "next";
import { ArtStructureView } from "@/components/ArtStructureView";
import { toArtStructurePortfolio } from "@/lib/portfolio";
import { loadPortfolio } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadPortfolio();
  return {
    title: `${data.name} — Art Structure Portfolio`,
    description: "Art structure class portfolio — materials, process, and artist statements.",
  };
}

export default async function ArtStructurePage() {
  const data = await loadPortfolio();
  const portfolio = toArtStructurePortfolio(data);
  return <ArtStructureView portfolio={portfolio} />;
}
