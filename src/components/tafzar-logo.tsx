import { brand } from "@/config/prizes";

/** Placeholder Tafzar Foods mark — swap the SVG for the real logo later. */
export function TafzarLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" role="presentation">
            <path
              d="M12 2.8c3.6 1.9 5.6 4.7 5.6 8.1a5.6 5.6 0 1 1-11.2 0c0-1.6.5-2.9 1.5-4 .2 1.4.9 2.3 2 2.7-.5-2.9.2-5.1 2.1-6.8Z"
              fill="oklch(0.99 0.02 90)"
            />
          </svg>
        </span>
        <span className="text-left leading-tight">
          <span className="block font-display text-lg font-bold tracking-tight text-foreground">
            {brand.company}
          </span>
          <span className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {brand.appName}
          </span>
        </span>
      </div>
    </div>
  );
}
