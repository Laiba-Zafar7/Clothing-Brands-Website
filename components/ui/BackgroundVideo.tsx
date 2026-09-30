"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface BackgroundVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Tailwind classes for the <video>/<img> (object-position, filters) */
  mediaClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Decorative looping video. Loads nothing until near the viewport, plays only while visible,
 * and falls back to the poster under reduced motion.
 */
export function BackgroundVideo({ src, poster, className, mediaClassName, sizes = "100vw", priority }: BackgroundVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          setLoad(true);
          video?.play().catch(() => undefined);
        } else {
          video?.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (load) videoRef.current?.play().catch(() => undefined);
  }, [load]);

  return (
    <div ref={wrapRef} className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover transition-opacity duration-700", playing && "opacity-0", mediaClassName)}
      />
      {!reduced && (
        <video
          ref={videoRef}
          className={cn("absolute inset-0 h-full w-full object-cover", mediaClassName)}
          src={load ? src : undefined}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}
