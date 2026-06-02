import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import NewsletterFooterBar from '@/components/NewsletterFooterBar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'Find a Lactation Consultant Near You | LactationConsultantDirectory.com',
    template: '%s | LactationConsultantDirectory.com',
  },
  description:
    'Find a board-certified lactation consultant (IBCLC) near you. Search by city, state, insurance, or specialty. Real support for breastfeeding families.',
  keywords: [
    'IBCLC',
    'lactation consultant',
    'breastfeeding support',
    'find lactation consultant',
    'IBCLC near me',
    'breastfeeding help',
  ],
  authors: [{ name: 'LactationConsultantDirectory.com' }],
  creator: 'LactationConsultantDirectory.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lactationconsultantdirectory.com',
    siteName: 'LactationConsultantDirectory.com',
    title: 'Find a Lactation Consultant Near You | LactationConsultantDirectory.com',
    description:
      'Find a board-certified lactation consultant near you. Search by city, insurance, and specialty. Free to search, free to list.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lactationconsultantdirectory.com'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LactationConsultantDirectory.com — Find Breastfeeding Support Near You',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Lactation Consultant Near You | LactationConsultantDirectory.com',
    description: 'Find a board-certified lactation consultant near you.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lactationconsultantdirectory.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <NewsletterFooterBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
