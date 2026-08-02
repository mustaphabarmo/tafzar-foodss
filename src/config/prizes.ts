/**
 * Prize configuration for Tafzar Foods Spin Wheel.
 * Slices are updated to reflect authentic Tafzar menu items & offers.
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
  { id: "brownie", label: "Free Brownie", weight: 12, description: "Rich & fudgy signature Brownie." },
  { id: "golden-bites", label: "Free Golden Bites", weight: 10, description: "3 pcs of crispy golden goodness." },
  { id: "glazed-puffs", label: "Free Glazed Puffs", weight: 8, description: "6 pcs of sweet vanilla glazed puffs." },
  { id: "bogo", label: "Buy 1 Get 1 Free", weight: 8, description: "On any signature item." },
  { id: "mystery", label: "Mystery Gift", weight: 6, description: "Special surprise treat from Tafzar Foods!" },
  { id: "none", label: "Try Again", weight: 10, isLoss: true },
];

/** Branding shown across the app. */
export const brand = {
  appName: "Tafzar Spin",
  company: "Tafzar Foods",
  claimCodePrefix: "TFZ",
} as const;
