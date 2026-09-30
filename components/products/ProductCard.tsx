import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { productImage } from "@/lib/products";
import { cn } from "@/lib/cn";
import { QuickShop } from "./QuickShop";

interface ProductCardProps {
  product: Product;
  tone?: "light" | "dark";
  sizes?: string;
  /** Tailwind aspect class for the image frame */
  aspect?: string;
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  product,
  tone = "light",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  aspect = "aspect-[4/5]",
  className,
  priority,
}: ProductCardProps) {
  const href = `/product/${product.slug}`;
  const dark = tone === "dark";

  return (
    <article className={cn("group relative flex flex-col", dark ? "bg-surface-dark text-white" : "bg-surface text-foreground", className)}>
      <div className={cn("relative overflow-hidden bg-neutral-200", aspect)}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <Image
            src={productImage(product.slug)}
            alt={product.alt}
            fill
            sizes={sizes}
            priority={priority}
            style={{ objectPosition: product.focus }}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </Link>
        {(product.isNew || product.compareAt) && (
          <span className="eyebrow pointer-events-none absolute left-3 top-3 bg-white/90 px-2 py-1 text-[10px] text-black">
            {product.compareAt ? "Sale" : "New"}
          </span>
        )}
        <QuickShop
          product={product}
          className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-[opacity,transform] duration-500 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden"
        />
      </div>
      <div className="meta px-4 pb-6 pt-4 lg:px-5 lg:pb-8">
        <h3>
          <Link href={href} className="link-line">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 tabular-nums">
          {product.compareAt && <s className={cn("mr-2", dark ? "text-white/45" : "text-muted")}>{formatPrice(product.compareAt)}</s>}
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
