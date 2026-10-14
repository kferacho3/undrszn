import type { Metadata } from "next";
import { CollectionView } from "@/components/CollectionView";
import { Newsletter } from "@/components/Newsletter";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "The collection" };

export default function CollectionPage() {
  return (
    <>
      <PageIntro kicker="The Dirty Rodman collection" title="Make it yours." body="A focused collection. Pick your color, see the details, and find your fit." />
      <CollectionView />
      <Newsletter />
    </>
  );
}
