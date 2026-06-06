'use client'

import { useEffect, useState, useCallback } from 'react'
import type { DashboardStats } from '@/types'
import { useTranslations } from 'next-intl'
import { formatPrice, formatDate } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingCart,
  Banknote,
  Package,
  Clock,
  TrendingUp,
} from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  processing: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
}

const STATUS_LABELS: Record<string, { ar: string; fr: string }> = {
  pending: { ar: 'قيد الانتظار', fr: 'En attente' },
  confirmed: { ar: 'مؤكد', fr: 'Confirmé' },
  processing: { ar: 'قيد المعالجة', fr: 'En traitement' },
  shipped: { ar: 'تم الشحن', fr: 'Expédié' },
  delivered: { ar: 'تم التوصيل', fr: 'Livré' },
  cancelled: { ar: 'ملغي', fr: 'Annulé' },
}

interface DashboardClientProps {
  locale: 'ar' | 'fr'
}

export function DashboardClient({ locale }: DashboardClientProps) {
  const t = useTranslations('admin')
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/dashboard')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setStats(data.stats)
    } catch {
      setStats(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-7 w-40" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 p-4">
                <Skeleton className="size-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-500">
        تعذر تحميل إحصائيات لوحة التحكم
      </div>
    )
  }

  const statCards = [
    {
      label: t('total_orders'),
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: t('total_revenue'),
      value: formatPrice(stats.totalRevenue, locale),
      icon: Banknote,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: t('total_products'),
      value: stats.totalProducts,
      icon: Package,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: t('pending_orders'),
      value: stats.pendingOrders,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-neutral-900">{t('dashboard')}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${color}`}>
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500">{label}</p>
                <p className="mt-0.5 text-lg font-bold text-neutral-900">
                  {value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats.revenueByMonth.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-500" />
              الإيرادات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-neutral-500">
                    <th className="py-2 font-medium">الشهر</th>
                    <th className="py-2 font-medium text-right">الإيرادات</th>
                    <th className="py-2 font-medium text-right hidden sm:table-cell">النسبة</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.revenueByMonth.map(({ month, revenue }, idx, arr) => {
                    const maxRevenue = Math.max(...arr.map((r) => r.revenue))
                    const percentage = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0
                    const [year, m] = month.split('-')
                    const label = `${m}/${year}`
                    return (
                      <tr key={month} className="border-b last:border-0">
                        <td className="py-2.5 font-medium text-neutral-700">
                          {label}
                        </td>
                        <td className="py-2.5 text-right font-semibold text-neutral-900">
                          {formatPrice(revenue, locale)}
                        </td>
                        <td className="py-2.5 text-right hidden sm:table-cell">
                          <div className="flex items-center justify-end gap-2">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-100">
                              <div
                                className="h-full rounded-full gold-gradient"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-neutral-400">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('recent_orders')}</CardTitle>
          <CardDescription>
            {stats.recentOrders.length === 0
              ? t('no_orders')
              : `آخر ${stats.recentOrders.length} طلبات`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentOrders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-neutral-500">
                    <th className="py-2 font-medium">العميل</th>
                    <th className="py-2 font-medium hidden md:table-cell">الهاتف</th>
                    <th className="py-2 font-medium text-right">المجموع</th>
                    <th className="py-2 font-medium text-center">الحالة</th>
                    <th className="py-2 font-medium text-left hidden sm:table-cell">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-2.5 font-medium text-neutral-700">
                        {order.customer_name}
                      </td>
                      <td className="py-2.5 text-neutral-600 hidden md:table-cell">
                        {order.customer_phone}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-neutral-900">
                        {formatPrice(order.total, locale)}
                      </td>
                      <td className="py-2.5 text-center">
                        <Badge
                          className={
                            STATUS_COLORS[order.status] ||
                            'bg-neutral-100 text-neutral-700'
                          }
                        >
                          {(STATUS_LABELS[order.status]?.[locale] || order.status) as string}
                        </Badge>
                      </td>
                      <td className="py-2.5 text-neutral-500 text-xs hidden sm:table-cell">
                        {formatDate(order.created_at, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
