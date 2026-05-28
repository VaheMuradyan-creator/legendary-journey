import { WORK_CATEGORIES, type WorkCategoryId } from "@/lib/categories";
import {
  ART_STRUCTURE_CATEGORIES,
  ARTIST_STATEMENTS_REQUIRED,
  ART_STRUCTURE_MIN_ARTWORKS,
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

/** Class minimums (recommendations — you can add more). */
export const ANIMATION_MIN_ARTWORKS = 10;
export const ANIMATION_MIN_FILMS = 3;

export function generateItemId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptyWork(): WorkItem {
  return {
    id: generateItemId("work"),
    title: "",
    media: "",
    category: "character-design",
    description: "",
    image: "",
  };
}

export function createEmptyArtStructureWork(
  category: ArtStructureCategoryId = "drawing"
): ArtStructureWork {
  return {
    id: generateItemId("as"),
    title: "",
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
    works: [],
  };
}

export function createEmptyAnimation(): AnimationItem {
  return {
    id: generateItemId("anim"),
    title: "",
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

/** Keeps every saved item — only fills missing ids, never deletes or caps count. */
export function normalizePortfolio(data: PortfolioData): PortfolioData {
  const artStructure = data.artStructure ?? createEmptyArtStructure();

  return {
    ...data,
    slug: data.slug ?? "mine",
    name: data.name ?? "",
    subtitle: data.subtitle ?? "",
    accent: data.accent ?? "#ff6b4a",
    coverImage: data.coverImage ?? "",
    works: (data.works ?? []).map((w) => ({
      ...createEmptyWork(),
      ...w,
      id: w.id || generateItemId("work"),
    })),
    animations: (data.animations ?? []).map((a) => ({
      ...createEmptyAnimation(),
      ...a,
      id: a.id || generateItemId("anim"),
      progress: {
        ...createEmptyAnimation().progress!,
        ...a.progress,
      },
    })),
    artStructure: {
      portfolioTitle:
        artStructure.portfolioTitle ?? "Art Structure Portfolio",
      coverImage: artStructure.coverImage ?? "",
      works: (artStructure.works ?? []).map((w) => ({
        ...createEmptyArtStructureWork(w.category),
        ...w,
        id: w.id || generateItemId("as"),
      })),
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

export { ART_STRUCTURE_MIN_ARTWORKS, ARTIST_STATEMENTS_REQUIRED };
