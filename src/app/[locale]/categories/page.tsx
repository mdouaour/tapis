import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { createAnonymousClient } from '@/lib/supabase/server'
import { getCategories } from '@/lib/supabase/queries'
import { cn } from '@/lib/utils'
import { LayoutGrid } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Categories - Tapis',
}

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations()
  const currentLocale = (locale === 'fr' ? 'fr' : 'ar') as 'ar' | 'fr'

  const supabase = createAnonymousClient()
  const categories = await getCategories(supabase)

  return (
    <div className="container-luxury py-8 md:py-12">
      <div className="mb-8 md:mb-10">
        <h1 className="heading-3 text-foreground">{t('categories.title')}</h1>
      </div>

      {categories.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const name = currentLocale === 'ar' ? category.name_ar : category.name_fr
            const description = currentLocale === 'ar' ? category.description_ar : category.description_fr

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300',
                  'hover:shadow-lg hover:-translate-y-1 hover:border-primary/20',
                )}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground/30">
                      <LayoutGrid className="size-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="relative p-4 md:p-5">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  {description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <LayoutGrid className="size-16 text-muted-foreground/20 mb-4" />
          <p className="text-base text-muted-foreground">
            {currentLocale === 'ar' ? 'لا توجد تصنيفات حالياً' : 'Aucune catégorie pour le moment'}
          </p>
        </div>
      )}
    </div>
  )
}
