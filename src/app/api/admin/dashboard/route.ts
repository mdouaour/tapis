import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getDashboardStats } from '@/lib/supabase/queries'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const stats = await getDashboardStats(supabase)
    return NextResponse.json({ stats })
  } catch (error) {
    return NextResponse.json(
      { error: 'فشل تحميل إحصائيات لوحة التحكم' },
      { status: 500 }
    )
  }
}
