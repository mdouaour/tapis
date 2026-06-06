import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { categorySchema } from '@/lib/validations'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_ar', { ascending: true })

    if (error) throw error

    return NextResponse.json({ categories: data || [] })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'فشل تحميل التصنيفات' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
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
      .insert({
        name_ar,
        name_fr,
        slug,
        description_ar: description_ar || '',
        description_fr: description_fr || '',
        image: image || '',
        parent_id: parent_id || null,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'التصنيف بهذا الرابط موجود مسبقاً' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ category: data }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'فشل إنشاء التصنيف' },
      { status: 500 }
    )
  }
}
