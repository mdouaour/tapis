import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { productSchema } from '@/lib/validations'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ products: data || [] })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'فشل تحميل المنتجات' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
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
      .insert({
        name_ar,
        name_fr,
        slug,
        description_ar: description_ar || '',
        description_fr: description_fr || '',
        price,
        sale_price: sale_price || null,
        stock,
        featured,
        images,
        colors,
        dimensions,
        category_id,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'المنتج بهذا الرابط موجود مسبقاً' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ product: data }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'فشل إنشاء المنتج' },
      { status: 500 }
    )
  }
}
