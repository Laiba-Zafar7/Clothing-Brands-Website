"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Side = "left" | "right" | "top" | "full";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: Side;
  /** Visually hide the built-in title bar (the content provides its own heading). */
  bare?: boolean;
  className?: string;
  children: ReactNode;
  footer?: ReactNode;
  tone?: "light" | "dark";
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

const panelPosition: Record<Side, { base: string; closed: string }> = {
  right: { base: "inset-y-0 right-0 w-full max-w-[440px]", closed: "translate-x-full" },
  left: { base: "inset-y-0 left-0 w-full max-w-[400px]", closed: "-translate-x-full" },
  top: { base: "inset-x-0 top-0 max-h-[100svh]", closed: "-translate-y-full" },
  full: { base: "inset-0", closed: "opacity-0" },
};

/** Accessible modal panel: focus trap, Esc to close, scroll lock, focus restore. */
export function Drawer({ open, onClose, title, side = "right", bare, className, children, footer, tone = "light" }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Keep the latest onClose without re-running the open/close effect (callers often pass inline functions).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    root.style.paddingRight = `${scrollbar}px`;

    const panel = panelRef.current;
    const focusFirst = window.setTimeout(() => {
      const target = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      root.style.paddingRight = "";
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const pos = panelPosition[side];
  const dark = tone === "dark";

  return (
    <div
      className={cn("fixed inset-0 z-[80]", open ? "visible" : "invisible delay-700")}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close"
        onClick={onClose}
        className={cn(
          "absolute inset-0 h-full w-full cursor-default bg-black/40 transition-opacity duration-700 ease-out",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute flex flex-col transition-[transform,opacity] duration-700 ease-out",
          dark ? "bg-black text-white" : "bg-background text-foreground",
          pos.base,
          !open && pos.closed,
          className,
        )}
      >
        <div className={cn("flex h-header shrink-0 items-center justify-between px-gutter", bare && "sr-only")}>
          <h2 id={titleId} className="eyebrow">
            {title}
          </h2>
          <button type="button" onClick={onClose} className="eyebrow text-muted transition-colors hover:text-current">
            Close
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className={cn("shrink-0 border-t px-gutter py-5", dark ? "border-border-dark" : "border-border")}>{footer}</div>}
      </div>
    </div>
  );
}
