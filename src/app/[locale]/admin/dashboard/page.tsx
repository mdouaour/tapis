import { createAdminClient } from '@/lib/supabase/admin'
import { getDashboardStats } from '@/lib/supabase/queries'
import { getLocaleFromPath } from '@/lib/utils'
import { DashboardClient } from './dashboard-client'

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = createAdminClient()

  let stats
  try {
    stats = await getDashboardStats(supabase)
  } catch {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-500">
        تعذر تحميل إحصائيات لوحة التحكم
      </div>
    )
  }

  return (
    <DashboardClient
      stats={stats}
      locale={locale as 'ar' | 'fr'}
    />
  )
}
