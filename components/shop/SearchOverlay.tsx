"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { productImage, searchProducts } from "@/lib/products";
import { Drawer } from "@/components/ui/Drawer";

const suggestions = ["Dresses", "Knitwear", "Linen", "Watches", "Bags", "Gold", "Black"];

export function SearchOverlay() {
  const { panel, closePanel } = useStore();
  const open = panel === "search";
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = searchProducts(deferred).slice(0, 8);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Drawer open={open} onClose={closePanel} title="Search" side="top">
      <div className="px-gutter pb-10 lg:px-inset">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-4 border-b border-foreground pb-3">
          <Search size={22} strokeWidth={1.2} aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">
            Search the collection
          </label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection"
            className="display-md w-full bg-transparent outline-none placeholder:text-muted/70 focus-visible:outline-none"
          />
        </form>

        {!deferred.trim() ? (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="eyebrow text-muted">Try</span>
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => setQuery(s)} className="eyebrow link-line">
                {s}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <p className="eyebrow text-muted" role="status">
              {results.length ? `${results.length} ${results.length === 1 ? "piece" : "pieces"}` : "No pieces match — try a colour, fabric or category."}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`} onClick={closePanel} className="group block">
                    <span className="relative block aspect-[4/5] overflow-hidden bg-neutral-200">
                      <Image
                        src={productImage(p.slug)}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1024px) 12vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: p.focus }}
                      />
                    </span>
                    <span className="meta mt-3 block text-[12px]">{p.name}</span>
                    <span className="meta block text-[12px] text-muted">{formatPrice(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Drawer>
  );
}
