"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { footerShop, mainNav, site } from "@/data/site";
import { useStore } from "@/lib/store";
import { Drawer } from "@/components/ui/Drawer";
import { cn } from "@/lib/cn";

export function MobileNav() {
  const { panel, closePanel } = useStore();
  const pathname = usePathname();
  const open = panel === "menu";

  // Close when navigating.
  useEffect(() => {
    closePanel();
  }, [pathname, closePanel]);

  const links = [...footerShop, ...mainNav.filter((l) => l.href !== "/")];

  return (
    <Drawer open={open} onClose={closePanel} title="Menu" side="full" tone="dark">
      <nav aria-label="Mobile" className="flex min-h-full flex-col justify-between px-gutter pb-8 pt-6">
        <ul className="space-y-1">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={cn("transition-[opacity,transform] duration-700 ease-out", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
            >
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-[1.15] tracking-[-0.02em] aria-[current=page]:italic"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="copy mt-12 space-y-1 text-white/55">
          <p>{site.email}</p>
          <p>{site.cities}</p>
        </div>
      </nav>
    </Drawer>
  );
}
