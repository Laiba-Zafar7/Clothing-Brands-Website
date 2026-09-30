import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { RevealLines, Reveal } from "@/components/ui/Reveal";

export type Media =
  | { kind: "video"; src: string; poster: string; className?: string }
  | { kind: "images"; images: { src: string; alt: string }[] };

interface CategoryHeroProps {
  title: string;
  intro: string;
  media: Media;
  targetId: string;
}

/** Full-viewport category opener: film or triptych, centred serif title and "Scroll to discover". */
export function CategoryHero({ title, intro, media, targetId }: CategoryHeroProps) {
  return (
    <section data-header="dark" aria-labelledby="category-title" className="relative h-svh min-h-[520px] overflow-hidden bg-black text-white">
      {media.kind === "video" ? (
        <BackgroundVideo src={media.src} poster={media.poster} priority mediaClassName={media.className} />
      ) : (
        <div className="absolute inset-0 grid grid-cols-3 gap-px">
          {media.images.map((img) => (
            <div key={img.src} className="relative">
              <Image src={img.src} alt={img.alt} fill priority sizes="34vw" className="animate-[hero-zoom_2.4s_var(--ease-out)_both] object-cover" />
            </div>
          ))}
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="relative flex h-full flex-col items-center justify-center px-gutter text-center">
        <h1 id="category-title" className="display-xl">
          <RevealLines lines={[title]} delay={150} />
        </h1>
        <Reveal as="p" className="copy mt-6 max-w-[52ch] text-white/85" delay={400}>
          {intro}
        </Reveal>
        <Reveal delay={600} className="absolute bottom-[8svh]">
          <a
            href={`#${targetId}`}
            className="eyebrow inline-flex h-11 items-center gap-3 border border-white/40 px-6 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Scroll to discover
            <ArrowDown size={13} strokeWidth={1.5} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
