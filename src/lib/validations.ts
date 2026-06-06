import { z } from 'zod'

const algerianPhoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/

export const productSchema = z.object({
  name_ar: z.string().min(2, { message: 'يجب أن يحتوي الاسم بالعربية على حرفين على الأقل' }),
  name_fr: z.string().min(2, { message: 'Le nom en français doit contenir au moins 2 caractères' }),
  slug: z.string().min(2, { message: 'الرابط غير صالح' }),
  description_ar: z.string().min(10, { message: 'يجب أن يحتوي الوصف بالعربية على 10 أحرف على الأقل' }),
  description_fr: z.string().min(10, { message: 'La description en français doit contenir au moins 10 caractères' }),
  price: z.coerce.number().positive({ message: 'يجب أن يكون السعر أكبر من 0' }),
  sale_price: z.coerce.number().positive({ message: 'يجب أن يكون سعر التخفيض أكبر من 0' }).optional().nullable(),
  stock: z.coerce.number().int({ message: 'يجب أن يكون المخزون رقماً صحيحاً' }).min(0, { message: 'لا يمكن أن يكون المخزون أقل من 0' }),
  featured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  dimensions: z.array(z.object({
    width: z.coerce.number().positive({ message: 'العرض يجب أن يكون أكبر من 0' }),
    height: z.coerce.number().positive({ message: 'الارتفاع يجب أن يكون أكبر من 0' }),
    label_ar: z.string().min(1, { message: 'التسمية بالعربية مطلوبة' }),
    label_fr: z.string().min(1, { message: 'Le libellé en français est requis' }),
    price_modifier: z.coerce.number().default(0),
    stock: z.coerce.number().int().min(0).default(0),
  })).default([]),
  category_id: z.string().uuid({ message: 'التصنيف غير صالح' }),
}).refine(
  (data) => {
    if (data.sale_price === null || data.sale_price === undefined) return true
    return data.sale_price < data.price
  },
  { message: 'يجب أن يكون سعر التخفيض أقل من السعر الأصلي', path: ['sale_price'] }
)

export const categorySchema = z.object({
  name_ar: z.string().min(2, { message: 'يجب أن يحتوي الاسم بالعربية على حرفين على الأقل' }),
  name_fr: z.string().min(2, { message: 'Le nom en français doit contenir au moins 2 caractères' }),
  slug: z.string().min(2, { message: 'الرابط غير صالح' }),
  description_ar: z.string().optional().default(''),
  description_fr: z.string().optional().default(''),
  image: z.string().optional().default(''),
  parent_id: z.string().uuid({ message: 'التصنيف الأب غير صالح' }).optional().nullable().default(null),
})

export const orderItemSchema = z.object({
  product_id: z.string().uuid({ message: 'المنتج غير صالح' }),
  product_name_ar: z.string().min(1, { message: 'اسم المنتج بالعربية مطلوب' }),
  product_name_fr: z.string().min(1, { message: 'Le nom du produit en français est requis' }),
  quantity: z.coerce.number().int().positive({ message: 'الكمية يجب أن تكون أكبر من 0' }),
  price: z.coerce.number().positive({ message: 'السعر غير صالح' }),
  color: z.string().default(''),
  dimension: z.string().default(''),
})

export const orderSchema = z.object({
  customer_name: z.string().min(2, { message: 'يجب أن يحتوي الاسم على حرفين على الأقل' }),
  customer_phone: z.string()
    .regex(algerianPhoneRegex, { message: 'رقم الهاتف غير صالح. يجب أن يبدأ بـ 05 أو +2135' }),
  customer_email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }).optional().nullable().default(null),
  customer_wilaya: z.string().min(1, { message: 'يرجى اختيار الولاية' }),
  customer_commune: z.string().min(1, { message: 'يرجى إدخال البلدية' }),
  customer_address: z.string().min(5, { message: 'يجب أن يحتوي العنوان على 5 أحرف على الأقل' }),
  items: z.array(orderItemSchema).min(1, { message: 'يجب إضافة منتج واحد على الأقل' }),
  total: z.coerce.number().positive({ message: 'المجموع غير صالح' }),
  notes: z.string().optional().nullable().default(null),
})

export const adminLoginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z.string().min(6, { message: 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل' }),
})

export type ProductInput = z.infer<typeof productSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type OrderInput = z.infer<typeof orderSchema>
export type AdminLoginInput = z.infer<typeof adminLoginSchema>
