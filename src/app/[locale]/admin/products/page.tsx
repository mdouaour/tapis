import { createAdminClient } from '@/lib/supabase/admin'
import { getProducts } from '@/lib/supabase/queries'
import { ProductsClient } from './products-client'

export default async function AdminProductsPage() {
  const supabase = createAdminClient()

  let products
  try {
    products = await getProducts(supabase)
  } catch {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-500">
        تعذر تحميل المنتجات
      </div>
    )
  }

  return <ProductsClient products={products} />
}
