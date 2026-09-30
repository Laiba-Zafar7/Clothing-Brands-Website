import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/journal";

export function ArticleCard({ article, sizes, priority }: { article: Article; sizes: string; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/journal/${article.slug}`} className="block">
        <span className="relative block aspect-[4/3] overflow-hidden bg-neutral-200">
          <Image
            src={article.image}
            alt={article.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
        </span>
        <span className="eyebrow mt-6 block text-muted">
          {article.category} · {article.minutes} min
        </span>
        <h3 className="display-sm mt-3">
          <span className="link-line">{article.title}</span>
        </h3>
        <p className="copy mt-3 max-w-[56ch] text-foreground/70">{article.excerpt}</p>
      </Link>
    </article>
  );
}
