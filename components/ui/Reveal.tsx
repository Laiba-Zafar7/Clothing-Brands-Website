"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        if (el.hasAttribute("data-reveal-mask")) el.setAttribute("data-reveal-mask", "in");
        else el.setAttribute("data-reveal", "in");
        observer?.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
  );
  return observer;
}

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** ms */
  delay?: number;
  /** Slide the child up from behind a clipping mask (for headings/lines). */
  mask?: boolean;
  id?: string;
}

/** Fades/rises its content into view once. CSS lives in globals.css ([data-reveal]). */
export function Reveal({ children, as: Tag = "div", className, delay = 0, mask = false, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  const attrs = mask ? { "data-reveal-mask": "" } : { "data-reveal": "" };

  return (
    <Tag ref={ref} id={id} className={className} style={style} {...attrs}>
      {mask ? <span>{children}</span> : children}
    </Tag>
  );
}

/** Splits text into masked lines that rise in sequence. Pass lines explicitly for control over breaks. */
export function RevealLines({ lines, className, lineClassName, delay = 0, stagger = 110 }: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <Reveal key={i} as="span" mask delay={delay + i * stagger} className={lineClassName}>
          {line}
        </Reveal>
      ))}
    </span>
  );
}
