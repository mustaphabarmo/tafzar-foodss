import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { galleryImages } from "@/data/gallery";
import type { GalleryCategory, GalleryImage } from "@/types/gallery";
import { GALLERY_CATEGORY_LABELS } from "@/types/gallery";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — Tafzar Foods" },
      {
        name: "description",
        content:
          "Explore our food photography gallery featuring celebration cakes, dessert tables, small chops, and trade fair highlights.",
      },
    ],
  }),
  component: GalleryPage,
});

const CATEGORIES: GalleryCategory[] = [
  "all",
  "cakes",
  "events",
  "snacks",
  "desserts",
  "behind-the-scenes",
  "trade-fair",
];

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <main className="min-h-screen pt-24 bg-background pb-20">
      {/* Header Banner */}
      <section className="bg-card border-b border-border/50 py-12 sm:py-16 text-center space-y-4">
        <div className="container-tight">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Visual Showcase
          </span>
          <h1 className="font-display text-4xl font-black text-foreground sm:text-5xl">
            Food Photography Gallery
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Take a look at our finest cake creations, catering setups, and behind-the-scenes moments.
          </p>
        </div>
      </section>

      {/* Category Chips */}
      <section className="sticky top-[var(--nav-height)] z-30 bg-card/90 backdrop-blur-md border-b border-border/50 py-4 shadow-sm">
        <div className="container-tight flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all",
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {GALLERY_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container-tight py-12">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer aspect-square overflow-hidden rounded-3xl bg-muted shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {GALLERY_CATEGORY_LABELS[img.category]}
                </span>
                <h3 className="font-display text-base font-bold">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 flex flex-col items-center max-w-4xl max-h-[90vh] w-full"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 z-20 text-white hover:text-amber-400 p-2"
                aria-label="Close lightbox"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl bg-black max-h-[70vh] w-full flex items-center justify-center">
                <img
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center text-white space-y-1">
                <h3 className="font-display text-xl font-bold">
                  {filteredImages[lightboxIndex].title}
                </h3>
                <p className="text-xs text-white/70">
                  {filteredImages[lightboxIndex].caption || filteredImages[lightboxIndex].alt}
                </p>
              </div>

              {/* Navigation Controls */}
              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-2 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-2 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
