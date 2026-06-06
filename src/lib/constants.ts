export const SITE_NAME = 'تاپيس'
export const SITE_NAME_FR = 'Tapis'
export const SITE_DESCRIPTION_AR = 'أفخم السجاد والموكيت في الجزائر - جودة عالية، تصاميم عصرية، وأسعار منافسة'
export const SITE_DESCRIPTION_FR = 'Plus beau tapis et moquette en Algérie - Haute qualité, designs modernes, prix compétitifs'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tapis.dz'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '213550000000'
export const WHATSAPP_MESSAGE = 'مرحباً، أود الاستفسار عن السجاد'
export const WHATSAPP_MESSAGE_FR = 'Bonjour, je voudrais me renseigner sur les tapis'

export const WILAYAS = [
  'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار',
  'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر',
  'الجلفة', 'جيجل', 'سعيدة', 'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة', 'قسنطينة',
  'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض', 'إليزي',
  'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي', 'خنشلة',
  'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غرداية',
  'غليزان', 'تميمون', 'برج باجي مختار', 'أولاد جلال', 'بني عباس', 'عين صالح',
  'عين قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة'
]

export const ORDER_STATUSES = {
  pending: { ar: 'قيد الانتظار', fr: 'En attente' },
  confirmed: { ar: 'مؤكد', fr: 'Confirmé' },
  processing: { ar: 'قيد المعالجة', fr: 'En traitement' },
  shipped: { ar: 'تم الشحن', fr: 'Expédié' },
  delivered: { ar: 'تم التوصيل', fr: 'Livré' },
  cancelled: { ar: 'ملغي', fr: 'Annulé' },
} as const
