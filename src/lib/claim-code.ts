import { brand } from "@/config/prizes";

// Unambiguous alphabet (no 0/O/1/I) so codes are easy to read out loud.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Generates a claim code such as `TFZ-8H4P2A`.
 * Swap this for a server-issued code when a backend is added.
 */
export function generateClaimCode(length = 6): string {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  const body = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `${brand.claimCodePrefix}-${body}`;
}
