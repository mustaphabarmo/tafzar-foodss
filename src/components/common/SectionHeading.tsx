import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  label,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className,
  dark = false,
}: SectionHeadingProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <div className={cn("flex flex-col gap-3", alignClass, className)}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
            dark
              ? "bg-white/15 text-white/80"
              : "bg-primary/10 text-primary"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: label ? 0.1 : 0 }}
        className={cn(
          "font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {titleHighlight ? (
          <>
            {title}{" "}
            <span className="text-gradient">{titleHighlight}</span>
          </>
        ) : (
          title
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: label ? 0.2 : 0.1 }}
          className={cn(
            "max-w-2xl text-balance text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
