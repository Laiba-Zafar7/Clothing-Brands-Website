"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Group {
  key: string;
  label: string;
  count: number;
}

interface FilterBarProps {
  groups: Group[];
  active: string;
  onGroup: (key: string) => void;
  onOpenFilters: () => void;
  refinements: number;
  total: number;
  totalCount: number;
}

/** "FILTERS +" · tabs with superscript counts · "N PIECES" — as in the reference listing. */
export function FilterBar({ groups, active, onGroup, onOpenFilters, refinements, total, totalCount }: FilterBarProps) {
  const tabs: Group[] = [{ key: "all", label: "All", count: totalCount }, ...groups];

  return (
    <div className="grid grid-cols-2 items-center gap-y-4 border-y border-border py-4 lg:grid-cols-[1fr_auto_1fr]">
      <button type="button" onClick={onOpenFilters} className="eyebrow flex items-center gap-2 justify-self-start">
        Filters
        <Plus size={11} strokeWidth={1.5} aria-hidden="true" />
        {refinements > 0 && (
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-label={`${refinements} active`} />
        )}
      </button>

      <p className="eyebrow justify-self-end text-muted lg:col-start-3" aria-live="polite">
        {total} {total === 1 ? "piece" : "pieces"}
      </p>

      <div
        role="group"
        aria-label="Filter by category"
        className="col-span-2 -mx-gutter flex gap-7 overflow-x-auto px-gutter [scrollbar-width:none] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mx-0 lg:justify-center lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => {
          const selected = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={selected}
              onClick={() => onGroup(tab.key)}
              className={cn(
                "eyebrow shrink-0 whitespace-nowrap border-b pb-1 transition-colors duration-300",
                selected ? "border-foreground text-foreground" : "border-transparent text-foreground/60 hover:text-foreground",
              )}
            >
              {tab.label}
              <sup className="ml-0.5 text-[8px] text-muted">{tab.count}</sup>
            </button>
          );
        })}
      </div>
    </div>
  );
}
