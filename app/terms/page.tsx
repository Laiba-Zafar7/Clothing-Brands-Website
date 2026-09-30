import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalUpdated, terms } from "@/data/legal";

export const metadata: Metadata = { title: "Terms of Sale" };

export default function TermsPage() {
  return <LegalPage title="Terms of Sale" updated={legalUpdated} sections={terms} />;
}
