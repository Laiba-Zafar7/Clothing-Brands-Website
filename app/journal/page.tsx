import type { Metadata } from "next";
import { articles } from "@/data/journal";
import { PageIntro } from "@/components/sections/PageIntro";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the workroom: what we are making, where the cloth comes from, and how to make clothes last.",
};

export default function JournalPage() {
  return (
    <>
      <PageIntro
        eyebrow="Journal"
        title="Notes from the workroom."
        intro="What we are making, where the cloth comes from, and the details that decide how long a garment lasts."
        scrub
      />
      <section data-header="light" aria-label="Articles" className="bg-background px-inset pb-section">
        <ul className="grid gap-x-8 gap-y-20 md:grid-cols-2 lg:gap-x-12 lg:gap-y-28">
          {articles.map((article, i) => (
            <li key={article.slug} className={i % 2 === 1 ? "md:mt-32" : undefined}>
              <Reveal>
                <ArticleCard article={article} priority={i < 2} sizes="(min-width: 768px) 45vw, 100vw" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
