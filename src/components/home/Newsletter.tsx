import { useState } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

export function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Subscribed successfully! Welcome to the Tafzar Foods family 🎉");
      setName("");
      setEmail("");
    }, 800);
  };

  return (
    <section className="section-py bg-card border-t border-border/50">
      <div className="container-tight max-w-4xl text-center space-y-8">
        <SectionHeading
          label="Stay Updated"
          title="Join the Tafzar Foods Club"
          titleHighlight="Club"
          subtitle="Subscribe to get exclusive discount offers, new menu alerts, and baking tips directly in your inbox."
        />

        <form onSubmit={handleSubmit} className="mx-auto flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-7 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
          >
            {loading ? "Subscribing..." : <>Subscribe <Send className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </section>
  );
}
