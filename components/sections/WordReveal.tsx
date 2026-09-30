"use client";

import { useEffect, useRef, type ElementType } from "react";
import { loadScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Opacity of words before they are "read" */
  from?: number;
}

/** Words darken one by one as the block scrolls through the viewport (scrubbed). */
export function WordReveal({ text, as: Tag = "p", className, from = 0.16 }: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let cleanup = () => {};
    let cancelled = false;

    loadScrollTrigger().then(({ gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: from },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      }, el);
      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [from]);

  return (
    <Tag ref={ref} className={cn(className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span data-word className="inline-block">
            {word}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
