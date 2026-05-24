import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import NewsletterFooterBar from '@/components/NewsletterFooterBar'

export const metadata: Metadata = {
  title: {
    default: 'Find an IBCLC Near You | IBCLCDirectory.com',
    template: '%s | IBCLCDirectory.com',
  },
  description:
    'Find a board-certified IBCLC (lactation consultant) near you. Search by city, state, insurance, or specialty. Real support for breastfeeding families.',
  keywords: [
    'IBCLC',
    'lactation consultant',
    'breastfeeding support',
    'find lactation consultant',
    'IBCLC near me',
    'breastfeeding help',
  ],
  authors: [{ name: 'IBCLCDirectory.com' }],
  creator: 'IBCLCDirectory.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ibclcdirectory.com',
    siteName: 'IBCLCDirectory.com',
    title: 'Find an IBCLC Near You | IBCLCDirectory.com',
    description:
      'Find a board-certified lactation consultant near you. Search by city, insurance, and specialty. Free to search, free to list.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ibclcdirectory.com'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'IBCLCDirectory.com — Find Breastfeeding Support Near You',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find an IBCLC Near You | IBCLCDirectory.com',
    description: 'Find a board-certified lactation consultant near you.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ibclcdirectory.com'),
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
      </body>
    </html>
  )
}
