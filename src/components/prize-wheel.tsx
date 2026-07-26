import { motion } from "motion/react";
import { prizes } from "@/config/prizes";

const SIZE = 400;
const R = 190;
const CENTER = SIZE / 2;

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(a), y: CENTER + radius * Math.sin(a) };
}

function slicePath(start: number, end: number) {
  const s = polar(start, R);
  const e = polar(end, R);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${s.x} ${s.y} A ${R} ${R} 0 ${largeArc} 1 ${e.x} ${e.y} Z`;
}

interface PrizeWheelProps {
  rotation: number;
  spinning: boolean;
  disabled: boolean;
  onSpin: () => void;
  onSpinEnd: () => void;
}

export function PrizeWheel({ rotation, spinning, disabled, onSpin, onSpinEnd }: PrizeWheelProps) {
  const slice = 360 / prizes.length;

  return (
    <div className="relative mx-auto w-full max-w-[min(88vw,26rem)]">
      {/* Pointer */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-0.4rem] z-20 -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
      >
        <svg width="34" height="42" viewBox="0 0 34 42">
          <path d="M17 42 2 12a15 15 0 1 1 30 0Z" fill="var(--wheel-pointer)" />
          <circle cx="17" cy="14" r="5" fill="var(--wheel-pointer-dot)" />
        </svg>
      </div>

      <div className="relative aspect-square rounded-full bg-[image:var(--gradient-rim)] p-[3.5%] shadow-[var(--shadow-wheel)]">
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full rounded-full"
          role="img"
          aria-label={`Prize wheel with ${prizes.length} prizes`}
          initial={false}
          animate={{ rotate: spinning ? [null, rotation + 6, rotation] : rotation }}
          transition={
            spinning
              ? { duration: 5.2, times: [0, 0.93, 1], ease: [0.15, 0.75, 0.16, 1] }
              : { duration: 0 }
          }
          onAnimationComplete={() => spinning && onSpinEnd()}
          style={{ willChange: "transform" }}
        >
          {prizes.map((prize, i) => {
            const start = i * slice;
            const mid = start + slice / 2;
            const label = polar(mid, R * 0.62);
            return (
              <g key={prize.id}>
                <path
                  d={slicePath(start, start + slice)}
                  fill={`var(--wheel-${i % 5})`}
                  stroke="oklch(1 0 0 / 45%)"
                  strokeWidth={1.5}
                />
                <text
                  x={label.x}
                  y={label.y}
                  transform={`rotate(${mid} ${label.x} ${label.y})`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-display"
                  fill="var(--wheel-label)"
                  fontSize={prize.label.length > 16 ? 15 : 17}
                  fontWeight={700}
                >
                  {prize.label.length > 18 ? `${prize.label.slice(0, 17)}…` : prize.label}
                </text>
              </g>
            );
          })}
          <circle cx={CENTER} cy={CENTER} r={R} fill="none" stroke="oklch(1 0 0 / 60%)" strokeWidth={4} />
        </motion.svg>

        {/* Center SPIN button */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.button
            type="button"
            onClick={onSpin}
            disabled={disabled}
            aria-label={disabled ? "Spin used" : "Spin the prize wheel"}
            className="grid h-[26%] min-h-20 w-[26%] min-w-20 place-items-center rounded-full bg-[image:var(--gradient-brand)] font-display text-base font-extrabold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] ring-4 ring-[oklch(1_0_0/80%)] outline-none transition-opacity focus-visible:ring-8 focus-visible:ring-ring disabled:opacity-70"
            whileHover={disabled ? undefined : { scale: 1.06 }}
            whileTap={disabled ? undefined : { scale: 0.93 }}
            animate={!disabled ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={
              !disabled
                ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          >
            {spinning ? "…" : "Spin"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
