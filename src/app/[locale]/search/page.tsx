import { getTranslations } from 'next-intl/server'
import { createAnonymousClient } from '@/lib/supabase/server'
import { searchProducts } from '@/lib/supabase/queries'
import { ProductCard } from '@/components/shared/product-card'
import { EmptyState } from '@/components/shared/empty-state'
import { Search } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  searchParams: Promise<{ q?: string }>
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Search - Tapis',
}

export default async function SearchPage({ searchParams, params }: Props) {
  const { q } = await searchParams
  const { locale } = await params
  const t = await getTranslations()
  const currentLocale = (locale === 'fr' ? 'fr' : 'ar') as 'ar' | 'fr'

  const supabase = createAnonymousClient()
  const products = q ? await searchProducts(supabase, q) : []

  return (
    <div className="container-luxury py-8 md:py-12">
      {q ? (
        <>
          <div className="mb-8 md:mb-10">
            <h1 className="heading-4 text-foreground">
              {t('search.results_for')}{' '}
              <span className="text-primary">&quot;{q}&quot;</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {products.length}{' '}
              {currentLocale === 'ar'
                ? products.length === 1 ? 'نتيجة' : 'نتائج'
                : products.length === 1 ? 'résultat' : 'résultats'}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} locale={currentLocale} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title={t('search.no_results')}
              description={t('search.no_results_message')}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="size-16 text-muted-foreground/20 mb-4" />
          <h2 className="text-xl font-semibold text-foreground">
            {currentLocale === 'ar' ? 'ابحث عن منتج' : 'Rechercher un produit'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('search.search_suggestions')}
          </p>
        </div>
      )}
    </div>
  )
}
