import portfolioData from "@/content/mine.json";

export type ArtworkItem = {
  title: string;
  media: string;
  description?: string;
  /** Google Drive share link or file ID, or any public image URL */
  image?: string;
  /** Multiple images on one card (e.g. sketch sheet) */
  images?: string[];
};

export type AnimationItem = {
  title: string;
  media: string;
  description: string;
  /** Google Drive video share link or file ID */
  video: string;
  /** Still frame from the film */
  still?: string;
  /** Behind-the-scenes / progress section */
  progress?: {
    title?: string;
    description: string;
    storyboard?: string;
    images?: string[];
    video?: string;
  };
};

export type PortfolioSection = {
  id: string;
  title: string;
  subtitle?: string;
  items: ArtworkItem[];
};

export type Portfolio = {
  slug: string;
  name: string;
  subtitle: string;
  accent: string;
  coverImage?: string;
  drawingSections: PortfolioSection[];
  animations: AnimationItem[];
};

export function getPortfolio(): Portfolio {
  return portfolioData as Portfolio;
}

export function countDrawingWorks(portfolio: Portfolio): number {
  return portfolio.drawingSections.reduce((n, s) => n + s.items.length, 0);
}
