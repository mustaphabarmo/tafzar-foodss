import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", description: "Welcome to Tafzar Foods" },
  {
    label: "About",
    href: "/about",
    description: "Our story and values",
  },
  {
    label: "Products",
    href: "/products",
    description: "Explore our menu",
  },
  {
    label: "Gallery",
    href: "/gallery",
    description: "Beautiful food photography",
  },
  {
    label: "Spin & Win",
    href: "/spin",
    description: "Play and win prizes",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch with us",
  },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Mission & Vision", href: "/about#mission" },
    { label: "Our Values", href: "/about#values" },
  ],
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Celebration Cakes", href: "/products?category=celebration-cakes" },
    { label: "Birthday Cakes", href: "/products?category=birthday-cakes" },
    { label: "Cupcakes", href: "/products?category=cupcakes" },
    { label: "Small Chops", href: "/products?category=small-chops" },
    { label: "Desserts", href: "/products?category=desserts" },
    { label: "Snacks", href: "/products?category=snacks" },
  ],
};
