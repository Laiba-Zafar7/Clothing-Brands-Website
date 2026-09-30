import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";

interface ProductGridProps {
  products: Product[];
  /** Lead with a 2×2 feature card, as in the reference listing */
  feature?: boolean;
  /** Changing this replays the entrance fade (e.g. on filter change) */
  animationKey?: string;
}

export function ProductGrid({ products, feature = true, animationKey }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => {
        const lead = feature && i === 0;
        return (
          <li
            key={`${animationKey}-${product.slug}`}
            className={cn("animate-[fade-in_700ms_var(--ease-out)_both]", lead && "col-span-2 md:row-span-2")}
            style={{ animationDelay: `${Math.min(i, 10) * 45}ms` }}
          >
            <ProductCard
              product={product}
              priority={i < 3}
              className="h-full"
              aspect={lead ? "aspect-[4/5] md:aspect-auto md:flex-1 md:min-h-0" : "aspect-[4/5]"}
              sizes={lead ? "(min-width: 1024px) 45vw, (min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 50vw"}
            />
          </li>
        );
      })}
    </ul>
  );
}
