import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { categorySchema } from '@/lib/validations'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validation = categorySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'بيانات التصنيف غير صالحة',
          details: validation.error.flatten(),
        },
        { status: 400 }
      )
    }

    const { name_ar, name_fr, slug, description_ar, description_fr, image, parent_id } =
      validation.data

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('categories')
      .update({
        name_ar,
        name_fr,
        slug,
        description_ar: description_ar || '',
        description_fr: description_fr || '',
        image: image || '',
        parent_id: parent_id || null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'التصنيف غير موجود' },
          { status: 404 }
        )
      }
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'التصنيف بهذا الرابط موجود مسبقاً' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ category: data })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'فشل تحديث التصنيف' },
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
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'التصنيف غير موجود' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'فشل حذف التصنيف' },
      { status: 500 }
    )
  }
}
