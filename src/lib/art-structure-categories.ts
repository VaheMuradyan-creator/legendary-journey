/** Group artworks by material or theme (Art Structure class). */
export const ART_STRUCTURE_CATEGORIES = [
  {
    id: "drawing",
    title: "Drawing",
    subtitle: "Graphite, charcoal, ink, and pencil work.",
  },
  {
    id: "painting",
    title: "Painting",
    subtitle: "Acrylic, watercolor, oil, and painted surfaces.",
  },
  {
    id: "mixed-media",
    title: "Mixed Media",
    subtitle: "Combined materials and experimental pieces.",
  },
  {
    id: "digital",
    title: "Digital Art",
    subtitle: "Digital illustration, painting, and design.",
  },
  {
    id: "sculpture-3d",
    title: "Sculpture & 3D",
    subtitle: "Sculpture, ceramics, and three-dimensional work.",
  },
  {
    id: "sketchbook-process",
    title: "Sketchbook & Process",
    subtitle: "Sketchbook pages, works in progress, and studio process.",
  },
  {
    id: "other",
    title: "Other",
    subtitle: "Additional themes or materials.",
  },
] as const;

export type ArtStructureCategoryId =
  (typeof ART_STRUCTURE_CATEGORIES)[number]["id"];

export const ART_STRUCTURE_MIN_ARTWORKS = 7;
export const ARTIST_STATEMENTS_REQUIRED = 4;
