import type { Metadata } from "next";
import { CategoryPage } from "@/components/shop/CategoryPage";
import { categories } from "@/data/site";

export const metadata: Metadata = {
  title: "Women",
  description: categories.women.intro,
};

export default function WomenPage() {
  return <CategoryPage category="women" />;
}
