'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { getImageUrl } from '@/lib/utils'
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, ImageIcon } from 'lucide-react'
import type { Category } from '@/types'

interface CategoryRow {
  id: string
  name_ar: string
  name_fr: string
  slug: string
  image: string
  parent_id: string | null
  created_at: string
  products: { count: number }[]
}

interface CategoriesClientProps {
  categories: CategoryRow[]
}

export function CategoriesClient({ categories }: CategoriesClientProps) {
  const t = useTranslations('admin')
  const commonT = useTranslations('common')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-neutral-900">{t('categories')}</h1>
        <Button size="sm">
          <Plus className="size-4" />
          {t('add_category')}
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-sm text-neutral-400">
          {commonT('no_data')}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">صورة</TableHead>
                <TableHead>{t('category_name')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('category_slug')}</TableHead>
                <TableHead className="text-center">عدد المنتجات</TableHead>
                <TableHead className="text-left">{commonT('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {category.image ? (
                      <img
                        src={getImageUrl(category.image)}
                        alt={category.name_ar}
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-md bg-neutral-100 text-neutral-300">
                        <ImageIcon className="size-5" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <span className="text-sm">{category.name_ar}</span>
                    <span className="mr-1 text-xs text-neutral-400">
                      / {category.name_fr}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-neutral-500 font-mono">
                    {category.slug}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="text-xs">
                      {category.products?.[0]?.count ?? 0}
                    </Badge>
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
                            <DialogTitle>{t('delete_category')}</DialogTitle>
                            <DialogDescription>
                              هل أنت متأكد من حذف التصنيف
                              <br />
                              <strong>{category.name_ar}</strong>؟
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose render={<Button variant="outline" />}>
                              {commonT('cancel')}
                            </DialogClose>
                            <Button variant="destructive">
                              {commonT('delete')}
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
