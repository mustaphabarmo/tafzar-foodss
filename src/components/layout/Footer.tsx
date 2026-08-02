import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Instagram, Facebook, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { company } from "@/data/company";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.78a8.28 8.28 0 004.84 1.56V6.89a4.85 4.85 0 01-1.07-.2z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-foreground text-white overflow-hidden" aria-label="Site footer">
      {/* Decorative top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.72 0.19 45) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.72 0.18 350) 0%, transparent 50%)",
        }}
      />

      <div className="container-tight relative py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 rounded-lg" aria-label="Tafzar Foods — Home">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white/10 shadow-[var(--shadow-glow)]">
                <img src="/images/logo.jpeg" alt="Tafzar Foods logo" className="h-full w-full object-cover" />
              </div>
              <span>
                <span className="block font-display text-lg font-bold leading-tight tracking-tight">
                  Tafzar Foods
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  ...taste the magic...
                </span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {company.description.slice(0, 140)}…
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3" aria-label="Follow us on social media">
              {socials.map((s) => {
                let Icon: React.ElementType;
                if (s.platform === "whatsapp") Icon = WhatsAppIcon;
                else if (s.platform === "tiktok") Icon = TikTokIcon;
                else Icon = SOCIAL_ICONS[s.platform] ?? ExternalLink;

                return (
                  <motion.a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${s.label}`}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links" links={footerLinks.quickLinks} />

          {/* Products */}
          <FooterColumn title="Products" links={footerLinks.products} />

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white/50">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                <a href={`tel:${company.phone}`} className="hover:text-white transition-colors">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                <span>{company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            © {currentYear} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white/50">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              to={l.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Minimal non-typed cn alias to avoid unused import warning
const _cn = cn;
void _cn;
