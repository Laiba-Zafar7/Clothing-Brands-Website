import type { Product } from "@/data/products";
import { priceBands, sortProducts, type PriceBand, type SortKey } from "./products";

export type GroupBy = "type" | "category";

export interface Filters {
  group: string; // "all" or a type/category key
  onSale: boolean;
  price: PriceBand;
  colours: string[];
  sizes: string[];
  sort: SortKey;
}

export const emptyFilters: Filters = { group: "all", onSale: false, price: "any", colours: [], sizes: [], sort: "featured" };

export const groupKey = (p: Product, by: GroupBy) => (by === "type" ? p.type : p.category);

/** Drawer filters only (everything except the tab group). */
export function applyRefinements(list: Product[], f: Filters) {
  const band = priceBands.find((b) => b.key === f.price) ?? priceBands[0];
  return list.filter(
    (p) =>
      (!f.onSale || Boolean(p.compareAt)) &&
      band.test(p.price) &&
      (!f.colours.length || f.colours.includes(p.colour.name)) &&
      (!f.sizes.length || p.sizes.some((s) => f.sizes.includes(s))),
  );
}

export function applyFilters(list: Product[], f: Filters, by: GroupBy) {
  const refined = applyRefinements(list, f).filter((p) => f.group === "all" || groupKey(p, by) === f.group);
  return sortProducts(refined, f.sort);
}

export const refinementCount = (f: Filters) =>
  Number(f.onSale) + Number(f.price !== "any") + f.colours.length + f.sizes.length + Number(f.sort !== "featured");

/** Tally values across a product list, preserving first-seen order. */
export function tally<T extends string>(list: Product[], pick: (p: Product) => T | T[]) {
  const counts = new Map<T, number>();
  for (const p of list) {
    const values = ([] as T[]).concat(pick(p));
    for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return counts;
}

export const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
