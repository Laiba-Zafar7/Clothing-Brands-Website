"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { pad2 } from "@/lib/format";

interface Frame {
  src: string;
  alt: string;
  position?: string;
}

/** Desktop: stacked full-height frames. Mobile: swipeable strip with a counter. */
export function ProductGallery({ frames }: { frames: Frame[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    setIndex(Math.round(strip.scrollLeft / strip.clientWidth));
  };

  return (
    <div className="relative">
      <div
        ref={stripRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-2 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Product images"
      >
        {frames.map((frame, i) => (
          <div key={frame.src} className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-neutral-200">
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              priority={i === 0}
              quality={85}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: frame.position }}
            />
          </div>
        ))}
      </div>
      {frames.length > 1 && (
        <p className="eyebrow pointer-events-none absolute bottom-4 left-gutter bg-background/85 px-2 py-1 lg:hidden" aria-hidden="true">
          {pad2(index + 1)} / {pad2(frames.length)}
        </p>
      )}
    </div>
  );
}
