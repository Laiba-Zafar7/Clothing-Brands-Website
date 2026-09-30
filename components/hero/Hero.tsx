import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Cross } from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface Panel {
  src: string;
  poster: string;
  /** object-position keeping the models in frame inside a portrait half */
  focus: string;
  className?: string;
}

const panels: Panel[] = [
  {
    src: "/videos/hero-left.mp4",
    poster: "/images/editorial/hero-left-poster.jpg",
    focus: "object-[62%_50%]",
    className: "hidden lg:block",
  },
  {
    src: "/videos/hero-right.mp4",
    poster: "/images/editorial/hero-right-poster.jpg",
    focus: "object-[76%_50%] lg:object-[82%_50%]",
  },
];

export function Hero() {
  return (
    <section data-header="dark" aria-labelledby="hero-title" className="sticky top-0 h-svh min-h-[560px] overflow-hidden bg-black text-white">
      <div className="grid h-full animate-[hero-zoom_2.4s_var(--ease-out)_both] lg:grid-cols-2">
        {panels.map((panel) => (
          <div key={panel.src} className={cn("relative h-full", panel.className)}>
            <BackgroundVideo src={panel.src} poster={panel.poster} priority sizes="(min-width: 1024px) 50vw, 100vw" mediaClassName={panel.focus} />
          </div>
        ))}
      </div>

      {/* Legibility: an even veil plus a deeper fall-off behind the headline */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

      {/* centre cross + note, as in the reference */}
      <div className="pointer-events-none absolute left-1/2 top-[30%] hidden -translate-x-1/2 flex-col items-center lg:flex">
        <Cross className="h-16 w-16 animate-[fade-in_1.2s_var(--ease-out)_0.6s_both]" />
        <p className="copy mt-8 max-w-[34ch] animate-[fade-in_1.2s_var(--ease-out)_0.9s_both] text-center">
          Step into a season built on texture, proportion and restraint — and the hands that finish every piece.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-gutter pb-[max(2.5rem,6svh)] lg:pl-[19vw]">
        <h1 id="hero-title" className="display-xl">
          <RevealLines lines={["Quiet form,", "lasting presence."]} delay={250} stagger={140} />
        </h1>
      </div>
    </section>
  );
}
