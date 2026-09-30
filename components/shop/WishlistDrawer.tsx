"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { getProduct, productImage } from "@/lib/products";
import { Drawer } from "@/components/ui/Drawer";

export function WishlistDrawer() {
  const { panel, closePanel, wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <Drawer open={panel === "wishlist"} onClose={closePanel} title={`Saved (${wishlist.length})`}>
      {wishlist.length === 0 ? (
        <div className="px-gutter py-10">
          <p className="display-sm">Nothing saved yet.</p>
          <p className="copy mt-4 text-muted">Use the bookmark on any piece to keep it here for later.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border border-t border-border">
          {wishlist.map((slug) => {
            const product = getProduct(slug);
            if (!product) return null;
            const oneSize = product.sizes.length === 1;
            return (
              <li key={slug} className="flex gap-4 px-gutter py-5">
                <Link href={`/product/${slug}`} onClick={closePanel} className="relative h-[120px] w-24 shrink-0 overflow-hidden bg-neutral-200">
                  <Image src={productImage(slug)} alt={product.alt} fill sizes="96px" className="object-cover" style={{ objectPosition: product.focus }} />
                </Link>
                <div className="meta flex flex-1 flex-col">
                  <Link href={`/product/${slug}`} onClick={closePanel} className="link-line self-start">
                    {product.name}
                  </Link>
                  <p className="mt-1 tabular-nums text-muted">{formatPrice(product.price)}</p>
                  <div className="eyebrow mt-auto flex gap-6 pt-3">
                    {oneSize ? (
                      <button type="button" className="link-line" onClick={() => addToCart(slug, product.sizes[0])}>
                        Add to bag
                      </button>
                    ) : (
                      <Link href={`/product/${slug}`} onClick={closePanel} className="link-line">
                        Choose size
                      </Link>
                    )}
                    <button type="button" className="link-line text-muted hover:text-foreground" onClick={() => toggleWishlist(slug)}>
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
