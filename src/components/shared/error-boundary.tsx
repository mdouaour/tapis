'use client'

import { Component, type PropsWithChildren, type ReactNode } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return <ErrorFallback onRetry={this.handleRetry} />
    }

    return this.props.children
  }
}

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <div className="flex items-center justify-center size-16 rounded-full bg-destructive/10">
        <AlertTriangle className="size-8 text-destructive" />
      </div>
      <ErrorContent onRetry={onRetry} />
    </div>
  )
}

function ErrorContent({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold font-heading text-foreground">
          {t('common.error')}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-md">
          {t('common.error_message')}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <Button onClick={onRetry} variant="default" className="gap-2">
          <RefreshCw className="size-4" />
          {t('common.retry')}
        </Button>
      </div>
    </>
  )
}
