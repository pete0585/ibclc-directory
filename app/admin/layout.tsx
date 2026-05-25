import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { LayoutDashboard, List, LogOut } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    // ADMIN_EMAIL must be set — fail closed, not open
    console.error('ADMIN_EMAIL env var is not set. Denying all admin access.')
    redirect('/')
  }
  if (user.email !== adminEmail) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen bg-ivory-50">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-charcoal-700 text-white hidden md:flex flex-col">
        <div className="p-5 border-b border-charcoal-600">
          <p className="font-serif text-sm font-bold text-sage-300">IBCLC Directory</p>
          <p className="text-xs text-charcoal-300 mt-0.5">Admin Panel</p>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-600 hover:text-white transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin?tab=pending"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-600 hover:text-white transition-colors"
          >
            <List className="h-4 w-4" />
            Pending Listings
          </Link>
          <Link
            href="/admin?tab=active"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-600 hover:text-white transition-colors"
          >
            <List className="h-4 w-4" />
            Active Listings
          </Link>
        </nav>
        <div className="p-3 border-t border-charcoal-600">
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2.5 text-sm text-charcoal-300 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
