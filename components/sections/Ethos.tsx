import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "./WordReveal";

export function Ethos() {
  return (
    <section
      data-header="light"
      aria-labelledby="ethos-title"
      className="relative z-10 grid bg-background lg:sticky lg:top-0 lg:h-svh lg:grid-cols-2"
    >
      <div className="flex flex-col justify-center px-inset py-section lg:py-0 lg:pr-[4vw]">
        <div className="max-w-[640px]">
          <Reveal className="flex items-end justify-between border-b border-border pb-3">
            <span className="copy text-muted">Slow-made, season after season.</span>
            <h2 id="ethos-title" className="eyebrow text-muted">
              Ethos
            </h2>
          </Reveal>
          <WordReveal
            as="p"
            className="display-md mt-8 lg:mt-10"
            text="At Kairo we don’t follow the season; we make pieces that quietly outlast it."
          />
          <Reveal className="mt-10 border-t border-border pt-6" delay={150}>
            <p className="copy max-w-[52ch] text-foreground/75">
              Every piece is cut from mill-finished cloth and finished by hand in runs of forty to two hundred. We would
              rather make fewer things, and make them properly.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
        <Image
          src="/images/editorial/rack.jpg"
          alt="Pale jackets hanging on wooden hangers in the studio"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
