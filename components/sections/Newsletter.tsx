"use client";

import { useId, useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface NewsletterProps {
  title?: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}

export function NewsletterForm({ className }: { className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "done">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "invalid");
  };

  if (state === "done") {
    return (
      <p role="status" className={cn("display-sm", className)}>
        Thank you — you’ll hear from us first.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full max-w-[520px]", className)}>
      <label htmlFor={id} className="eyebrow block text-left text-muted">
        Email address
      </label>
      <div className="mt-2 flex items-end gap-3">
        <input
          id={id}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "invalid") setState("idle");
          }}
          aria-invalid={state === "invalid"}
          aria-describedby={`${id}-hint`}
          placeholder="you@example.com"
          className="meta h-11 flex-1 border-b border-foreground/30 bg-transparent normal-case outline-none transition-colors placeholder:text-muted focus:border-foreground"
        />
        <Button type="submit">Join</Button>
      </div>
      <p id={`${id}-hint`} className={cn("copy mt-4", state === "invalid" ? "text-red-700" : "text-muted")}>
        {state === "invalid" ? "Please enter a valid email address." : "No more than once a month. Unsubscribe anytime."}
      </p>
    </form>
  );
}

export function Newsletter({
  title = "First look, every season.",
  intro = "Early access to each capsule, and the occasional note on how it was made.",
  align = "center",
  className,
}: NewsletterProps) {
  const centered = align === "center";
  return (
    <section data-header="light" aria-labelledby="newsletter-title" className={cn("relative z-10 bg-background py-section", className)}>
      <div className={cn("flex flex-col px-gutter", centered ? "items-center text-center" : "items-start px-inset")}>
        <Reveal as="h2" mask id="newsletter-title" className="display-lg">
          {title}
        </Reveal>
        <Reveal as="p" className="copy mt-6 max-w-[44ch]" delay={120}>
          {intro}
        </Reveal>
        <Reveal delay={220} className={cn("mt-14 w-full", centered && "flex justify-center")}>
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}
