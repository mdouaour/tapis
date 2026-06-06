'use client'

import { useLocale } from 'next-intl'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const WHATSAPP_NUMBER = '+213555555555'

const MESSAGE_AR = 'السلام عليكم، أود الاستفسار عن منتجات السجاد لديكم'
const MESSAGE_FR = 'Bonjour, je souhaite me renseigner sur vos tapis'

export function WhatsAppButton() {
  const locale = useLocale()

  const message = locale === 'ar' ? MESSAGE_AR : MESSAGE_FR

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed z-40 flex items-center justify-center size-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl',
        'bg-green-500 text-white hover:bg-green-600',
        locale === 'ar' ? 'bottom-6 left-6' : 'bottom-6 right-6',
      )}
      aria-label="WhatsApp"
    >
      <MessageCircle className="size-7 fill-white stroke-none" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  )
}
