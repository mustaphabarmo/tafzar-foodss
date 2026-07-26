/**
 * Prize configuration.
 *
 * Edit freely: the wheel renders one slice per entry and the spin engine
 * respects `weight` (relative probability). No wheel logic changes needed.
 */
export interface Prize {
  /** Unique, stable id — used for storage and future backend syncing. */
  id: string;
  /** Text shown on the wheel slice and on the win card. */
  label: string;
  /** Relative probability weight. Higher = more likely. */
  weight: number;
  /** Optional short line shown under the prize on the win card. */
  description?: string;
  /** Set true for non-winning outcomes (skips confetti + claim code). */
  isLoss?: boolean;
}

export const prizes: Prize[] = [
  { id: "disc-5", label: "5% Discount", weight: 20, description: "On your next Tafzar order." },
  { id: "disc-10", label: "10% Discount", weight: 16, description: "On your next Tafzar order." },
  { id: "disc-15", label: "15% Discount", weight: 10, description: "On your next Tafzar order." },
  { id: "disc-20", label: "20% Discount", weight: 5, description: "On your next Tafzar order." },
  { id: "cupcake", label: "Free Cupcake", weight: 8, description: "Freshly baked, on the house." },
  { id: "bread", label: "Free Bread", weight: 8, description: "One loaf of your choice." },
  { id: "cookies", label: "Free Cookies", weight: 8, description: "A pack of our classics." },
  { id: "bogo", label: "Buy 1 Get 1 Free", weight: 6, description: "On any single item." },
  { id: "mystery", label: "Mystery Gift", weight: 4, description: "Collect it at our stand!" },
  { id: "none", label: "Try Again Next Time", weight: 15, isLoss: true },
];

/** Branding shown across the app. */
export const brand = {
  appName: "Tafzar Spin",
  company: "Tafzar Foods",
  claimCodePrefix: "TFZ",
} as const;
