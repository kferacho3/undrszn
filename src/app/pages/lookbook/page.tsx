import type { Metadata } from "next";
import { LookbookGrid } from "@/components/LookbookGrid";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Lookbook", description: "Every frame: product views, campaign portraits, studio moments and film stills." };

export default function LookbookPage() {
  return (
    <>
      <PageIntro
        kicker="The visual archive"
        title="Every frame."
        body="Product views, campaign portraits, studio moments, and film stills. All original UNDR imagery."
      />
      <LookbookGrid />
    </>
  );
}
