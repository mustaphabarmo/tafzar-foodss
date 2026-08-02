import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { brand } from "@/config/prizes";
import { PrizeWheel } from "@/components/prize-wheel";
import { ResultCard } from "@/components/result-card";
import { useSpinSession } from "@/hooks/use-spin-session";
import { celebrate } from "@/lib/celebrate";
import { Sparkles, Trophy, HelpCircle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/spin")({
  head: () => ({
    meta: [
      { title: "Spin & Win — Tafzar Foods Rewards" },
      {
        name: "description",
        content:
          "Spin the Tafzar Foods prize wheel and instantly win discounts, free cupcakes, mystery treats, and special rewards.",
      },
    ],
  }),
  component: SpinPage,
});

const MOCK_WINNERS = [
  { name: "Aisha M. (Queen Amina)", prize: "15% Discount", code: "TFZ-8492", date: "Just now" },
  { name: "Abdullahi Y. (Danfodio)", prize: "Free Brownie", code: "TFZ-3910", date: "2 mins ago" },
  { name: "Zainab I. (Umar Sulaiman)", prize: "10% Discount", code: "TFZ-7712", date: "15 mins ago" },
  { name: "Ibrahim G. (Dangote)", prize: "Buy 1 Get 1 Free", code: "TFZ-9921", date: "1 hour ago" },
];

function SpinPage() {
  const { status, record, prize, rotation, alreadyPlayed, spin, finishSpin, claim } =
    useSpinSession();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hasSubmittedDetails, setHasSubmittedDetails] = useState(false);

  const showResult = status === "done" && record !== null;

  useEffect(() => {
    if (status === "done" && record && !record.isLoss && !alreadyPlayed) void celebrate();
  }, [status, record, alreadyPlayed]);

  const handleStartSpin = () => {
    if (!hasSubmittedDetails && !alreadyPlayed) {
      if (!name.trim()) {
        alert("Please enter your name first!");
        return;
      }
      setHasSubmittedDetails(true);
    }
    spin();
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 bg-background overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-page)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="container-tight relative z-10 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" /> Official Brand Rewards Game
          </div>

          <h1 className="font-display text-4xl font-black text-foreground sm:text-6xl">
            Spin &amp; Win Rewards
          </h1>

          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            Welcome to {brand.company}! Spin our official prize wheel to claim discount vouchers, free baked treats, and exclusive event gifts.
          </p>
        </div>

        {/* Rules Card & Form */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Rules */}
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" /> Game Rules &amp; Information
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>One spin allowed per visitor per session.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Winning claim codes are valid for 24 hours on all Tafzar orders.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Prizes can be redeemed via WhatsApp or directly at our bakery.</span>
              </li>
            </ul>
          </div>

          {/* User Form if not spun */}
          {!alreadyPlayed && !hasSubmittedDetails && (
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
              <div className="font-display text-base font-bold text-foreground">
                Enter Details to Unlock Spin
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chisom Okeke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prize Wheel Area */}
        <div className="flex flex-col items-center gap-8 py-4">
          <PrizeWheel
            rotation={rotation}
            spinning={status === "spinning"}
            disabled={status !== "ready" || alreadyPlayed}
            onSpin={handleStartSpin}
            onSpinEnd={finishSpin}
          />

          {alreadyPlayed && (
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              You have used your spin for this session!
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
        </div>

        {/* Live Winners Feed */}
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Trophy className="h-5 w-5 text-primary" /> Recent Winners
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_WINNERS.map((w, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-2xl bg-muted/40 p-3.5 border border-border/40 text-xs"
              >
                <div>
                  <span className="block font-bold text-foreground">{w.name}</span>
                  <span className="text-primary font-semibold">{w.prize}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{w.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
