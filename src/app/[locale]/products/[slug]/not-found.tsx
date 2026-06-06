import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { PackageSearch, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function ProductNotFound({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations()
  const currentLocale = (locale === 'fr' ? 'fr' : 'ar') as 'ar' | 'fr'

  return (
    <div className="container-luxury flex flex-col items-center justify-center py-24 text-center">
      <div className="flex items-center justify-center size-20 rounded-full bg-muted mb-6">
        <PackageSearch className="size-10 text-muted-foreground/60" />
      </div>
      <h1 className="heading-4 text-foreground mb-2">
        {currentLocale === 'ar' ? 'المنتج غير موجود' : 'Produit introuvable'}
      </h1>
      <p className="text-muted-foreground body-base max-w-md mb-8">
        {currentLocale === 'ar'
          ? 'عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه. ربما تمت إزالته أو أن الرابط غير صحيح.'
          : 'Désolé, nous n\'avons pas trouvé le produit que vous recherchez. Il a peut-être été retiré ou le lien est incorrect.'}
      </p>
      <Link href="/categories">
        <Button variant="default" size="lg">
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {currentLocale === 'ar' ? 'تصفح التصنيفات' : 'Parcourir les catégories'}
        </Button>
      </Link>
    </div>
  )
}
