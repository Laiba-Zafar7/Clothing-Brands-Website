import type { Category } from "@/data/products";
import { categories } from "@/data/site";
import { byCategory } from "@/lib/products";
import { CategoryHero, type Media } from "@/components/sections/CategoryHero";
import { Listing } from "./Listing";

const media: Record<Category, Media> = {
  women: { kind: "video", src: "/videos/women-edit.mp4", poster: "/images/editorial/women-edit-poster.jpg", className: "object-[40%_50%]" },
  men: { kind: "video", src: "/videos/men-hero.mp4", poster: "/images/editorial/men-hero-poster.jpg", className: "object-[45%_50%]" },
  accessories: {
    kind: "images",
    images: [
      { src: "/images/editorial/accessories-a.jpg", alt: "Gold square watch and slim cuff on a wrist" },
      { src: "/images/editorial/accessories-b.jpg", alt: "Gold tank watch on a wrist in warm evening light" },
      { src: "/images/editorial/accessories-c.jpg", alt: "Black leather top-handle bag on a white plinth" },
    ],
  },
};

export function CategoryPage({ category }: { category: Category }) {
  const meta = categories[category];
  const products = byCategory(category);
  const listingId = `${category}-pieces`;

  return (
    <>
      <CategoryHero
        title={meta.title}
        intro={meta.intro}
        targetId={listingId}
        media={media[category]}
      />
      <Listing
        id={listingId}
        products={products}
        label={meta.label}
        groupBy="type"
        groups={meta.types.map((t) => ({ key: t, label: t }))}
      />
    </>
  );
}
