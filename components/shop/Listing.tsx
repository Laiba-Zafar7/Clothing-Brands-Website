"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { applyFilters, applyRefinements, emptyFilters, groupKey, refinementCount, type Filters, type GroupBy } from "@/lib/filters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterBar, type Group } from "./FilterBar";
import { FilterDrawer } from "./FilterDrawer";

interface ListingProps {
  id: string;
  products: Product[];
  label: string;
  groupBy: GroupBy;
  /** Ordered group keys with display labels */
  groups: { key: string; label: string }[];
  initial?: Partial<Filters>;
}

export function Listing({ id, products, label, groupBy, groups, initial }: ListingProps) {
  const [filters, setFilters] = useState<Filters>({ ...emptyFilters, ...initial });
  const [drawer, setDrawer] = useState(false);

  const results = useMemo(() => applyFilters(products, filters, groupBy), [products, filters, groupBy]);
  const refined = useMemo(() => applyRefinements(products, filters), [products, filters]);

  // Tab counts reflect drawer refinements, so the numbers always match what a tab will show.
  const tabGroups: Group[] = groups.map((g) => ({
    ...g,
    count: refined.filter((p) => groupKey(p, groupBy) === g.key).length,
  }));

  const animationKey = JSON.stringify(filters);

  return (
    <section id={id} data-header="light" aria-label={`${label} — all pieces`} className="scroll-mt-header bg-background px-inset pb-section pt-16 lg:pt-24">
      <div className="eyebrow flex justify-between pb-4 text-muted">
        <span>All pieces</span>
        <span>{label}</span>
      </div>

      <FilterBar
        groups={tabGroups}
        active={filters.group}
        onGroup={(group) => setFilters((f) => ({ ...f, group }))}
        onOpenFilters={() => setDrawer(true)}
        refinements={refinementCount(filters)}
        total={results.length}
        totalCount={refined.length}
      />

      <div className="mt-8 lg:mt-12">
        {results.length ? (
          <ProductGrid products={results} animationKey={animationKey} />
        ) : (
          <div className="py-24 text-center">
            <p className="display-sm">No pieces match these filters.</p>
            <button type="button" onClick={() => setFilters(emptyFilters)} className="eyebrow link-line mt-6">
              Clear filters
            </button>
          </div>
        )}
      </div>

      <FilterDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        products={products}
        filters={filters}
        onChange={setFilters}
        resultCount={results.length}
      />
    </section>
  );
}
