/**
 * Device-level persistence for the "one spin per device" rule.
 * Storage is isolated here so a backend check can replace/augment it later.
 */

export interface SpinRecord {
  prizeId: string;
  prizeLabel: string;
  claimCode: string | null;
  isLoss: boolean;
  spunAt: string;
  claimedAt?: string | null;
}

const KEY = "tafzar-spin:v1";

export function readSpinRecord(): SpinRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SpinRecord;
    return parsed && typeof parsed.prizeId === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function writeSpinRecord(record: SpinRecord): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable (private mode) — spin still works for this session */
  }
}

export function markClaimed(): SpinRecord | null {
  const current = readSpinRecord();
  if (!current) return null;
  const next = { ...current, claimedAt: new Date().toISOString() };
  writeSpinRecord(next);
  return next;
}
