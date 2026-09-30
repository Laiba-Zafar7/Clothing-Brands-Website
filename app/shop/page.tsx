import type { Metadata } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/site";
import { PageIntro } from "@/components/sections/PageIntro";
import { Listing } from "@/components/shop/Listing";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Every piece in the current collection — womenswear, menswear and accessories.",
};

const groups = (Object.keys(categories) as (keyof typeof categories)[]).map((key) => ({ key, label: categories[key].title }));
const colourNames = new Set(products.map((p) => p.colour.name));

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ colour?: string; category?: string }> }) {
  const { colour, category } = await searchParams;
  const initial = {
    colours: colour && colourNames.has(colour) ? [colour] : [],
    group: category && category in categories ? category : "all",
  };

  return (
    <>
      <PageIntro
        eyebrow="The collection"
        title="Every piece."
        intro="Womenswear, menswear and accessories — made in small runs, finished by hand, and meant to be worn for years."
      />
      <Listing key={JSON.stringify(initial)} id="all-pieces" products={products} label="Collection" groupBy="category" groups={groups} initial={initial} />
    </>
  );
}
