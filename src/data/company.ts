import type { CompanyDetails } from "@/types";

export const company: CompanyDetails = {
  name: "Tafzar Foods",
  tagline: "Taste the Magic.",
  description:
    "Freshly made cakes, snacks, desserts and treats crafted with quality ingredients for every occasion. From intimate birthdays to grand celebrations, we bring your sweet vision to life.",
  email: "hello@tafzarfoods.com",
  phone: "09036697209",
  whatsapp: "+2349036697209",
  whatsappMessage:
    "Hello Tafzar Foods! I'd like to place an order. Can you help me?",
  address: "Zaria, Kaduna State, Nigeria",
  founded: "2023",
  mission:
    "To create exceptional food experiences that bring joy, warmth, and memories to every table — with uncompromising quality, creativity, and care in every bite.",
  vision:
    "To become the most beloved premium food brand in Nigeria, known for our artisanal quality, beautiful presentation, and the smiles we bring to every celebration.",
  businessHours: [
    { days: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 9:00 PM" },
    { days: "Sunday", hours: "11:00 AM – 6:00 PM" },
  ],
  values: [
    {
      id: "quality",
      title: "Premium Quality",
      description:
        "We use only the finest, freshest ingredients in everything we make — no shortcuts, no compromises.",
      icon: "⭐",
    },
    {
      id: "freshness",
      title: "Always Fresh",
      description:
        "Every item is baked fresh to order. We never serve day-old products.",
      icon: "🌿",
    },
    {
      id: "creativity",
      title: "Creative Excellence",
      description:
        "Our team brings artistry and imagination to every cake design and food creation.",
      icon: "🎨",
    },
    {
      id: "satisfaction",
      title: "Customer First",
      description:
        "Your satisfaction is our top priority. We go above and beyond to exceed your expectations.",
      icon: "❤️",
    },
    {
      id: "integrity",
      title: "Integrity",
      description:
        "Honest pricing, transparent ingredients, and genuine care in every interaction.",
      icon: "🤝",
    },
    {
      id: "consistency",
      title: "Consistency",
      description:
        "Whether it's your first order or your fiftieth, you'll always get the same exceptional quality.",
      icon: "✨",
    },
  ],
};
