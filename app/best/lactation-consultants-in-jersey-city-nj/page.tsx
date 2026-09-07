import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Best Lactation Consultant in Jersey City, NJ | Lactation Consultant Directory",
  description: "Find lactation consultant in Jersey City, New Jersey. 13+ listed. Filter by city and compare providers.",
}

async function getListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("ibclc_listings")
    .select("*")
    .eq("city", "Jersey City")
    .eq("state", "NJ")
    .eq("status", "active")
    .limit(24)
  return data ?? []
}

function listingName(row: Record<string, unknown>) {
  return (
    (row["name"] as string) ||
    (row.name as string) ||
    (row.full_name as string) ||
    (row.clinic_name as string) ||
    "Listing"
  )
}

function listingHref(row: Record<string, unknown>) {
  const slug = String(row.slug || "")
  return "/lactation-consultant/SLUG".replace("SLUG", slug)
}

export default async function CityPage() {
  const listings = await getListings()
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many lactation consultant are in Jersey City, NJ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lactation Consultant Directory lists 13+ lactation consultant in Jersey City, New Jersey. Counts change as new listings are seeded.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find lactation consultant in Jersey City?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Search lactationconsultantdirectory.com and filter by Jersey City. Compare listed providers, then contact the one that fits.",
        },
      },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-neutral-500">Jersey City, NJ</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Lactation Consultant in Jersey City, NJ
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          13+ listed lactation consultant in the Jersey City area. Pages are generated from live directory listings — not outreach.
        </p>
        <p className="mt-2 text-sm text-neutral-500">{listings.length} shown on this page.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {listings.map((row: Record<string, unknown>, i: number) => (
            <li key={String(row.id || row.slug || i)} className="rounded-xl border border-neutral-200 p-4">
              <Link href={listingHref(row)} className="font-semibold hover:underline">
                {listingName(row)}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">
                {String(row.city || "Jersey City")}, {String(row.state || "NJ")}
              </p>
            </li>
          ))}
        </ul>
        {listings.length === 0 && (
          <p className="mt-8 text-neutral-500">Listings for this city are still being seeded.</p>
        )}
      </main>
    </>
  )
}
