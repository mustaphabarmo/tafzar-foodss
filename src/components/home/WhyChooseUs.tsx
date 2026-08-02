import { SectionHeading } from "@/components/common/SectionHeading";
import { company } from "@/data/company";
import { motion } from "motion/react";
import { StaggerContainer, staggerChild } from "@/components/common/ScrollReveal";

export function WhyChooseUs() {
  return (
    <section className="section-py bg-muted/40 relative overflow-hidden">
      <div className="container-tight space-y-12 relative z-10">
        <SectionHeading
          label="Why Choose Us"
          title="The Tafzar Foods Advantage"
          titleHighlight="Advantage"
          subtitle="We don't just bake food; we craft experiences that make your special moments unforgettable."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {company.values.map((val) => (
            <motion.div
              key={val.id}
              variants={staggerChild}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="mb-4 text-4xl">{val.icon}</div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {val.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {val.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
