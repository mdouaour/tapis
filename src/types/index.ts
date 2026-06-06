export interface Product {
  id: string
  name_ar: string
  name_fr: string
  slug: string
  description_ar: string
  description_fr: string
  price: number
  sale_price: number | null
  stock: number
  featured: boolean
  images: string[]
  colors: string[]
  dimensions: Dimension[]
  category_id: string
  category?: Category
  created_at: string
  updated_at: string
}

export interface Dimension {
  id?: string
  width: number
  height: number
  label_ar: string
  label_fr: string
  price_modifier: number
  stock: number
}

export interface Category {
  id: string
  name_ar: string
  name_fr: string
  slug: string
  description_ar: string
  description_fr: string
  image: string
  parent_id: string | null
  children?: Category[]
  products?: Product[]
  created_at: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedColor: string
  selectedDimension: Dimension
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  customer_wilaya: string
  customer_commune: string
  customer_address: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  notes: string | null
  created_at: string
}

export interface OrderItem {
  product_id: string
  product_name_ar: string
  product_name_fr: string
  quantity: number
  price: number
  color: string
  dimension: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'superadmin'
}

export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  pendingOrders: number
  recentOrders: Order[]
  revenueByMonth: { month: string; revenue: number }[]
}
