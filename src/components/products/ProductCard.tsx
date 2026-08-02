import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Clock, Users, X, Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/types/product";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginal = product.originalPrice
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-product)]",
          className
        )}
      >
        {/* Image wrapper */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badge */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-sm",
                CATEGORY_COLORS[product.category]
              )}
            >
              {CATEGORY_LABELS[product.category]}
            </span>
            {product.originalPrice && (
              <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                SALE
              </span>
            )}
          </div>

          {/* Quick view trigger button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 text-xs font-bold text-foreground backdrop-blur-md shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Eye className="h-4 w-4 text-primary" /> Quick View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
              {product.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          </div>

          {/* Footer info */}
          <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-extrabold text-foreground sm:text-xl">
                {formattedPrice}
              </span>
              {formattedOriginal && (
                <span className="text-xs text-muted-foreground line-through">
                  {formattedOriginal}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Details
            </button>
          </div>
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <ProductDetailModal product={product} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const images = [product.image, ...(product.gallery || [])];

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(product.price);

  const waOrderUrl = `https://wa.me/${company.whatsapp.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(
    `Hello Tafzar Foods! I'm interested in ordering: *${product.name}* (${formattedPrice}). Could you provide more details?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-foreground/40 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur-md transition-colors hover:bg-background"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Images Section */}
          <div className="space-y-3 bg-muted/40 p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                      selectedImage === img
                        ? "border-primary shadow-sm"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <span
                className={cn(
                  "inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider",
                  CATEGORY_COLORS[product.category]
                )}
              >
                {CATEGORY_LABELS[product.category]}
              </span>

              <h2 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                {product.name}
              </h2>

              <div className="font-display text-2xl font-black text-primary">
                {formattedPrice}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                {product.servings && (
                  <div className="flex items-center gap-2 rounded-xl bg-muted/60 p-3">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <span className="block font-semibold text-foreground">Servings</span>
                      <span className="text-muted-foreground">{product.servings}</span>
                    </div>
                  </div>
                )}
                {product.leadTimeDays && (
                  <div className="flex items-center gap-2 rounded-xl bg-muted/60 p-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <span className="block font-semibold text-foreground">Notice Required</span>
                      <span className="text-muted-foreground">{product.leadTimeDays} days advance</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <Check className="h-4 w-4" /> Available for custom order
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-border">
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-6 py-3.5 text-center text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" /> Order via WhatsApp
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-2xl border border-border py-3 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
