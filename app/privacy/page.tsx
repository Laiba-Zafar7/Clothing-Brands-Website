import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalUpdated, privacy } from "@/data/legal";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated={legalUpdated} sections={privacy} />;
}
