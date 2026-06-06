import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { productSchema } from '@/lib/validations'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validation = productSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'بيانات المنتج غير صالحة',
          details: validation.error.flatten(),
        },
        { status: 400 }
      )
    }

    const {
      name_ar,
      name_fr,
      slug,
      description_ar,
      description_fr,
      price,
      sale_price,
      stock,
      featured,
      images,
      colors,
      dimensions,
      category_id,
    } = validation.data

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('products')
      .update({
        name_ar,
        name_fr,
        slug,
        description_ar,
        description_fr,
        price,
        sale_price: sale_price || null,
        stock,
        featured,
        images,
        colors,
        dimensions,
        category_id,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'المنتج غير موجود' },
          { status: 404 }
        )
      }
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'المنتج بهذا الرابط موجود مسبقاً' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ product: data })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'فشل تحديث المنتج' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'المنتج غير موجود' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'فشل حذف المنتج' },
      { status: 500 }
    )
  }
}
