import { SectionHeading } from "@/components/common/SectionHeading";
import { galleryImages } from "@/data/gallery";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye } from "lucide-react";
import { motion } from "motion/react";

export function GalleryPreview() {
  const previewImages = galleryImages.slice(0, 6);

  return (
    <section className="section-py bg-background">
      <div className="container-tight space-y-12">
        <SectionHeading
          label="Visual Feast"
          title="A Glimpse Into Our Kitchen"
          titleHighlight="Kitchen"
          subtitle="Explore some of our recent custom cakes, event setups, and artisanal creations."
        />

        {/* Masonry-like grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {previewImages.map((img, idx) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  {img.category}
                </span>
                <h3 className="font-display text-lg font-bold">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all hover:bg-muted hover:scale-105 active:scale-95"
          >
            View Full Photo Gallery <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
