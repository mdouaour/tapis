import { notFound } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/supabase/queries'
import { ProductCard } from '@/components/shared/product-card'
import { EmptyState } from '@/components/shared/empty-state'
import { ShoppingBag } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const supabase = await createClient()
  const category = await getCategoryBySlug(supabase, slug)

  if (!category) return { title: 'Category Not Found' }

  const name = locale === 'ar' ? category.name_ar : category.name_fr
  const description = locale === 'ar' ? category.description_ar : category.description_fr

  return {
    title: `${name} - Tapis`,
    description,
    openGraph: { title: `${name} - Tapis`, description, images: category.image ? [{ url: category.image }] : [] },
  }
}

export async function generateStaticParams() {
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) return []

    const supabase = createClient(supabaseUrl, supabaseKey)
    const categories = await getCategories(supabase)

    return categories.map((cat) => ({ slug: cat.slug }))
  } catch {
    return []
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug, locale } = await params
  const t = await getTranslations()
  const currentLocale = (locale === 'fr' ? 'fr' : 'ar') as 'ar' | 'fr'

  const supabase = await createClient()

  const [category, products] = await Promise.all([
    getCategoryBySlug(supabase, slug),
    getProductsByCategory(supabase, slug),
  ])

  if (!category) notFound()

  const categoryName = currentLocale === 'ar' ? category.name_ar : category.name_fr
  const categoryDescription = currentLocale === 'ar' ? category.description_ar : category.description_fr

  return (
    <div className="container-luxury py-8 md:py-12">
      {/* Page Heading */}
      <div className="mb-8 md:mb-10">
        <h1 className="heading-3 text-foreground">{categoryName}</h1>
        {categoryDescription && (
          <p className="mt-2 text-muted-foreground body-base max-w-2xl">
            {categoryDescription}
          </p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          {products.length}{' '}
          {products.length === 1
            ? t('products.title')
            : currentLocale === 'ar'
              ? 'منتج'
              : 'produits'}
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={currentLocale} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShoppingBag}
          title={t('products.no_results')}
          description={currentLocale === 'ar' ? 'لا توجد منتجات في هذا التصنيف حالياً' : 'Aucun produit dans cette catégorie pour le moment'}
        />
      )}
    </div>
  )
}
