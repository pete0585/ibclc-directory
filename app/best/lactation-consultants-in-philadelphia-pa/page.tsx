import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lactationconsultantdirectory.com"

export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/best/lactation-consultants-in-philadelphia-pa` },
  title: "Best Lactation Consultant in Philadelphia, PA | Lactation Consultant Directory",
  description: "Find lactation consultant in Philadelphia, Pennsylvania. 12+ listed. Filter by city and compare providers.",
}

async function getListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("ibclc_listings")
    .select("*")
    .eq("city", "Philadelphia")
    .eq("state", "PA")
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
        name: "How many lactation consultant are in Philadelphia, PA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lactation Consultant Directory lists 12+ lactation consultant in Philadelphia, Pennsylvania. Counts change as new listings are seeded.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find lactation consultant in Philadelphia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Search lactationconsultantdirectory.com and filter by Philadelphia. Compare listed providers, then contact the one that fits.",
        },
      },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-neutral-500">Philadelphia, PA</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Lactation Consultant in Philadelphia, PA
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          12+ listed lactation consultant in the Philadelphia area. Pages are generated from live directory listings — not outreach.
        </p>
        <p className="mt-2 text-sm text-neutral-500">{listings.length} shown on this page.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {listings.map((row: Record<string, unknown>, i: number) => (
            <li key={String(row.id || row.slug || i)} className="rounded-xl border border-neutral-200 p-4">
              <Link href={listingHref(row)} className="font-semibold hover:underline">
                {listingName(row)}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">
                {String(row.city || "Philadelphia")}, {String(row.state || "PA")}
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
