import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { createClient } from '@/lib/supabase/server'
import { getProductBySlug } from '@/lib/supabase/queries'
import { formatPrice, getImageUrl, cn } from '@/lib/utils'
import { ChevronLeft, Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductActions } from '@/components/features/product-actions'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const supabase = await createClient()
  const product = await getProductBySlug(supabase, slug)

  if (!product) return { title: 'Product Not Found' }

  const name = locale === 'ar' ? product.name_ar : product.name_fr
  const description = locale === 'ar' ? product.description_ar : product.description_fr
  const imageUrl = product.images?.[0] ? getImageUrl(product.images[0]) : undefined

  return {
    title: `${name} - Tapis`,
    description,
    openGraph: {
      title: `${name} - Tapis`,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const t = await getTranslations()
  const currentLocale = (locale === 'fr' ? 'fr' : 'ar') as 'ar' | 'fr'

  const supabase = await createClient()
  const product = await getProductBySlug(supabase, slug)

  if (!product) notFound()

  const productName = currentLocale === 'ar' ? product.name_ar : product.name_fr
  const productDescription = currentLocale === 'ar' ? product.description_ar : product.description_fr
  const isOnSale = product.sale_price != null && product.sale_price < product.price
  const displayPrice = isOnSale ? product.sale_price! : product.price
  const inStock = product.stock > 0

  return (
    <div className="container-luxury py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          {t('nav.home')}
        </Link>
        <ChevronLeft className="size-3.5 rtl:rotate-180" />
        {product.category && (
          <>
            <Link
              href={`/categories/${product.category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {currentLocale === 'ar' ? product.category.name_ar : product.category.name_fr}
            </Link>
            <ChevronLeft className="size-3.5 rtl:rotate-180" />
          </>
        )}
        <span className="text-foreground font-medium truncate">{productName}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Left: Image Gallery */}
        <div>
          {product.images.length > 0 ? (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={getImageUrl(product.images[0])}
                  alt={productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {isOnSale && (
                  <Badge
                    variant="default"
                    className="absolute top-3 start-3 bg-destructive text-destructive-foreground border-0"
                  >
                    {t('products.sale')}
                  </Badge>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={cn(
                        'relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-colors cursor-pointer',
                        index === 0 ? 'border-primary' : 'border-transparent hover:border-border',
                      )}
                    >
                      <Image
                        src={getImageUrl(img)}
                        alt={`${productName} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-muted">
              <Package className="size-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="heading-4 text-foreground">{productName}</h1>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary tabular-nums">
              {formatPrice(displayPrice, currentLocale)}
            </span>
            {isOnSale && (
              <span className="text-lg text-muted-foreground line-through tabular-nums">
                {formatPrice(product.price, currentLocale)}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center gap-2 text-sm">
            {inStock ? (
              <>
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {currentLocale === 'ar' ? 'متوفر' : 'En stock'}
                </span>
              </>
            ) : (
              <>
                <span className="size-2 rounded-full bg-destructive" />
                <span className="text-destructive font-medium">
                  {t('products.out_of_stock')}
                </span>
              </>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {t('products.description')}
            </h3>
            <p className="text-foreground/80 body-base leading-relaxed whitespace-pre-line">
              {productDescription}
            </p>
          </div>

          <Separator />

          {/* Client-side Product Actions */}
          <ProductActions product={product} locale={currentLocale} />
        </div>
      </div>
    </div>
  )
}
