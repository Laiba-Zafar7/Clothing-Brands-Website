import { products, type Category, type Product } from "@/data/products";

export const productImage = (slug: string) => `/images/products/${slug}.jpg`;
export const productDetailImage = (slug: string) => `/images/products/${slug}-detail.jpg`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (category: Category) => products.filter((p) => p.category === category);

export const pick = (slugs: string[]): Product[] =>
  slugs.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p));

export const related = (product: Product, count = 4) =>
  products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .sort((a, b) => Number(b.type === product.type) - Number(a.type === product.type))
    .slice(0, count);

export const searchProducts = (query: string) => {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products.filter((p) => {
    const haystack = [p.name, p.category, p.type, p.colour.name, ...p.tags].join(" ").toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
};

export type SortKey = "featured" | "new" | "price-asc" | "price-desc";

export const sortProducts = (list: Product[], sort: SortKey) => {
  const copy = [...list];
  switch (sort) {
    case "new":
      return copy.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy;
  }
};

export type PriceBand = "any" | "under-250" | "250-500" | "over-500";

export const priceBands: { key: PriceBand; label: string; test: (price: number) => boolean }[] = [
  { key: "any", label: "Any", test: () => true },
  { key: "under-250", label: "Under £250", test: (p) => p < 250 },
  { key: "250-500", label: "£250 – £500", test: (p) => p >= 250 && p <= 500 },
  { key: "over-500", label: "Over £500", test: (p) => p > 500 },
];
