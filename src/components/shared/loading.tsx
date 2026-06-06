import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-col gap-2 p-3.5">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="size-3.5 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-5 w-1/3 mt-1" />
        <Skeleton className="h-8 w-full mt-1 rounded-lg" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden">
      <Skeleton className="aspect-[16/9] w-full rounded-none" />
      <div className="p-3.5">
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="container-luxury py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-6 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-6 w-1/3" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded-lg mt-2" />
          <div className="flex flex-col gap-1.5 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-full" />
            ))}
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CartSkeleton() {
  return (
    <div className="container-luxury py-8">
      <Skeleton className="h-8 w-1/4 mb-6" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 rounded-lg border border-border/60 p-4">
            <Skeleton className="size-20 rounded-md shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <div className="flex items-center justify-between mt-auto">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>
    </div>
  )
}

export function PageHeadingSkeleton() {
  return (
    <div className="container-luxury py-6">
      <Skeleton className="h-10 w-1/3 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}
