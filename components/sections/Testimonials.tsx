import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1 text-foreground/70" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={13} strokeWidth={1.2} fill={i < rating ? "currentColor" : "none"} aria-hidden="true" />
      ))}
    </div>
  );
}

function Quote({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden || undefined} className={cn("w-[78vw] shrink-0 px-5 sm:w-[46vw] lg:w-[25vw] lg:px-7", hidden && "motion-reduce:hidden")}>
      <figure className="border-t border-border pt-8 text-center">
        <Stars rating={t.rating} />
        <blockquote className="display-sm mt-6">{t.quote}</blockquote>
        <figcaption className="mt-8 flex flex-col items-center gap-4">
          <Image src={t.avatar} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover grayscale-[20%]" />
          <span className="eyebrow text-muted">
            {t.name}, {t.city}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export function Testimonials() {
  return (
    <section data-header="light" aria-labelledby="testimonials-title" className="relative z-10 overflow-hidden bg-background py-section">
      <div className="px-gutter text-center">
        <Reveal as="p" className="eyebrow text-muted">
          Testimonials
        </Reveal>
        <Reveal as="h2" mask id="testimonials-title" className="display-lg mt-6" delay={100}>
          What they say.
        </Reveal>
        <Reveal as="p" className="copy mx-auto mt-6 max-w-[48ch]" delay={200}>
          Notes from the people wearing the clothes. Lightly edited, occasionally very direct.
        </Reveal>
      </div>

      <div className="group mt-16 lg:mt-24">
        <ul className="flex w-max animate-[marquee_80s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:overflow-x-auto">
          {testimonials.map((t) => (
            <Quote key={t.name} t={t} />
          ))}
          {testimonials.map((t) => (
            <Quote key={`${t.name}-loop`} t={t} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
