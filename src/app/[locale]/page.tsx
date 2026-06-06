import Image from "next/image"
import { Link } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"
import { createAnonymousClient } from "@/lib/supabase/server"
import { getFeaturedProducts, getCategories } from "@/lib/supabase/queries"
import { ProductCard } from "@/components/shared/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Award, BadgePercent, Truck, Headphones, ArrowLeft, ArrowRight } from "lucide-react"
import type { Product, Category } from "@/types"

const HERO_IMAGE = "https://images.unsplash.com/photo-1600166898405-da74a8c7caf3?w=1920&q=80&auto=format"

const CATEGORY_IMAGES: Record<string, string> = {
  traditional: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&q=80&auto=format",
  modern: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80&auto=format",
  berber: "https://images.unsplash.com/photo-1549490349-8643362247b1?w=600&q=80&auto=format",
  constantine: "https://images.unsplash.com/photo-1605146769289-88211397c1b7?w=600&q=80&auto=format",
  wool: "https://images.unsplash.com/photo-1600166898405-da74a8c7caf3?w=600&q=80&auto=format",
  silk: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80&auto=format",
  prayer: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80&auto=format",
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations("home")
  const isRtl = locale === "ar"

  let featuredProducts: Product[] = []
  let categories: Category[] = []

  try {
    const supabase = createAnonymousClient()
    const [productsResult, categoriesResult] = await Promise.allSettled([
      getFeaturedProducts(supabase),
      getCategories(supabase),
    ])

    if (productsResult.status === "fulfilled") {
      featuredProducts = productsResult.value
    }
    if (categoriesResult.status === "fulfilled") {
      categories = categoriesResult.value
    }
  } catch {
    // Supabase may not be configured in dev
  }

  const benefits = [
    {
      icon: Award,
      title: t("why_us_quality"),
      description: t("why_us_quality_desc"),
    },
    {
      icon: BadgePercent,
      title: t("why_us_prices"),
      description: t("why_us_prices_desc"),
    },
    {
      icon: Truck,
      title: t("why_us_delivery"),
      description: t("why_us_delivery_desc"),
    },
    {
      icon: Headphones,
      title: t("why_us_support"),
      description: t("why_us_support_desc"),
    },
  ]

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[80vh]">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        </div>

        <div className="container-luxury relative z-10 py-20">
          <div className="max-w-2xl" style={{ marginInlineStart: isRtl ? "auto" : "0", marginInlineEnd: isRtl ? "0" : "auto" }}>
            <div className="flex flex-col gap-6">
              <h1 className="heading-1 text-foreground font-bold leading-tight">
                <span className="gold-gradient-text">{t("hero_title")}</span>
              </h1>
              <p className="body-large text-muted-foreground max-w-xl">
                {t("hero_subtitle")}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/categories">
                  <Button
                    size="lg"
                    className="h-11 gap-2 px-6 text-base shadow-md"
                  >
                    {t("shop_now")}
                    <ArrowIcon className="size-4" />
                  </Button>
                </Link>
                <Link href="/search">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 gap-2 px-6 text-base bg-background/60 backdrop-blur-sm border-border/60"
                  >
                    {t("view_all")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-luxury">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <h2 className="heading-2 text-foreground">
                {t("featured_title")}
              </h2>
              <Link
                href="/categories"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {t("view_all")}
                <ArrowIcon className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale as "ar" | "fr"}
                />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/categories">
                <Button variant="outline" className="gap-2">
                  {t("view_all")}
                  <ArrowIcon className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-luxury">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="heading-2 text-foreground">
              {t("categories_title")}
            </h2>
            <Link
              href="/categories"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {t("view_all")}
              <ArrowIcon className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {categories.map((category) => {
              const categoryName = locale === "ar" ? category.name_ar : category.name_fr
              const imageUrl = CATEGORY_IMAGES[category.slug] || category.image

              return (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="group overflow-hidden border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md h-full">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={categoryName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground/30">
                          <Award className="size-8" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3 text-center">
                      <CardTitle className="text-sm font-medium">
                        {categoryName}
                      </CardTitle>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}

            {/* Show placeholder categories if none loaded from DB */}
            {categories.length === 0 &&
              [
                { slug: "traditional", ar: "سجاد تقليدي", fr: "Traditionnels" },
                { slug: "modern", ar: "سجاد عصري", fr: "Modernes" },
                { slug: "berber", ar: "زرابي بربرية", fr: "Berbères" },
                { slug: "constantine", ar: "زربية قسنطينية", fr: "Constantine" },
                { slug: "wool", ar: "سجاد صوفي", fr: "Laine" },
                { slug: "silk", ar: "سجاد حريري", fr: "Soie" },
                { slug: "prayer", ar: "سجاد صلاة", fr: "Prière" },
              ].map((cat) => {
                const catName = locale === "ar" ? cat.ar : cat.fr
                const imageUrl = CATEGORY_IMAGES[cat.slug]

                return (
                  <Link key={cat.slug} href={`/categories/${cat.slug}`}>
                    <Card className="group overflow-hidden border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md h-full">
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={catName}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                          />
                        )}
                      </div>
                      <CardContent className="p-3 text-center">
                        <CardTitle className="text-sm font-medium">
                          {catName}
                        </CardTitle>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/categories">
              <Button variant="outline" className="gap-2">
                {t("view_all")}
                <ArrowIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20">
        <div className="container-luxury">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="heading-2 text-foreground mb-3">
              {t("why_us")}
            </h2>
            <div className="mx-auto w-20 h-0.5 gold-gradient rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={benefit.title}
                  className="group border border-border/60 hover:border-primary/20 transition-all duration-300 hover:shadow-md text-center"
                >
                  <CardContent className="flex flex-col items-center gap-3 p-6 md:p-8">
                    <div className="flex items-center justify-center size-14 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="size-7" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter / Decorative Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1920&q=80&auto=format"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/75 to-background/85" />
        </div>

        <div className="container-luxury relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 text-foreground mb-4">
              {locale === "ar"
                ? "سجاد جزائري أصيل"
                : "Tapis Algérien Authentique"}
            </h2>
            <p className="body-base text-muted-foreground mb-8 max-w-lg mx-auto">
              {locale === "ar"
                ? "اكتشف تشكيلتنا الفاخرة من السجاد والزرابي الجزائرية المصنوعة بأيدي حرفيين مهرسة"
                : "Découvrez notre collection de tapis et kilims algériens tissés par des artisans talentueux"}
            </p>
            <Link href="/categories">
              <Button
                size="lg"
                className="h-11 gap-2 px-8 text-base shadow-md"
              >
                {t("shop_now")}
                <ArrowIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
