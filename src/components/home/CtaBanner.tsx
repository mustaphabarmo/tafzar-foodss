import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 text-white sm:py-24">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80"
          alt="Delicious Cake"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
      </div>

      <div className="container-tight relative z-10 text-center space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
          <Sparkles className="h-4 w-4" /> Ready for your next celebration?
        </div>

        <h2 className="font-display text-3xl font-black sm:text-5xl leading-tight">
          Let’s Make Your Event Unforgettable with Tafzar Foods.
        </h2>

        <p className="text-base text-white/80 sm:text-lg leading-relaxed max-w-xl mx-auto">
          Whether you need a custom celebration cake, small chops platter, or corporate catering package, we are ready to deliver excellence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-8 py-4 text-base font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-105 active:scale-95"
          >
            Explore Menu <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            Request Custom Order
          </Link>
        </div>
      </div>
    </section>
  );
}
