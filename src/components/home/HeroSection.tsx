import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { company } from "@/data/company";

const HERO_SLIDES = [
  {
    image: "/images/package2.jpeg",
    title: "Taste the Magic.",
    highlight: "Magic.",
    subtitle:
      "Freshly baked signature treats, curated combos, and delicious bites crafted with care for every occasion.",
    tag: "Freshly Baked Daily",
  },
  {
    image: "/images/glazed-puff.jpeg",
    title: "Crafted for Every",
    highlight: "Celebration.",
    subtitle:
      "From our iconic Glazed Puffs to full combo packages — every bite is a reason to celebrate.",
    tag: "Signature Glazed Puffs",
  },
  {
    image: "/images/shala-fritters.jpeg",
    title: "Flavours Worth",
    highlight: "Sharing.",
    subtitle:
      "Crispy, golden fritters and signature bakes freshly prepared for every craving and gathering.",
    tag: "Golden Bites & Fritters",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden flex items-center bg-foreground text-white">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover hero-ken-burns opacity-40"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Decorative Elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="float-blob absolute top-1/4 left-10 text-4xl opacity-40 blur-[1px]">🧁</div>
        <div className="float-blob absolute bottom-1/3 right-16 text-5xl opacity-40 blur-[1px]" style={{ animationDelay: "2s" }}>✨</div>
        <div className="float-blob absolute top-1/3 right-1/4 text-3xl opacity-30 blur-[1px]" style={{ animationDelay: "4s" }}>🍰</div>
      </div>

      {/* Content Container */}
      <div className="container-tight relative z-20 pt-28 pb-20 lg:pt-36 lg:pb-32">
        <div className="max-w-2xl space-y-6 sm:space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                  {slide.tag}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                {slide.title.replace(slide.highlight, "")}{" "}
                <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-white bg-clip-text text-transparent">
                  {slide.highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base text-white/80 sm:text-xl leading-relaxed max-w-xl font-normal">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-7 py-4 text-base font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-105 active:scale-95"
            >
              Explore Products <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/spin"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
            >
              🎡 Spin & Win
            </Link>
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="mt-12 flex items-center gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentSlide === idx ? "w-10 bg-sky-300" : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
