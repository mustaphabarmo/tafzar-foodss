import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { SpinPreview } from "@/components/home/SpinPreview";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Newsletter } from "@/components/home/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tafzar Foods — Premium Bakery & Catering in Kaduna" },
      {
        name: "description",
        content:
          "Freshly made cakes, small chops, desserts and treats crafted with quality ingredients for every occasion.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TrustSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
      <SpinPreview />
      <CtaBanner />
      <Newsletter />
    </main>
  );
}
