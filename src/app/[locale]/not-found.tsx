'use client'

import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/routing"
import { SearchX, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LocaleNotFound() {
  const t = useTranslations()
  const locale = useLocale()
  const isRtl = locale === "ar"
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="flex items-center justify-center size-24 rounded-full bg-muted">
        <SearchX className="size-12 text-muted-foreground" />
      </div>
      <div>
        <h1 className="heading-1 text-foreground mb-2">
          {locale === "ar" ? "٤٠٤" : "404"}
        </h1>
        <h2 className="heading-3 text-foreground mb-1.5">
          {locale === "ar"
            ? "الصفحة غير موجودة"
            : "Page non trouvée"}
        </h2>
        <p className="body-base text-muted-foreground max-w-md mx-auto">
          {locale === "ar"
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها"
            : "Désolé, la page que vous recherchez n'existe pas ou a été déplacée"}
        </p>
      </div>
      <Link href="/">
        <Button variant="default" size="lg" className="gap-2 mt-2">
          <ArrowIcon className="size-4" />
          {t("nav.home")}
        </Button>
      </Link>
    </div>
  )
}
