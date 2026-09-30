import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/journal";
import { formatDate } from "@/lib/format";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

type Params = { params: Promise<{ slug: string }> };

const find = (slug: string) => articles.find((a) => a.slug === slug);

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = find((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt, openGraph: { images: [article.image] } };
}

export default async function ArticlePage({ params }: Params) {
  const article = find((await params).slug);
  if (!article) notFound();

  const index = articles.indexOf(article);
  const next = [1, 2].map((o) => articles[(index + o) % articles.length]);

  return (
    <article>
      <header data-header="light" className="bg-background px-gutter pb-14 pt-[calc(var(--header-h)+10svh)] text-center">
        <Reveal as="p" className="eyebrow text-muted">
          {article.category} · {article.minutes} min read
        </Reveal>
        <h1 className="display-lg mx-auto mt-8 max-w-[16ch]">
          <RevealLines lines={[article.title]} delay={100} />
        </h1>
        <Reveal as="p" className="eyebrow mt-8 text-muted" delay={250}>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </Reveal>
      </header>

      <div data-header="light" className="bg-background px-gutter lg:px-inset">
        <Reveal className="relative mx-auto aspect-[4/5] max-w-[1200px] overflow-hidden sm:aspect-[16/9]">
          <Image src={article.image} alt={article.alt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="animate-[hero-zoom_2.4s_var(--ease-out)_both] object-cover" />
        </Reveal>
      </div>

      <div data-header="light" className="bg-background px-gutter py-section">
        <div className="mx-auto max-w-[640px]">
          <p className="display-sm">{article.excerpt}</p>
          {article.body.map((block, i) => (
            <section key={i} className="mt-10">
              {block.heading && <h2 className="eyebrow mb-4">{block.heading}</h2>}
              <p className="text-[16px] leading-[1.75] text-foreground/85">{block.text}</p>
            </section>
          ))}
          <p className="mt-16 border-t border-border pt-6">
            <Link href="/journal" className="eyebrow link-line">
              ← All notes
            </Link>
          </p>
        </div>
      </div>

      <section data-header="light" aria-labelledby="more-notes" className="bg-background px-inset pb-section">
        <h2 id="more-notes" className="display-md">
          More from the journal
        </h2>
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {next.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} sizes="(min-width: 768px) 45vw, 100vw" />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
