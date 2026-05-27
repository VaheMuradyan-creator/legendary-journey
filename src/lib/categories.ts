export const WORK_CATEGORIES = [
  {
    id: "character-design",
    title: "Character Design",
    subtitle: "Original characters, model sheets, and character cards.",
  },
  {
    id: "drawing-painting",
    title: "Drawing & Painting",
    subtitle: "Life drawing, sketches, ink, and painterly work.",
  },
  {
    id: "backgrounds-props",
    title: "Backgrounds & Props",
    subtitle: "Environments, sets, and props.",
  },
  {
    id: "digital-illustration",
    title: "Digital Illustration",
    subtitle: "Posters, concept art, comics, and pitch work.",
  },
  {
    id: "more-work",
    title: "More Original Work",
    subtitle: "Additional pieces — sketch sheets count as one example.",
  },
] as const;

export type WorkCategoryId = (typeof WORK_CATEGORIES)[number]["id"];
