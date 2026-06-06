import { Skeleton } from "@/components/ui/skeleton"
import { ProductGridSkeleton } from "@/components/shared/loading"

export default function HomeLoading() {
  return (
    <div className="animate-fade-in">
      {/* Hero Skeleton */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[80vh]">
        <div className="absolute inset-0">
          <Skeleton className="size-full rounded-none" />
        </div>
        <div className="container-luxury relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex flex-col gap-6">
              <Skeleton className="h-16 w-3/4 sm:h-20" />
              <Skeleton className="h-6 w-full max-w-md" />
              <div className="flex flex-wrap gap-3 pt-2">
                <Skeleton className="h-11 w-36 rounded-lg" />
                <Skeleton className="h-11 w-36 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Skeleton */}
      <section className="py-16 md:py-20">
        <div className="container-luxury">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-5 w-24" />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-luxury">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <Skeleton className="h-9 w-56" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="p-3">
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Skeleton */}
      <section className="py-16 md:py-20">
        <div className="container-luxury">
          <div className="text-center mb-10 md:mb-12">
            <Skeleton className="h-9 w-64 mx-auto mb-3" />
            <Skeleton className="h-0.5 w-20 mx-auto" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 md:p-8 rounded-xl border border-border/60 bg-card">
                <Skeleton className="size-14 rounded-full" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Skeleton */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Skeleton className="absolute inset-0 size-full rounded-none" />
        <div className="container-luxury relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <Skeleton className="h-9 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-80 mx-auto mb-8" />
            <Skeleton className="h-11 w-40 mx-auto rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  )
}
