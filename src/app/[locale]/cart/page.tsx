'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useCart } from '@/hooks/use-cart'
import { formatPrice, getImageUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, Trash2, Minus, Plus, ArrowLeft, ArrowRight, Truck } from 'lucide-react'

export default function CartPage() {
  const t = useTranslations()
  const locale = useLocale() as 'ar' | 'fr'
  const isRtl = locale === 'ar'
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  const {
    items,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()

  if (items.length === 0) {
    return (
      <div className="container-luxury py-8 md:py-12">
        <h1 className="heading-3 text-foreground mb-8">{t('cart.title')}</h1>
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
          <div className="flex items-center justify-center size-16 rounded-full bg-muted">
            <ShoppingBag className="size-8 text-muted-foreground/60" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{t('cart.empty')}</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              {t('cart.empty_message')}
            </p>
          </div>
          <Link href="/categories">
            <Button variant="outline" className="mt-2">
              {t('cart.continue_shopping')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-luxury py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="heading-3 text-foreground">{t('cart.title')}</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4 ml-1" />
          {locale === 'ar' ? 'إفراغ السلة' : 'Vider le panier'}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const imageUrl = item.product.images?.[0]
            const productName =
              locale === 'ar' ? item.product.name_ar : item.product.name_fr
            const dimensionLabel =
              locale === 'ar'
                ? item.selectedDimension.label_ar
                : item.selectedDimension.label_fr
            const itemPrice =
              (item.product.sale_price ?? item.product.price) +
              item.selectedDimension.price_modifier

            return (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-sm"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {imageUrl ? (
                    <Image
                      src={getImageUrl(imageUrl)}
                      alt={productName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground/40">
                      <ShoppingBag className="size-8" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                    >
                      {productName}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label={t('cart.remove')}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className="inline-block size-3 rounded-full border border-border"
                      style={{ backgroundColor: item.selectedColor }}
                    />
                    <span>{item.selectedColor}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dimensionLabel}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-7 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                        aria-label={t('cart.remove')}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-7 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                        aria-label={t('cart.update')}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      {formatPrice(itemPrice * item.quantity, locale)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">
              {t('cart.summary')}
            </h2>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t('cart.subtotal')}</span>
              <span className="font-medium tabular-nums">
                {formatPrice(totalPrice, locale)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">{t('cart.shipping')}</span>
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                <Truck className="size-3.5" />
                {t('cart.free_shipping')}
              </span>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-foreground">
                {t('cart.total')}
              </span>
              <span className="text-lg font-bold gold-gradient-text tabular-nums">
                {formatPrice(totalPrice, locale)}
              </span>
            </div>

            <Link href="/checkout" className="block mt-6">
              <Button className="w-full h-10 text-base gap-2">
                {locale === 'ar' ? 'متابعة الشراء' : 'Procéder au paiement'}
                <ArrowIcon className="size-4" />
              </Button>
            </Link>

            <Link href="/categories" className="block mt-3">
              <Button variant="outline" className="w-full h-9 text-sm">
                {t('cart.continue_shopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
