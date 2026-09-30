import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "inverse";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-white hover:bg-neutral-800",
  inverse: "bg-white text-black hover:bg-neutral-200",
  outline: "border border-current/40 hover:border-current hover:bg-current/5",
};

const base =
  "inline-flex items-center justify-center gap-2 eyebrow whitespace-nowrap transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40";
const padding = "h-11 px-6";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = "solid", className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, padding, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "solid", className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, padding, variants[variant], className)}>
      {children}
    </Link>
  );
}

/** Thin decorative cross used throughout the reference (hero, edit panels). */
export function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-10 w-10", className)} aria-hidden="true">
      <path d="M20 0v40M0 20h40" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
