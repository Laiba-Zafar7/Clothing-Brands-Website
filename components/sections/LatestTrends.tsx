"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { loadScrollTrigger } from "@/lib/motion";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** "Discover the Latest Trends": oversized intro, then a pinned horizontal run of cards (native swipe below lg). */
export function LatestTrends({ products }: { products: Product[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    let cleanup = () => {};
    let cancelled = false;

    loadScrollTrigger().then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
      cleanup = () => mm.revert();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section data-header="light" aria-labelledby="trends-title" className="relative z-10 bg-background">
      <div className="px-inset pb-10 pt-section lg:pb-0">
        <h2 id="trends-title" className="display-xl">
          <Reveal as="span" mask>
            Discover the
          </Reveal>
          <span className="mt-1 flex flex-wrap items-baseline gap-x-8 lg:pl-[7vw]">
            <Reveal as="span" className="eyebrow order-2 w-full text-muted lg:order-none lg:w-auto" delay={250}>
              Latest arrivals
            </Reveal>
            <Reveal as="span" mask delay={120}>
              Latest Trends
            </Reveal>
          </span>
        </h2>
      </div>

      <div ref={pinRef} className="lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden">
        <Reveal as="p" className="copy mb-10 max-w-[42ch] px-inset lg:mb-8 lg:ml-auto lg:pl-0">
          Stay ahead with the newest arrivals — cut to sharpen the everyday, and made to outlast the season.
        </Reveal>
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-1 overflow-x-auto px-gutter pb-20 [scrollbar-width:none] lg:w-max lg:snap-none lg:overflow-visible lg:pb-24 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, i) => (
            <li key={product.slug} className={cn("w-[72vw] shrink-0 snap-start sm:w-[40vw] lg:w-[24vw]", i % 2 === 1 && "lg:translate-y-16")}>
              <ProductCard product={product} sizes="(min-width: 1024px) 24vw, 72vw" aspect="aspect-square" />
            </li>
          ))}
          <li className="flex w-[72vw] shrink-0 snap-start items-center justify-center sm:w-[40vw] lg:w-[24vw]">
            <Link href="/shop" className="group flex flex-col items-center gap-4 text-center">
              <span className="display-md">View all pieces</span>
              <ArrowRight size={22} strokeWidth={1.2} className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
