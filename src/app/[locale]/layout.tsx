import type { Metadata } from "next"
import { Cairo, Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Providers } from "@/providers"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { CartSheet } from "@/components/shared/cart-sheet"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { Toaster } from "@/components/ui/sonner"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { SITE_NAME, SITE_DESCRIPTION_AR, SITE_URL } from "@/lib/constants"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-french",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION_AR,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION_AR,
    locale: "ar_DZ",
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: {
    languages: {
      ar: "/ar",
      fr: "/fr",
    },
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c9954a",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  const dir = locale === "ar" ? "rtl" : "ltr"
  const isRtl = dir === "rtl"

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${isRtl ? "font-arabic" : "font-french"}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ErrorBoundary>
              <Header />
              <main className="flex-1 min-h-[60vh]">
                {children}
              </main>
              <Footer locale={locale as "ar" | "fr"} />
              <CartSheet />
              <WhatsAppButton />
              <Toaster />
            </ErrorBoundary>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
