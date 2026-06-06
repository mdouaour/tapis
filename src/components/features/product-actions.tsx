'use client'

import { useState, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useCart } from '@/hooks/use-cart'
import { formatPrice, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ShoppingCart, Minus, Plus, MessageCircle } from 'lucide-react'
import type { Product, Dimension } from '@/types'

interface ProductActionsProps {
  product: Product
  locale: 'ar' | 'fr'
}

export function ProductActions({ product, locale }: ProductActionsProps) {
  const t = useTranslations()
  const currentLocale = useLocale() as 'ar' | 'fr'
  const { addItem, openCart } = useCart()

  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '')
  const [selectedDimension, setSelectedDimension] = useState<Dimension>(
    product.dimensions[0] ?? { width: 0, height: 0, label_ar: '', label_fr: '', price_modifier: 0, stock: 0 },
  )
  const [quantity, setQuantity] = useState(1)

  const isOnSale = product.sale_price != null && product.sale_price < product.price
  const basePrice = isOnSale ? product.sale_price! : product.price
  const unitPrice = basePrice + (selectedDimension.price_modifier ?? 0)
  const totalPrice = unitPrice * quantity
  const inStock = product.stock > 0

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }, [])

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(product.stock, prev + 1))
  }, [product.stock])

  const handleAddToCart = useCallback(() => {
    if (!selectedColor || !selectedDimension) {
      toast.error(currentLocale === 'ar' ? 'يرجى اختيار اللون والمقاس' : 'Veuillez choisir une couleur et une dimension')
      return
    }

    addItem(product, quantity, selectedColor, selectedDimension)
    toast.success(
      currentLocale === 'ar' ? 'تمت الإضافة إلى السلة' : 'Ajouté au panier',
      {
        description: currentLocale === 'ar' ? 'تم إضافة المنتج إلى سلة التسوق' : 'Le produit a été ajouté à votre panier',
        action: {
          label: currentLocale === 'ar' ? 'عرض السلة' : 'Voir le panier',
          onClick: () => openCart(),
        },
      },
    )
  }, [product, quantity, selectedColor, selectedDimension, addItem, openCart, currentLocale])

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '213550000000'
  const productName = locale === 'ar' ? product.name_ar : product.name_fr
  const whatsappMessage =
    locale === 'ar'
      ? `مرحباً، أود الاستفسار عن المنتج: ${productName}`
      : `Bonjour, je souhaite me renseigner sur le produit: ${productName}`
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex flex-col gap-5">
      {/* Color Selector */}
      {product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('products.colors')}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'relative size-9 rounded-full border-2 transition-all duration-200',
                  selectedColor === color
                    ? 'border-primary scale-110 shadow-md'
                    : 'border-border/60 hover:border-border',
                )}
                style={{ backgroundColor: color }}
                title={color}
                aria-label={color}
              >
                {selectedColor === color && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={cn(
                        'size-2.5 rounded-full',
                        color === '#ffffff' || color === '#fff' || color === 'white' || color === '#faf6f1'
                          ? 'bg-foreground'
                          : 'bg-white',
                      )}
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dimension Selector */}
      {product.dimensions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {t('products.dimensions')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.dimensions.map((dim) => {
              const dimLabel = locale === 'ar' ? dim.label_ar : dim.label_fr
              const isSelected = selectedDimension.width === dim.width && selectedDimension.height === dim.height

              return (
                <button
                  key={`${dim.width}x${dim.height}`}
                  onClick={() => {
                    setSelectedDimension(dim)
                  }}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border/60 bg-background text-foreground/70 hover:border-border hover:text-foreground',
                  )}
                >
                  <span>{dimLabel}</span>
                  {dim.price_modifier > 0 && (
                    <span className="text-xs text-muted-foreground">
                      +{formatPrice(dim.price_modifier, locale)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector + Total */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          {t('cart.quantity')}
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-border/60 bg-background">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="flex items-center justify-center size-9 text-foreground/70 hover:text-foreground transition-colors disabled:opacity-40"
              aria-label={currentLocale === 'ar' ? 'تقليل الكمية' : 'Diminuer la quantité'}
            >
              <Minus className="size-4" />
            </button>
            <span className="w-10 text-center text-sm font-semibold tabular-nums select-none">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
              className="flex items-center justify-center size-9 text-foreground/70 hover:text-foreground transition-colors disabled:opacity-40"
              aria-label={currentLocale === 'ar' ? 'زيادة الكمية' : 'Augmenter la quantité'}
            >
              <Plus className="size-4" />
            </button>
          </div>

          <div className="text-sm text-muted-foreground">
            {formatPrice(unitPrice, locale)} × {quantity}
            <span className="mx-1.5 text-border">|</span>
            <span className="text-base font-bold text-primary tabular-nums">
              {formatPrice(totalPrice, locale)}
            </span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="w-full h-11 text-base font-semibold gold-gradient text-primary-foreground border-0"
        onClick={handleAddToCart}
        disabled={!inStock}
      >
        <ShoppingCart className="size-5" />
        {inStock
          ? locale === 'ar'
            ? 'أضف إلى السلة'
            : 'Ajouter au panier'
          : t('products.out_of_stock')}
      </Button>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-600/30 bg-green-50 dark:bg-green-950/30 px-4 py-2.5 text-sm font-medium text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
      >
        <MessageCircle className="size-5 fill-green-700 dark:fill-green-400 stroke-none" />
        {locale === 'ar' ? 'اتصل عبر واتساب' : 'Contactez via WhatsApp'}
      </a>
    </div>
  )
}
