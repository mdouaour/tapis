import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { z } from 'zod'

const updateStatusSchema = z.object({
  status: z.enum([
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ]),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validation = updateStatusSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'حالة الطلب غير صالحة',
          details: validation.error.flatten(),
        },
        { status: 400 }
      )
    }

    const { status } = validation.data
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'الطلب غير موجود' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ order: data })
  } catch (error) {
    console.error('Error updating order status:', error)
    return NextResponse.json(
      { error: 'فشل تحديث حالة الطلب' },
      { status: 500 }
    )
  }
}
