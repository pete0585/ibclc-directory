# IBCLCDirectory.com

Nationwide directory of International Board Certified Lactation Consultants. Built for postpartum families who need real breastfeeding support — not another clinician portal.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase · Stripe · Vercel

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `SUPABASE_SERVICE_KEY` — Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook secret (from Stripe dashboard)
- `STRIPE_PRO_PRICE_ID` — Stripe Price ID for $79/year Pro plan
- `STRIPE_VERIFIED_PRICE_ID` — Stripe Price ID for $129/year Verified plan
- `RESEND_API_KEY` — Resend API key for transactional email
- `RESEND_FROM_EMAIL` — Sender email (e.g. hello@ibclcdirectory.com)
- `NEXT_PUBLIC_SITE_URL` — Full site URL (e.g. https://ibclcdirectory.com)
- `ADMIN_EMAIL` — Your email for admin panel access

### 3. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the migration in the Supabase SQL editor:

```bash
# Copy and paste the contents of supabase/migrations/001_initial_schema.sql
# into the Supabase dashboard → SQL Editor and run it
```

Or use the Supabase CLI:
```bash
supabase db push
```

### 4. Set up Stripe

1. Create two products in the [Stripe dashboard](https://dashboard.stripe.com):
   - **IBCLC Directory Pro** — $79/year recurring → copy the Price ID to `STRIPE_PRO_PRICE_ID`
   - **IBCLC Directory Verified** — $129/year recurring → copy the Price ID to `STRIPE_VERIFIED_PRICE_ID`

2. Set up a webhook endpoint:
   - URL: `https://ibclcdirectory.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### 5. Seed sample data

```bash
npm run seed
```

This seeds ~150 sample listings across 110+ US cities for UI testing. For real data, use the `data-seeder` agent in the AIdam pipeline.

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment on Vercel

### 1. Create Vercel project

1. Go to [vercel.com](https://vercel.com) → Import from GitHub
2. Import `pete0585/ibclc-directory` (or the repo this is pushed to)
3. Framework: **Next.js** (auto-detected)
4. Root directory: leave as default

### 2. Add environment variables

Add all variables from `.env.example` to Vercel's Environment Variables settings.

### 3. Deploy

Push to `main` branch — Vercel auto-deploys.

### 4. After deploy

1. Add the domain `ibclcdirectory.com` in Vercel → Domains
2. Submit sitemap: [Google Search Console](https://search.google.com/search-console) → Add property → Submit `https://ibclcdirectory.com/sitemap.xml`
3. Request indexing for the homepage, a few city pages, and the "What is an IBCLC?" page

---

## Architecture

```
app/
  page.tsx                     # Homepage (hero + search + featured)
  ibclc/[slug]/page.tsx        # Individual listing detail page
  listings/page.tsx            # Browse all with filter sidebar
  find/[state]/page.tsx        # State landing page (SEO)
  find/[state]/[city]/page.tsx # City landing page (SEO core)
  submit/page.tsx              # New listing submission
  claim/[id]/page.tsx          # Claim verification + upgrade flow
  resources/what-is-an-ibclc/  # Informational SEO page
  admin/page.tsx               # Admin panel (auth-gated)
  api/
    submit/                    # New listing POST
    claim/                     # Claim email send + verify
    upgrade/                   # Stripe checkout session
    webhooks/stripe/           # Stripe event handling
    admin/listing/[id]/        # Admin approve/suspend
```

### URL structure (SEO-optimized)
- `/ibclc/[slug]` — listing detail (e.g. `/ibclc/sarah-jones-ibclc-austin-tx`)
- `/find/tx/austin-tx` — city landing page
- `/find/tx` — state landing page
- `/listings?state=TX&specialty=Tongue+Tie` — filtered browse

### Revenue flow
1. IBCLCs submit free listing via `/submit`
2. Claim email sent with verification token
3. After verification, upgrade prompt shown at `/claim/[id]`
4. Stripe checkout created via `/api/upgrade`
5. Stripe webhook at `/api/webhooks/stripe` handles `checkout.session.completed` → updates `listings.plan_tier`

---

## Admin Access

Go to `/admin`. You'll be redirected to Supabase Auth login. Only the email in `ADMIN_EMAIL` env var can access the panel.

Approve/reject pending listings from the dashboard. Pending listings are auto-submitted from the `/submit` form.

---

## Data Seeding (Production)

Use the AIdam `data-seeder` agent to populate real listings:

1. The agent queries DataForSEO SERP for "IBCLC [city]" across 150 US cities (~$0.45 total)
2. Results are geocoded and inserted into Supabase with `status: 'active', claimed: false`
3. The `outreach` agent then emails unclaimed listings with a claim link

---

## Revenue Model

| Tier | Price | Features |
|------|-------|----------|
| Free | $0/year | Name, city, state, basic info |
| Pro | $79/year | Photo, bio, specialties, contact form, priority placement |
| Verified | $129/year | Everything in Pro + credential verified against IBLCE registry |

One new client pays for a Pro listing 2× over (IBCLCs charge $150-250/initial visit).
