import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { formatPrice, getImageUrl, cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  locale: 'ar' | 'fr'
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, locale, onAddToCart }: ProductCardProps) {
  const t = useTranslations()

  const productName = locale === 'ar' ? product.name_ar : product.name_fr
  const imageUrl = product.images?.[0]
  const isOnSale = product.sale_price != null && product.sale_price < product.price
  const displayPrice = isOnSale ? product.sale_price! : product.price

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1 hover:border-primary/20',
      )}
    >
      {/* Badges */}
      <div className="absolute top-2 start-2 z-10 flex flex-col gap-1.5">
        {isOnSale && (
          <Badge variant="default" className="bg-destructive text-destructive-foreground border-0 text-[10px] px-2 py-0.5">
            {t('products.sale')}
          </Badge>
        )}
        {product.featured && (
          <Badge variant="secondary" className="border-0 text-[10px] px-2 py-0.5">
            {t('products.featured')}
          </Badge>
        )}
      </div>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="overflow-hidden">
        <AspectRatio ratio={4 / 3} className="bg-muted">
          {imageUrl ? (
            <Image
              src={getImageUrl(imageUrl)}
              alt={productName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground/30">
              <ShoppingCart className="size-10" />
            </div>
          )}
        </AspectRatio>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
        >
          {productName}
        </Link>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color}
                className="inline-block size-3.5 rounded-full border border-border/60"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-muted-foreground">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base font-bold text-primary tabular-nums">
            {formatPrice(displayPrice, locale)}
          </span>
          {isOnSale && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatPrice(product.price, locale)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          size="sm"
          className="w-full mt-1"
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="size-3.5" />
          {product.stock > 0 ? t('products.add_to_cart') : t('products.out_of_stock')}
        </Button>
      </div>
    </div>
  )
}
