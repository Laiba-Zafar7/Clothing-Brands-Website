"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { shopNav } from "@/data/site";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { getProduct, productImage } from "@/lib/products";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { panel, closePanel, cart, cartCount, subtotal, setQty, removeFromCart } = useStore();
  const [notice, setNotice] = useState(false);

  const footer = cart.length ? (
    <div className="space-y-4">
      <div className="meta flex justify-between">
        <span>Subtotal</span>
        <span className="tabular-nums">{formatPrice(subtotal)}</span>
      </div>
      <p className="copy text-muted">Shipping and duties calculated at checkout.</p>
      <Button className="w-full" onClick={() => setNotice(true)}>
        Checkout
      </Button>
      {notice && (
        <p role="status" className="copy text-center text-muted">
          Online checkout opens with our launch. Your bag is saved on this device.
        </p>
      )}
    </div>
  ) : undefined;

  return (
    <Drawer open={panel === "cart"} onClose={closePanel} title={`Bag (${cartCount})`} footer={footer}>
      {cart.length === 0 ? (
        <div className="px-gutter py-10">
          <p className="display-sm">Your bag is empty.</p>
          <ul className="meta mt-8 space-y-3">
            {shopNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={closePanel} className="link-line">
                  Shop {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="divide-y divide-border border-t border-border">
          {cart.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            return (
              <li key={`${line.slug}-${line.size}`} className="flex gap-4 px-gutter py-5">
                <Link href={`/product/${product.slug}`} onClick={closePanel} className="relative h-[120px] w-24 shrink-0 overflow-hidden bg-neutral-200">
                  <Image src={productImage(product.slug)} alt={product.alt} fill sizes="96px" className="object-cover" style={{ objectPosition: product.focus }} />
                </Link>
                <div className="meta flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <Link href={`/product/${product.slug}`} onClick={closePanel} className="link-line self-start">
                      {product.name}
                    </Link>
                    <span className="tabular-nums">{formatPrice(product.price * line.qty)}</span>
                  </div>
                  <p className="mt-1 text-muted">
                    {product.colour.name} · {line.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                        className="grid h-8 w-8 place-items-center hover:bg-black/5"
                      >
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span className="w-6 text-center tabular-nums" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                        className="grid h-8 w-8 place-items-center hover:bg-black/5"
                      >
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeFromCart(line.slug, line.size)} className="eyebrow link-line text-muted hover:text-foreground">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}
