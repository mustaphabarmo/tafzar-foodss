import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const item = testimonials[current];

  return (
    <section className="section-py bg-card relative overflow-hidden border-y border-border/50">
      <div className="container-tight space-y-12">
        <SectionHeading
          label="Testimonials"
          title="Loved by Students Across"
          titleHighlight="ABU Zaria"
          subtitle="Here's what students from the halls of Ahmadu Bello University have to say about Tafzar Foods."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Decorative quote icon */}
          <div className="absolute -left-6 -top-10 text-primary/10 select-none">
            <Quote className="h-32 w-32" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center text-center space-y-6 rounded-3xl border border-border/60 bg-background p-8 sm:p-12 shadow-lg"
            >
              {/* Star Rating */}
              <div className="flex gap-1 text-primary">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-display text-lg font-medium italic text-foreground sm:text-xl leading-relaxed max-w-2xl">
                "{item.review}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-2">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-tr ${item.avatarColor} text-white font-bold text-sm shadow-md`}
                >
                  {item.avatarInitials}
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.location} • <span className="text-primary font-semibold">{item.product}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm transition-transform hover:scale-110 active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${current === idx ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                    }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm transition-transform hover:scale-110 active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
