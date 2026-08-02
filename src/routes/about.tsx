import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/common/SectionHeading";
import { company } from "@/data/company";
import { ScrollReveal, StaggerContainer, staggerChild } from "@/components/common/ScrollReveal";
import { motion } from "motion/react";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Tafzar Foods" },
      {
        name: "description",
        content:
          "Discover the story, mission, and values behind Tafzar Foods — Nigeria's freshly baked signature treats.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen pt-24 bg-background">
      {/* Hero */}
      <section className="relative bg-foreground py-20 text-white sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/menu-front.jpeg"
            alt="Tafzar Foods"
            className="h-full w-full object-cover opacity-30 hero-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container-tight relative z-10 space-y-4 max-w-3xl">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300 backdrop-blur-md">
            Our Heritage &amp; Passion
          </span>
          <h1 className="font-display text-4xl font-black sm:text-6xl leading-tight">
            About Tafzar Foods
          </h1>
          <p className="text-base text-white/80 sm:text-xl leading-relaxed italic">
            A passion for creating delicious moments through quality food, beautiful presentation, and exceptional service.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-py bg-card">
        <div className="container-tight grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image Left */}
          <ScrollReveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-xl">
              <img
                src="/images/orders.jpeg"
                alt="Tafzar Foods Products"
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Text Right */}
          <ScrollReveal direction="left" className="space-y-6">
            <SectionHeading
              label="Our Journey"
              title="How Tafzar Foods Started"
              titleHighlight="Started"
              align="left"
            />
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Tafzar Foods began from a passion for creating delicious, beautifully prepared food that brings people together. What started as a small venture during university days at Ahmadu Bello University, Zaria, has grown through dedication, consistency, and the support of satisfied customers.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Serving customers across Zaria and Kaduna, Tafzar Foods has built its reputation by focusing on quality ingredients, careful preparation, and exceptional presentation. Whether it's cakes, snacks, desserts, or catering for special occasions, every order is prepared with attention to detail and a commitment to creating memorable experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              As Tafzar Foods continues to grow, our mission remains the same: to deliver food that delights our customers and truly lives up to our promise to <em className="text-primary font-semibold not-italic">Taste the Magic.</em>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-py bg-muted/40 border-y border-border/50">
        <div className="container-tight space-y-12">
          <SectionHeading
            label="Our Purpose"
            title="Driven by Excellence"
            titleHighlight="Excellence"
          />

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Mission */}
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">{company.mission}</p>
            </div>

            {/* Vision */}
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">{company.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section-py bg-background">
        <div className="container-tight space-y-12">
          <SectionHeading
            label="Core Principles"
            title="Our Values"
            titleHighlight="Values"
          />

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {company.values.map((v) => (
              <motion.div
                key={v.id}
                variants={staggerChild}
                className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-3"
              >
                <div className="text-4xl">{v.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-t border-border/50 py-16 text-center">
        <div className="container-tight space-y-6">
          <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl">
            Want to Order or Partner with Us?
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-8 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow)]"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
