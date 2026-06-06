import { createAdminClient } from '@/lib/supabase/admin'
import { CategoriesClient } from './categories-client'

export default async function AdminCategoriesPage() {
  const supabase = createAdminClient()

  let categories: Array<{
    id: string
    name_ar: string
    name_fr: string
    slug: string
    image: string
    parent_id: string | null
    created_at: string
    products: { count: number }[]
  }>

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*, products(count)')
      .order('name_ar', { ascending: true })

    if (error) throw error
    categories = (data || []) as typeof categories
  } catch {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-500">
        تعذر تحميل التصنيفات
      </div>
    )
  }

  return <CategoriesClient categories={categories} />
}
