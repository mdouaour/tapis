import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { orderSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = orderSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const data = parsed.data

    const supabase = createAdminClient()

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_email: data.customer_email,
        customer_wilaya: data.customer_wilaya,
        customer_commune: data.customer_commune,
        customer_address: data.customer_address,
        items: data.items as unknown as Record<string, unknown>[],
        total: data.total,
        status: 'pending',
        notes: data.notes,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { message: 'Failed to create order' },
        { status: 500 },
      )
    }

    return NextResponse.json({ orderId: order.id }, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
