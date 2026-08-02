import { brand } from "@/config/prizes";

export function TafzarLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 shadow-[var(--shadow-glow)]">
          <img
            src="/images/logo.jpeg"
            alt={`${brand.company} logo`}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-left leading-tight">
          <span className="block font-display text-lg font-bold tracking-tight text-foreground">
            {brand.company}
          </span>
          <span className="block text-xs font-medium uppercase tracking-[0.18em] text-primary">
            ...taste the magic...
          </span>
        </span>
      </div>
    </div>
  );
}
