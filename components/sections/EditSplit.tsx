import Link from "next/link";
import type { Product } from "@/data/products";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Cross } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/cn";

interface EditSplitProps {
  id: string;
  title: string;
  caption: string;
  eyebrow: string;
  season: string;
  video: { src: string; poster: string; className?: string };
  products: Product[];
  href: string;
  videoSide?: "left" | "right";
}

/**
 * The reference's "Women's Edit / Men's Edit": a sticky full-height film on one half,
 * a black column of products scrolling past it on the other.
 */
export function EditSplit({ id, title, caption, eyebrow, season, video, products, href, videoSide = "left" }: EditSplitProps) {
  const titleId = `${id}-title`;

  return (
    <section data-header="dark" aria-labelledby={titleId} className="relative z-10 grid bg-black text-white lg:grid-cols-2">
      {/* Film */}
      <div className={cn("relative", videoSide === "right" && "lg:order-2")}>
        <div className="relative h-[78svh] overflow-hidden lg:sticky lg:top-0 lg:h-svh">
          <BackgroundVideo src={video.src} poster={video.poster} sizes="(min-width: 1024px) 50vw, 100vw" mediaClassName={video.className} />
          <div aria-hidden="true" className="absolute inset-0 bg-black/35" />
          <div className="relative flex h-full flex-col items-center justify-between px-gutter pb-[8svh] pt-[calc(var(--header-h)+5svh)] text-center">
            <Reveal as="h2" mask id={titleId} className="display-lg">
              {title}
            </Reveal>
            <Reveal as="p" className="copy max-w-[46ch] text-white/75">
              {caption}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="relative">
        <div className="flex flex-col items-center px-gutter pb-16 pt-20 text-center lg:min-h-[78svh] lg:justify-center lg:pb-0 lg:pt-header">
          <Reveal>
            <Cross className="mx-auto h-9 w-9" />
          </Reveal>
          <Reveal as="h3" mask className="display-md mt-6" delay={100}>
            {eyebrow}
          </Reveal>
          <Reveal as="p" className="eyebrow mt-4 text-white/70" delay={200}>
            {season}
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 px-gutter lg:grid-cols-1 lg:gap-y-[22svh] lg:px-0">
          {products.map((product, i) => (
            <li key={product.slug} className="lg:mx-auto lg:w-[46%]">
              <Reveal delay={(i % 2) * 80}>
                <ProductCard product={product} tone="dark" sizes="(min-width: 1024px) 26vw, 50vw" />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="flex justify-center pb-20 pt-16 lg:pb-[26svh] lg:pt-[22svh]">
          <Link href={href} className="meta link-line">
            View the full edit
          </Link>
        </div>
      </div>
    </section>
  );
}
