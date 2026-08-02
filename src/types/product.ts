export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  tags: string[];
  featured: boolean;
  available: boolean;
  minOrder?: number;
  servings?: string;
  leadTimeDays?: number;
}

export type ProductCategory =
  | "signature-collection"
  | "curated-combos";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "signature-collection": "Signature Collection",
  "curated-combos": "Curated Combos",
};

export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  "signature-collection": "bg-blue-100 text-blue-900",
  "curated-combos": "bg-primary/10 text-primary",
};
