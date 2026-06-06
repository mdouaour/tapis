import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { createAnonymousClient } from '@/lib/supabase/server'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/supabase/queries'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params
  const supabase = createAnonymousClient()
  const category = await getCategoryBySlug(supabase, slug)
  if (!category) return { title: 'Category Not Found' }
  const name = locale === 'ar' ? category.name_ar : category.name_fr
  return { title: `${name} - Tapis` }
}

export default async function CategoryPage({ params }: Props) {
  const { slug, locale } = await params
  const t = await getTranslations()
  const currentLocale = (locale === 'fr' ? 'fr' : 'ar') as 'ar' | 'fr'

  const supabase = createAnonymousClient()

  let category
  try {
    category = await getCategoryBySlug(supabase, slug)
  } catch {
    return (
      <div className="container-luxury py-8 md:py-12">
        <div className="text-center py-20">
          <ShoppingBag className="size-16 text-muted-foreground/20 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">عذراً</h2>
          <p className="text-muted-foreground mt-2">حدث خطأ في تحميل الفئة</p>
        </div>
      </div>
    )
  }

  if (!category) notFound()

  let products: any[] = []
  try {
    products = await getProductsByCategory(supabase, slug)
  } catch {
    // return empty products
  }

  const categoryName = currentLocale === 'ar' ? category.name_ar : category.name_fr
  const categoryDesc = currentLocale === 'ar' ? category.description_ar : category.description_fr

  return (
    <div className="container-luxury py-8 md:py-12">
      <div className="mb-8 md:mb-10">
        <h1 className="heading-3 text-foreground">{categoryName}</h1>
        {categoryDesc && (
          <p className="mt-2 text-muted-foreground body-base max-w-2xl">{categoryDesc}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          {products.length} {currentLocale === 'ar' ? 'منتج' : 'produits'}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {products.map((product: any) => {
            const productName = currentLocale === 'ar' ? product.name_ar : product.name_fr
            const imageUrl = product.images?.[0]
            const isOnSale = product.sale_price != null && product.sale_price < product.price
            const displayPrice = isOnSale ? product.sale_price! : product.price

            return (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {isOnSale && (
                  <Badge className="absolute top-2 start-2 z-10 bg-destructive text-destructive-foreground border-0">
                    {t('products.sale')}
                  </Badge>
                )}
                <Link href={`/products/${product.slug}`} className="overflow-hidden">
                  <AspectRatio ratio={4/3} className="bg-muted">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-muted-foreground/30">
                        <ShoppingBag className="size-10" />
                      </div>
                    )}
                  </AspectRatio>
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-3.5">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {productName}
                  </Link>
                  <div className="flex items-center gap-1">
                    {product.colors?.slice(0, 5).map((color: string) => (
                      <span
                        key={color}
                        className="inline-block size-3.5 rounded-full border border-border/60"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-base font-bold text-primary">
                      {formatPrice(displayPrice, currentLocale)}
                    </span>
                    {isOnSale && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.price, currentLocale)}
                      </span>
                    )}
                  </div>
                  <Link href={`/products/${product.slug}`}>
                    <Button size="sm" className="w-full mt-1">
                      <ShoppingBag className="size-3.5" />
                      {t('products.add_to_cart')}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <ShoppingBag className="size-16 text-muted-foreground/20 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">{t('products.no_results')}</h2>
        </div>
      )}
    </div>
  )
}
