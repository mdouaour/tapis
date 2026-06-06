'use client'

import { useState, useMemo } from 'react'
import type { Order, OrderStatus } from '@/types'
import { useTranslations } from 'next-intl'
import { formatPrice, formatDate, truncate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Eye, Package } from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: { ar: string; fr: string }; color: string }> = {
  pending: {
    label: { ar: 'قيد الانتظار', fr: 'En attente' },
    color: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  confirmed: {
    label: { ar: 'مؤكد', fr: 'Confirmé' },
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  processing: {
    label: { ar: 'قيد المعالجة', fr: 'En traitement' },
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  },
  shipped: {
    label: { ar: 'تم الشحن', fr: 'Expédié' },
    color: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  delivered: {
    label: { ar: 'تم التوصيل', fr: 'Livré' },
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  cancelled: {
    label: { ar: 'ملغي', fr: 'Annulé' },
    color: 'bg-red-100 text-red-700 border-red-200',
  },
}

const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

interface OrdersClientProps {
  orders: Order[]
}

export function OrdersClient({ orders }: OrdersClientProps) {
  const commonT = useTranslations('common')
  const t = useTranslations('admin')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return orders
    return orders.filter((o) => o.status === statusFilter)
  }, [orders, statusFilter])

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      window.location.reload()
    } catch {
      alert('فشل تحديث حالة الطلب')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-neutral-900">{t('orders')}</h1>

        <Select value={statusFilter} onValueChange={(value) => value && setStatusFilter(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="جميع الحالات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_CONFIG[s].label.ar}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-sm text-neutral-400">
          {t('no_orders')}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead className="hidden md:table-cell">الهاتف</TableHead>
                <TableHead className="text-right">المجموع</TableHead>
                <TableHead className="text-center">الحالة</TableHead>
                <TableHead className="text-left hidden sm:table-cell">التاريخ</TableHead>
                <TableHead className="text-left">{commonT('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => {
                const shortId = order.id.slice(0, 8)
                const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending

                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs font-medium">
                      #{shortId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.customer_name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-neutral-600 text-sm" dir="ltr">
                      {order.customer_phone}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={statusInfo.color}>
                        {statusInfo.label.ar}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left text-xs text-neutral-500 hidden sm:table-cell">
                      {formatDate(order.created_at)}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger render={<Button variant="ghost" size="icon-xs" />}>
                          <Eye className="size-3.5" />
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Package className="size-4" />
                              تفاصيل الطلب #{shortId}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-3 rounded-lg bg-neutral-50 p-3">
                              <div>
                                <span className="text-xs text-neutral-500">العميل</span>
                                <p className="font-medium">{order.customer_name}</p>
                              </div>
                              <div>
                                <span className="text-xs text-neutral-500">الهاتف</span>
                                <p className="font-medium" dir="ltr">{order.customer_phone}</p>
                              </div>
                              <div>
                                <span className="text-xs text-neutral-500">الولاية</span>
                                <p className="font-medium">{order.customer_wilaya}</p>
                              </div>
                              <div>
                                <span className="text-xs text-neutral-500">البلدية</span>
                                <p className="font-medium">{order.customer_commune}</p>
                              </div>
                              <div className="col-span-2">
                                <span className="text-xs text-neutral-500">العنوان</span>
                                <p className="font-medium">{order.customer_address}</p>
                              </div>
                              <div>
                                <span className="text-xs text-neutral-500">الحالة</span>
                                <div className="mt-0.5">
                                  <Badge className={statusInfo.color}>
                                    {statusInfo.label.ar}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <span className="text-xs text-neutral-500">التاريخ</span>
                                <p className="font-medium">{formatDate(order.created_at)}</p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 className="mb-2 text-xs font-medium text-neutral-500">
                                المنتجات
                              </h4>
                              <div className="space-y-1.5">
                                {order.items.map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-2 text-sm"
                                  >
                                    <div className="min-w-0">
                                      <span className="block truncate font-medium">
                                        {item.product_name_ar}
                                      </span>
                                      <span className="text-xs text-neutral-400">
                                        {item.quantity} × {formatPrice(item.price)}
                                        {item.color && ` · ${item.color}`}
                                        {item.dimension && ` · ${item.dimension}`}
                                      </span>
                                    </div>
                                    <span className="mr-2 shrink-0 font-semibold">
                                      {formatPrice(item.quantity * item.price)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between border-t pt-3 text-sm">
                              <span className="font-semibold">المجموع</span>
                              <span className="text-lg font-bold text-amber-600">
                                {formatPrice(order.total)}
                              </span>
                            </div>

                            {/* Notes */}
                            {order.notes && (
                              <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                                {order.notes}
                              </div>
                            )}

                            {/* Status Actions */}
                            <div className="flex flex-wrap gap-2 border-t pt-3">
                              {ORDER_STATUSES.map((s) => {
                                if (s === order.status) return null
                                const cfg = STATUS_CONFIG[s]
                                return (
                                  <Button
                                    key={s}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleStatusUpdate(order.id, s)}
                                  >
                                    {s === 'shipped'
                                      ? t('mark_shipped')
                                      : s === 'delivered'
                                        ? t('mark_delivered')
                                        : cfg.label.ar}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
