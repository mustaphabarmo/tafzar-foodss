import { ScrollReveal, StaggerContainer, staggerChild } from "@/components/common/ScrollReveal";
import { motion } from "motion/react";
import { Sparkles, ShieldCheck, HeartHandshake, Zap, Award, Sparkle } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Sparkles,
    title: "Fresh Ingredients",
    description: "100% natural, premium grade ingredients sourced daily.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Artisanal craftsmanship and attention to detail in every bite.",
  },
  {
    icon: HeartHandshake,
    title: "Made with Care",
    description: "Baked with love by passionate patissiers and chefs.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Quick quotes and seamless ordering via WhatsApp & web.",
  },
  {
    icon: Sparkle,
    title: "Custom Orders",
    description: "Tailored cake designs and custom catering packages.",
  },
  {
    icon: ShieldCheck,
    title: "High Hygiene Standards",
    description: "Pristine kitchen facilities and strict safety protocols.",
  },
];

export function TrustSection() {
  return (
    <section className="relative bg-card py-12 sm:py-16 border-y border-border/50">
      <div className="container-tight">
        <StaggerContainer className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/40 transition-colors hover:border-primary/30 hover:bg-card shadow-sm"
              >
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
