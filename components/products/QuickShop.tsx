"use client";

import { useState } from "react";
import { Bookmark, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

/** Hover bar from the reference: bookmark square + "Quick shop" bar with bag icon; expands to a size picker. */
export function QuickShop({ product, className }: { product: Product; className?: string }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [choosing, setChoosing] = useState(false);
  const saved = isWishlisted(product.slug);
  const oneSize = product.sizes.length === 1;

  const onQuickShop = () => {
    if (oneSize) addToCart(product.slug, product.sizes[0]);
    else setChoosing((v) => !v);
  };

  return (
    <div className={cn("text-white", className)} onMouseLeave={() => setChoosing(false)}>
      {choosing && (
        <div role="group" aria-label={`Choose a size for ${product.name}`} className="mb-1.5 flex bg-black/85">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                addToCart(product.slug, size);
                setChoosing(false);
              }}
              className="eyebrow h-10 flex-1 transition-colors hover:bg-white hover:text-black"
            >
              {size}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          className="grid h-11 w-11 shrink-0 place-items-center bg-black/85 transition-colors hover:bg-black"
        >
          <Bookmark size={16} strokeWidth={1.4} fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          onClick={onQuickShop}
          aria-expanded={oneSize ? undefined : choosing}
          className="meta flex h-11 flex-1 items-center justify-between bg-black/85 px-4 transition-colors hover:bg-black"
        >
          {oneSize ? "Add to bag" : "Quick shop"}
          <ShoppingBag size={16} strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
