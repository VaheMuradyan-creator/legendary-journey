import { WORK_CATEGORIES, type WorkCategoryId } from "@/lib/categories";
import {
  ART_STRUCTURE_CATEGORIES,
  ART_STRUCTURE_SLOT_COUNT,
  type ArtStructureCategoryId,
} from "@/lib/art-structure-categories";
import { isPlaceholderMedia } from "@/lib/drive";

export type ArtworkItem = {
  title: string;
  media: string;
  description?: string;
  image?: string;
  images?: string[];
};

export type WorkItem = ArtworkItem & {
  id: string;
  category: WorkCategoryId;
};

export type ArtStructureWork = {
  id: string;
  title: string;
  date: string;
  media: string;
  category: ArtStructureCategoryId;
  image?: string;
  images?: string[];
  processImages?: string[];
  artistStatement?: string;
};

export type ArtStructureData = {
  portfolioTitle: string;
  coverImage?: string;
  works: ArtStructureWork[];
};

export type AnimationItem = {
  id: string;
  title: string;
  media: string;
  description: string;
  video: string;
  still?: string;
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

export type ArtStructureSection = {
  id: string;
  title: string;
  subtitle?: string;
  items: ArtStructureWork[];
};

export type PortfolioData = {
  slug: string;
  name: string;
  subtitle: string;
  accent: string;
  coverImage?: string;
  artStructure: ArtStructureData;
  works: WorkItem[];
  animations: AnimationItem[];
};

export type Portfolio = PortfolioData & {
  drawingSections: PortfolioSection[];
};

export type ArtStructurePortfolio = {
  name: string;
  accent: string;
  artStructure: ArtStructureData;
  sections: ArtStructureSection[];
  filledCount: number;
  statementCount: number;
};

export const WORK_SLOT_COUNT = 10;
export const ANIMATION_SLOT_COUNT = 3;

export function createEmptyWork(index: number): WorkItem {
  return {
    id: `work-${String(index + 1).padStart(2, "0")}`,
    title: `Artwork ${index + 1}`,
    media: "",
    category: "character-design",
    description: "",
    image: "",
  };
}

export function createEmptyArtStructureWork(index: number): ArtStructureWork {
  const categories = ART_STRUCTURE_CATEGORIES;
  const category = categories[index % categories.length].id;
  return {
    id: `as-${String(index + 1).padStart(2, "0")}`,
    title: `Artwork ${index + 1}`,
    date: "",
    media: "",
    category,
    image: "",
    images: [],
    processImages: [],
    artistStatement: "",
  };
}

export function createEmptyArtStructure(): ArtStructureData {
  return {
    portfolioTitle: "Art Structure Portfolio",
    coverImage: "",
    works: Array.from({ length: ART_STRUCTURE_SLOT_COUNT }, (_, i) =>
      createEmptyArtStructureWork(i)
    ),
  };
}

export function createEmptyAnimation(index: number): AnimationItem {
  return {
    id: `anim-${String(index + 1).padStart(2, "0")}`,
    title: `Animation ${index + 1}`,
    media: "",
    description: "",
    video: "",
    still: "",
    progress: {
      title: "Behind the scenes",
      description: "",
      storyboard: "",
      images: [],
      video: "",
    },
  };
}

export function normalizePortfolio(data: PortfolioData): PortfolioData {
  const works = [...(data.works ?? [])];
  while (works.length < WORK_SLOT_COUNT) {
    works.push(createEmptyWork(works.length));
  }

  const animations = [...(data.animations ?? [])];
  while (animations.length < ANIMATION_SLOT_COUNT) {
    animations.push(createEmptyAnimation(animations.length));
  }

  const artStructure = data.artStructure ?? createEmptyArtStructure();
  const asWorks = [...(artStructure.works ?? [])];
  while (asWorks.length < ART_STRUCTURE_SLOT_COUNT) {
    asWorks.push(createEmptyArtStructureWork(asWorks.length));
  }

  return {
    ...data,
    works: works.slice(0, WORK_SLOT_COUNT),
    animations: animations.slice(0, ANIMATION_SLOT_COUNT),
    artStructure: {
      ...artStructure,
      portfolioTitle: artStructure.portfolioTitle ?? "Art Structure Portfolio",
      works: asWorks.slice(0, ART_STRUCTURE_SLOT_COUNT),
    },
  };
}

export function artStructureWorkHasContent(work: ArtStructureWork): boolean {
  const hasImage =
    (work.image && !isPlaceholderMedia(work.image)) ||
    (work.images?.some((i) => !isPlaceholderMedia(i)) ?? false);
  return Boolean(work.title?.trim() && hasImage);
}

export function workHasContent(work: WorkItem): boolean {
  const hasImage =
    (work.image && !isPlaceholderMedia(work.image)) ||
    (work.images?.some((i) => !isPlaceholderMedia(i)) ?? false);
  return Boolean(work.title?.trim() && hasImage);
}

export function animationHasContent(anim: AnimationItem): boolean {
  return Boolean(anim.title?.trim() && anim.video && !isPlaceholderMedia(anim.video));
}

export function buildArtStructureSections(works: ArtStructureWork[]): ArtStructureSection[] {
  return ART_STRUCTURE_CATEGORIES.map((cat) => ({
    id: cat.id,
    title: cat.title,
    subtitle: cat.subtitle,
    items: works.filter(
      (w) => w.category === cat.id && artStructureWorkHasContent(w)
    ),
  })).filter((section) => section.items.length > 0);
}

export function buildDrawingSections(works: WorkItem[]): PortfolioSection[] {
  return WORK_CATEGORIES.map((cat) => ({
    id: cat.id,
    title: cat.title,
    subtitle: cat.subtitle,
    items: works
      .filter((w) => w.category === cat.id && workHasContent(w))
      .map(
        (w): ArtworkItem => ({
          title: w.title,
          media: w.media,
          description: w.description,
          image: w.image,
          images: w.images,
        })
      ),
  })).filter((section) => section.items.length > 0);
}

export function toPortfolio(data: PortfolioData): Portfolio {
  const normalized = normalizePortfolio(data);
  return {
    ...normalized,
    drawingSections: buildDrawingSections(normalized.works),
  };
}

export function toArtStructurePortfolio(data: PortfolioData): ArtStructurePortfolio {
  const normalized = normalizePortfolio(data);
  const works = normalized.artStructure.works;
  return {
    name: normalized.name,
    accent: normalized.accent,
    artStructure: normalized.artStructure,
    sections: buildArtStructureSections(works),
    filledCount: works.filter(artStructureWorkHasContent).length,
    statementCount: works.filter(
      (w) => artStructureWorkHasContent(w) && w.artistStatement?.trim()
    ).length,
  };
}

export function countDrawingWorks(portfolio: PortfolioData): number {
  return portfolio.works.filter(workHasContent).length;
}

export function countFilledAnimations(portfolio: PortfolioData): number {
  return portfolio.animations.filter(animationHasContent).length;
}
