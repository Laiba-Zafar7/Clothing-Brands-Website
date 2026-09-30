import type { Category } from "./products";

export const site = {
  name: "Orelle",
  wordmark: "ORELLE",
  tagline: "Quiet form, lasting presence. Cut in small runs and finished by hand.",
  email: "hello@orelle.studio",
  phone: "+44 20 7946 0321",
  cities: "London · Milan · Seoul",
  instagram: "https://www.instagram.com/",
  season: "AW 2026 – 27",
};

export interface NavLink {
  label: string;
  href: string;
}

export const shopNav: NavLink[] = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Accessories", href: "/accessories" },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export const footerShop: NavLink[] = [{ label: "Shop All", href: "/shop" }, ...shopNav];

export const legalNav: NavLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Shipping", href: "/shipping" },
];

export interface CategoryMeta {
  title: string;
  label: string;
  intro: string;
  /** listing tab order */
  types: string[];
}

export const categories: Record<Category, CategoryMeta> = {
  women: {
    title: "Women",
    label: "Womenswear",
    intro: "Dresses, tailoring and knitwear, made in small runs and finished by hand. Built to be worn season after season.",
    types: ["Dresses", "Tailoring", "Jumpsuits", "Knitwear", "Tops"],
  },
  men: {
    title: "Men",
    label: "Menswear",
    intro: "Shirting, knitwear and watches for the everyday — plain in the best sense, and cut to last.",
    types: ["Shirts", "Knitwear", "Tees", "Watches"],
  },
  accessories: {
    title: "Accessories",
    label: "Accessories",
    intro: "Leather, watches and small things to finish the look. Chosen to outlast the season they arrived in.",
    types: ["Bags", "Watches"],
  },
};
