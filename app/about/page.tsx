import type { Metadata } from "next";
import Image from "next/image";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Cross } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/sections/Newsletter";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About",
  description: "A London studio making cold-weather tailoring, knitwear and accessories in small runs, finished by hand.",
};

const chapters = [
  {
    n: "01",
    title: "Our Philosophy",
    text: "Fewer, better things. We design a small wardrobe each season that works with the last one and the next — so nothing is ever out of date, only more worn in.",
    image: { src: "/images/editorial/folded.jpg", alt: "Folded black and white knitwear on a white chair" },
  },
  {
    n: "02",
    title: "Our Craftsmanship",
    text: "Mill-finished cloth, generous seam allowances, seven stitches to the centimetre. Every piece is checked by the person who cut it before it leaves the studio.",
    image: { src: "/images/editorial/linen.jpg", alt: "A linen top hanging from a branch in soft light" },
  },
];

const studios = [
  { city: "London", address: "14 Cheshire Street, E2", note: "Studio & workroom" },
  { city: "Milan", address: "Via Tortona 27", note: "Showroom, by appointment" },
  { city: "Seoul", address: "Hannam-daero 42", note: "Opening spring 2027" },
];

export default function AboutPage() {
  return (
    <>
      {/* Opening split */}
      <section data-header="light" aria-labelledby="about-title" className="grid bg-background lg:h-svh lg:grid-cols-[5fr_7fr]">
        <div data-header="dark" className="relative h-[70svh] lg:h-full">
          <BackgroundVideo src="/videos/atelier.mp4" poster="/images/editorial/atelier-poster.jpg" priority sizes="(min-width: 1024px) 42vw, 100vw" />
        </div>
        <div className="flex flex-col justify-between gap-16 px-inset pb-12 pt-16 lg:pb-[8svh] lg:pl-[5vw] lg:pt-[calc(var(--header-h)+6svh)]">
          <h1 id="about-title" className="display-xl max-w-[9ch]">
            <RevealLines lines={["Small runs,", "finished by", "hand."]} delay={150} />
          </h1>
          <Reveal as="p" className="copy max-w-[60ch]" delay={500}>
            Orelle is a London studio for cold-weather tailoring, knitwear and quiet accessories. We cut outerwear and
            knitwear from mill-finished cloth in runs small enough that every piece passes through the same few pairs of
            hands.
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      {chapters.map((c, i) => (
        <section key={c.n} data-header="light" aria-labelledby={`chapter-${c.n}`} className="grid bg-background lg:min-h-svh lg:grid-cols-2">
          <div className={cn("flex flex-col items-center justify-center px-gutter py-section text-center", i % 2 === 1 && "lg:order-2")}>
            <Reveal as="p" className="eyebrow text-muted">
              {c.n}
            </Reveal>
            <Reveal as="h2" mask id={`chapter-${c.n}`} className="display-md mt-6" delay={100}>
              {c.title}
            </Reveal>
            <Reveal delay={200} className="mt-6">
              <Cross className="h-6 w-6" />
            </Reveal>
            <Reveal as="p" className="copy mt-8 max-w-[44ch] text-foreground/75" delay={300}>
              {c.text}
            </Reveal>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
            <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </section>
      ))}

      {/* Studio + places */}
      <section data-header="light" aria-labelledby="studios-title" className="bg-background px-inset py-section">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-2">
            <Reveal className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/editorial/studio.jpg" alt="The Orelle studio with rails, a low table and a paper lantern" fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
            </Reveal>
            <Reveal className="relative mt-2 aspect-[16/10] overflow-hidden lg:ml-[20%]" delay={120}>
              <Image src="/images/editorial/rack.jpg" alt="Jackets waiting on wooden hangers" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            </Reveal>
          </div>
          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <Reveal as="p" className="eyebrow text-muted">
              03
            </Reveal>
            <Reveal as="h2" mask id="studios-title" className="display-md mt-6">
              Where we work
            </Reveal>
            <ul className="mt-12 border-b border-border">
              {studios.map((s, i) => (
                <Reveal as="li" key={s.city} delay={i * 90} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-border py-6">
                  <span className="display-sm">{s.city}</span>
                  <span className="copy text-right text-foreground/70">
                    {s.address}
                    <span className="block text-muted">{s.note}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Newsletter split */}
      <section data-header="light" aria-labelledby="about-news" className="grid bg-background lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[80svh]">
          <Image src="/images/editorial/field.jpg" alt="Two models in black and ivory standing in a windswept field" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-inset py-section lg:pl-[6vw]">
          <Reveal as="h2" mask id="about-news" className="display-lg max-w-[10ch]">
            Join our newsletter
          </Reveal>
          <Reveal as="p" className="copy mt-6 max-w-[46ch]" delay={100}>
            Stay with us for new runs and restocks. We write rarely, and you can leave whenever you like.
          </Reveal>
          <Reveal delay={200} className="mt-12">
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
