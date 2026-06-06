'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useCart } from '@/hooks/use-cart'
import { formatPrice, getImageUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export function CartSheet() {
  const t = useTranslations()
  const locale = useLocale() as 'ar' | 'fr'
  const {
    items,
    totalPrice,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart()

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side={locale === 'ar' ? 'right' : 'left'}
        className="flex flex-col w-full sm:max-w-md"
      >
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="size-5" />
            {t('cart.title')}
            {items.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({items.length})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
            <ShoppingBag className="size-16 text-muted-foreground/40" />
            <div className="text-center">
              <p className="text-base font-medium text-foreground">
                {t('cart.empty')}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('cart.empty_message')}
              </p>
            </div>
            <Link href="/categories" onClick={closeCart}>
              <Button variant="outline" className="mt-2">
                {t('cart.continue_shopping')}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-4 px-4">
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => {
                  const imageUrl = item.product.images?.[0]
                  const productName =
                    locale === 'ar'
                      ? item.product.name_ar
                      : item.product.name_fr
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
                      className="flex gap-3 rounded-lg border border-border bg-card p-3"
                    >
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                        {imageUrl ? (
                          <Image
                            src={getImageUrl(imageUrl)}
                            alt={productName}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-muted-foreground/40">
                            <ShoppingBag className="size-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                            onClick={closeCart}
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
                          <span>·</span>
                          <span>{dimensionLabel}</span>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="flex size-6 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                              aria-label={t('cart.remove')}
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex size-6 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                              aria-label={t('cart.update')}
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold tabular-nums">
                            {formatPrice(itemPrice * item.quantity, locale)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">
                  {t('cart.subtotal')}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t('cart.free_shipping')}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">
                  {t('cart.total')}
                </span>
                <span className="text-lg font-bold gold-gradient-text tabular-nums">
                  {formatPrice(totalPrice, locale)}
                </span>
              </div>
              <SheetFooter className="mt-4 p-0">
                <Link href="/checkout" onClick={closeCart} className="w-full">
                  <Button className="w-full h-10 text-base">
                    {t('cart.checkout')}
                  </Button>
                </Link>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
