import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center gap-4 px-4 py-16 text-center',
        className,
      )}
    >
      <div className="flex items-center justify-center size-16 rounded-full bg-muted">
        <Icon className="size-8 text-muted-foreground/60" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      </div>
      {action && (
        <Button onClick={action.onClick} variant="default" className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  )
}
