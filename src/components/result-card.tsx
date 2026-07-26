import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, PartyPopper, Ticket } from "lucide-react";
import type { Prize } from "@/config/prizes";
import type { SpinRecord } from "@/lib/spin-storage";

interface ResultCardProps {
  record: SpinRecord;
  prize: Prize | null;
  alreadyPlayed: boolean;
  onClaim: () => void;
}

export function ResultCard({ record, prize, alreadyPlayed, onClaim }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyCode = async () => {
    if (!record.claimCode) return;
    try {
      await navigator.clipboard.writeText(record.claimCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      aria-live="polite"
      className="mx-auto w-full max-w-md rounded-[2rem] border border-border/60 bg-card/90 p-6 text-center shadow-[var(--shadow-card)] backdrop-blur"
    >
      {alreadyPlayed && (
        <p className="mb-3 rounded-full bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          You have already used your spin
        </p>
      )}

      <p className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
        <PartyPopper aria-hidden="true" className="h-4 w-4 text-accent" />
        {record.isLoss ? "So close!" : "Congratulations!"}
      </p>

      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground">
        {record.prizeLabel}
      </h2>
      {prize?.description && (
        <p className="mt-1 text-sm text-muted-foreground">{prize.description}</p>
      )}

      {record.claimCode ? (
        <>
          <div className="mt-6 rounded-2xl bg-[image:var(--gradient-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Your claim code
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-[0.15em] text-foreground">
              {record.claimCode}
            </p>
            <button
              type="button"
              onClick={copyCode}
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? "Copied!" : "Copy code"}
            </button>
          </div>

          <motion.button
            type="button"
            onClick={onClaim}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={Boolean(record.claimedAt)}
            className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 font-display text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:opacity-70"
          >
            <Ticket className="h-5 w-5" aria-hidden="true" />
            {record.claimedAt ? "Prize marked as claimed" : "Claim prize"}
          </motion.button>
          <p className="mt-3 text-xs text-muted-foreground">
            Show this code at the Tafzar Foods stand to redeem your prize.
          </p>
        </>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">
          No prize this time — visit our stand for a taste anyway!
        </p>
      )}
    </motion.section>
  );
}
