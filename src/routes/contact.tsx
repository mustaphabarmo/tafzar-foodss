import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/data/company";
import { socials } from "@/data/socials";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Tafzar Foods" },
      {
        name: "description",
        content:
          "Get in touch with Tafzar Foods for custom cake orders, event catering inquiries, and bakery quotes.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Custom Cake Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you for reaching out! We will get back to you within 2 hours. 🍰");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Custom Cake Inquiry",
        message: "",
      });
    }, 1000);
  };

  return (
    <main className="min-h-screen pt-24 bg-background pb-20">
      {/* Header Banner */}
      <section className="bg-card border-b border-border/50 py-12 sm:py-16 text-center space-y-4">
        <div className="container-tight">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl font-black text-foreground sm:text-5xl">
            Contact Tafzar Foods
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Have a question, custom cake request, or event inquiry? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="container-tight py-12 space-y-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-foreground">Phone &amp; WhatsApp</h3>
              <p className="text-xs text-muted-foreground">Call or chat with our bakery line directly.</p>
              <a
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm font-bold text-primary hover:underline"
              >
                {company.phone}
              </a>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-foreground">Email Address</h3>
              <p className="text-xs text-muted-foreground">For corporate inquiries &amp; feedback.</p>
              <a href={`mailto:${company.email}`} className="inline-block text-sm font-bold text-primary hover:underline">
                {company.email}
              </a>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-foreground">Bakery Hours</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {company.businessHours.map((h) => (
                  <li key={h.days} className="flex justify-between">
                    <span>{h.days}:</span>
                    <span className="font-semibold text-foreground">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chisom Okeke"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. chisom@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="Custom Cake Inquiry">Custom Cake Inquiry</option>
                    <option value="Event Catering Quote">Event Catering Quote</option>
                    <option value="Order Status">Order Status</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your event date, theme, guest count, or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Channels */}
        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Follow &amp; Connect With Us
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Stay connected for fresh daily bakes, cake designs, and promotional giveaways across all our official channels.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-muted/40 p-4 transition-all hover:border-primary hover:bg-card hover:shadow-md"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary font-bold">
                  {s.platform === "instagram" && "📸"}
                  {s.platform === "facebook" && "📘"}
                  {s.platform === "tiktok" && "🎵"}
                  {s.platform === "whatsapp" && "💬"}
                </div>
                <div className="overflow-hidden">
                  <span className="block font-display text-sm font-bold text-foreground capitalize">
                    {s.label}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {s.handle || `@tafzarfoods`}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-3xl border border-border/60 bg-muted/50 p-8 text-center space-y-3">
          <MapPin className="h-8 w-8 text-primary mx-auto" />
          <h3 className="font-display text-xl font-bold text-foreground">Our Location</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {company.address} — We serve customers across Zaria and Kaduna. Reach us via WhatsApp or call to arrange pickup or delivery.
          </p>
        </div>
      </section>
    </main>
  );
}
