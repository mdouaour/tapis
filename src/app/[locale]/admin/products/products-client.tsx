'use client'

import { useState, useMemo } from 'react'
import type { Product } from '@/types'
import { useTranslations } from 'next-intl'
import { formatPrice, getImageUrl, truncate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  ImageIcon,
} from 'lucide-react'

interface ProductsClientProps {
  products: Product[]
}

export function ProductsClient({ products }: ProductsClientProps) {
  const t = useTranslations('admin')
  const commonT = useTranslations('common')
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const q = search.toLowerCase()
    return products.filter(
      (p) =>
        p.name_ar.includes(q) ||
        p.name_fr.toLowerCase().includes(q) ||
        p.category?.name_ar.includes(q) ||
        p.category?.name_fr.toLowerCase().includes(q)
    )
  }, [products, search])

  const handleDelete = async (product: Product) => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error()
      window.location.reload()
    } catch {
      alert('فشل حذف المنتج')
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-neutral-900">{t('products')}</h1>
        <Button size="sm">
          <Plus className="size-4" />
          {t('add_product')}
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          placeholder={commonT('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-8"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-sm text-neutral-400">
          {commonT('no_data')}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">{t('product_image')}</TableHead>
                <TableHead>{t('product_name')}</TableHead>
                <TableHead className="hidden md:table-cell">التصنيف</TableHead>
                <TableHead className="text-right">{t('product_price')}</TableHead>
                <TableHead className="text-center">{t('product_stock')}</TableHead>
                <TableHead className="text-center hidden sm:table-cell">مميز</TableHead>
                <TableHead className="text-left">{commonT('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images?.[0] ? (
                      <img
                        src={getImageUrl(product.images[0])}
                        alt={product.name_ar}
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-md bg-neutral-100 text-neutral-300">
                        <ImageIcon className="size-5" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <span className="text-sm">{product.name_ar}</span>
                    <span className="mr-1 text-xs text-neutral-400">
                      / {product.name_fr}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-neutral-600">
                    {product.category?.name_ar || '—'}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.sale_price ? (
                      <span className="flex items-center justify-end gap-1">
                        <span className="text-xs text-red-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span>{formatPrice(product.sale_price)}</span>
                      </span>
                    ) : (
                      formatPrice(product.price)
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={product.stock > 0 ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    {product.featured ? (
                      <Star className="inline size-4 text-amber-400 fill-amber-400" />
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-xs">
                        <Pencil className="size-3.5" />
                      </Button>
                      <Dialog>
                        <DialogTrigger render={<Button variant="ghost" size="icon-xs" className="text-red-500 hover:text-red-600" />}>
                          <Trash2 className="size-3.5" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t('delete_product')}</DialogTitle>
                            <DialogDescription>
                              {t('delete_product_confirm')}
                              <br />
                              <strong>{product.name_ar}</strong>
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose render={<Button variant="outline" />}>
                              {commonT('cancel')}
                            </DialogClose>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(product)}
                              disabled={deleting}
                            >
                              {deleting ? commonT('loading') : commonT('delete')}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
