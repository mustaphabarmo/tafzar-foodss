"use client";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChefHat } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "nav-glass border-b border-border/50 shadow-[var(--shadow-nav)]"
            : "bg-transparent"
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container-tight flex h-full items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            aria-label="Tafzar Foods — Home"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 shadow-[var(--shadow-glow)]">
              <img
                src="/images/logo.jpeg"
                alt="Tafzar Foods logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden sm:block">
              <span className="block font-display text-base font-bold leading-tight tracking-tight text-foreground">
                Tafzar Foods
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                ...taste the magic...
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  "[&.active]:text-foreground"
                )}
                activeProps={{ className: "text-foreground" }}
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[image:var(--gradient-brand)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
            <Link
              to="/spin"
              className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-brand)] px-5 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-105 hover:shadow-lg active:scale-95"
            >
              🎡 Spin & Win
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl text-foreground transition-colors hover:bg-muted lg:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Slide-down panel */}
            <motion.nav
              key="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[var(--nav-height)] z-40 border-b border-border/50 nav-glass px-5 pb-6 pt-4"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={closeMobile}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted active:bg-muted/80 [&.active]:text-primary [&.active]:bg-primary/5"
                      activeProps={{ className: "text-primary bg-primary/5" }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link
                  to="/spin"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-brand)] px-5 py-3.5 text-base font-bold text-white shadow-[var(--shadow-glow)]"
                >
                  🎡 Spin & Win
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
