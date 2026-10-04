import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about sizing, an order in flight or a repair — write to the Kairo studio.",
};

const details = [
  { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Studios", value: site.cities },
];

export default function ContactPage() {
  return (
    <section className="grid lg:min-h-svh lg:grid-cols-2">
      <div data-header="light" className="flex flex-col items-center justify-center bg-background px-gutter pb-20 pt-[calc(var(--header-h)+10svh)] text-center lg:pb-16">
        <Reveal as="p" className="text-sm">
          Get in touch
        </Reveal>
        <h1 className="display-xl mt-6">
          <RevealLines lines={["Let’s talk"]} delay={100} />
        </h1>
        <Reveal as="p" className="copy mt-8 max-w-[46ch]" delay={250}>
          Whether it is a question about sizing, an order in flight, or a repair on something we made years ago — write
          to us and a real person will answer.
        </Reveal>
        <dl className="mt-14 space-y-8">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={350 + i * 80}>
              <dt className="eyebrow text-muted">{d.label}</dt>
              <dd className="mt-2 text-sm">
                {d.href ? (
                  <a href={d.href} className="link-line">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div data-header="dark" className="relative overflow-hidden bg-black text-white">
        <Image src="/images/editorial/studio.jpg" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-45" />
        <div className="relative px-gutter py-20 lg:px-[5vw] lg:pb-16 lg:pt-[calc(var(--header-h)+6svh)]">
          <h2 className="sr-only">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
