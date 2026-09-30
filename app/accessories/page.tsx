import type { Metadata } from "next";
import { CategoryPage } from "@/components/shop/CategoryPage";
import { categories } from "@/data/site";

export const metadata: Metadata = {
  title: "Accessories",
  description: categories.accessories.intro,
};

export default function AccessoriesPage() {
  return <CategoryPage category="accessories" />;
}
