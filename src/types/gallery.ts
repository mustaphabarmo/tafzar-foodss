export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  category: GalleryCategory;
  width: number;
  height: number;
  featured?: boolean;
}

export type GalleryCategory =
  | "all"
  | "cakes"
  | "events"
  | "snacks"
  | "desserts"
  | "behind-the-scenes"
  | "trade-fair";

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  all: "All",
  cakes: "Cakes",
  events: "Events",
  snacks: "Snacks",
  desserts: "Desserts",
  "behind-the-scenes": "Behind the Scenes",
  "trade-fair": "Trade Fair",
};
