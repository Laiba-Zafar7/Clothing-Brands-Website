"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/faq";
import { pad2 } from "@/lib/format";
import { cn } from "@/lib/cn";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="border-b border-border">
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${base}-${i}`;
        return (
          <li key={item.q} className="border-t border-border">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-baseline gap-5 py-6 text-left lg:gap-8"
              >
                <span className="eyebrow w-8 shrink-0 text-muted">({pad2(i + 1)})</span>
                <span className="display-sm flex-1 transition-opacity group-hover:opacity-70">{item.q}</span>
                <Plus size={18} strokeWidth={1.2} aria-hidden="true" className={cn("shrink-0 self-center transition-transform duration-500", expanded && "rotate-45")} />
              </button>
            </h3>
            <div id={panelId} className={cn("grid transition-[grid-template-rows] duration-500 ease-out", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden" inert={!expanded}>
                <p className="copy max-w-[60ch] pb-8 pl-[3.25rem] text-foreground/75 lg:pl-16">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
