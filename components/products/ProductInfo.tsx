"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { Bookmark, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { categories } from "@/data/site";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function Disclosure({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-t border-border">
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className="eyebrow flex w-full items-center justify-between py-5">
          {title}
          <Plus size={13} strokeWidth={1.4} className={cn("transition-transform duration-500", open && "rotate-45")} aria-hidden="true" />
        </button>
      </h3>
      <div id={id} className={cn("grid transition-[grid-template-rows] duration-500 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden" inert={!open}>
          <div className="copy pb-6 text-foreground/75">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductInfo({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const saved = isWishlisted(product.slug);
  const category = categories[product.category];

  const add = () => {
    if (!size) {
      setWarn(true);
      return;
    }
    addToCart(product.slug, size, qty);
  };

  return (
    <div>
      <nav aria-label="Breadcrumb" className="eyebrow text-muted">
        <Link href={`/${product.category}`} className="link-line hover:text-foreground">
          {category.title}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{product.type}</span>
      </nav>

      <h1 className="display-md mt-6">{product.name}</h1>
      <p className="meta mt-4 tabular-nums">
        {product.compareAt && <s className="mr-3 text-muted">{formatPrice(product.compareAt)}</s>}
        {formatPrice(product.price)}
      </p>

      <p className="copy mt-8 max-w-[48ch] text-foreground/80">{product.description}</p>

      <div className="mt-10 space-y-8">
        <div>
          <p className="eyebrow text-muted">Colour</p>
          <p className="meta mt-3 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full ring-1 ring-black/15" style={{ background: product.colour.hex }} aria-hidden="true" />
            {product.colour.name}
          </p>
        </div>

        {!oneSize && (
          <fieldset>
            <legend className="eyebrow flex w-full justify-between text-muted">
              <span>Size</span>
              {warn && !size && (
                <span role="alert" className="text-red-700">
                  Please choose a size
                </span>
              )}
            </legend>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "eyebrow h-11 border transition-colors duration-300",
                    size === s ? "border-foreground bg-foreground text-white" : "border-border hover:border-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="flex gap-2">
          <div className="flex h-12 items-center border border-border" role="group" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-full w-10 place-items-center hover:bg-black/5">
              <Minus size={12} strokeWidth={1.5} />
            </button>
            <span className="meta w-6 text-center tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(9, q + 1))} className="grid h-full w-10 place-items-center hover:bg-black/5">
              <Plus size={12} strokeWidth={1.5} />
            </button>
          </div>
          <Button className="h-12 flex-1" onClick={add}>
            Add to bag — {formatPrice(product.price * qty)}
          </Button>
          <button
            type="button"
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save for later"}
            onClick={() => toggleWishlist(product.slug)}
            className="grid h-12 w-12 shrink-0 place-items-center border border-border transition-colors hover:border-foreground"
          >
            <Bookmark size={16} strokeWidth={1.4} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="mt-12 border-b border-border">
        <Disclosure title="Details" defaultOpen>
          <ul className="space-y-1.5">
            {product.details.map((d) => (
              <li key={d}>— {d}</li>
            ))}
          </ul>
        </Disclosure>
        <Disclosure title="Delivery & returns">
          Complimentary delivery on orders over £250. Dispatched from our London studio within one working day. Unworn pieces
          may be returned within 30 days. <Link href="/shipping" className="underline underline-offset-4">Shipping details</Link>
        </Disclosure>
        <Disclosure title="Repairs for life">
          Anything we make, we mend — free, for the life of the garment. Write to us and we will arrange collection.
        </Disclosure>
      </div>
    </div>
  );
}
