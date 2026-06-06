'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  CheckCircle2,
  Home,
  MessageCircle,
  Package,
  Clock,
} from 'lucide-react'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const t = useTranslations()
  const locale = useLocale() as 'ar' | 'fr'
  const isRtl = locale === 'ar'
  const orderId = searchParams.get('id')

  const whatsappMessage =
    locale === 'ar'
      ? `مرحباً، أود الاستفسار عن طلبي رقم: ${orderId}`
      : `Bonjour, je souhaite me renseigner sur ma commande N°: ${orderId}`

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`

  if (!orderId) {
    return (
      <div className="container-luxury py-8 md:py-12">
        <div className="mx-auto max-w-lg text-center">
          <div className="flex items-center justify-center size-16 rounded-full bg-muted mx-auto">
            <Package className="size-8 text-muted-foreground/60" />
          </div>
          <h1 className="heading-3 text-foreground mt-4 mb-2">
            {locale === 'ar' ? 'لم يتم العثور على الطلب' : 'Commande introuvable'}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {locale === 'ar'
              ? 'لم يتم تحديد رقم الطلب'
              : 'Aucun numéro de commande spécifié'}
          </p>
          <Link href="/">
            <Button className="gap-2">
              <Home className="size-4" />
              {locale === 'ar' ? 'العودة إلى الرئيسية' : "Retour à l'accueil"}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-luxury py-8 md:py-12">
      <div className="mx-auto max-w-lg">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center size-20 rounded-full bg-green-50 dark:bg-green-900/20 mx-auto mb-4">
            <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="heading-3 text-foreground mb-2">
            {t('checkout.order_placed')}
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            {locale === 'ar'
              ? `شكراً لك! تم استلام طلبك بنجاح. سيتم التواصل معك عبر ${locale === 'ar' ? 'الواتساب' : 'WhatsApp'} لتأكيد الطلب.`
              : 'Merci ! Votre commande a été reçue avec succès. Nous vous contacterons via WhatsApp pour confirmer la commande.'}
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6 border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Package className="size-4 text-primary" />
                {t('order_confirmation.title')}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/20 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                <Clock className="size-3" />
                {t('order_confirmation.status_pending')}
              </span>
            </div>

            <Separator className="mb-4" />

            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-muted-foreground">
                {t('order_confirmation.order_number')}
              </span>
              <span className="font-mono text-xs font-medium text-foreground bg-muted px-2 py-0.5 rounded">
                {orderId.slice(0, 8)}...
              </span>
            </div>

            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-muted-foreground">
                {t('order_confirmation.payment_method')}
              </span>
              <span className="font-medium text-foreground flex items-center gap-1.5">
                {locale === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}
              </span>
            </div>

            <Separator className="mb-4" />

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">
                {locale === 'ar' ? 'ماذا يحدث بعد ذلك؟' : 'Que se passe-t-il ensuite ?'}
              </p>
              <ol className="text-xs text-muted-foreground space-y-1.5 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold leading-none mt-0.5">1.</span>
                  <span>
                    {locale === 'ar'
                      ? 'سيتم الاتصال بك خلال 24 ساعة لتأكيد الطلب'
                      : 'Vous serez contacté sous 24h pour confirmer la commande'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold leading-none mt-0.5">2.</span>
                  <span>
                    {locale === 'ar'
                      ? 'تجهيز الطلب وشحنه خلال 2-3 أيام عمل'
                      : 'Préparation et expédition sous 2-3 jours ouvrables'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold leading-none mt-0.5">3.</span>
                  <span>
                    {locale === 'ar'
                      ? 'التوصيل إلى باب منزلك والدفع عند الاستلام'
                      : 'Livraison à domicile avec paiement à la réception'}
                  </span>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="default"
              className="w-full h-11 gap-2 text-base bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="size-5 fill-white stroke-none" />
              {t('order_confirmation.contact_whatsapp')}
            </Button>
          </a>
          <Link href="/">
            <Button variant="outline" className="w-full h-11 gap-2 text-base">
              <Home className="size-4" />
              {locale === 'ar' ? 'العودة إلى الرئيسية' : "Retour à l'accueil"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container-luxury py-8 md:py-12">
          <div className="mx-auto max-w-lg text-center">
            <div className="flex items-center justify-center size-16 rounded-full bg-muted mx-auto animate-pulse" />
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
