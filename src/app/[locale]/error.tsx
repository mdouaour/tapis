'use client'

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations()

  useEffect(() => {
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4 py-16 text-center">
      <div className="flex items-center justify-center size-20 rounded-full bg-destructive/10">
        <AlertTriangle className="size-10 text-destructive" />
      </div>
      <div>
        <h2 className="heading-3 text-foreground mb-1.5">
          {t("common.error")}
        </h2>
        <p className="body-base text-muted-foreground max-w-md mx-auto">
          {t("common.error_message")}
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted-foreground/60 font-mono">
            {error.digest}
          </p>
        )}
      </div>
      <Button onClick={reset} variant="default" size="lg" className="gap-2 mt-2">
        <RefreshCw className="size-4" />
        {t("common.retry")}
      </Button>
    </div>
  )
}
