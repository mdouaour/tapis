import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, locale: 'ar' | 'fr' = 'ar'): string {
  const formatted = Math.round(price).toLocaleString('en-US')
  return locale === 'fr' ? `${formatted} DA` : `${formatted} د.ج`
}

export function formatDate(date: string, locale: 'ar' | 'fr' = 'ar'): string {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-DZ' : 'fr-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return path
  return `${supabaseUrl}/storage/v1/object/public/products/${path}`
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '...'
}

export function getLocaleFromPath(pathname: string): 'ar' | 'fr' {
  const locale = pathname.split('/')[1]
  return locale === 'fr' ? 'fr' : 'ar'
}
