import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/SearchView";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <>
      <PageIntro kicker="Find your piece" title="Search UNDR." />
      <Suspense>
        <SearchView />
      </Suspense>
    </>
  );
}
