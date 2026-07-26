import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { brand } from "@/config/prizes";
import { TafzarLogo } from "@/components/tafzar-logo";
import { PrizeWheel } from "@/components/prize-wheel";
import { ResultCard } from "@/components/result-card";
import { useSpinSession } from "@/hooks/use-spin-session";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tafzar Spin — Spin & Win with Tafzar Foods" },
      {
        name: "description",
        content:
          "Scan, spin the Tafzar Foods prize wheel and instantly win discounts, free treats and special rewards. One spin per visitor.",
      },
      { property: "og:title", content: "Tafzar Spin — Spin & Win with Tafzar Foods" },
      {
        property: "og:description",
        content: "Spin the Tafzar Foods wheel for discounts, free treats and mystery gifts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpinPage,
});

function SpinPage() {
  const { status, record, prize, rotation, alreadyPlayed, spin, finishSpin, claim } =
    useSpinSession();

  const showResult = status === "done" && record !== null;

  useEffect(() => {
    if (status === "done" && record && !record.isLoss && !alreadyPlayed) void celebrate();
  }, [status, record, alreadyPlayed]);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-page)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-5 py-8 sm:py-12"
      >
        <TafzarLogo />

        <header className="text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Spin &amp; Win
          </h1>
          <p className="mx-auto mt-3 max-w-md text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Welcome to {brand.company}! Spin the wheel for a chance to win exciting discounts, free
            treats, and special rewards.
          </p>
        </header>

        <PrizeWheel
          rotation={rotation}
          spinning={status === "spinning"}
          disabled={status !== "ready"}
          onSpin={spin}
          onSpinEnd={finishSpin}
        />

        {status === "ready" && (
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            One spin per visitor
          </p>
        )}

        {showResult && (
          <ResultCard
            record={record}
            prize={prize}
            alreadyPlayed={alreadyPlayed}
            onClaim={claim}
          />
        )}

        <footer className="pb-2 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {brand.company}. Prizes subject to availability.
        </footer>
      </motion.div>
    </main>
  );
}
