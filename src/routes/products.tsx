import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { Search, Filter, RefreshCw, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Menu — Tafzar Foods" },
      {
        name: "description",
        content:
          "Browse our full menu of celebration cakes, birthday cakes, small chops platters, cupcakes, and desserts.",
      },
    ],
  }),
  component: ProductsPage,
});

const CATEGORIES: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "signature-collection", label: "Signature Collection" },
  { id: "curated-combos", label: "Curated Combos" },
];

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProductCategory>("all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCat = selectedCategory === "all" || p.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  return (
    <main className="min-h-screen pt-24 bg-background pb-20">
      {/* Header Banner */}
      <section className="bg-card border-b border-border/50 py-12 sm:py-16">
        <div className="container-tight text-center space-y-4">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Artisanal Food Catalogue
          </span>
          <h1 className="font-display text-4xl font-black text-foreground sm:text-5xl">
            Our Menu &amp; Products
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Explore our handcrafted cakes, party small chops, gourmet cupcakes, and catering packages.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[var(--nav-height)] z-30 bg-card/90 backdrop-blur-md border-b border-border/50 py-4 shadow-sm">
        <div className="container-tight space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cakes, snacks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-semibold text-muted-foreground">
              Showing <span className="text-foreground font-bold">{filteredProducts.length}</span> items
            </div>
          </div>

          {/* Category Chips Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all",
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container-tight py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <span className="text-6xl">🍰</span>
            <h3 className="font-display text-2xl font-bold text-foreground">No Products Found</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              We couldn't find any items matching your filter or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-sm"
            >
              <RefreshCw className="h-4 w-4" /> Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
