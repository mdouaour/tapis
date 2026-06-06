'use client'

import { useState, useEffect } from 'react'
import { useRouter } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { useCart } from '@/hooks/use-cart'
import { formatPrice, getImageUrl } from '@/lib/utils'
import { WILAYAS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ShoppingBag, Loader2, CreditCard } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

const ALGERIAN_PHONE_REGEX = /^(\+213|0)(5|6|7)[0-9]{8}$/

const formSchema = z.object({
  customer_name: z.string().min(2, { message: 'يجب أن يحتوي الاسم على حرفين على الأقل' }),
  customer_phone: z.string().regex(ALGERIAN_PHONE_REGEX, { message: 'رقم الهاتف غير صالح' }),
  customer_email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }).optional().or(z.literal('')),
  customer_wilaya: z.string().min(1, { message: 'يرجى اختيار الولاية' }),
  customer_commune: z.string().min(1, { message: 'يرجى إدخال البلدية' }),
  customer_address: z.string().min(5, { message: 'يجب أن يحتوي العنوان على 5 أحرف على الأقل' }),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const t = useTranslations()
  const locale = useLocale() as 'ar' | 'fr'
  const isRtl = locale === 'ar'

  const { items, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: '',
      customer_phone: '',
      customer_email: '',
      customer_wilaya: '',
      customer_commune: '',
      customer_address: '',
      notes: '',
    },
  })

  useEffect(() => {
    if (items.length === 0) {
      router.replace('/cart')
    }
  }, [items.length, router])

  async function onSubmit(formData: FormValues) {
    if (items.length === 0) return

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        customer_email: formData.customer_email || null,
        notes: formData.notes || null,
        items: items.map((item) => ({
          product_id: item.product.id,
          product_name_ar: item.product.name_ar,
          product_name_fr: item.product.name_fr,
          quantity: item.quantity,
          price:
            (item.product.sale_price ?? item.product.price) +
            item.selectedDimension.price_modifier,
          color: item.selectedColor,
          dimension:
            locale === 'ar'
              ? item.selectedDimension.label_ar
              : item.selectedDimension.label_fr,
        })),
        total: totalPrice,
      }

      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to create order')
      }

      const { orderId } = await res.json()

      clearCart()
      router.push(`/order-confirmation?id=${orderId}`)
    } catch (error) {
      toast.error(
        locale === 'ar'
          ? 'حدث خطأ أثناء إنشاء الطلب. الرجاء المحاولة مرة أخرى.'
          : 'Une erreur est survenue lors de la création de la commande. Veuillez réessayer.',
      )
      console.error('Checkout error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="container-luxury py-8 md:py-12">
      <h1 className="heading-3 text-foreground mb-8">{t('checkout.title')}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Shipping Information */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
                1
              </span>
              {t('checkout.shipping_info')}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t('checkout.name')} <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register('customer_name')}
                  placeholder={t('checkout.name_placeholder')}
                  aria-invalid={!!errors.customer_name}
                />
                {errors.customer_name && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t('checkout.phone')} <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register('customer_phone')}
                  placeholder={locale === 'ar' ? '05XX XX XX XX' : '0XX XX XX XX'}
                  dir="ltr"
                  className="text-left"
                  aria-invalid={!!errors.customer_phone}
                />
                {errors.customer_phone && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.customer_phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t('checkout.email')}
                  <span className="text-muted-foreground text-xs mr-1">
                    ({t('common.optional')})
                  </span>
                </label>
                <Input
                  {...register('customer_email')}
                  type="email"
                  placeholder="email@example.com"
                  dir="ltr"
                  className="text-left"
                  aria-invalid={!!errors.customer_email}
                />
                {errors.customer_email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.customer_email.message}
                  </p>
                )}
              </div>

              {/* Wilaya */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t('checkout.wilaya')} <span className="text-destructive">*</span>
                </label>
                <Controller
                  name="customer_wilaya"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || ''} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full" aria-invalid={!!errors.customer_wilaya}>
                        <SelectValue placeholder={t('checkout.select_wilaya')} />
                      </SelectTrigger>
                      <SelectContent>
                        {WILAYAS.map((wilaya) => (
                          <SelectItem key={wilaya} value={wilaya}>
                            {wilaya}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.customer_wilaya && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.customer_wilaya.message}
                  </p>
                )}
              </div>

              {/* Commune */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t('checkout.commune')} <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register('customer_commune')}
                  placeholder={locale === 'ar' ? 'أدخل البلدية' : 'Entrez la commune'}
                  aria-invalid={!!errors.customer_commune}
                />
                {errors.customer_commune && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.customer_commune.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t('checkout.address')} <span className="text-destructive">*</span>
                </label>
                <Textarea
                  {...register('customer_address')}
                  placeholder={t('checkout.address_placeholder')}
                  rows={3}
                  aria-invalid={!!errors.customer_address}
                />
                {errors.customer_address && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.customer_address.message}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t('checkout.notes')}
                </label>
                <Textarea
                  {...register('notes')}
                  placeholder={locale === 'ar' ? 'أي ملاحظات إضافية...' : 'Notes supplémentaires...'}
                  rows={2}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-8">
              <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  2
                </span>
                {t('checkout.payment_method')}
              </h2>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                <CreditCard className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t('checkout.cod')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t('checkout.cod_desc')}
                  </p>
                </div>
                <Badge variant="outline" className="mr-auto text-[10px] px-1.5 py-0 h-5">
                  {locale === 'ar' ? 'مضمون 100%' : '100% sécurisé'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">
                {t('checkout.order_summary')}
              </h2>

              <div className="flex flex-col gap-3">
                {items.map((item) => {
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
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                        {item.product.images?.[0] ? (
                          <img
                            src={getImageUrl(item.product.images[0])}
                            alt={productName}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-muted-foreground/40">
                            <ShoppingBag className="size-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {productName}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <span
                            className="inline-block size-2.5 rounded-full border border-border"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          <span>{item.selectedColor}</span>
                          <span aria-hidden="true">·</span>
                          <span>{dimensionLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{locale === 'ar' ? `×${item.quantity}` : `x${item.quantity}`}</span>
                        </div>
                        <p className="text-sm font-semibold tabular-nums mt-0.5">
                          {formatPrice(itemPrice * item.quantity, locale)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                <span className="font-medium tabular-nums">
                  {formatPrice(totalPrice, locale)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">{t('cart.shipping')}</span>
                <span className="text-green-600 dark:text-green-400 text-xs font-medium">
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

              <Button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full h-11 text-base mt-6 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  <>
                    {t('checkout.place_order')}
                    {locale === 'fr' && ' (COD)'}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-3">
                {locale === 'ar'
                  ? 'سيتم تأكيد طلبك عبر الهاتف قبل التوصيل'
                  : 'Votre commande sera confirmée par téléphone avant la livraison'}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
