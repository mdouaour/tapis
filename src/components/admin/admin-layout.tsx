'use client'

import { useState, useCallback } from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'products', icon: Package },
  { href: '/admin/categories', label: 'categories', icon: Tags },
  { href: '/admin/orders', label: 'orders', icon: ShoppingCart },
] as const

interface AdminLayoutProps {
  children: React.ReactNode
  admin: { name: string; email: string }
}

export function AdminLayout({ children, admin }: AdminLayoutProps) {
  const t = useTranslations('admin')
  const commonT = useTranslations('common')
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      document.cookie = 'admin_session=; path=/; max-age=0'
    }
    router.push('/admin/login')
  }, [router])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 z-50 flex w-64 flex-col bg-neutral-900 text-neutral-100 transition-transform duration-200 lg:relative',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-neutral-700/50 px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md gold-gradient text-[10px] font-bold text-white">
            ت
          </div>
          <span className="text-sm font-semibold gold-gradient-text">
            تاپيس
          </span>
          <span className="mr-auto text-[10px] font-medium text-amber-400/70 uppercase tracking-wider">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(href)
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
              )}
            >
              <Icon className="size-4 shrink-0" />
              {t(label)}
            </Link>
          ))}
        </nav>

        {/* Admin info */}
        <div className="border-t border-neutral-700/50 p-3">
          <div className="mb-2 truncate px-3 text-xs text-neutral-500">
            {admin.email}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-neutral-400 hover:bg-neutral-800 hover:text-red-400"
          >
            <LogOut className="size-4" />
            {t('logout')}
          </Button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-14 items-center gap-3 border-b bg-white px-4 shadow-xs">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span className="hidden sm:inline">{commonT('admin')}</span>
          </div>

          <div className="mr-auto flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">
              {admin.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden text-neutral-500 hover:text-red-500 sm:inline-flex"
            >
              <LogOut className="size-4" />
              {t('logout')}
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
