import type { Metadata } from "next"
import { Cairo, Inter } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"

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
  title: "تاپيس",
  description: "أفخم السجاد والموكيت في الجزائر",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const direction = headersList.get("x-direction") || "rtl"
  const locale = direction === "rtl" ? "ar" : "fr"
  const isRtl = direction === "rtl"

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${cairo.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${isRtl ? "font-arabic" : "font-french"}`}
      >
        {children}
      </body>
    </html>
  )
}
