import type { SupabaseClient } from '@supabase/supabase-js'
import type { Product, Category, Order, DashboardStats, OrderItem, OrderStatus } from '@/types'

export interface OrderInput {
  customer_name: string
  customer_phone: string
  customer_email?: string | null
  customer_wilaya: string
  customer_commune: string
  customer_address: string
  items: OrderItem[]
  total: number
  notes?: string | null
}

interface GetProductsOptions {
  category?: string
  featured?: boolean
  search?: string
  sort?: string
  limit?: number
  offset?: number
}

export async function getProducts(
  supabase: SupabaseClient,
  options: GetProductsOptions = {}
): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*, category:categories(*)')

    if (options.category) {
      query = query.eq('category_id', options.category)
    }

    if (options.featured) {
      query = query.eq('featured', true)
    }

    if (options.search) {
      query = query.or(
        `name_ar.ilike.%${options.search}%,name_fr.ilike.%${options.search}%,description_ar.ilike.%${options.search}%,description_fr.ilike.%${options.search}%`
      )
    }

    if (options.sort) {
      switch (options.sort) {
        case 'price_asc':
          query = query.order('price', { ascending: true })
          break
        case 'price_desc':
          query = query.order('price', { ascending: false })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        case 'oldest':
          query = query.order('created_at', { ascending: true })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }
    } else {
      query = query.order('created_at', { ascending: false })
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 12) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return (data as unknown as Product[]) || []
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getProductBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data as unknown as Product
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    throw error
  }
}

export async function getCategories(
  supabase: SupabaseClient
): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_ar', { ascending: true })

    if (error) throw error
    return (data as unknown as Category[]) || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function getCategoryBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data as unknown as Category
  } catch (error) {
    console.error('Error fetching category by slug:', error)
    throw error
  }
}

export async function getProductsByCategory(
  supabase: SupabaseClient,
  categorySlug: string
): Promise<Product[]> {
  try {
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (categoryError) throw categoryError

    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('category_id', category.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as unknown as Product[]) || []
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}

export async function getFeaturedProducts(
  supabase: SupabaseClient
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(8)

    if (error) throw error
    return (data as unknown as Product[]) || []
  } catch (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }
}

export async function searchProducts(
  supabase: SupabaseClient,
  query: string
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .or(
        `name_ar.ilike.%${query}%,name_fr.ilike.%${query}%,description_ar.ilike.%${query}%,description_fr.ilike.%${query}%`
      )
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error
    return (data as unknown as Product[]) || []
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}

export async function createOrder(
  supabase: SupabaseClient,
  data: OrderInput
): Promise<Order> {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_email: data.customer_email || null,
        customer_wilaya: data.customer_wilaya,
        customer_commune: data.customer_commune,
        customer_address: data.customer_address,
        items: data.items as unknown as Json,
        total: data.total,
        status: 'pending',
        notes: data.notes || null,
      })
      .select()
      .single()

    if (error) throw error
    return order as unknown as Order
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export async function getOrders(
  supabase: SupabaseClient
): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as unknown as Order[]) || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

export async function getOrderById(
  supabase: SupabaseClient,
  id: string
): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data as unknown as Order
  } catch (error) {
    console.error('Error fetching order by id:', error)
    throw error
  }
}

export async function updateOrderStatus(
  supabase: SupabaseClient,
  id: string,
  status: OrderStatus
): Promise<void> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

export async function getDashboardStats(
  supabase: SupabaseClient
): Promise<DashboardStats> {
  try {
    const [
      orderCountResult,
      productCountResult,
      revenueResult,
      pendingResult,
      recentResult,
      customersResult,
    ] = await Promise.all([
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('total, created_at').in('status', ['delivered', 'shipped', 'confirmed']),
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('orders').select('customer_phone'),
    ])

    if (orderCountResult.error) throw orderCountResult.error
    if (productCountResult.error) throw productCountResult.error
    if (revenueResult.error) throw revenueResult.error
    if (pendingResult.error) throw pendingResult.error
    if (recentResult.error) throw recentResult.error
    if (customersResult.error) throw customersResult.error

    const totalRevenue = (revenueResult.data || []).reduce(
      (sum: number, order: { total: number }) => sum + (order.total || 0),
      0
    )

    const uniqueCustomers = new Set(
      (customersResult.data || []).map(
        (order: { customer_phone: string }) => order.customer_phone
      )
    ).size

    const revenueByMonth = aggregateRevenueByMonth(
      (revenueResult.data || []) as Array<{ total: number; created_at: string }>
    )

    return {
      totalOrders: orderCountResult.count || 0,
      totalRevenue,
      totalProducts: productCountResult.count || 0,
      totalCustomers: uniqueCustomers,
      pendingOrders: pendingResult.count || 0,
      recentOrders: (recentResult.data as unknown as Order[]) || [],
      revenueByMonth,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw error
  }
}

function aggregateRevenueByMonth(
  orders: Array<{ total: number; created_at: string }>
): Array<{ month: string; revenue: number }> {
  const monthMap = new Map<string, number>()

  for (const order of orders) {
    const date = new Date(order.created_at)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + (order.total || 0))
  }

  return Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, revenue }))
}

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
