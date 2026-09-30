import type { Metadata } from "next";
import { CategoryPage } from "@/components/shop/CategoryPage";
import { categories } from "@/data/site";

export const metadata: Metadata = {
  title: "Men",
  description: categories.men.intro,
};

export default function MenPage() {
  return <CategoryPage category="men" />;
}
