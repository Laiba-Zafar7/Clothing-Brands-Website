import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalUpdated, shipping } from "@/data/legal";

export const metadata: Metadata = { title: "Shipping & Returns" };

export default function ShippingPage() {
  return <LegalPage title="Shipping & Returns" updated={legalUpdated} sections={shipping} />;
}
