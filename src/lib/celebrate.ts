/** Lazy-loaded confetti burst; no-ops during SSR. */
export async function celebrate() {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#F97316", "#FACC15", "#EC4899", "#22C55E", "#38BDF8"];

  confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors, scalar: 0.9 });
  window.setTimeout(
    () => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors }),
    180,
  );
  window.setTimeout(
    () => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors }),
    320,
  );
}
