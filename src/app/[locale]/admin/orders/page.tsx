import { createAdminClient } from '@/lib/supabase/admin'
import { getOrders } from '@/lib/supabase/queries'
import { OrdersClient } from './orders-client'

export default async function AdminOrdersPage() {
  const supabase = createAdminClient()

  let orders
  try {
    orders = await getOrders(supabase)
  } catch {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-500">
        تعذر تحميل الطلبات
      </div>
    )
  }

  return <OrdersClient orders={orders} />
}
