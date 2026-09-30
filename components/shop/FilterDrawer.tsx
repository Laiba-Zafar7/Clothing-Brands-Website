"use client";

import type { ReactNode } from "react";
import type { Colour, Product } from "@/data/products";
import { priceBands, type SortKey } from "@/lib/products";
import { tally, toggle, type Filters } from "@/lib/filters";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const sorts: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "new", label: "New in" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
];

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "One size"];

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  filters: Filters;
  onChange: (next: Filters) => void;
  resultCount: number;
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-border px-gutter py-6">
      <legend className="eyebrow float-left mb-4 w-full text-muted">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

const chip = (active: boolean) =>
  cn(
    "eyebrow h-9 border px-3 transition-colors duration-300",
    active ? "border-foreground bg-foreground text-white" : "border-border hover:border-foreground",
  );

export function FilterDrawer({ open, onClose, products, filters, onChange, resultCount }: FilterDrawerProps) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const colourCounts = tally(products, (p) => p.colour.name);
  const colours = Array.from(colourCounts.keys()).map((name) => products.find((p) => p.colour.name === name)?.colour as Colour);
  const sizeCounts = tally(products, (p) => p.sizes);
  const sizes = SIZE_ORDER.filter((s) => sizeCounts.has(s));

  const footer = (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        className="eyebrow link-line text-muted hover:text-foreground"
        onClick={() => onChange({ ...filters, onSale: false, price: "any", colours: [], sizes: [], sort: "featured" })}
      >
        Clear all
      </button>
      <Button onClick={onClose}>
        View {resultCount} {resultCount === 1 ? "piece" : "pieces"}
      </Button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title="Filters" side="left" footer={footer}>
      <div className="px-gutter pb-6">
        <label className="eyebrow flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={(e) => set({ onSale: e.target.checked })}
            className="h-3.5 w-3.5 accent-black"
          />
          On sale only
        </label>
      </div>

      <Group title="Sort by">
        <div className="flex flex-wrap gap-2">
          {sorts.map((s) => (
            <button key={s.key} type="button" aria-pressed={filters.sort === s.key} onClick={() => set({ sort: s.key })} className={chip(filters.sort === s.key)}>
              {s.label}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Price">
        <div className="flex flex-wrap gap-2">
          {priceBands.map((b) => (
            <button key={b.key} type="button" aria-pressed={filters.price === b.key} onClick={() => set({ price: b.key })} className={chip(filters.price === b.key)}>
              {b.label}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Colour">
        <ul className="space-y-3.5">
          {colours.map((c) => {
            const active = filters.colours.includes(c.name);
            return (
              <li key={c.name}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => set({ colours: toggle(filters.colours, c.name) })}
                  className={cn("eyebrow flex items-center gap-3 transition-opacity", !active && filters.colours.length > 0 && "opacity-50")}
                >
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full ring-1 ring-black/15", active && "ring-2 ring-foreground ring-offset-2 ring-offset-background")}
                    style={{ background: c.hex }}
                    aria-hidden="true"
                  />
                  {c.name}
                  <sup className="text-[8px] text-muted">{colourCounts.get(c.name)}</sup>
                </button>
              </li>
            );
          })}
        </ul>
      </Group>

      <Group title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const active = filters.sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => set({ sizes: toggle(filters.sizes, s) })}
                className={cn(chip(active), s.length < 3 && "w-9 px-0")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Group>
    </Drawer>
  );
}
