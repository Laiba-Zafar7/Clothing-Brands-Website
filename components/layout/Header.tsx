"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bookmark, Search, ShoppingBag } from "lucide-react";
import { mainNav, shopNav, site } from "@/data/site";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

type Theme = "dark" | "light";

/** Reads the `data-header` theme of whatever section sits under the header bar. */
function useSectionTheme(ref: React.RefObject<HTMLElement | null>) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const probe = () => {
      frame = 0;
      const header = ref.current;
      if (!header) return;
      const y = header.offsetHeight / 2;
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      const under = stack.find((el) => !header.contains(el))?.closest<HTMLElement>("[data-header]");
      setTheme((under?.dataset.header as Theme) ?? "light");
      setScrolled(window.scrollY > 8);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(probe);
    };
    probe();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Re-probe after route content paints.
    const late = window.setTimeout(probe, 120);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, ref]);

  return { theme, scrolled };
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function Badge({ count, dark }: { count: number; dark: boolean }) {
  if (!count) return null;
  return (
    <span
      className={cn(
        "absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-semibold leading-none tabular-nums transition-colors duration-500",
        dark ? "bg-white text-black" : "bg-black text-white",
      )}
    >
      {count}
    </span>
  );
}

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { theme, scrolled } = useSectionTheme(ref);
  const { cartCount, wishlist, openPanel, panel } = useStore();
  const dark = theme === "dark";

  const navLink = (href: string) =>
    cn("link-line py-1 transition-opacity duration-300 hover:opacity-100", isActive(pathname, href) ? "opacity-100" : "opacity-85");

  return (
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        dark ? "text-white" : "text-foreground",
      )}
    >
      {/* Legibility fade, as in the reference */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[150%] transition-opacity duration-500",
          dark ? "bg-gradient-to-b from-black/55 to-transparent" : "bg-gradient-to-b from-background/95 via-background/70 to-transparent",
          scrolled || dark ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="relative flex h-header items-center justify-between gap-6 px-gutter">
        <div className="flex items-center gap-6 xl:gap-9">
          <Link href="/" className="text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]" aria-label={`${site.name} home`}>
            {site.wordmark}
          </Link>
          <nav aria-label="Shop" className="hidden lg:block">
            <ul className="meta flex gap-6 xl:gap-8">
              {shopNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink(l.href)} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav aria-label="Main" className="hidden lg:flex lg:flex-1 lg:justify-center xl:absolute xl:left-1/2 xl:-translate-x-1/2">
          <ul className="meta flex gap-6 xl:gap-10">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={navLink(l.href)} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 lg:gap-6">
          <button type="button" onClick={() => openPanel("search")} aria-label="Search" className="p-1">
            <Search size={19} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            onClick={() => openPanel("wishlist")}
            aria-label={`Saved pieces (${wishlist.length})`}
            className="relative hidden p-1 sm:block"
          >
            <Bookmark size={19} strokeWidth={1.4} />
            <Badge count={wishlist.length} dark={dark} />
          </button>
          <button type="button" onClick={() => openPanel("cart")} aria-label={`Bag (${cartCount})`} className="relative p-1">
            <ShoppingBag size={19} strokeWidth={1.4} />
            <Badge count={cartCount} dark={dark} />
          </button>
          <button
            type="button"
            onClick={() => openPanel("menu")}
            aria-expanded={panel === "menu"}
            aria-haspopup="dialog"
            className="eyebrow -mr-1 p-1 lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
