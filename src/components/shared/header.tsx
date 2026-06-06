'use client'

import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { useCart } from '@/hooks/use-cart'
import { Search, ShoppingCart, Menu, Phone, Globe, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const categories = [
  { slug: 'traditional', ar: 'سجاد تقليدي', fr: 'Tapis Traditionnels' },
  { slug: 'modern', ar: 'سجاد عصري', fr: 'Tapis Modernes' },
  { slug: 'berber', ar: 'زرابي بربرية', fr: 'Kilims Berbères' },
  { slug: 'constantine', ar: 'زربية قسنطينية', fr: 'Kilim de Constantine' },
  { slug: 'wool', ar: 'سجاد صوفي', fr: 'Tapis en Laine' },
  { slug: 'silk', ar: 'سجاد حريري', fr: 'Tapis en Soie' },
  { slug: 'prayer', ar: 'سجاد صلاة', fr: 'Tapis de Prière' },
]

const WHATSAPP_NUMBER = '+213555555555'

export function Header() {
  const t = useTranslations()
  const locale = useLocale() as 'ar' | 'fr'
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const q = searchQuery.trim()
      if (q) {
        router.push(`/search?q=${encodeURIComponent(q)}`)
        setSearchQuery('')
      }
    },
    [searchQuery, router],
  )

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'ar' ? 'fr' : 'ar'
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length > 0 && (segments[0] === 'ar' || segments[0] === 'fr')) {
      segments[0] = newLocale
    } else {
      segments.unshift(newLocale)
    }
    router.push(`/${segments.join('/')}`)
  }, [locale, pathname, router])

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/categories', label: t('nav.categories') },
    ...categories.map((c) => ({
      href: `/categories/${c.slug}`,
      label: c[locale],
    })),
    { href: '/search', label: t('nav.search') },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-shadow duration-300',
        scrolled
          ? 'shadow-md bg-background/95 backdrop-blur-md'
          : 'bg-background',
      )}
    >
      {/* Top bar */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="container-luxury flex items-center justify-between py-1.5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
              dir="ltr"
            >
              <Phone className="size-3" />
              <span className="hidden sm:inline">{WHATSAPP_NUMBER}</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors font-medium"
            >
              <span className="hidden sm:inline">{t('common.whatsapp')}</span>
            </a>
          </div>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe className="size-3" />
            <span>{locale === 'ar' ? 'FR' : 'AR'}</span>
          </button>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border/50">
        <div className="container-luxury flex items-center justify-between gap-4 py-3">
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu className="size-6" />
          </button>

          <Link
            href="/"
            className="flex-shrink-0 text-2xl font-bold font-heading gold-gradient-text tracking-wide"
          >
            {locale === 'ar' ? 'تاپيس' : 'Tapis'}
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="h-9 pr-9 rounded-full bg-muted/50 border-border/60"
            />
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center justify-center px-3 text-muted-foreground hover:text-primary transition-colors"
              aria-label={t('common.search')}
            >
              <Search className="size-4" />
            </button>
          </form>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1"
            >
              {t('nav.admin')}
            </Link>

            <button
              onClick={() => router.push('/cart')}
              className="relative flex items-center justify-center size-9 rounded-lg hover:bg-muted transition-colors"
              aria-label={t('nav.cart')}
            >
              <ShoppingCart className="size-5" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -end-1 size-5 p-0 flex items-center justify-center text-[10px] font-bold rounded-full"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:flex border-b border-border/50 bg-muted/20">
        <div className="container-luxury flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/' || pathname === '/ar' || pathname === '/fr'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3.5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap',
                  isActive
                    ? 'text-primary after:absolute after:bottom-0 after:inset-x-2 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={cn(
              'fixed top-0 bottom-0 w-72 max-w-[80vw] bg-background shadow-2xl overflow-y-auto',
              locale === 'ar' ? 'right-0' : 'left-0',
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-lg font-bold font-heading gold-gradient-text">
                {locale === 'ar' ? 'تاپيس' : 'Tapis'}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleSearch} className="mb-4 relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="h-9 pr-9 rounded-full bg-muted/50"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 end-0 flex items-center justify-center px-3 text-muted-foreground"
                  aria-label={t('common.search')}
                >
                  <Search className="size-4" />
                </button>
              </form>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/' || pathname === '/ar' || pathname === '/fr'
                      : pathname.startsWith(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted',
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  href="/admin"
                  className="flex px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  {t('nav.admin')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
