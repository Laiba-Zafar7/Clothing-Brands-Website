import Link from "next/link";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Reveal } from "@/components/ui/Reveal";

export function Capsule() {
  return (
    <section data-header="dark" aria-labelledby="capsule-title" className="relative z-10 grid bg-black text-white lg:min-h-svh lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-gutter py-section text-center">
        <Reveal as="p" className="eyebrow text-white/60">
          Capsule
        </Reveal>
        <Reveal as="h2" mask id="capsule-title" className="display-lg mt-8" delay={100}>
          Monochrome
        </Reveal>
        <Reveal as="p" className="copy mt-8 max-w-[40ch] text-white/75" delay={200}>
          A capsule with the colour taken out. What is left is cut, proportion and cloth.
        </Reveal>
        <Reveal delay={300} className="mt-10">
          <Link href="/shop?colour=Ink" className="meta link-line">
            Shop the capsule
          </Link>
        </Reveal>
      </div>
      <div className="relative aspect-[4/5] lg:aspect-auto">
        <BackgroundVideo
          src="/videos/capsule.mp4"
          poster="/images/editorial/capsule-poster.jpg"
          sizes="(min-width: 1024px) 50vw, 100vw"
          mediaClassName="grayscale object-[50%_25%]"
        />
      </div>
    </section>
  );
}
