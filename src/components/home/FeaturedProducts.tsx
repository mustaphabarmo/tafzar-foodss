import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { featuredProducts } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  return (
    <section className="section-py bg-background">
      <div className="container-tight space-y-12">
        <SectionHeading
          label="Our Bestsellers"
          title="Crafted to Perfection"
          titleHighlight="Perfection."
          subtitle="Discover our most loved bakes — from Glazed Puffs and Golden Bites to our full Signature Collection."
        />

        {/* Grid layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all hover:bg-muted hover:scale-105 active:scale-95"
          >
            Explore Full Menu <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
