import type { Metadata } from "next";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { FaqList } from "@/components/sections/FaqList";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Delivery, returns, sizing, repairs and care — the questions we are asked most.",
};

export default function FaqPage() {
  return (
    <section className="grid lg:grid-cols-[5fr_7fr]">
      <div data-header="dark" className="relative h-[60svh] bg-black text-white lg:sticky lg:top-0 lg:h-svh">
        <BackgroundVideo src="/videos/faq.mp4" poster="/images/editorial/faq-poster.jpg" priority sizes="(min-width: 1024px) 42vw, 100vw" mediaClassName="object-[50%_30%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-black/35" />
        <div className="relative flex h-full items-center justify-center">
          <h1 className="display-xl">
            <RevealLines lines={["FAQ"]} delay={150} />
          </h1>
        </div>
      </div>
      <div data-header="light" className="bg-background px-gutter pb-section pt-16 lg:px-[5vw] lg:pt-[calc(var(--header-h)+8svh)]">
        <Reveal as="p" className="copy mb-14 max-w-[62ch]">
          Below are the things we are asked most. If yours is not here, write to us at{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>{" "}
          — a real person reads every message and will come back to you.
        </Reveal>
        <FaqList items={faqs} />
      </div>
    </section>
  );
}
