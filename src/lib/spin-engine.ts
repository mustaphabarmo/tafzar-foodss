import { prizes, type Prize } from "@/config/prizes";

/**
 * Pure spin logic — deliberately UI-free so it can be moved server-side
 * (Supabase / Firebase / Postgres) without touching any component.
 */

export interface SpinResult {
  prize: Prize;
  /** Index of the winning slice in the `prizes` array. */
  index: number;
}

function random(): number {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] / 2 ** 32;
  }
  return Math.random();
}

/** Picks a prize using the configured weighted probabilities. */
export function drawPrize(pool: Prize[] = prizes): SpinResult {
  const total = pool.reduce((sum, p) => sum + Math.max(0, p.weight), 0);
  let ticket = random() * total;

  for (let i = 0; i < pool.length; i += 1) {
    ticket -= Math.max(0, pool[i].weight);
    if (ticket <= 0) return { prize: pool[i], index: i };
  }
  return { prize: pool[pool.length - 1], index: pool.length - 1 };
}

/**
 * Final wheel rotation (degrees) that lands the winning slice under the
 * pointer at the top, with a little randomness inside the slice.
 */
export function rotationForIndex(index: number, sliceCount: number, turns = 6): number {
  const sliceAngle = 360 / sliceCount;
  const sliceCenter = index * sliceAngle + sliceAngle / 2;
  const jitter = (random() - 0.5) * sliceAngle * 0.6;
  return turns * 360 + (360 - sliceCenter) - jitter;
}
