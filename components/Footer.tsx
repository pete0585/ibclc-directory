import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-700 text-charcoal-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-300/20">
                <Heart className="h-4 w-4 text-sage-300 fill-sage-300" />
              </div>
              <span className="font-serif text-lg font-bold text-white">
                Lactation Consultant<span className="text-sage-300">Directory</span>
              </span>
            </Link>
            <p className="text-sm text-charcoal-200 max-w-sm leading-relaxed">
              The nationwide directory of International Board Certified Lactation Consultants.
              Connecting families with qualified lactation professionals since 2024.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Families</h3>
            <ul className="space-y-2.5">
              <li><Link href="/listings" className="text-sm text-charcoal-200 hover:text-white transition-colors">Find a Lactation Consultant</Link></li>
              <li><Link href="/resources/what-is-an-ibclc" className="text-sm text-charcoal-200 hover:text-white transition-colors">What is a Lactation Consultant?</Link></li>
              <li><Link href="/listings?visitType=virtual" className="text-sm text-charcoal-200 hover:text-white transition-colors">Telehealth Consultants</Link></li>
              <li><Link href="/listings?visitType=home" className="text-sm text-charcoal-200 hover:text-white transition-colors">Home Visit Consultants</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Practitioners</h3>
            <ul className="space-y-2.5">
              <li><Link href="/submit" className="text-sm text-charcoal-200 hover:text-white transition-colors">List Your Practice</Link></li>
              <li><Link href="/submit#pricing" className="text-sm text-charcoal-200 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/admin" className="text-sm text-charcoal-200 hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Related Directories</h3>
            <ul className="space-y-2.5">
              <li><a href="https://menopausedirectory.co" target="_blank" rel="noopener" className="text-sm text-charcoal-200 hover:text-white transition-colors">Menopause Directory</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-charcoal-600 pt-8">
          <p className="text-xs text-charcoal-400 max-w-3xl leading-relaxed mb-4">
            Lactation Consultant Directory is an independent directory and is not affiliated with, endorsed by, or sponsored by IBLCE or the IBCLC Commission. IBCLC and International Board Certified Lactation Consultant are certification marks of the International Board of Lactation Consultant Examiners, used here only to identify professionals who hold that credential.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-charcoal-300">© {currentYear} LactationConsultantDirectory.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
