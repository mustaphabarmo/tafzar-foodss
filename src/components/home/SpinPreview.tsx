import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, Gift, ArrowRight } from "lucide-react";

export function SpinPreview() {
  return (
    <section className="section-py bg-muted/30 relative overflow-hidden border-t border-border/50">
      <div className="container-tight">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-brand)] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Background decorative circles */}
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden="true" className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Text side */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white">
                <Gift className="h-4 w-4" /> Exclusive Reward Game
              </div>

              <h2 className="font-display text-3xl font-black sm:text-5xl leading-tight">
                Spin the Wheel &amp; Win Instant Treats!
              </h2>

              <p className="text-base text-white/90 sm:text-lg leading-relaxed max-w-lg">
                Every visitor gets one spin for a chance to win discount coupons, free Brownies, free Glazed Puffs, mystery gifts, and buy-1-get-1 offers on your order!
              </p>

              <div className="pt-2">
                <Link
                  to="/spin"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-foreground shadow-lg transition-all hover:bg-amber-100 hover:scale-105 active:scale-95"
                >
                  🎡 Play Spin &amp; Win Now <ArrowRight className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>

            {/* Wheel Illustration side */}
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="relative grid h-64 w-64 place-items-center rounded-full border-8 border-white/30 bg-white/10 backdrop-blur-md shadow-2xl sm:h-80 sm:w-80"
              >
                <div className="text-center font-display font-black text-white space-y-1">
                  <span className="block text-4xl sm:text-6xl">🎁</span>
                  <span className="block text-xs uppercase tracking-widest opacity-80">
                    Spin to Win
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
