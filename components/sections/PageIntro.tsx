import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "./WordReveal";
import { cn } from "@/lib/cn";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Scroll-scrubbed grey→black word reveal (journal) instead of a mask rise */
  scrub?: boolean;
  className?: string;
}

/** Centred editorial page opener: eyebrow, oversized serif title, uppercase intro. */
export function PageIntro({ eyebrow, title, intro, scrub, className }: PageIntroProps) {
  return (
    <header data-header="light" className={cn("bg-background px-gutter pb-16 pt-[calc(var(--header-h)+14svh)] text-center lg:pb-24", className)}>
      <Reveal as="p" className="eyebrow text-muted">
        {eyebrow}
      </Reveal>
      {scrub ? (
        <WordReveal as="h1" text={title} className="display-xl mx-auto mt-8 max-w-[12ch]" from={0.22} />
      ) : (
        <Reveal as="h1" mask className="display-xl mt-8" delay={100}>
          {title}
        </Reveal>
      )}
      {intro && (
        <Reveal as="p" className="copy mx-auto mt-8 max-w-[52ch]" delay={220}>
          {intro}
        </Reveal>
      )}
    </header>
  );
}
