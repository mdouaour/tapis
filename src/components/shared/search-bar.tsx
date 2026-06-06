'use client'

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import { formatPrice, getImageUrl, cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Search, X, Loader2 } from 'lucide-react'
import type { Product } from '@/types'

interface SearchBarProps {
  open: boolean
  onClose: () => void
}

export function SearchBar({ open, onClose }: SearchBarProps) {
  const t = useTranslations()
  const locale = useLocale() as 'ar' | 'fr'
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    } else {
      setQuery('')
      setResults([])
      setSearched(false)
    }
  }, [open])

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.products ?? data ?? [])
      } else {
        setResults([])
      }
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => performSearch(value), 300)
    },
    [performSearch],
  )

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const q = query.trim()
      if (q) {
        onClose()
        router.push(`/search?q=${encodeURIComponent(q)}`)
      }
    },
    [query, router, onClose],
  )

  const handleResultClick = useCallback(() => {
    onClose()
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-sm">
      <div className="container-luxury flex items-center gap-4 pt-6 pb-4">
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t('search.placeholder')}
            className="h-12 ps-10 pe-4 text-base rounded-xl border-border/60 bg-muted/30"
          />
        </form>
        <button
          onClick={onClose}
          className="flex items-center justify-center size-10 shrink-0 rounded-lg hover:bg-muted transition-colors"
          aria-label={t('common.close')}
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="container-luxury flex-1 overflow-y-auto pb-8 scrollbar-thin">
        {!searched && query.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="size-16 text-muted-foreground/20 mb-4" />
            <p className="text-base text-muted-foreground">
              {locale === 'ar'
                ? 'اكتب ما تبحث عنه'
                : 'Tapez ce que vous recherchez'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground/60">
              {t('search.search_suggestions')}
            </p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-muted-foreground/40" />
          </div>
        )}

        {!loading && searched && results.length === 0 && query.length > 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="size-16 text-muted-foreground/20 mb-4" />
            <p className="text-base font-medium text-foreground">
              {t('search.no_results')}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('search.no_results_message')}
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('search.results_for')} &quot;{query}&quot;
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => {
                const productName =
                  locale === 'ar' ? product.name_ar : product.name_fr
                const imageUrl = product.images?.[0]

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={handleResultClick}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-all',
                      'hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5',
                    )}
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {imageUrl ? (
                        <Image
                          src={getImageUrl(imageUrl)}
                          alt={productName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground/30">
                          <Search className="size-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {productName}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-primary tabular-nums">
                        {product.sale_price
                          ? formatPrice(product.sale_price, locale)
                          : formatPrice(product.price, locale)}
                      </p>
                      {product.sale_price && (
                        <p className="text-xs text-muted-foreground line-through tabular-nums">
                          {formatPrice(product.price, locale)}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
